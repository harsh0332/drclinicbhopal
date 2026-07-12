// IAP / ACVIP 2025–26 immunization schedule — typed constant, client-safe.
//
// Ages are offsets from date of birth. Where the IAP gives a window, the
// clinic's chosen default is used (noted per entry) — the doctor adjusts
// individual due dates from the child's timeline as needed.
//
// This file is a scheduling GUIDE for generating reminder rows only; the
// on-screen disclaimer (VACCINE_DISCLAIMER) accompanies every rendering.

export interface IapEntry {
  vaccine: string;
  dose: string;
  /** Age label shown as the milestone group heading. */
  ageLabel: string;
  /** Offset from DOB: whole months plus extra days. */
  offset: { months: number; days: number };
  /** Prefilled into the row's notes column (brand caveats, windows, etc.). */
  note?: string;
  /**
   * Optional doses (endemic-area or doctor's-choice) are shown in the child's
   * timeline but EXCLUDED from the call list until the doctor engages them.
   */
  optional?: boolean;
}

const wk = (weeks: number) => ({ months: 0, days: weeks * 7 });
const mo = (months: number, days = 0) => ({ months, days });

export const IAP_SCHEDULE: IapEntry[] = [
  // Birth
  { vaccine: "BCG", dose: "Birth dose", ageLabel: "Birth", offset: mo(0) },
  { vaccine: "OPV", dose: "OPV-0", ageLabel: "Birth", offset: mo(0) },
  { vaccine: "Hepatitis B", dose: "Dose 1", ageLabel: "Birth", offset: mo(0) },

  // 6 weeks
  { vaccine: "DTwP/DTaP", dose: "Dose 1", ageLabel: "6 weeks", offset: wk(6) },
  { vaccine: "IPV", dose: "Dose 1", ageLabel: "6 weeks", offset: wk(6) },
  { vaccine: "Hib", dose: "Dose 1", ageLabel: "6 weeks", offset: wk(6) },
  { vaccine: "Hepatitis B", dose: "Dose 2", ageLabel: "6 weeks", offset: wk(6) },
  { vaccine: "Rotavirus", dose: "Dose 1", ageLabel: "6 weeks", offset: wk(6) },
  { vaccine: "PCV", dose: "Dose 1", ageLabel: "6 weeks", offset: wk(6) },

  // 10 weeks
  { vaccine: "DTwP/DTaP", dose: "Dose 2", ageLabel: "10 weeks", offset: wk(10) },
  { vaccine: "IPV", dose: "Dose 2", ageLabel: "10 weeks", offset: wk(10) },
  { vaccine: "Hib", dose: "Dose 2", ageLabel: "10 weeks", offset: wk(10) },
  { vaccine: "Rotavirus", dose: "Dose 2", ageLabel: "10 weeks", offset: wk(10) },
  { vaccine: "PCV", dose: "Dose 2", ageLabel: "10 weeks", offset: wk(10) },

  // 14 weeks
  { vaccine: "DTwP/DTaP", dose: "Dose 3", ageLabel: "14 weeks", offset: wk(14) },
  { vaccine: "IPV", dose: "Dose 3", ageLabel: "14 weeks", offset: wk(14) },
  { vaccine: "Hib", dose: "Dose 3", ageLabel: "14 weeks", offset: wk(14) },
  {
    vaccine: "Rotavirus",
    dose: "Dose 3",
    ageLabel: "14 weeks",
    offset: wk(14),
    note: "Only for 3-dose brands — skip if 2-dose brand; doctor to confirm.",
  },
  { vaccine: "PCV", dose: "Dose 3", ageLabel: "14 weeks", offset: wk(14) },

  // 6 months
  { vaccine: "Hepatitis B", dose: "Dose 3", ageLabel: "6 months", offset: mo(6) },
  { vaccine: "OPV", dose: "OPV-1", ageLabel: "6 months", offset: mo(6) },
  {
    vaccine: "Influenza",
    dose: "Dose 1",
    ageLabel: "6 months",
    offset: mo(6),
    note: "Then yearly, especially up to 5 years.",
  },

  // 7 months
  {
    vaccine: "Influenza",
    dose: "Dose 2",
    ageLabel: "7 months",
    offset: mo(7),
    note: "Then yearly, especially up to 5 years.",
  },

  // 9 months
  {
    vaccine: "Typhoid Conjugate (TCV)",
    dose: "Single dose",
    ageLabel: "9 months",
    offset: mo(9),
    note: "IAP window 6–9 months; 9 months used as default.",
  },
  { vaccine: "MMR", dose: "Dose 1", ageLabel: "9 months", offset: mo(9) },
  { vaccine: "OPV", dose: "OPV-2", ageLabel: "9 months", offset: mo(9) },
  {
    vaccine: "JE",
    dose: "Dose 1",
    ageLabel: "9 months",
    offset: mo(9),
    note: "Endemic areas only — doctor to confirm.",
    optional: true,
  },

  // 12 months
  { vaccine: "Hepatitis A", dose: "Dose 1", ageLabel: "12 months", offset: mo(12) },
  {
    vaccine: "PCV",
    dose: "Booster",
    ageLabel: "12 months",
    offset: mo(12),
    note: "IAP window 12–15 months; 12 months used as default.",
  },

  // 15 months
  { vaccine: "MMR", dose: "Dose 2", ageLabel: "15 months", offset: mo(15) },
  { vaccine: "Varicella", dose: "Dose 1", ageLabel: "15 months", offset: mo(15) },

  // 18 months
  {
    vaccine: "DTwP/DTaP",
    dose: "Booster 1",
    ageLabel: "18 months",
    offset: mo(18),
    note: "IAP window 16–18 months; 18 months used as default.",
  },
  {
    vaccine: "IPV",
    dose: "Booster 1",
    ageLabel: "18 months",
    offset: mo(18),
    note: "IAP window 16–18 months; 18 months used as default.",
  },
  {
    vaccine: "Hib",
    dose: "Booster",
    ageLabel: "18 months",
    offset: mo(18),
    note: "IAP window 16–18 months; 18 months used as default.",
  },
  {
    vaccine: "Hepatitis A",
    dose: "Dose 2",
    ageLabel: "18 months",
    offset: mo(18),
    note: "IAP window 18–19 months; 18 months used as default.",
  },

  // 2 years
  {
    vaccine: "Typhoid",
    dose: "Booster",
    ageLabel: "2 years",
    offset: mo(24),
    note: "Per brand guidance — doctor to confirm.",
  },

  // 4–6 years (default 5 years)
  {
    vaccine: "DTwP/DTaP",
    dose: "Booster 2",
    ageLabel: "5 years",
    offset: mo(60),
    note: "IAP window 4–6 years; 5 years used as default.",
  },
  { vaccine: "OPV", dose: "OPV-3", ageLabel: "5 years", offset: mo(60) },
  { vaccine: "Varicella", dose: "Dose 2", ageLabel: "5 years", offset: mo(60) },
  {
    vaccine: "MMR",
    dose: "Dose 3",
    ageLabel: "5 years",
    offset: mo(60),
    note: "Optional — doctor to confirm.",
    optional: true,
  },

  // 9–14 years (default 10 years)
  {
    vaccine: "HPV",
    dose: "Dose 1",
    ageLabel: "10 years",
    offset: mo(120),
    note: "2-dose schedule at 9–14 years (girls and boys); 10 years used as default.",
  },
  {
    vaccine: "HPV",
    dose: "Dose 2",
    ageLabel: "10 years + 6 months",
    offset: mo(126),
    note: "6 months after HPV dose 1.",
  },
  {
    vaccine: "Tdap",
    dose: "Booster",
    ageLabel: "10 years",
    offset: mo(120),
    note: "IAP window 10–12 years; 10 years used as default.",
  },

  // 16–18 years (default 16 years)
  {
    vaccine: "Td",
    dose: "Booster",
    ageLabel: "16 years",
    offset: mo(192),
    note: "IAP window 16–18 years; 16 years used as default.",
  },
];

/** Add calendar months (day-clamped, e.g. 31 Jan + 1mo = 28/29 Feb) then days. */
function addOffset(dobISO: string, offset: { months: number; days: number }): string {
  const [y, m, d] = dobISO.split("-").map(Number);
  // Compute target month, clamp the day to the target month's length.
  const totalMonths = m - 1 + offset.months;
  const targetYear = y + Math.floor(totalMonths / 12);
  const targetMonth = totalMonths % 12;
  const daysInTarget = new Date(targetYear, targetMonth + 1, 0).getDate();
  const date = new Date(targetYear, targetMonth, Math.min(d, daysInTarget));
  date.setDate(date.getDate() + offset.days);
  return date.toLocaleDateString("en-CA");
}

export interface GeneratedDose {
  vaccine: string;
  dose: string;
  due_date: string;
  notes: string;
  optional: boolean;
}

/** Generate the full IAP dose list for a child, due dates from their DOB. */
export function generateScheduleForDob(dobISO: string): GeneratedDose[] {
  return IAP_SCHEDULE.map((entry) => ({
    vaccine: entry.vaccine,
    dose: entry.dose,
    due_date: addOffset(dobISO, entry.offset),
    notes: entry.note ? (entry.optional ? `Optional — ${entry.note}` : entry.note) : "",
    optional: entry.optional === true,
  }));
}

/** Look up the milestone age label for a generated row (vaccine + dose). */
export function ageLabelFor(vaccine: string, dose: string): string | undefined {
  return IAP_SCHEDULE.find((e) => e.vaccine === vaccine && e.dose === dose)?.ageLabel;
}

/** True if a stored row is an optional dose (kept out of the call list). */
export function isOptionalDose(row: { vaccine: string; dose: string }): boolean {
  return IAP_SCHEDULE.some((e) => e.vaccine === row.vaccine && e.dose === row.dose && e.optional === true);
}
