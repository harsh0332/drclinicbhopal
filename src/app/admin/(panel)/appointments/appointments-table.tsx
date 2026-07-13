"use client";

import { Fragment, useMemo, useState, useTransition } from "react";
import { updateAppointmentAction } from "../../actions";
import { APPOINTMENT_STATUSES, type AppointmentRow } from "@/lib/appointment-types";
import {
  Search,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Loader2,
  Inbox,
} from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-50 text-blue-700 border-blue-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Completed: "bg-slate-100 text-slate-600 border-slate-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

function formatCreated(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatPreferred(value: string): string {
  if (!value) return "—";
  // datetime-local format "2026-07-12T15:30" → readable
  const d = new Date(value);
  if (isNaN(d.getTime())) return value.replace("T", " ");
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isThisWeek(iso: string): boolean {
  const d = new Date(iso).getTime();
  if (isNaN(d)) return false;
  return Date.now() - d < 7 * 24 * 60 * 60 * 1000;
}

export default function AppointmentsTable({ initialRows }: { initialRows: AppointmentRow[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  const counts = useMemo(
    () => ({
      newCount: rows.filter((r) => r.status === "New").length,
      today: rows.filter((r) => isToday(r.created_at)).length,
      week: rows.filter((r) => isThisWeek(r.created_at)).length,
    }),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "All" && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        (r.name || "").toLowerCase().includes(q) || String(r.phone || "").includes(q)
      );
    });
  }, [rows, query, statusFilter]);

  const applyUpdate = (id: string, patch: { status?: string; notes?: string }) => {
    setError("");
    setSavingId(id);
    const previous = rows;
    // Optimistic update; reverted if the sheet write fails.
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    startTransition(async () => {
      const res = await updateAppointmentAction(id, patch);
      setSavingId(null);
      if (!res.ok) {
        setRows(previous);
        setError(res.error || "Update failed.");
      }
    });
  };

  const openNotes = (row: AppointmentRow) => {
    if (expandedId === row.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(row.id);
    setNoteDraft(row.notes || "");
  };

  const statusSelect = (row: AppointmentRow) => (
    <select
      value={row.status || "New"}
      disabled={savingId === row.id}
      onChange={(e) => applyUpdate(row.id, { status: e.target.value })}
      className={`text-xs font-medium border rounded-lg px-2 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-900/10 disabled:opacity-60 ${
        STATUS_STYLES[row.status] || STATUS_STYLES.New
      }`}
    >
      {APPOINTMENT_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );

  const contactLinks = (row: AppointmentRow) => (
    <span className="inline-flex items-center gap-1.5">
      <span className="tabular-nums">{row.phone}</span>
      <a
        href={`tel:+91${row.phone}`}
        title="Call"
        className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100"
      >
        <Phone className="w-3.5 h-3.5" />
      </a>
      <a
        href={`https://wa.me/91${row.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="p-1.5 rounded-md text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
      >
        <MessageSquare className="w-3.5 h-3.5" />
      </a>
    </span>
  );

  const notesEditor = (row: AppointmentRow) => (
    <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
      {row.message && (
        <p className="text-xs text-slate-600">
          <span className="font-medium text-slate-700">Patient message:</span> {row.message}
        </p>
      )}
      <textarea
        value={noteDraft}
        onChange={(e) => setNoteDraft(e.target.value)}
        rows={2}
        maxLength={1000}
        placeholder="Internal notes (visible to clinic staff only)"
        className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900/10 bg-white"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={savingId === row.id}
          onClick={() => {
            applyUpdate(row.id, { notes: noteDraft });
            setExpandedId(null);
          }}
          className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-60"
        >
          {savingId === row.id && <Loader2 className="w-3 h-3 animate-spin" />}
          Save notes
        </button>
        <button
          type="button"
          onClick={() => setExpandedId(null)}
          className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Count chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "New", value: counts.newCount },
          { label: "Today", value: counts.today },
          { label: "This week", value: counts.week },
        ].map((c) => (
          <div
            key={c.label}
            className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-baseline gap-2"
          >
            <span className="text-lg font-semibold text-slate-900">{c.value}</span>
            <span className="text-xs text-slate-500">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or phone…"
            className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
        >
          <option value="All">All statuses</option>
          {APPOINTMENT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            {rows.length === 0
              ? "No leads yet. Form submissions and WhatsApp captures will appear here."
              : "No leads match the current filter."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table — sticky header, zebra rows */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-auto max-h-[70vh]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_#e2e8f0]">
                <tr className="text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Child age</th>
                  <th className="px-4 py-3 font-medium">Preferred time</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <Fragment key={row.id}>
                    <tr className="border-b border-slate-100 last:border-0 odd:bg-white even:bg-slate-50/50 hover:bg-[#F4F8FF]">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                      <td className="px-4 py-3 text-slate-600">{contactLinks(row)}</td>
                      <td className="px-4 py-3 text-slate-600">{row.child_age || "—"}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {formatPreferred(row.preferred_time)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md ${
                            row.source === "whatsapp"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-indigo-50 text-indigo-700"
                          }`}
                        >
                          {row.source === "whatsapp" ? "WhatsApp" : "Form"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{statusSelect(row)}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {formatCreated(row.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => openNotes(row)}
                          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                        >
                          <span className="max-w-[120px] truncate">
                            {row.notes ? row.notes : "Add"}
                          </span>
                          {expandedId === row.id ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedId === row.id && (
                      <tr className="border-b border-slate-100 last:border-0">
                        <td colSpan={8} className="px-4 py-3">
                          {notesEditor(row)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {filtered.map((row) => (
              <div key={row.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900">{row.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{formatCreated(row.created_at)}</p>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md shrink-0 ${
                      row.source === "whatsapp"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-indigo-50 text-indigo-700"
                    }`}
                  >
                    {row.source === "whatsapp" ? "WhatsApp" : "Form"}
                  </span>
                </div>

                <div className="text-sm text-slate-600 flex flex-col gap-1">
                  <span>{contactLinks(row)}</span>
                  <span>
                    <span className="text-slate-400">Child:</span> {row.child_age || "—"}
                    <span className="text-slate-400 ml-3">Slot:</span>{" "}
                    {formatPreferred(row.preferred_time)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  {statusSelect(row)}
                  <button
                    type="button"
                    onClick={() => openNotes(row)}
                    className="text-xs text-slate-600 font-medium inline-flex items-center gap-1"
                  >
                    Notes
                    {expandedId === row.id ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {expandedId === row.id && notesEditor(row)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
