import "./globals.css";

import Providers from "@/utils/provider";
import React from "react";

export const metadata = {
  title: "Inventory management",
  description: "Manage your shop and inventory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
