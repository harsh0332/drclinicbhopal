// Shared appointment types/constants — safe for BOTH server and client code.
// Keep this file free of secrets and server-only imports: client components
// (e.g. the admin appointments table) import from here, never from sheets.ts.

export const APPOINTMENT_STATUSES = [
  "New",
  "Contacted",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export type AppointmentSource = "form" | "whatsapp";

export interface AppointmentRow {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  child_age: string;
  preferred_time: string;
  message: string;
  source: AppointmentSource | string;
  status: AppointmentStatus | string;
  notes: string;
}
