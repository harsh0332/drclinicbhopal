import Link from "next/link";
import {
  CalendarClock,
  Footprints,
  Syringe,
  Users,
  AlertTriangle,
  Plus,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { listRows } from "@/lib/sheets";
import { daysUntilDue } from "@/lib/vaccination-types";
import { isOptionalDose } from "@/lib/iap-schedule";
import type { AppointmentRow } from "@/lib/appointment-types";

export const dynamic = "force-dynamic";

/** Clinic-local "today" (IST) so counts stay correct on UTC servers too. */
function todayIST(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

const STATUS_BADGE: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

function formatWhen(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function AdminDashboardPage() {
  let newAppointments = 0;
  let walkInsToday = 0;
  let vaccinationsDue = 0;
  let totalChildren = 0;
  let recent: AppointmentRow[] = [];
  let loadError: string | null = null;

  try {
    const [appointments, walkIns, vaccinations, children] = await Promise.all([
      listRows("Appointments"),
      listRows("WalkIns"),
      listRows("Vaccinations"),
      listRows("Children"),
    ]);

    const today = todayIST();

    newAppointments = appointments.filter((a) => a.status === "New").length;
    walkInsToday = walkIns.filter((w) => w.visit_date === today).length;
    // Due = not given, not an optional dose, overdue or due within 7 days —
    // computed from dates (same rule as the vaccinations call list).
    vaccinationsDue = vaccinations.filter(
      (v) => !v.given_date && v.due_date && !isOptionalDose(v) && daysUntilDue(v.due_date, today) <= 7
    ).length;
    totalChildren = children.length;

    recent = [...appointments]
      .sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""))
      .slice(0, 5);
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load dashboard metrics.";
  }

  // Soft brand accents: primary / mint / sunshine / coral
  const CARDS = [
    {
      title: "New appointments",
      value: newAppointments,
      description: "Website & WhatsApp leads to contact",
      href: "/admin/appointments",
      icon: CalendarClock,
      border: "border-l-[#2E6CF6]",
      chip: "bg-[#2E6CF6]/10 text-[#2E6CF6]",
    },
    {
      title: "Walk-ins today",
      value: walkInsToday,
      description: "Patients registered today",
      href: "/admin/walkins",
      icon: Footprints,
      border: "border-l-[#34C7A4]",
      chip: "bg-[#34C7A4]/12 text-[#1d9478]",
    },
    {
      title: "Vaccinations due (7 days)",
      value: vaccinationsDue,
      description: "Overdue or due this week — call list",
      href: "/admin/vaccinations",
      icon: Syringe,
      border: "border-l-[#FFC53D]",
      chip: "bg-[#FFC53D]/18 text-[#b07b00]",
    },
    {
      title: "Total children",
      value: totalChildren,
      description: "Registered in the vaccine tracker",
      href: "/admin/vaccinations",
      icon: Users,
      border: "border-l-[#FF8A7A]",
      chip: "bg-[#FF8A7A]/15 text-[#d95f4e]",
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Live overview of Baby Steps Clinic activity.</p>
      </div>

      {loadError && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Could not load dashboard metrics.</p>
            <p className="mt-1 text-amber-700">{loadError}</p>
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`bg-white rounded-xl border border-slate-200 border-l-4 ${card.border} p-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13px] font-medium text-slate-600">{card.title}</span>
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${card.chip}`}>
                <card.icon className="w-4.5 h-4.5" />
              </span>
            </div>
            <span className="text-3xl font-semibold text-slate-900 tabular-nums">
              {loadError ? "—" : card.value}
            </span>
            <span className="text-xs text-slate-400">{card.description}</span>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/walkins"
          className="inline-flex items-center gap-2 bg-[#2E6CF6] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#1f57d6] transition-colors min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          Add walk-in
        </Link>
        <Link
          href="/admin/vaccinations"
          className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-50 transition-colors min-h-[44px]"
        >
          <Syringe className="w-4 h-4 text-[#b07b00]" />
          View due vaccinations
        </Link>
      </div>

      {/* Recent activity */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Recent appointment leads</h3>
          <Link
            href="/admin/appointments"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2E6CF6] hover:underline"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="px-5 py-8 text-sm text-slate-500 text-center">
            No appointment leads yet — website bookings will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((a) => (
              <li key={a.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/70">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{a.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {a.phone} · {formatWhen(a.created_at)}
                  </p>
                </div>
                <span
                  className={`hidden sm:inline text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md ${
                    a.source === "whatsapp" ? "bg-emerald-50 text-emerald-700" : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {a.source === "whatsapp" ? "WhatsApp" : "Form"}
                </span>
                <span
                  className={`text-[11px] font-semibold border rounded-md px-2 py-0.5 shrink-0 ${
                    STATUS_BADGE[a.status] || STATUS_BADGE.New
                  }`}
                >
                  {a.status || "New"}
                </span>
                {a.phone && (
                  <a
                    href={`https://wa.me/91${a.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="p-2 rounded-md text-emerald-600 hover:bg-emerald-50 shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
