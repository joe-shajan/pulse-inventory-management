import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getCurrentUser } from "@/utils";

export async function POST(request: Request) {
  try {
    const shopData = await request.json();
    console.log(shopData);

    const user = await getCurrentUser();
    console.log(user);

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
