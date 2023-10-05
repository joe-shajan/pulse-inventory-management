import Header from "@/components/Header";
import "./globals.css";

import Providers from "@/utils/provider";
import React from "react";
import { getCurrentUser } from "@/utils";
import Provider from "./context/client-provider";
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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
