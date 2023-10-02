import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/utils";

export async function POST(request: Request) {
  try {
    const shopData = await request.json();

    const user = await getCurrentUser();

    if (!user) throw new Error("user not found");

    const createdShop = await prisma.shop.create({
      data: {
        ...shopData,
        owner: {
          connect: { id: user?.id }, // Connect the shop to the user as the owner
        },
        managers: {
          create: [
            {
              userId: user?.id,
              role: "ADMIN", // Set the user as an ADMIN for this shop
            },
          ],
        },
      },
    });

    return NextResponse.json({ createdShop });
  } catch (error: any) {
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

// Import necessary modules and initialize Prisma

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) throw new Error("User not found");

    // Use Prisma to query shops associated with the user
    const shops = await prisma.shop.findMany({
      where: {
        ownerId: user.id,
      },
    });

    return NextResponse.json({ shops });
  } catch (error: any) {
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
