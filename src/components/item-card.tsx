import Image from "next/image";

import { Item } from "@/db/schema";
import { getImageUrl } from "@/util/files";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      </CardContent>
      <CardFooter>Aloitushinta: {item.startPrice}€</CardFooter>
    </Card>
  );
}
