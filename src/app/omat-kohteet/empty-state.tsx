import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Ei kohteita</h2>
      <Image
        src="/not-found.svg"
        width={600}
        height={600}
        alt="ei omia listauksia tai kohteita"
      />
      <Button asChild>
        <Link href="/listaa-kohde">Listaa kohde</Link>
      </Button>
    </div>
  );
}
