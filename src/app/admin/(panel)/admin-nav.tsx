"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "../actions";
import { LayoutDashboard, CalendarClock, Footprints, Syringe, LogOut } from "lucide-react";

const NAV = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarClock },
  { name: "Walk-ins", href: "/admin/walkins", icon: Footprints },
  { name: "Vaccinations", href: "/admin/vaccinations", icon: Syringe },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/**
 * Admin navigation shell (visual only — auth stays in the server layout).
 * Desktop: iconed sidebar with active highlight. Mobile: compact top bar +
 * thumb-friendly bottom tab bar (44px+ targets).
 */
export default function AdminNav({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-slate-900 text-slate-100 flex-col min-h-dvh sticky top-0 max-h-dvh">
        <div className="px-5 py-5 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-white rounded-xl p-1.5 shrink-0">
            <Image src="/images/logo/logo.svg" alt="Baby Steps Clinic" width={34} height={34} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide truncate">Baby Steps</p>
            <p className="text-[11px] text-slate-400">Clinic Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-3 flex-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#2E6CF6] text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-4.5 h-4.5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 flex flex-col gap-2">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <span className="w-8 h-8 rounded-full bg-[#2E6CF6]/20 text-[#9db9f7] flex items-center justify-center text-xs font-bold uppercase">
              {username.slice(0, 2)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">{username}</p>
              <p className="text-[10px] text-slate-500">Signed in</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Image src="/images/logo/logo.svg" alt="Baby Steps Clinic" width={30} height={30} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 leading-tight truncate">
              Baby Steps Admin
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">Signed in as {username}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Logout"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium min-h-[44px] px-3"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </form>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.06)] grid grid-cols-4"
        aria-label="Admin sections"
      >
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] text-[10px] font-medium transition-colors ${
                active ? "text-[#2E6CF6]" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span
                className={`flex items-center justify-center w-9 h-6 rounded-full transition-colors ${
                  active ? "bg-[#2E6CF6]/12" : ""
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
