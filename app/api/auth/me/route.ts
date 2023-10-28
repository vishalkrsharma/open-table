import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import jwt, { JwtPayload, decode, verify } from 'jsonwebtoken';
import db from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  function isJwtPayload(decoded: any): decoded is JwtPayload {
    return typeof decoded === 'object' && decoded !== null && 'email' in decoded;
  }

  const cookieStore = cookies();

  const jwt = cookieStore.get('jwt')?.value;

  console.log(jwt);

  if (!jwt) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    );
  }

  const secret = process.env.JWT_SECRET || '';

  try {
    verify(jwt, secret);
    const decoded = decode(jwt);

    if (isJwtPayload(decoded)) {
      const { email } = decoded;
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            message: 'Invalid Token',
          },
          {
            status: 401,
          }
        );
      }

      return NextResponse.json(
        {
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
          phone: user?.phone,
          city: user?.city,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: 'Invalid Token',
        },
        {
          status: 401,
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Invalid Token',
      },
      {
        status: 401,
      }
    );
  }
}
