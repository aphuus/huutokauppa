"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fi } from "date-fns/locale";

import { Item } from "@/db/schema";
import { getImageUrl } from "@/util/files";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { isBidOver } from "@/util/bids";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="flex flex-col gap-2" key={item.id}>
      <Image
        className="aspect-video w-full object-cover"
        src={getImageUrl(item.fileKey)}
        width={200}
        height={200}
        alt={item.name}
        quality={90}
        loading="lazy"
      />
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>
          {isBidOver(item)
            ? "Huutokauppa on päättynyt"
            : `Sulkeutuu ${format(item.endDate, "eeee d.M.", { locale: fi })}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Aloitushinta: {item.startPrice}€</p>
        <p>Nykyinen hinta: {item.currentBid}€</p>
      </CardContent>
      <CardFooter>
        <Button
          variant={isBidOver(item) ? "outline" : "default"}
          asChild
          className="w-full"
        >
          <Link href={`/kohteet/${item.id}`}>
            {isBidOver(item) ? "Tarkastele kohdetta" : "Tarjoa"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
