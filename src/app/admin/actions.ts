"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  verifyPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/admin-auth";

export interface LoginState {
  error?: string;
}

// Light in-memory rate limiting: 5 failed attempts per IP per 15 minutes.
// Resets on server restart, which is acceptable for a single-admin panel.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.windowStart > WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string) {
  const entry = failedAttempts.get(ip);
  if (!entry || Date.now() - entry.windowStart > WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, windowStart: Date.now() });
  } else {
    entry.count += 1;
  }
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const hdrs = await headers();
  const ip = (hdrs.get("x-forwarded-for") ?? "local").split(",")[0].trim();

  if (isRateLimited(ip)) {
    return { error: "Too many failed attempts. Please try again in 15 minutes." };
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    return { error: "Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD_HASH in .env.local." };
  }

  // Evaluate both checks unconditionally so a wrong username costs the same
  // time as a wrong password (no username-probing via response timing).
  const usernameOk = username === expectedUsername;
  const passwordOk = verifyPassword(password, expectedHash);

  if (!usernameOk || !passwordOk) {
    recordFailure(ip);
    return { error: "Invalid username or password." };
  }

  failedAttempts.delete(ip);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
