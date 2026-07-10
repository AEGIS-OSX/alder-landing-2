import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

interface WaitlistEntry {
  email: string;
  created_at: string;
}

function readEntries(): WaitlistEntry[] {
  try {
    const raw = readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function writeEntries(entries: WaitlistEntry[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>)["email"] !== "string"
  ) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const email = ((body as Record<string, unknown>)["email"] as string).trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const entries = readEntries();

  const duplicate = entries.some(
    (entry) => entry.email.toLowerCase() === email.toLowerCase()
  );

  if (duplicate) {
    return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
  }

  entries.push({
    email: email.toLowerCase(),
    created_at: new Date().toISOString(),
  });

  writeEntries(entries);

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PATCH(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
