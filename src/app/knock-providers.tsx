"use client";

import { ReactNode } from "react";

import "@knocklabs/react/dist/index.css";
import { env } from "@/env";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import { useSession } from "next-auth/react";

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const session = useSession();

  // TODO: Fix issue of KnockProvider not being able to handle undefined values

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user.id ?? ""}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
