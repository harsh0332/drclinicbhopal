// Shared walk-in types/constants — safe for BOTH server and client code.
// Keep this file free of secrets and server-only imports: client components
// (e.g. the admin walk-ins table) import from here, never from sheets.ts.

export const WALKIN_GENDERS = ["Male", "Female", "Other"] as const;
export type WalkInGender = (typeof WALKIN_GENDERS)[number];

export interface WalkInRow {
  id: string;
  created_at: string;
  patient_name: string;
  phone: string;
  child_name: string;
  child_age: string;
  gender: WalkInGender | string;
  reason: string;
  visit_date: string; // YYYY-MM-DD
}

/** Editable fields of a walk-in (everything except id/created_at). */
export type WalkInFields = Omit<WalkInRow, "id" | "created_at">;
