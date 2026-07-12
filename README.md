This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Admin Panel & Google Sheets Backend

The doctor admin panel lives at `/admin` (login: `/admin/login`). It is protected by a
signed httpOnly session cookie and enforced in `src/proxy.ts` plus a layout guard.
Data is stored in a **private Google Sheet** accessed through an Apps Script Web App
(`google-apps-script/Code.gs`) — the Next.js server calls it with a shared secret via
`src/lib/sheets.ts` (server-only, never import in client components).

> ⚠️ This system stores patient/child personal and health data. Keep the Sheet
> private, never commit `.env.local`, and never expose these values to the client.

### Environment variables (`.env.local`)

| Variable | What it is |
| --- | --- |
| `SHEETS_WEBAPP_URL` | Apps Script Web App URL (ends in `/exec`), from Deploy → Web app |
| `SHEETS_SECRET` | Shared secret; must equal the `SECRET` script property in Apps Script |
| `ADMIN_USERNAME` | Admin login username |
| `ADMIN_PASSWORD_HASH` | scrypt hash of the admin password (format `scrypt:salt:hash`) |
| `SESSION_SECRET` | Random key (32+ bytes hex) used to sign session cookies |

Generate values:

```bash
# Password hash (prints the ADMIN_PASSWORD_HASH line to paste):
node scripts/generate-admin-hash.mjs "your-strong-password"

# Random secret (for SESSION_SECRET or SHEETS_SECRET):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Google Sheet setup (one-time)

Full step-by-step instructions are at the top of `google-apps-script/Code.gs`. Summary:

1. Create a private Google Sheet → Extensions → Apps Script → paste `Code.gs`.
2. Project Settings → Script properties → add `SECRET` = your `SHEETS_SECRET` value.
3. Run the `setup()` function once (creates the Appointments / WalkIns / Children /
   Vaccinations tabs with headers).
4. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone** → copy the
   URL into `SHEETS_WEBAPP_URL`.
5. Test: `<url>?secret=<SHEETS_SECRET>&action=ping` should return `{"ok":true,"pong":true}`.

After editing `Code.gs` later, re-publish via Deploy → Manage deployments → New version.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
