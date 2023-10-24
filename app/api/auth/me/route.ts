import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  const bearerToken = req.headers.get('authorization') as string;
  const token = bearerToken?.split(' ')[1];

  const payload = jwt.decode(token) as { email: string };
  if (!payload.email) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      city: true,
      phone: true,
      email: true,
    },
  });

  return NextResponse.json({ user }, { status: 200 });
}
