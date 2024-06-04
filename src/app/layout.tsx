import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "@/app/globals.css";
import "@knocklabs/react/dist/index.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { AppKnockProviders } from "./knock-provider";
import { SessionProvider } from "next-auth/react";

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
          `${GeistSans.variable} ${GeistMono.variable}`,
        )}
      >
        <SessionProvider>
          <AppKnockProviders>
            <Header />
            <main className="container mx-auto space-y-4 px-[5%] py-16">
              {children}
            </main>
          </AppKnockProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
