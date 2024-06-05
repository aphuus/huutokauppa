import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { fi } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getImageUrl } from "@/util/files";
import { createBidAction } from "./actions";
import { getBidsForItem } from "@/data/bids";
import { getItem } from "@/data/items";
import { auth } from "@/auth";
import { isBidOver } from "@/util/bids";
import { Badge } from "@/components/ui/badge";

function formatTimestamp(timestamp: Date) {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true,
    locale: fi,
  });
}

export default async function KohdePage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await getItem(parseInt(itemId));

  const session = await auth();

  if (!item) {
    return (
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-8 text-4xl font-semibold">Kohdetta ei löytynyt.</h1>
        <Image
          src="/not-found.svg"
          width={300}
          height={300}
          alt="ei omia listauksia tai kohteita"
        />
        <p className="mb-8 max-w-sm">
          Etsimääsi kohdetta ei löytynyt tai se on hävinnyt. Palaa takaisin
          etusivulle ja etsi toista kohdetta.
        </p>
        <Button asChild>
          <Link href="/">Takaisin etusivulle</Link>
        </Button>
      </div>
    );
  }

  const allBids = await getBidsForItem(item.id);

  const hasBids = allBids.length > 0;

  const canPlaceBid = session && item.userId !== session.user.id;

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Etusivu</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Kohteet</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{item.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-balance text-4xl font-semibold tracking-tight">
        {item.name}
      </h1>
      <div className="mt-8 grid grid-cols-2 gap-12">
        <Image
          className="aspect-square rounded-lg object-cover"
          src={getImageUrl(item.fileKey)}
          width={600}
          height={600}
          alt={item.name}
          priority
        />
        <div>
          <Badge
            className="mb-4"
            variant={isBidOver(item) ? "destructive" : "success"}
          >
            {isBidOver(item)
              ? "Huutokauppa sulkeutunut"
              : "Huutokauppa käynnissä"}
          </Badge>
          <h2 className="mb-4 text-balance text-2xl font-semibold tracking-tight">
            {isBidOver(item)
              ? "Huutokauppa on päättynyt"
              : `Sulkeutuu ${formatDistance(item.endDate, new Date(), { addSuffix: true, locale: fi })}`}
          </h2>
          <p className="mb-2 text-lg">Tarjousväli: {item.bidInterval} €</p>
          <p className="mb-4 text-lg">Aloitushinta: {item.startPrice} €</p>
          <p className="mb-4 text-lg">
            Tämänhetkinen hinta: {item.currentBid} €
          </p>
          {canPlaceBid && (
            <form className="mb-8" action={createBidAction.bind(null, item.id)}>
              <Button>Tarjoa</Button>
            </form>
          )}
          {hasBids ? (
            <ul>
              {allBids.map((bid) => (
                <div key={bid.id} className="flex justify-between space-y-2">
                  <p>{bid.user.name}</p>
                  <p>{bid.amount} €</p>
                  <p>{formatTimestamp(bid.timestamp)}</p>
                </div>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center rounded-lg bg-accent px-12 py-8 text-center">
              <h3 className="mb-8 text-balance text-lg font-semibold tracking-tight">
                Ei huutoja.
              </h3>
              <Image
                src="/not-found.svg"
                width={300}
                height={300}
                alt="ei huutoja"
              />
              <p className="mb-8 max-w-sm text-balance">
                Myytävällä kohteella ei ole vielä huutoja. Ole ensimmäinen!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
