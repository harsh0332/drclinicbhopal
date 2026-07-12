import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { logoutAction } from "../actions";
import { LayoutDashboard, CalendarClock, Footprints, Syringe, LogOut } from "lucide-react";

// Nav for the protected panel. Feature pages arrive in later phases — until a
// route exists it renders as a disabled item so builds stay honest.
const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, ready: true },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarClock, ready: false },
  { name: "Walk-ins", href: "/admin/walk-ins", icon: Footprints, ready: false },
  { name: "Vaccinations", href: "/admin/vaccinations", icon: Syringe, ready: false },
];

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // Second auth layer behind the proxy — belt and suspenders for patient data.
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      {/* Sidebar (top bar on mobile) */}
      <aside className="lg:w-60 shrink-0 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800">
          <p className="text-sm font-semibold tracking-wide">Baby Steps Admin</p>
          <p className="text-xs text-slate-400 mt-0.5">Signed in as {session.username}</p>
        </div>

        <nav className="flex lg:flex-col gap-1 p-3 overflow-x-auto lg:overflow-x-visible lg:flex-1">
          {NAV_ITEMS.map((item) =>
            item.ready ? (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            ) : (
              <span
                key={item.name}
                title="Coming in a later phase"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed whitespace-nowrap"
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
                <span className="text-[10px] uppercase tracking-wide bg-slate-800 rounded px-1.5 py-0.5 ml-auto hidden lg:inline">
                  Soon
                </span>
              </span>
            )
          )}
        </nav>

        <form action={logoutAction} className="p-3 border-t border-slate-800 hidden lg:block">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </form>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between lg:justify-end">
          <span className="text-sm text-slate-500 lg:hidden">Baby Steps Admin</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </form>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
