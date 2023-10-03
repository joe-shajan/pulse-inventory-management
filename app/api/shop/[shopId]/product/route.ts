import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: any) {
  try {
    const productData = await request.json();

    const { shopId } = params;

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    productData.price = +productData.price;

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        shop: {
          connect: { id: shopId },
        },
      },
    });

    return NextResponse.json({ createdProduct });
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

export async function GET(request: Request, { params }: any) {
  try {
    const { shopId } = params;

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    const products = await prisma.product.findMany({
      where: {
        shopId: shopId,
      },
    });

    return NextResponse.json({ products });
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
