#!/usr/bin/env node
// Generate the ADMIN_PASSWORD_HASH value for .env.local.
//
// Usage:
//   node scripts/generate-admin-hash.mjs "your-strong-password"
//
// Copy the printed line into .env.local. Uses Node's built-in scrypt —
// the same parameters as src/lib/admin-auth.ts.

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-admin-hash.mjs "your-strong-password"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Refusing: password must be at least 8 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 }).toString("hex");

console.log("\nAdd this line to .env.local:\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}\n`);
