import Link from "next/link";

import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const session = await auth();

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
          <Link href="/listaa-kohde">
            <Button variant="link">Listaa kohde</Button>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </header>
  );
}
