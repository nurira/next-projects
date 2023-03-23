import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  console.log(name);

  const userCookie = req.cookies.get(process.env.COOKIE_NAME);
  if (!userCookie)
    return NextResponse.json({ error: "No user found." }, { status: 401 });

  const user = await validateJWT(userCookie.value);

  await db.project.create({
    data: {
      name,
      ownerId: user.id,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
