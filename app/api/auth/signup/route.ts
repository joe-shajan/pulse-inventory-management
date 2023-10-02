import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phoneNumber, password } = body;
    const user = await prisma.user.create({
      data: { email, name, phoneNumber, password }, // TODO: password needs to be hashed
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log({ error });
  }
}
