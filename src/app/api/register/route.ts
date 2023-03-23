import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({
    data: {
      email: body.email,
      password: await hashPassword(body.password),
      firstName: body.firstName,
      lastName: body.lastName,
    },
  });

  const jwt = await createJWT(user);

  const response = new NextResponse(null, { status: 200 });
  response.cookies.set(process.env.COOKIE_NAME, jwt, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
