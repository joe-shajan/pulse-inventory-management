import type { Shop, User, TeamMember } from "@prisma/client";

export { Shop, User, TeamMember };

export type UserRoles = "ADMIN" | "MANAGER";

export type TeamMemberWithUser = {
  id: string;
  userId: string;
  user: User;
  shopId: string;
  role: UserRoles; // Assuming you have defined the UserRoles enum
};
