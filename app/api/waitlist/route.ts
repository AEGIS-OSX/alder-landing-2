import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type WaitlistEntry = {
  email: string;
  joinedAt: string;
};

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

async function writeEntries(entries: WaitlistEntry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).email !== "string"
  ) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const email = ((body as Record<string, unknown>).email as string).trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  const entries = await readEntries();

  if (entries.some((e) => e.email === email)) {
    return NextResponse.json({ error: "Already on the waitlist." }, { status: 409 });
  }

  entries.push({ email, joinedAt: new Date().toISOString() });
  await writeEntries(entries);

  return NextResponse.json({ ok: true }, { status: 201 });
}

export function GET(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function PUT(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function DELETE(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export function PATCH(): NextResponse {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
