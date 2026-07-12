"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";
import { Lock, Loader2, AlertCircle } from "lucide-react";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col items-center gap-3 mb-8 text-center">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Clinic Admin</h1>
              <p className="text-sm text-slate-500 mt-1">Baby Steps – Newborn &amp; Child Clinic</p>
            </div>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            {state.error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{state.error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-username" className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                required
                autoComplete="username"
                disabled={pending}
                className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 disabled:bg-slate-50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                disabled={pending}
                className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 disabled:bg-slate-50"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-60 min-h-[44px]"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Authorized clinic staff only. All access is restricted.
        </p>
      </div>
    </div>
  );
}
