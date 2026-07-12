import { listRows } from "@/lib/sheets";
import type { WalkInRow } from "@/lib/walkin-types";
import WalkInsView from "./walkins-view";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminWalkInsPage() {
  let rows: WalkInRow[] = [];
  let loadError: string | null = null;

  try {
    rows = await listRows("WalkIns");
    // Newest first
    rows.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load walk-ins.";
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Walk-ins</h1>
        <p className="text-sm text-slate-500 mt-1">
          The clinic register — record walk-in patients here instead of on paper.
        </p>
      </div>

      {loadError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Could not load the WalkIns sheet.</p>
            <p className="mt-1 text-amber-700">{loadError}</p>
            <p className="mt-2 text-amber-700">
              If you haven&apos;t deployed the Google Apps Script yet, follow the steps in the
              README (&quot;Admin Panel &amp; Google Sheets Backend&quot;) and set{" "}
              <code className="bg-amber-100 px-1 rounded">SHEETS_WEBAPP_URL</code> in .env.local.
            </p>
          </div>
        </div>
      ) : (
        <WalkInsView initialRows={rows} />
      )}
    </div>
  );
}
