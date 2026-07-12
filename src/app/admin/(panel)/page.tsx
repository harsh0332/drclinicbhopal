import { CalendarClock, Footprints, Syringe } from "lucide-react";

// Placeholder metric cards — real counts get wired to the Sheets backend in
// later phases.
const CARDS = [
  {
    title: "Appointments",
    description: "Requests from the website booking form",
    icon: CalendarClock,
  },
  {
    title: "Walk-ins",
    description: "Patients registered at the clinic",
    icon: Footprints,
  },
  {
    title: "Vaccinations due",
    description: "Upcoming and overdue doses",
    icon: Syringe,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of clinic activity. Data will appear here once the modules are connected.
        </p>
      </div>

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
            <span className="text-3xl font-semibold text-slate-300">—</span>
            <span className="text-xs text-slate-400">{card.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl border border-dashed border-slate-300 p-6 text-center">
        <p className="text-sm text-slate-500">
          Phase 1 foundation is live. Appointments, walk-ins and vaccination tracking connect to
          the Google Sheets backend in the next phases.
        </p>
      </div>
    </div>
  );
}
