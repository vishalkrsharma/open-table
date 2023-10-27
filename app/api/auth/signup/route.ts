import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

export async function POST(req: NextRequest) {
  const userData = await req.json();

  const { firstName, lastName, email, city, phone, password } = userData;

  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 20 }),
      errorMessage: 'First Name invalid',
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 20 }),
      errorMessage: 'Last Name invalid',
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email invalid',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number invalid',
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: 'City invalid',
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password is not strong enough',
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

  if (foundUserByEmail) {
    return NextResponse.json({ message: 'Email already used' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      email,
      phone,
    },
  });

  const alg = 'HS256';
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email }).setProtectedHeader({ alg }).setExpirationTime('24h').sign(secret);

  return NextResponse.json(
    {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      token,
    },
    {
      status: 200,
      // headers: {
      //   'Set-Cookie': `token=${token}; maxAge=60*6*24`,
      // },
    }
  );
}
