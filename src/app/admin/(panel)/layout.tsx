import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import AdminNav from "./admin-nav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  // Second auth layer behind the proxy — belt and suspenders for patient data.
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh flex flex-col lg:flex-row">
      <AdminNav username={session.username} />

      {/* Main content — bottom padding on mobile clears the fixed tab bar */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 pb-24 lg:pb-6">{children}</main>
      </div>
    </div>
  );
}
