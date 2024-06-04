"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

import { env } from "@/env";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import Knock from "@knocklabs/client";

const knockClient = new Knock(env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY);

export function AppKnockProviders({ children }: { children: ReactNode }) {
  const session = useSession();

  knockClient.authenticate(session.data?.user.id ?? "");

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session.data?.user?.id ?? ""}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
