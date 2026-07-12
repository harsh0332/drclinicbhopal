"use client";

import { Fragment, useMemo, useState } from "react";
import { addWalkInAction, updateWalkInAction } from "../../actions";
import { WALKIN_GENDERS, type WalkInFields, type WalkInRow } from "@/lib/walkin-types";
import {
  Search,
  Phone,
  MessageSquare,
  Loader2,
  Inbox,
  Plus,
  Pencil,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const PAGE_SIZE = 20;

function todayISO(): string {
  // en-CA formats as YYYY-MM-DD in the machine's local timezone
  return new Date().toLocaleDateString("en-CA");
}

function emptyForm(): WalkInFields {
  return {
    patient_name: "",
    phone: "",
    child_name: "",
    child_age: "",
    gender: "",
    reason: "",
    visit_date: todayISO(),
  };
}

function formatVisitDate(value: string): string {
  if (!value) return "—";
  const d = new Date(`${value}T00:00`);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function isWithinDays(dateISO: string, days: number): boolean {
  const d = new Date(`${dateISO}T00:00`).getTime();
  if (isNaN(d)) return false;
  return Date.now() - d < days * 24 * 60 * 60 * 1000 && d <= Date.now();
}

const inputClass =
  "border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 disabled:bg-slate-50 w-full";

export default function WalkInsView({ initialRows }: { initialRows: WalkInRow[] }) {
  const [rows, setRows] = useState(initialRows);

  // Add form state
  const [form, setForm] = useState<WalkInFields>(emptyForm);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [addedFlash, setAddedFlash] = useState(false);

  // Table state
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<WalkInFields>(emptyForm);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editError, setEditError] = useState("");

  const counts = useMemo(
    () => ({
      today: rows.filter((r) => r.visit_date === todayISO()).length,
      week: rows.filter((r) => isWithinDays(r.visit_date, 7)).length,
      total: rows.length,
    }),
    [rows]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (dateFilter && r.visit_date !== dateFilter) return false;
      if (!q) return true;
      return (
        (r.patient_name || "").toLowerCase().includes(q) ||
        (r.child_name || "").toLowerCase().includes(q) ||
        String(r.phone || "").includes(q)
      );
    });
  }, [rows, query, dateFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const setField = (patch: Partial<WalkInFields>) => setForm((f) => ({ ...f, ...patch }));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);
    const res = await addWalkInAction(form);
    setAdding(false);

    if (!res.ok || !res.id) {
      setAddError(res.error || "Could not save. Please try again.");
      return;
    }

    const newRow: WalkInRow = {
      id: res.id,
      created_at: new Date().toISOString(),
      ...form,
      phone: form.phone.replace(/[^0-9]/g, ""),
    };
    setRows((rs) => [newRow, ...rs]);
    setForm(emptyForm());
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 2500);
  };

  const startEdit = (row: WalkInRow) => {
    setEditingId(row.id);
    setEditError("");
    setEditDraft({
      patient_name: row.patient_name || "",
      phone: row.phone || "",
      child_name: row.child_name || "",
      child_age: row.child_age || "",
      gender: row.gender || "",
      reason: row.reason || "",
      visit_date: row.visit_date || todayISO(),
    });
  };

  const saveEdit = async (id: string) => {
    setEditError("");
    setSavingId(id);
    const previous = rows;
    // Optimistic update; reverted if the sheet write fails.
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, ...editDraft, phone: editDraft.phone.replace(/[^0-9]/g, "") } : r))
    );
    const res = await updateWalkInAction(id, editDraft);
    setSavingId(null);
    if (!res.ok) {
      setRows(previous);
      setEditError(res.error || "Update failed.");
      return;
    }
    setEditingId(null);
  };

  const contactLinks = (row: WalkInRow) => (
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

  const editFields = (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input
        type="text"
        value={editDraft.patient_name}
        onChange={(e) => setEditDraft((d) => ({ ...d, patient_name: e.target.value }))}
        placeholder="Patient / parent name *"
        aria-label="Patient or parent name"
        className={inputClass}
      />
      <input
        type="tel"
        value={editDraft.phone}
        onChange={(e) => setEditDraft((d) => ({ ...d, phone: e.target.value }))}
        placeholder="10-digit mobile *"
        aria-label="Mobile number"
        className={inputClass}
      />
      <input
        type="text"
        value={editDraft.child_name}
        onChange={(e) => setEditDraft((d) => ({ ...d, child_name: e.target.value }))}
        placeholder="Child's name"
        aria-label="Child's name"
        className={inputClass}
      />
      <input
        type="text"
        value={editDraft.child_age}
        onChange={(e) => setEditDraft((d) => ({ ...d, child_age: e.target.value }))}
        placeholder="Child's age"
        aria-label="Child's age"
        className={inputClass}
      />
      <select
        value={editDraft.gender}
        onChange={(e) => setEditDraft((d) => ({ ...d, gender: e.target.value }))}
        aria-label="Gender"
        className={inputClass}
      >
        <option value="">Gender…</option>
        {WALKIN_GENDERS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={editDraft.visit_date}
        onChange={(e) => setEditDraft((d) => ({ ...d, visit_date: e.target.value }))}
        aria-label="Visit date"
        className={inputClass}
      />
      <textarea
        value={editDraft.reason}
        onChange={(e) => setEditDraft((d) => ({ ...d, reason: e.target.value }))}
        placeholder="Reason for visit / notes"
        aria-label="Reason for visit"
        rows={2}
        maxLength={500}
        className={`${inputClass} sm:col-span-2 resize-none`}
      />
    </div>
  );

  const editPanel = (row: WalkInRow) => (
    <div className="flex flex-col gap-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
      {editError && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{editError}</p>
      )}
      {editFields}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={savingId === row.id}
          onClick={() => saveEdit(row.id)}
          className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-700 disabled:opacity-60"
        >
          {savingId === row.id && <Loader2 className="w-3 h-3 animate-spin" />}
          Save changes
        </button>
        <button
          type="button"
          onClick={() => setEditingId(null)}
          className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Quick add form — replaces the paper register entry */}
      <form onSubmit={handleAdd} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add walk-in
          </h2>
          {addedFlash && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1">
              Saved to register ✓
            </span>
          )}
        </div>

        {addError && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{addError}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <input
            type="text"
            required
            disabled={adding}
            value={form.patient_name}
            onChange={(e) => setField({ patient_name: e.target.value })}
            placeholder="Patient / parent name *"
            aria-label="Patient or parent name"
            className={inputClass}
          />
          <input
            type="tel"
            required
            disabled={adding}
            value={form.phone}
            onChange={(e) => setField({ phone: e.target.value })}
            placeholder="10-digit mobile *"
            aria-label="Mobile number"
            className={inputClass}
          />
          <input
            type="date"
            required
            disabled={adding}
            value={form.visit_date}
            onChange={(e) => setField({ visit_date: e.target.value })}
            aria-label="Visit date"
            className={inputClass}
          />
          <input
            type="text"
            disabled={adding}
            value={form.child_name}
            onChange={(e) => setField({ child_name: e.target.value })}
            placeholder="Child's name"
            aria-label="Child's name"
            className={inputClass}
          />
          <input
            type="text"
            disabled={adding}
            value={form.child_age}
            onChange={(e) => setField({ child_age: e.target.value })}
            placeholder="Child's age (e.g. 8 months)"
            aria-label="Child's age"
            className={inputClass}
          />
          <select
            disabled={adding}
            value={form.gender}
            onChange={(e) => setField({ gender: e.target.value })}
            aria-label="Gender"
            className={inputClass}
          >
            <option value="">Gender…</option>
            {WALKIN_GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <textarea
            disabled={adding}
            value={form.reason}
            onChange={(e) => setField({ reason: e.target.value })}
            placeholder="Reason for visit / notes"
            aria-label="Reason for visit"
            rows={2}
            maxLength={500}
            className={`${inputClass} sm:col-span-2 lg:col-span-3 resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={adding}
          className="self-start inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-700 disabled:opacity-60 min-h-[44px]"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Save walk-in</span>
        </button>
      </form>

      {/* Count chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Today", value: counts.today },
          { label: "This week", value: counts.week },
          { label: "Total", value: counts.total },
        ].map((c) => (
          <div key={c.label} className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-baseline gap-2">
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
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search name or phone…"
            className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by visit date"
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
          <button
            type="button"
            onClick={() => {
              setDateFilter(todayISO());
              setPage(1);
            }}
            className="text-xs font-medium border border-slate-300 rounded-lg px-3 py-2.5 bg-white text-slate-700 hover:bg-slate-50"
          >
            Today
          </button>
          {dateFilter && (
            <button
              type="button"
              onClick={() => setDateFilter("")}
              aria-label="Clear date filter"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            {rows.length === 0
              ? "No walk-ins recorded yet. Add the first one above."
              : "No walk-ins match the current filter."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                  <th className="px-4 py-3 font-medium">Patient / parent</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Child</th>
                  <th className="px-4 py-3 font-medium">Gender</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Visit date</th>
                  <th className="px-4 py-3 font-medium sr-only">Edit</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <Fragment key={row.id}>
                    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.patient_name}</td>
                      <td className="px-4 py-3 text-slate-600">{contactLinks(row)}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.child_name || "—"}
                        {row.child_age ? <span className="text-slate-400"> · {row.child_age}</span> : null}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.gender || "—"}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[220px] truncate" title={row.reason}>
                        {row.reason || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatVisitDate(row.visit_date)}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => (editingId === row.id ? setEditingId(null) : startEdit(row))}
                          className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      </td>
                    </tr>
                    {editingId === row.id && (
                      <tr className="border-b border-slate-100 last:border-0">
                        <td colSpan={7} className="px-4 py-3">
                          {editPanel(row)}
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
            {pageRows.map((row) => (
              <div key={row.id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-900">{row.patient_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{formatVisitDate(row.visit_date)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => (editingId === row.id ? setEditingId(null) : startEdit(row))}
                    className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>

                <div className="text-sm text-slate-600 flex flex-col gap-1">
                  <span>{contactLinks(row)}</span>
                  <span>
                    <span className="text-slate-400">Child:</span> {row.child_name || "—"}
                    {row.child_age ? ` (${row.child_age})` : ""}
                    {row.gender ? <span className="text-slate-400 ml-3">{row.gender}</span> : null}
                  </span>
                  {row.reason && <span className="text-slate-500 text-xs">{row.reason}</span>}
                </div>

                {editingId === row.id && editPanel(row)}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {currentPage} of {pageCount} · {filtered.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
                <button
                  type="button"
                  disabled={currentPage >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  className="inline-flex items-center gap-1 text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
