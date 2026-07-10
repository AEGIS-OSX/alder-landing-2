// NOTE: better-sqlite3 uses the local filesystem. On Vercel serverless, the filesystem is ephemeral.
// The founder must configure a persistent volume or swap this to Vercel KV / Supabase before production deploy.

import { NextRequest, NextResponse } from "next/server";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure data/ directory exists before opening the DB
fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });

const db = new Database(path.join(process.cwd(), "data/waitlist.db"));

db.exec(
  "CREATE TABLE IF NOT EXISTS waitlist (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))"
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email } = body as { email?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    db.prepare("INSERT INTO waitlist (email) VALUES (?)").run(email);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: unknown) {
    const isUniqueViolation =
      err instanceof Error &&
      (err.message.includes("UNIQUE constraint failed") ||
        (err as NodeJS.ErrnoException & { code?: string }).code ===
          "SQLITE_CONSTRAINT_UNIQUE");

    if (isUniqueViolation) {
      return NextResponse.json({ error: "already_exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
