// Shared child/vaccination types — safe for BOTH server and client code.
// Keep this file free of secrets and server-only imports.

export const CHILD_GENDERS = ["Male", "Female", "Other"] as const;
export type ChildGender = (typeof CHILD_GENDERS)[number];

export interface ChildRow {
  id: string;
  created_at: string;
  child_name: string;
  dob: string; // YYYY-MM-DD
  gender: ChildGender | string;
  parent_name: string;
  phone: string;
  notes: string;
}

/** Editable fields of a child (everything except id/created_at). */
export type ChildFields = Omit<ChildRow, "id" | "created_at">;

export interface VaccinationRow {
  id: string;
  created_at: string;
  child_id: string;
  child_name: string;
  vaccine: string;
  dose: string;
  due_date: string; // YYYY-MM-DD
  given_date: string; // YYYY-MM-DD, blank until administered
  status: string; // stored snapshot; UI recomputes via computeVaccStatus
  notes: string;
}

/** Display status, always computed from dates — never read from the sheet. */
export type VaccStatus = "Given" | "Overdue" | "Due soon" | "Upcoming";

/**
 * Compute the display status of a dose.
 * @param windowDays how far ahead counts as "Due soon" (call-list window)
 */
export function computeVaccStatus(
  row: Pick<VaccinationRow, "given_date" | "due_date">,
  todayISO: string,
  windowDays: number
): VaccStatus {
  if (row.given_date) return "Given";
  if (!row.due_date) return "Upcoming";
  if (row.due_date < todayISO) return "Overdue";

  const due = new Date(`${row.due_date}T00:00`).getTime();
  const today = new Date(`${todayISO}T00:00`).getTime();
  if (due - today <= windowDays * 24 * 60 * 60 * 1000) return "Due soon";
  return "Upcoming";
}

/** Whole days between today and the due date (negative = overdue). */
export function daysUntilDue(dueDateISO: string, todayISO: string): number {
  const due = new Date(`${dueDateISO}T00:00`).getTime();
  const today = new Date(`${todayISO}T00:00`).getTime();
  return Math.round((due - today) / (24 * 60 * 60 * 1000));
}

/**
 * Mandatory compliance text — shown on every vaccination screen.
 * (NMC / Drugs & Magic Remedies compliant: guidance only, no medical claims.)
 */
export const VACCINE_DISCLAIMER =
  "Schedule is a guide based on IAP recommendations; the doctor confirms/adjusts each child's vaccines. Not medical advice.";
