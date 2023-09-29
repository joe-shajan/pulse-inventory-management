import prisma from "@/utils/prisma";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("in route");

    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (error: any) {
    console.log("error");
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
        errorCode: error.code,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);
    const user = await prisma.user.create({ data });
    console.log(user);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        errorCode: error.code,
      },
      { status: 500 }
    );
  }
}
