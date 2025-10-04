import prisma from "@repo/db/client";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  const { email, name } = await req.json();

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: {
        email,
        name,
        number: "0000000000", // placeholder
        password: randomBytes(16).toString("hex"), // dummy password
      },
    });
  
    console.log("User upserted:", user);
  } 
  catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create or update user" }, { status: 500 });
  }
}
