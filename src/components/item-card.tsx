import Image from "next/image";

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
import { Button } from "./ui/button";
import Link from "next/link";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="flex flex-col gap-2" key={item.id}>
      <CardHeader>
        <Image
          className="aspect-square object-cover"
          src={getImageUrl(item.fileKey)}
          width={200}
          height={200}
          alt={item.name}
          quality={90}
          loading="lazy"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>Aloitushinta: {item.startPrice}€</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/kohteet/${item.id}`}>Tarjoa</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
