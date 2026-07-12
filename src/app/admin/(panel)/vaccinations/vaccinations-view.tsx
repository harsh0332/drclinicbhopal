"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addChildAction } from "../../actions";
import {
  CHILD_GENDERS,
  VACCINE_DISCLAIMER,
  computeVaccStatus,
  daysUntilDue,
  type ChildFields,
  type ChildRow,
  type VaccinationRow,
} from "@/lib/vaccination-types";
import { isOptionalDose } from "@/lib/iap-schedule";
import {
  Search,
  Phone,
  MessageSquare,
  Loader2,
  Inbox,
  Plus,
  Info,
  PhoneCall,
  Users,
  ChevronRight,
} from "lucide-react";

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
  if (months < 24) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} yr ${rem} mo` : `${years} yr`;
}

const inputClass =
  "border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 disabled:bg-slate-50 w-full";

function emptyChild(): ChildFields {
  return { child_name: "", parent_name: "", phone: "", dob: "", gender: "", notes: "" };
}

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2.5 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3">
      <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
      <p className="text-xs text-sky-800 leading-relaxed">{VACCINE_DISCLAIMER}</p>
    </div>
  );
}

export default function VaccinationsView({
  initialChildren,
  initialVaccinations,
}: {
  initialChildren: ChildRow[];
  initialVaccinations: VaccinationRow[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"calls" | "children">("calls");
  const [windowDays, setWindowDays] = useState(7);
  const [query, setQuery] = useState("");

  // Add child form
  const [form, setForm] = useState<ChildFields>(emptyChild);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const today = todayISO();
  const childById = useMemo(() => {
    const map = new Map<string, ChildRow>();
    initialChildren.forEach((c) => map.set(c.id, c));
    return map;
  }, [initialChildren]);

  // ---- Call list: overdue or due within N days, not given, not optional ----
  const callList = useMemo(() => {
    return initialVaccinations
      .filter((v) => {
        if (v.given_date || !v.due_date) return false;
        if (isOptionalDose(v)) return false;
        return daysUntilDue(v.due_date, today) <= windowDays;
      })
      .map((v) => ({ ...v, child: childById.get(v.child_id) }))
      .sort((a, b) => (a.due_date || "").localeCompare(b.due_date || ""));
  }, [initialVaccinations, childById, windowDays, today]);

  const overdueCount = callList.filter((v) => v.due_date < today).length;

  const filteredChildren = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialChildren;
    return initialChildren.filter(
      (c) =>
        (c.child_name || "").toLowerCase().includes(q) ||
        (c.parent_name || "").toLowerCase().includes(q) ||
        String(c.phone || "").includes(q)
    );
  }, [initialChildren, query]);

  /** Next not-given dose for a child (for the children list summary). */
  const nextDueFor = (childId: string): VaccinationRow | undefined => {
    return initialVaccinations
      .filter((v) => v.child_id === childId && !v.given_date && v.due_date && !isOptionalDose(v))
      .sort((a, b) => a.due_date.localeCompare(b.due_date))[0];
  };

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);
    const res = await addChildAction(form);
    setAdding(false);
    if (!res.ok || !res.id) {
      setAddError(res.error || "Could not save. Please try again.");
      return;
    }
    // Schedule is generated server-side — open the child's fresh timeline.
    router.push(`/admin/vaccinations/${res.id}`);
  };

  const reminderWhatsAppLink = (v: (typeof callList)[number]) => {
    const phone = v.child?.phone || "";
    const text = `Hello ${v.child?.parent_name || ""}, this is Baby Steps Clinic, Neelbad. ${v.child_name}'s ${v.vaccine} (${v.dose}) vaccination is due on ${formatDate(v.due_date)}. Please call 62625 60101 or reply here to book a slot.`;
    return `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;
  };

  const dueBadge = (v: VaccinationRow) => {
    const days = daysUntilDue(v.due_date, today);
    if (days < 0) {
      return (
        <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md px-2 py-0.5">
          {Math.abs(days)} day{Math.abs(days) === 1 ? "" : "s"} overdue
        </span>
      );
    }
    if (days === 0) {
      return (
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5">
          Due today
        </span>
      );
    }
    return (
      <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5">
        Due in {days} day{days === 1 ? "" : "s"}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Disclaimer />

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab("calls")}
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border ${
            tab === "calls"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          Call list
          {callList.length > 0 && (
            <span
              className={`text-[11px] font-semibold rounded-full px-1.5 py-0.5 ${
                tab === "calls" ? "bg-white/20" : "bg-red-100 text-red-700"
              }`}
            >
              {callList.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab("children")}
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border ${
            tab === "children"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          <Users className="w-4 h-4" />
          Children ({initialChildren.length})
        </button>
      </div>

      {tab === "calls" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{callList.length}</span> dose
              {callList.length === 1 ? "" : "s"} to follow up
              {overdueCount > 0 && (
                <span className="text-red-600 font-medium"> · {overdueCount} overdue</span>
              )}
            </p>
            <label className="text-xs text-slate-500 inline-flex items-center gap-2">
              Due within
              <select
                value={windowDays}
                onChange={(e) => setWindowDays(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </label>
          </div>

          {callList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                {initialChildren.length === 0
                  ? "No children registered yet — add one in the Children tab."
                  : `Nothing due within ${windowDays} days. All caught up!`}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {callList.map((v) => (
                <div
                  key={v.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/admin/vaccinations/${v.child_id}`}
                        className="font-medium text-slate-900 hover:underline"
                      >
                        {v.child_name}
                      </Link>
                      {dueBadge(v)}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="font-medium">{v.vaccine}</span>
                      <span className="text-slate-400"> · {v.dose}</span>
                      <span className="text-slate-400"> · due {formatDate(v.due_date)}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {v.child?.parent_name || "—"} · {v.child?.phone || "no phone on file"}
                    </p>
                  </div>
                  {v.child?.phone && (
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={`tel:+91${v.child.phone}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>
                      <a
                        href={reminderWhatsAppLink(v)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium border border-emerald-300 rounded-lg px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "children" && (
        <div className="flex flex-col gap-4">
          {/* Add child */}
          <form
            onSubmit={handleAddChild}
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3"
          >
            <h2 className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Register child
              <span className="font-normal text-xs text-slate-500">
                — their IAP schedule is generated automatically from the DOB
              </span>
            </h2>

            {addError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {addError}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <input
                type="text"
                required
                disabled={adding}
                value={form.child_name}
                onChange={(e) => setForm((f) => ({ ...f, child_name: e.target.value }))}
                placeholder="Child's name *"
                aria-label="Child's name"
                className={inputClass}
              />
              <label className="flex items-center gap-2 text-xs text-slate-500">
                <span className="shrink-0">DOB *</span>
                <input
                  type="date"
                  required
                  disabled={adding}
                  max={today}
                  value={form.dob}
                  onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
                  aria-label="Date of birth"
                  className={inputClass}
                />
              </label>
              <select
                disabled={adding}
                value={form.gender}
                onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                aria-label="Gender"
                className={inputClass}
              >
                <option value="">Gender…</option>
                {CHILD_GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <input
                type="text"
                required
                disabled={adding}
                value={form.parent_name}
                onChange={(e) => setForm((f) => ({ ...f, parent_name: e.target.value }))}
                placeholder="Parent's name *"
                aria-label="Parent's name"
                className={inputClass}
              />
              <input
                type="tel"
                required
                disabled={adding}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="10-digit mobile *"
                aria-label="Mobile number"
                className={inputClass}
              />
              <input
                type="text"
                disabled={adding}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Notes (allergies, brand preferences…)"
                aria-label="Notes"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="self-start inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-700 disabled:opacity-60 min-h-[44px]"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>{adding ? "Creating schedule…" : "Register child"}</span>
            </button>
          </form>

          {/* Search + list */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search child, parent or phone…"
              className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          {filteredChildren.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">
                {initialChildren.length === 0
                  ? "No children registered yet. Add the first one above."
                  : "No children match the search."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredChildren.map((c) => {
                const next = nextDueFor(c.id);
                const status = next ? computeVaccStatus(next, today, windowDays) : null;
                return (
                  <Link
                    key={c.id}
                    href={`/admin/vaccinations/${c.id}`}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-slate-400 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">
                        {c.child_name}
                        <span className="text-xs text-slate-400 font-normal ml-2">
                          {ageFromDob(c.dob)} · DOB {formatDate(c.dob)}
                          {c.gender ? ` · ${c.gender}` : ""}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {c.parent_name} · {c.phone}
                      </p>
                      {next ? (
                        <p className="text-xs mt-1">
                          <span className="text-slate-400">Next: </span>
                          <span
                            className={
                              status === "Overdue"
                                ? "text-red-600 font-medium"
                                : status === "Due soon"
                                  ? "text-amber-600 font-medium"
                                  : "text-slate-600"
                            }
                          >
                            {next.vaccine} ({next.dose}) — {formatDate(next.due_date)}
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs text-emerald-600 mt-1">All scheduled doses given ✓</p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
