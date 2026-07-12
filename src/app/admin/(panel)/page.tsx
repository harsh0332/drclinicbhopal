import { CalendarClock, Footprints, Syringe, AlertTriangle } from "lucide-react";
import { listRows } from "@/lib/sheets";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let appointmentsCount = 0;
  let appointmentsNewCount = 0;
  let walkInsCount = 0;
  let vaccinationsCount = 0;
  let loadError: string | null = null;

  try {
    const [appointments, walkIns, vaccinations] = await Promise.all([
      listRows("Appointments"),
      listRows("WalkIns"),
      listRows("Vaccinations"),
    ]);

    appointmentsCount = appointments.length;
    appointmentsNewCount = appointments.filter((a: any) => a.status === "New").length;
    walkInsCount = walkIns.length;
    
    // Vaccinations due = status is NOT "Given"
    vaccinationsCount = vaccinations.filter((v: any) => v.status !== "Given").length;
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load dashboard metrics.";
  }

  const CARDS = [
    {
      title: "Appointments",
      value: loadError ? "—" : `${appointmentsNewCount} New`,
      subtext: `Total: ${appointmentsCount} leads`,
      description: "Requests from the website booking form",
      icon: CalendarClock,
    },
    {
      title: "Walk-ins",
      value: loadError ? "—" : walkInsCount.toString(),
      subtext: "Total clinic registrations",
      description: "Patients registered directly at the clinic",
      icon: Footprints,
    },
    {
      title: "Vaccinations due",
      value: loadError ? "—" : vaccinationsCount.toString(),
      subtext: "Upcoming or overdue doses",
      description: "Pending doses for registered children",
      icon: Syringe,
    },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Live overview of Baby Steps Clinic activity.
        </p>
      </div>

      {loadError && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Could not load some dashboard metrics.</p>
            <p className="mt-1 text-amber-700">{loadError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{card.title}</span>
              <card.icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-semibold text-slate-900">{card.value}</span>
              <span className="text-xs text-slate-500 mt-0.5">{card.subtext}</span>
            </div>
            <span className="text-xs text-slate-400">{card.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">Live Google Sheets Sync</h3>
        <p className="text-sm text-slate-600">
          Your dashboard is actively connected to Google Sheets. All stats updates, new walk-ins, website form bookings, and vaccination marks are processed in real-time.
        </p>
      </div>
    </div>
  );
}

