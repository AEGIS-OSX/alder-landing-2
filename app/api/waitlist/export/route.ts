import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

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

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") ?? "json";

  const entries = await readEntries();

  if (format === "csv") {
    const rows = ["email,joinedAt", ...entries.map((e) => `${e.email},${e.joinedAt}`)].join("\n");
    return new NextResponse(rows, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=\"waitlist.csv\"",
      },
    });
  }

  return NextResponse.json({ count: entries.length, entries }, { status: 200 });
}

export function POST(): NextResponse {
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
