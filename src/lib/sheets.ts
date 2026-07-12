// Server-only client for the Google Sheets backend (Apps Script Web App).
// NEVER import this from a client component — it holds the shared secret.

if (typeof window !== "undefined") {
  throw new Error("src/lib/sheets.ts is server-only and must never reach the client bundle.");
}

export type TabName = "Appointments" | "WalkIns" | "Children" | "Vaccinations";

export interface BaseRow {
  id: string;
  created_at: string;
}

export interface AppointmentRow extends BaseRow {
  name: string;
  phone: string;
  child_age: string;
  preferred_time: string;
  status: string;
  notes: string;
}

export interface WalkInRow extends BaseRow {
  name: string;
  phone: string;
  child_age: string;
  reason: string;
  doctor: string;
  status: string;
  notes: string;
}

export interface ChildRow extends BaseRow {
  child_name: string;
  dob: string;
  gender: string;
  parent_name: string;
  phone: string;
  notes: string;
}

export interface VaccinationRow extends BaseRow {
  child_id: string;
  child_name: string;
  vaccine: string;
  due_date: string;
  given_date: string;
  status: string;
}

interface TabRowMap {
  Appointments: AppointmentRow;
  WalkIns: WalkInRow;
  Children: ChildRow;
  Vaccinations: VaccinationRow;
}

/** Data for a new row: everything except the server-generated id/created_at. */
export type NewRow<T extends TabName> = Partial<Omit<TabRowMap[T], "id" | "created_at">>;

/** Patch for an existing row: any subset of its editable columns. */
export type RowPatch<T extends TabName> = Partial<Omit<TabRowMap[T], "id" | "created_at">>;

interface SheetsResponse {
  ok: boolean;
  error?: string;
  rows?: unknown[];
  id?: string;
  pong?: boolean;
}

async function callSheets(payload: Record<string, unknown>): Promise<SheetsResponse> {
  const url = process.env.SHEETS_WEBAPP_URL;
  const secret = process.env.SHEETS_SECRET;

  if (!url || !secret) {
    throw new Error(
      "Sheets backend not configured: set SHEETS_WEBAPP_URL and SHEETS_SECRET in .env.local"
    );
  }

  const res = await fetch(url, {
    method: "POST",
    // Apps Script replies via a 302 to script.googleusercontent.com; fetch
    // follows it by default. text/plain avoids a CORS preflight rejection.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, secret }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Sheets backend HTTP error: ${res.status} ${res.statusText}`);
  }

  let data: SheetsResponse;
  try {
    data = (await res.json()) as SheetsResponse;
  } catch {
    throw new Error("Sheets backend returned non-JSON. Check the Web App deployment URL (must end in /exec).");
  }

  if (!data.ok) {
    throw new Error(`Sheets backend error: ${data.error || "unknown"}`);
  }
  return data;
}

/** Read all rows of a tab. */
export async function listRows<T extends TabName>(tab: T): Promise<TabRowMap[T][]> {
  const data = await callSheets({ action: "list", tab });
  return (data.rows || []) as TabRowMap[T][];
}

/** Append one row; returns the generated row id. */
export async function appendRow<T extends TabName>(tab: T, row: NewRow<T>): Promise<string> {
  const data = await callSheets({ action: "append", tab, row });
  if (!data.id) throw new Error("Sheets backend did not return an id for the appended row.");
  return data.id;
}

/** Update columns of an existing row identified by id. */
export async function updateRow<T extends TabName>(
  tab: T,
  id: string,
  patch: RowPatch<T>
): Promise<void> {
  await callSheets({ action: "update", tab, id, patch });
}

/** Health check — true if the Web App is reachable and the secret matches. */
export async function pingSheets(): Promise<boolean> {
  try {
    const data = await callSheets({ action: "ping" });
    return data.pong === true;
  } catch {
    return false;
  }
}
