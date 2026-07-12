import Link from "next/link";
import { listRows } from "@/lib/sheets";
import type { ChildRow, VaccinationRow } from "@/lib/vaccination-types";
import ChildTimeline from "./child-timeline";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ChildVaccinationPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = await params;

  let child: ChildRow | undefined;
  let doses: VaccinationRow[] = [];
  let loadError: string | null = null;

  try {
    const [children, vaccinations] = await Promise.all([
      listRows("Children"),
      listRows("Vaccinations"),
    ]);
    child = children.find((c) => c.id === childId);
    doses = vaccinations
      .filter((v) => v.child_id === childId)
      .sort((a, b) => (a.due_date || "").localeCompare(b.due_date || ""));
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load vaccination data.";
  }

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/vaccinations"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        All vaccinations
      </Link>

      {loadError ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">{loadError}</p>
        </div>
      ) : !child ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <p className="text-sm text-slate-500">Child not found.</p>
        </div>
      ) : (
        <ChildTimeline child={child} initialDoses={doses} />
      )}
    </div>
  );
}
