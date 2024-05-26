import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/app/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Huutokauppa",
  description: "Myyjä ja osta huutokaupassa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          `${GeistSans.variable} ${GeistMono.variable}`
        )}
      >
        {children}
      </body>
    </html>
  );
}
