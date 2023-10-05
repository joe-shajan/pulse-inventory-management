import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: any) {
  try {
    const { shopId } = params;

    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const skipParam = searchParams.get("skip");

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    const defaultLimit = 10;
    const defaultOffset = 1;
    const take = limit ? +limit : defaultLimit;

    const skip = skipParam ? +skipParam : defaultOffset;

    const products = await prisma.product.findMany({
      where: {
        shopId: shopId,
      },
      take,
      skip,
    });

    const nextSkip = products.length < take ? undefined : products.length;

    return NextResponse.json({ products, nextSkip });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
        errorCode: error.code,
      },
      { status: 500 }
    );
  }
}
