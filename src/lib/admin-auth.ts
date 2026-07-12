// Server-only auth helpers for the admin panel.
// Password hashing: Node scrypt (no external dependency).
// Sessions: HMAC-SHA256-signed tokens stored in an httpOnly cookie.

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

if (typeof window !== "undefined") {
  throw new Error("src/lib/admin-auth.ts is server-only and must never reach the client bundle.");
}

export const SESSION_COOKIE = "bs_admin_session";
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

// scrypt parameters — fixed so hashes stay verifiable if defaults ever change.
const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };

/** Produce a hash in the storable format `scrypt:<salt-hex>:<hash-hex>`. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

/** Constant-time verify of a password against a stored `scrypt:salt:hash`. */
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  const [, salt, expectedHex] = parts;
  try {
    const expected = Buffer.from(expectedHex, "hex");
    const actual = scryptSync(password, salt, expected.length, SCRYPT_OPTIONS);
    return expected.length > 0 && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET is missing or too short (min 16 chars). Set it in .env.local.");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export interface AdminSession {
  username: string;
  expiresAt: number; // unix ms
}

/** Create a signed session token: base64url(JSON payload) + "." + HMAC. */
export function createSessionToken(username: string): string {
  const session: AdminSession = {
    username,
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verify signature + expiry. Returns the session or null — never throws on bad input. */
export function verifySessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  try {
    const expected = Buffer.from(sign(payload));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
      return null;
    }
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminSession;
    if (!session.username || typeof session.expiresAt !== "number") return null;
    if (Date.now() > session.expiresAt) return null;
    return session;
  } catch {
    return null;
  }
}
