import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const WAITLIST_PATH = join(process.cwd(), 'data', 'waitlist.json');

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function readWaitlist(): string[] {
  try {
    const raw = readFileSync(WAITLIST_PATH, 'utf-8');
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

function writeWaitlist(list: string[]): void {
  mkdirSync(dirname(WAITLIST_PATH), { recursive: true });
  writeFileSync(WAITLIST_PATH, JSON.stringify(list, null, 2), 'utf-8');
}

// Only POST is handled; Next.js App Router returns 405 automatically
// for GET, PUT, DELETE, PATCH when those exports are absent.
export async function POST(req: NextRequest) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const list = readWaitlist();

  if (list.includes(email)) {
    return NextResponse.json({ error: 'Already on the list' }, { status: 409 });
  }

  list.push(email);
  writeWaitlist(list);

  // Criterion 8: success body is exactly { ok: true } -- no email, id, or count.
  return NextResponse.json({ ok: true }, { status: 200 });
}
