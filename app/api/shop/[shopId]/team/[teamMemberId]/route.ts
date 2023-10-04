import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const { teamMemberId } = params;

    // Check if the team member exists
    const teamMember = await prisma.teamMember.findUnique({
      where: { id: teamMemberId },
    });

    if (!teamMember) {
      throw new Error("Team member not found");
    }

    // Remove the user from the shop's team
    await prisma.teamMember.delete({
      where: {
        id: teamMemberId,
      },
    });

    return NextResponse.json({ message: "User removed from the shop's team" });
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
