"use server";

import { appendRow } from "@/lib/sheets";

export interface BookingState {
  success: boolean;
  error?: string;
  fallback?: boolean;
}

const PHONE_REGEX = /^[6-9]\d{9}$/;

/**
 * Website appointment form → Appointments sheet (status "New", source "form").
 * The lead is captured server-side FIRST; the client then opens WhatsApp with
 * the prefilled details, so the chat can start even while the sheet write is
 * the source of truth. If the Sheets backend is down/unconfigured we still
 * return success with `fallback: true` — the patient continues on WhatsApp
 * and is never blocked by our infrastructure.
 */
export async function bookAppointmentAction(formData: FormData): Promise<BookingState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const childAge = formData.get("childAge") as string;
  const preferredTime = formData.get("preferredTime") as string;
  const message = (formData.get("message") as string) || "";

  // Server-side validations
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Please enter a valid parent name (minimum 2 characters)." };
  }

  // Validate Indian mobile numbers (10 digits starting with 6-9)
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
  if (!PHONE_REGEX.test(cleanPhone)) {
    return { success: false, error: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)." };
  }

  if (!childAge || childAge.trim().length === 0) {
    return { success: false, error: "Please specify your child's age or Date of Birth." };
  }

  if (!preferredTime) {
    return { success: false, error: "Please select a preferred date and time." };
  }

  try {
    await appendRow("Appointments", {
      name: name.trim(),
      phone: cleanPhone,
      child_age: childAge.trim(),
      preferred_time: preferredTime,
      message: message.trim().slice(0, 500),
      source: "form",
      status: "New",
      notes: "",
    });
    return { success: true };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to save appointment lead:", err);
    // Fail gracefully: the patient still gets the WhatsApp flow.
    return { success: true, fallback: true };
  }
}

/**
 * WhatsApp CTA capture → Appointments sheet (status "New", source "whatsapp").
 * A raw wa.me click can't tell us who clicked, so WhatsApp buttons first show
 * a small modal asking name + phone; this action saves that as a lead and the
 * client then opens WhatsApp. Always resolves — a failed save must never stop
 * the patient from reaching WhatsApp.
 */
export async function saveWhatsAppLeadAction(input: {
  name: string;
  phone: string;
  childAge?: string;
}): Promise<{ saved: boolean; error?: string }> {
  const name = (input.name || "").trim();
  const cleanPhone = (input.phone || "").replace(/[^0-9]/g, "");

  if (name.length < 2) {
    return { saved: false, error: "Please enter your name (minimum 2 characters)." };
  }
  if (!PHONE_REGEX.test(cleanPhone)) {
    return { saved: false, error: "Please enter a valid 10-digit mobile number starting with 6-9." };
  }

  try {
    await appendRow("Appointments", {
      name: name.slice(0, 100),
      phone: cleanPhone,
      child_age: (input.childAge || "").trim().slice(0, 100),
      preferred_time: "",
      message: "",
      source: "whatsapp",
      status: "New",
      notes: "",
    });
    return { saved: true };
  } catch (err) {
    console.error("[SHEETS ERROR] Failed to save WhatsApp lead:", err);
    return { saved: false };
  }
}
