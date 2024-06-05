"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  const userId = session.data?.user.id;

  return (
    <header className="bg-accent py-4">
      <div className="container mx-auto flex items-center justify-between px-[5%]">
        <div className="flex items-center gap-8">
          <Link
            className="flex items-center gap-2 text-balance font-mono text-lg font-semibold transition hover:text-muted-foreground"
            href="/"
          >
            <Logo className="h-8 w-8" />
            Huutokauppa
          </Link>
          <div>
            <Link href="/">
              <Button variant="link">Kaikki kohteet</Button>
            </Link>
            {userId && (
              <>
                <Link href="/listaa-kohde">
                  <Button variant="link">Listaa kohde</Button>
                </Link>
                <Link href="/omat-kohteet">
                  <Button variant="link">Omat kohteet</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-6">
          {userId && (
            <>
              <NotificationIconButton
                ref={notifButtonRef}
                onClick={(e) => setIsVisible(!isVisible)}
              />
              <NotificationFeedPopover
                buttonRef={notifButtonRef}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                renderItem={({ item, ...props }) => (
                  <NotificationCell {...props} item={item}>
                    <Link
                      onClick={() => setIsVisible(false)}
                      href={`/kohteet/${item.data?.itemId}`}
                    >
                      <p>
                        {`Joku ylitti tarjouksesi kohteesta ${item.data?.itemName}`}
                      </p>
                      <p>{`Uusi tarjous: ${item.data?.bidAmount} €`}</p>
                    </Link>
                  </NotificationCell>
                )}
              />
            </>
          )}

          {session.data?.user?.image && (
            <Avatar>
              <AvatarImage src={session.data?.user.image} />
              <AvatarFallback>ACC</AvatarFallback>
            </Avatar>
          )}
          <div>{session.data?.user.name}</div>
          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Kirjaudu ulos
              </Button>
            ) : (
              <Button onClick={() => signIn()}>Kirjaudu sisään</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
