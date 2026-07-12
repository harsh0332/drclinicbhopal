"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createSessionToken,
  verifyPassword,
  verifySessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-auth";
import { appendRow, appendRows, updateRow } from "@/lib/sheets";
import { APPOINTMENT_STATUSES, type AppointmentStatus } from "@/lib/appointment-types";
import { WALKIN_GENDERS, type WalkInFields } from "@/lib/walkin-types";
import { CHILD_GENDERS, type ChildFields } from "@/lib/vaccination-types";
import { generateScheduleForDob } from "@/lib/iap-schedule";

export interface LoginState {
  error?: string;
}

// Light in-memory rate limiting: 5 failed attempts per IP per 15 minutes.
// Resets on server restart, which is acceptable for a single-admin panel.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string) {
  const entry = failedAttempts.get(ip);
  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, windowStart: Date.now() });
  } else {
    entry.count += 1;
  }
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const hdrs = await headers();
  const ip = (hdrs.get("x-forwarded-for") ?? "local").split(",")[0].trim();

  if (isRateLimited(ip)) {
    return { error: "Too many failed attempts. Please try again in 15 minutes." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    return { error: "Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH in .env.local." };
  }

  // Evaluate both checks unconditionally so a wrong username costs the same
  // time as a wrong password (no username-probing via response timing).
  const usernameOk = username === expectedUsername;
  const passwordOk = verifyPassword(password, expectedHash);

  if (!usernameOk || !passwordOk) {
    recordFailure(ip);
    return { error: "Invalid username or password." };
  }

  failedAttempts.delete(ip);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/** Throws unless the request carries a valid admin session cookie. */
async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export interface UpdateAppointmentResult {
  ok: boolean;
  error?: string;
}

/**
 * Update a lead's status and/or notes in the Appointments sheet.
 * Server actions are reachable without going through the proxy matcher in
 * some cases, so the session is re-verified here as well.
 */
export async function updateAppointmentAction(
  id: string,
  patch: { status?: string; notes?: string }
): Promise<UpdateAppointmentResult> {
  await requireAdminSession();

  if (!id) {
    return { ok: false, error: "Missing appointment id." };
  }

  const update: { status?: AppointmentStatus; notes?: string } = {};

  if (patch.status !== undefined) {
    if (!APPOINTMENT_STATUSES.includes(patch.status as AppointmentStatus)) {
      return { ok: false, error: `Invalid status: ${patch.status}` };
    }
    update.status = patch.status as AppointmentStatus;
  }

  if (patch.notes !== undefined) {
    update.notes = patch.notes.trim().slice(0, 1000);
  }

  if (Object.keys(update).length === 0) {
    return { ok: false, error: "Nothing to update." };
  }

  try {
    await updateRow("Appointments", id, update);
    revalidatePath("/admin/appointments");
    return { ok: true };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to update appointment:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

// ---------------------------------------------------------------------------
// Walk-ins (paper register replacement)
// ---------------------------------------------------------------------------

export interface WalkInResult {
  ok: boolean;
  error?: string;
  id?: string;
}

const PHONE_REGEX = /^[6-9]\d{9}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Validate + normalize walk-in fields shared by add and update. */
function sanitizeWalkInFields(input: Partial<WalkInFields>): {
  fields: Partial<WalkInFields>;
  error?: string;
} {
  const fields: Partial<WalkInFields> = {};

  if (input.patient_name !== undefined) {
    const name = input.patient_name.trim();
    if (name.length < 2) return { fields, error: "Please enter the patient/parent name." };
    fields.patient_name = name.slice(0, 100);
  }

  if (input.phone !== undefined) {
    const phone = input.phone.replace(/[^0-9]/g, "");
    if (!PHONE_REGEX.test(phone)) {
      return { fields, error: "Please enter a valid 10-digit mobile number starting with 6-9." };
    }
    fields.phone = phone;
  }

  if (input.visit_date !== undefined) {
    if (!DATE_REGEX.test(input.visit_date)) {
      return { fields, error: "Please pick a valid visit date." };
    }
    fields.visit_date = input.visit_date;
  }

  if (input.gender !== undefined) {
    if (input.gender !== "" && !WALKIN_GENDERS.includes(input.gender as (typeof WALKIN_GENDERS)[number])) {
      return { fields, error: `Invalid gender: ${input.gender}` };
    }
    fields.gender = input.gender;
  }

  if (input.child_name !== undefined) fields.child_name = input.child_name.trim().slice(0, 100);
  if (input.child_age !== undefined) fields.child_age = input.child_age.trim().slice(0, 100);
  if (input.reason !== undefined) fields.reason = input.reason.trim().slice(0, 500);

  return { fields };
}

/** Record a new walk-in patient in the WalkIns sheet. */
export async function addWalkInAction(input: WalkInFields): Promise<WalkInResult> {
  await requireAdminSession();

  // Required fields for a new entry
  if (!input.patient_name?.trim()) return { ok: false, error: "Patient/parent name is required." };
  if (!input.phone?.trim()) return { ok: false, error: "Mobile number is required." };
  if (!input.visit_date?.trim()) return { ok: false, error: "Visit date is required." };

  const { fields, error } = sanitizeWalkInFields(input);
  if (error) return { ok: false, error };

  try {
    const id = await appendRow("WalkIns", fields);
    revalidatePath("/admin/walkins");
    return { ok: true, id };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to add walk-in:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

/** Edit an existing walk-in entry. */
export async function updateWalkInAction(
  id: string,
  patch: Partial<WalkInFields>
): Promise<WalkInResult> {
  await requireAdminSession();

  if (!id) return { ok: false, error: "Missing walk-in id." };

  const { fields, error } = sanitizeWalkInFields(patch);
  if (error) return { ok: false, error };
  if (Object.keys(fields).length === 0) return { ok: false, error: "Nothing to update." };

  try {
    await updateRow("WalkIns", id, fields);
    revalidatePath("/admin/walkins");
    return { ok: true, id };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to update walk-in:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

// ---------------------------------------------------------------------------
// Children + Vaccinations (IAP schedule tracker)
// ---------------------------------------------------------------------------

export interface ChildResult {
  ok: boolean;
  error?: string;
  id?: string;
}

/** Validate + normalize child fields shared by add and update. */
function sanitizeChildFields(input: Partial<ChildFields>): {
  fields: Partial<ChildFields>;
  error?: string;
} {
  const fields: Partial<ChildFields> = {};

  if (input.child_name !== undefined) {
    const name = input.child_name.trim();
    if (name.length < 2) return { fields, error: "Please enter the child's name." };
    fields.child_name = name.slice(0, 100);
  }

  if (input.parent_name !== undefined) {
    const name = input.parent_name.trim();
    if (name.length < 2) return { fields, error: "Please enter the parent's name." };
    fields.parent_name = name.slice(0, 100);
  }

  if (input.phone !== undefined) {
    const phone = input.phone.replace(/[^0-9]/g, "");
    if (!PHONE_REGEX.test(phone)) {
      return { fields, error: "Please enter a valid 10-digit mobile number starting with 6-9." };
    }
    fields.phone = phone;
  }

  if (input.dob !== undefined) {
    if (!DATE_REGEX.test(input.dob)) return { fields, error: "Please pick a valid date of birth." };
    if (input.dob > new Date().toLocaleDateString("en-CA")) {
      return { fields, error: "Date of birth cannot be in the future." };
    }
    fields.dob = input.dob;
  }

  if (input.gender !== undefined) {
    if (input.gender !== "" && !CHILD_GENDERS.includes(input.gender as (typeof CHILD_GENDERS)[number])) {
      return { fields, error: `Invalid gender: ${input.gender}` };
    }
    fields.gender = input.gender;
  }

  if (input.notes !== undefined) fields.notes = input.notes.trim().slice(0, 500);

  return { fields };
}

/**
 * Register a child AND auto-generate their full IAP vaccination schedule
 * (due dates = DOB + IAP age offsets) in one bulk write.
 */
export async function addChildAction(input: ChildFields): Promise<ChildResult> {
  await requireAdminSession();

  if (!input.child_name?.trim()) return { ok: false, error: "Child's name is required." };
  if (!input.parent_name?.trim()) return { ok: false, error: "Parent's name is required." };
  if (!input.phone?.trim()) return { ok: false, error: "Mobile number is required." };
  if (!input.dob?.trim()) return { ok: false, error: "Date of birth is required." };

  const { fields, error } = sanitizeChildFields(input);
  if (error) return { ok: false, error };

  try {
    const childId = await appendRow("Children", fields);

    const today = new Date().toLocaleDateString("en-CA");
    const doses = generateScheduleForDob(fields.dob as string).map((d) => ({
      child_id: childId,
      child_name: fields.child_name as string,
      vaccine: d.vaccine,
      dose: d.dose,
      due_date: d.due_date,
      given_date: "",
      // Stored snapshot only — the UI always recomputes status from dates.
      status: d.due_date < today ? "Overdue" : "Upcoming",
      notes: d.notes,
    }));
    await appendRows("Vaccinations", doses);

    revalidatePath("/admin/vaccinations");
    return { ok: true, id: childId };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to add child/schedule:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

/** Edit a child's details (does not regenerate their schedule). */
export async function updateChildAction(
  id: string,
  patch: Partial<ChildFields>
): Promise<ChildResult> {
  await requireAdminSession();
  if (!id) return { ok: false, error: "Missing child id." };

  const { fields, error } = sanitizeChildFields(patch);
  if (error) return { ok: false, error };
  if (Object.keys(fields).length === 0) return { ok: false, error: "Nothing to update." };

  try {
    await updateRow("Children", id, fields);
    revalidatePath("/admin/vaccinations");
    return { ok: true, id };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to update child:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

export interface VaccinationResult {
  ok: boolean;
  error?: string;
}

/**
 * Mark a dose as given (given_date defaults to today) — or un-mark it by
 * passing givenDate: null.
 */
export async function markVaccineGivenAction(
  id: string,
  givenDate: string | null
): Promise<VaccinationResult> {
  await requireAdminSession();
  if (!id) return { ok: false, error: "Missing vaccination id." };

  let patch: { given_date: string; status: string };
  if (givenDate === null) {
    patch = { given_date: "", status: "Upcoming" };
  } else {
    const date = givenDate || new Date().toLocaleDateString("en-CA");
    if (!DATE_REGEX.test(date)) return { ok: false, error: "Please pick a valid given date." };
    if (date > new Date().toLocaleDateString("en-CA")) {
      return { ok: false, error: "Given date cannot be in the future." };
    }
    patch = { given_date: date, status: "Given" };
  }

  try {
    await updateRow("Vaccinations", id, patch);
    revalidatePath("/admin/vaccinations");
    return { ok: true };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to mark vaccine:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}

/** Doctor's adjustment knob: change a dose's due date and/or notes. */
export async function updateVaccinationAction(
  id: string,
  patch: { due_date?: string; notes?: string }
): Promise<VaccinationResult> {
  await requireAdminSession();
  if (!id) return { ok: false, error: "Missing vaccination id." };

  const update: { due_date?: string; notes?: string } = {};
  if (patch.due_date !== undefined) {
    if (!DATE_REGEX.test(patch.due_date)) return { ok: false, error: "Please pick a valid due date." };
    update.due_date = patch.due_date;
  }
  if (patch.notes !== undefined) update.notes = patch.notes.trim().slice(0, 500);
  if (Object.keys(update).length === 0) return { ok: false, error: "Nothing to update." };

  try {
    await updateRow("Vaccinations", id, update);
    revalidatePath("/admin/vaccinations");
    return { ok: true };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to update vaccination:", err);
    return { ok: false, error: "Could not save to the sheet. Please try again." };
  }
}
