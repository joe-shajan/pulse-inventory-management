import Header from "@/components/Header";
import "./globals.css";

import Providers from "@/utils/provider";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Inventory management",
  description: "Manage your shop and inventory",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getCurrentUser = async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) return;
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!currentUser) return;

      return currentUser;
    } catch (e: any) {
      console.log(e);
      // simply ignores if no user is logged in
      return;
    }
  };

  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <Providers>
          <Header user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
