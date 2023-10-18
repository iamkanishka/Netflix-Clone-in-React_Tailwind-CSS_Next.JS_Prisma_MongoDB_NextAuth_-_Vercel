import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image:'',
        emailVerified:new Date()
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.log("Create user Error", err);

    return NextResponse.error();
  }
}
