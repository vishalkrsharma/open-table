import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get('authorization');
  const token = bearerToken?.split(' ')[1];

  if (!bearerToken) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
  }

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/auth/me'],
};
