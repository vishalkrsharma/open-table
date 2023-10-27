import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export async function POST(req: NextRequest, res: NextResponse) {
  const userData = await req.json();

  const { email, password } = userData;
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid',
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: 'Password is invalid',
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const foundUserByEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUserByEmail) {
    return NextResponse.json({ message: 'Email not found' }, { status: 401 });
  }

  const isMatch = bcrypt.compareSync(password, foundUserByEmail.password);

  if (!isMatch) {
    return NextResponse.json({ message: 'Wrong password' }, { status: 401 });
  }

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email }).setProtectedHeader({ alg }).setExpirationTime('24h').sign(secret);

  return NextResponse.json(
    {
      firstName: foundUserByEmail.first_name,
      lastName: foundUserByEmail.last_name,
      email: foundUserByEmail.email,
      phone: foundUserByEmail.phone,
      city: foundUserByEmail.city,
      token,
    },
    {
      status: 200,
    }
  );
}
