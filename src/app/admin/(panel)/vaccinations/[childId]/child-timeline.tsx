"use client";

import { useMemo, useState } from "react";
import { markVaccineGivenAction, updateVaccinationAction } from "../../../actions";
import {
  computeVaccStatus,
  type ChildRow,
  type VaccinationRow,
  type VaccStatus,
} from "@/lib/vaccination-types";
import { ageLabelFor, isOptionalDose } from "@/lib/iap-schedule";
import { Disclaimer } from "../vaccinations-view";
import { Phone, MessageSquare, Loader2, Check, Undo2, Pencil, Syringe } from "lucide-react";

const DUE_SOON_WINDOW = 7;

function todayISO(): string {
  return new Date().toLocaleDateString("en-CA");
}

function formatDate(value: string): string {
  if (!value) return "—";
  const d = new Date(`${value}T00:00`);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function ageFromDob(dobISO: string): string {
  const dob = new Date(`${dobISO}T00:00`);
  if (isNaN(dob.getTime())) return "";
  const now = new Date();
  let months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  if (now.getDate() < dob.getDate()) months -= 1;
  if (months < 0) return "";
  if (months < 24) return `${months} months`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} yr ${rem} mo` : `${years} years`;
}

const STATUS_STYLES: Record<VaccStatus, string> = {
  Given: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
  "Due soon": "bg-amber-50 text-amber-700 border-amber-200",
  Upcoming: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function ChildTimeline({
  child,
  initialDoses,
}: {
  child: ChildRow;
  initialDoses: VaccinationRow[];
}) {
  const [doses, setDoses] = useState(initialDoses);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [givenDateDraft, setGivenDateDraft] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ due_date: string; notes: string }>({
    due_date: "",
    notes: "",
  });

  const today = todayISO();

  // Group doses by milestone (same due_date), keeping chronological order.
  const groups = useMemo(() => {
    const byDate = new Map<string, VaccinationRow[]>();
    doses.forEach((d) => {
      const key = d.due_date || "unknown";
      if (!byDate.has(key)) byDate.set(key, []);
      byDate.get(key)!.push(d);
    });
    return Array.from(byDate.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [doses]);

  const givenCount = doses.filter((d) => d.given_date).length;

  const patchLocal = (id: string, patch: Partial<VaccinationRow>) =>
    setDoses((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const markGiven = async (row: VaccinationRow, undo: boolean) => {
    setError("");
    setBusyId(row.id);
    const previous = doses;
    const date = undo ? "" : givenDateDraft[row.id] || today;
    patchLocal(row.id, { given_date: date, status: undo ? "Upcoming" : "Given" });

    const res = await markVaccineGivenAction(row.id, undo ? null : date);
    setBusyId(null);
    if (!res.ok) {
      setDoses(previous);
      setError(res.error || "Update failed.");
    }
  };

  const saveEdit = async (row: VaccinationRow) => {
    setError("");
    setBusyId(row.id);
    const previous = doses;
    patchLocal(row.id, { due_date: editDraft.due_date, notes: editDraft.notes });
    const res = await updateVaccinationAction(row.id, editDraft);
    setBusyId(null);
    if (!res.ok) {
      setDoses(previous);
      setError(res.error || "Update failed.");
      return;
    }
    setEditingId(null);
    // Re-sort after a due-date change
    setDoses((ds) => [...ds].sort((a, b) => (a.due_date || "").localeCompare(b.due_date || "")));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Child header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">{child.child_name}</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {ageFromDob(child.dob)} · DOB {formatDate(child.dob)}
              {child.gender ? ` · ${child.gender}` : ""}
            </p>
            <p className="text-sm text-slate-600 mt-1.5">
              {child.parent_name}
              <span className="text-slate-400"> · </span>
              <span className="tabular-nums">{child.phone}</span>
            </p>
            {child.notes && <p className="text-xs text-slate-500 mt-1">Note: {child.notes}</p>}
          </div>
          <div className="flex gap-2">
            <a
              href={`tel:+91${child.phone}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <a
              href={`https://wa.me/91${child.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium border border-emerald-300 rounded-lg px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
          <Syringe className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
          {givenCount} of {doses.length} doses given
        </p>
      </div>

      <Disclaimer />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Timeline */}
      <div className="flex flex-col gap-4">
        {groups.map(([date, rows]) => {
          const milestone = ageLabelFor(rows[0].vaccine, rows[0].dose);
          return (
            <div key={date} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-800">{milestone || "—"}</span>
                <span className="text-xs text-slate-500">due {formatDate(date)}</span>
              </div>
              <div className="divide-y divide-slate-100">
                {rows.map((row) => {
                  const status = computeVaccStatus(row, today, DUE_SOON_WINDOW);
                  const optional = isOptionalDose(row);
                  return (
                    <div key={row.id} className="px-4 py-3 flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{row.vaccine}</span>
                        <span className="text-xs text-slate-500">{row.dose}</span>
                        <span
                          className={`text-[11px] font-semibold border rounded-md px-2 py-0.5 ${STATUS_STYLES[status]}`}
                        >
                          {status}
                          {status === "Given" && row.given_date ? ` · ${formatDate(row.given_date)}` : ""}
                        </span>
                        {optional && (
                          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5">
                            Optional
                          </span>
                        )}

                        <span className="flex-1" />

                        {status === "Given" ? (
                          <button
                            type="button"
                            disabled={busyId === row.id}
                            onClick={() => markGiven(row, true)}
                            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 disabled:opacity-50"
                          >
                            {busyId === row.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Undo2 className="w-3.5 h-3.5" />
                            )}
                            Undo
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <input
                              type="date"
                              max={today}
                              value={givenDateDraft[row.id] || today}
                              onChange={(e) =>
                                setGivenDateDraft((d) => ({ ...d, [row.id]: e.target.value }))
                              }
                              aria-label="Given date"
                              className="border border-slate-300 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                            />
                            <button
                              type="button"
                              disabled={busyId === row.id}
                              onClick={() => markGiven(row, false)}
                              className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-emerald-700 disabled:opacity-60"
                            >
                              {busyId === row.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                              Mark given
                            </button>
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (editingId === row.id) {
                              setEditingId(null);
                            } else {
                              setEditingId(row.id);
                              setEditDraft({ due_date: row.due_date, notes: row.notes || "" });
                            }
                          }}
                          aria-label="Edit dose"
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {row.notes && editingId !== row.id && (
                        <p className="text-xs text-slate-500">{row.notes}</p>
                      )}

                      {editingId === row.id && (
                        <div className="flex flex-col sm:flex-row gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <label className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
                            Due date
                            <input
                              type="date"
                              value={editDraft.due_date}
                              onChange={(e) =>
                                setEditDraft((d) => ({ ...d, due_date: e.target.value }))
                              }
                              className="border border-slate-300 rounded-lg px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                            />
                          </label>
                          <input
                            type="text"
                            value={editDraft.notes}
                            onChange={(e) => setEditDraft((d) => ({ ...d, notes: e.target.value }))}
                            placeholder="Notes (brand, adjustment reason…)"
                            maxLength={500}
                            className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={busyId === row.id}
                              onClick={() => saveEdit(row)}
                              className="inline-flex items-center gap-1 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-60"
                            >
                              {busyId === row.id && <Loader2 className="w-3 h-3 animate-spin" />}
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="text-xs text-slate-500 hover:text-slate-800 px-2"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
