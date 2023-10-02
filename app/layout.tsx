import Header from "@/components/Header";
import "./globals.css";

import Providers from "@/utils/provider";
import React from "react";
import { getCurrentUser } from "@/utils";

export const metadata = {
  title: "Inventory management",
  description: "Manage your shop and inventory",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
