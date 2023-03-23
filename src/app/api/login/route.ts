import { comparePasswords, createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid login." }, { status: 401 });
  }

  const isUser = await comparePasswords(body.password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    const response = new NextResponse(null, { status: 201 });
    response.cookies.set(process.env.COOKIE_NAME, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } else {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }
}
