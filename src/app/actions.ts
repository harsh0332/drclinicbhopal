"use server";

import { supabase } from "@/lib/supabase";

export interface BookingState {
  success: boolean;
  error?: string;
  fallback?: boolean;
}

export async function bookAppointmentAction(formData: FormData): Promise<BookingState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const childAge = formData.get("childAge") as string;
  const preferredTime = formData.get("preferredTime") as string;

  // 1. Server-side validations
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Please enter a valid parent name (minimum 2 characters)." };
  }

  // Validate Indian mobile numbers (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
  if (!phoneRegex.test(cleanPhone)) {
    return { success: false, error: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)." };
  }

  if (!childAge || childAge.trim().length === 0) {
    return { success: false, error: "Please specify your child's age or Date of Birth." };
  }

  if (!preferredTime) {
    return { success: false, error: "Please select a preferred date and time." };
  }

  // 2. Check for missing Supabase environment credentials
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[SUPABASE WARNING] Supabase environment variables are not connected. Gracefully falling back to visual success + WhatsApp booking flow."
    );
    // Return success: true with fallback: true so the frontend shows success + triggers WhatsApp
    return { success: true, fallback: true };
  }

  // 3. Write to Supabase database
  try {
    const { error } = await supabase.from("appointments").insert([
      {
        name: name.trim(),
        phone: cleanPhone,
        child_age: childAge.trim(),
        preferred_time: preferredTime,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error("[SUPABASE ERROR] Database insertion failed:", error.message);
      // Fail gracefully: show success with fallback to ensure the patient doesn't get blocked
      return { success: true, fallback: true };
    }

    return { success: true };
  } catch (err) {
    console.error("[SERVER ACTION ERROR] Exception during booking:", err);
    return { success: true, fallback: true };
  }
}
