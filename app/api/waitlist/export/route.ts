import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

const WAITLIST_PATH = join(process.cwd(), 'data', 'waitlist.json');

// Set WAITLIST_EXPORT_SECRET in your environment.
// Requests must include: Authorization: Bearer <secret>
export async function GET(req: NextRequest) {
  const secret = process.env.WAITLIST_EXPORT_SECRET ?? '';
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  // Criterion 9: 401 on missing or wrong Authorization header.
  if (!secret || token !== secret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Criterion 10: CSV response on correct Bearer token.
  let list: string[] = [];
  try {
    const raw = readFileSync(WAITLIST_PATH, 'utf-8');
    list = JSON.parse(raw) as string[];
  } catch {
    list = [];
  }

  const rows = ['email', ...list].join('\n');

  return new NextResponse(rows, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="waitlist.csv"',
    },
  });
}
