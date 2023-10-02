import { NextResponse } from "next/server";

type paramsType = {
  params: {
    shopId: string;
  };
};

export async function GET(request: Request, { params }: paramsType) {
  try {
    const { shopId } = params;

    const teamMembers = await prisma.teamMember.findMany({
      where: {
        shopId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ teamMembers });
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
