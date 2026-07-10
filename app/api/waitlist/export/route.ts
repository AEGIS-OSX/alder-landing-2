import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

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

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Auth check is the FIRST operation — ALDER-AUTH-003
  const authHeader = request.headers.get("authorization") ?? "";
  const expectedToken = process.env.EXPORT_SECRET ?? "";

  const prefix = "Bearer ";
  const providedToken = authHeader.startsWith(prefix)
    ? authHeader.slice(prefix.length)
    : "";

  if (!providedToken || !expectedToken || providedToken !== expectedToken) {
    // ALDER-AUTH-001: 401 with no body on missing or incorrect token
    return new NextResponse(null, { status: 401 });
  }

  // ALDER-IDOR-001: data only accessible after auth passes
  const entries = readEntries();

  const rows = entries.map((entry) => {
    const safeEmail = entry.email.replace(/"/g, "");
    const safeDate = entry.created_at.replace(/"/g, "");
    return `${safeEmail},${safeDate}`;
  });

  const csvContent = ["email,created_at", ...rows].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="waitlist.csv"`,
    },
  });
}

export async function POST(): Promise<NextResponse> {
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
