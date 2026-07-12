import { listRows } from "@/lib/sheets";
import type { ChildRow, VaccinationRow } from "@/lib/vaccination-types";
import VaccinationsView from "./vaccinations-view";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminVaccinationsPage() {
  let children: ChildRow[] = [];
  let vaccinations: VaccinationRow[] = [];
  let loadError: string | null = null;

  try {
    [children, vaccinations] = await Promise.all([listRows("Children"), listRows("Vaccinations")]);
    children.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load vaccination data.";
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Vaccinations</h1>
        <p className="text-sm text-slate-500 mt-1">
          IAP schedule tracking — register children, follow their timelines, and call parents when
          a dose is due.
        </p>
      </div>

      {loadError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Could not load the Children/Vaccinations sheets.</p>
            <p className="mt-1 text-amber-700">{loadError}</p>
            <p className="mt-2 text-amber-700">
              If you haven&apos;t deployed the Google Apps Script yet, follow the steps in the
              README (&quot;Admin Panel &amp; Google Sheets Backend&quot;) and set{" "}
              <code className="bg-amber-100 px-1 rounded">SHEETS_WEBAPP_URL</code> in .env.local.
            </p>
          </div>
        </div>
      ) : (
        <VaccinationsView initialChildren={children} initialVaccinations={vaccinations} />
      )}
    </div>
  );
}
