import { eq } from "drizzle-orm";

import { database } from "@/db/database";
import { auth } from "@/auth";
import { items } from "@/db/schema";
import ItemCard from "@/components/item-card";
import EmptyState from "./empty-state";

export default async function OmatKohteetPage() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id!),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="container mx-auto space-y-4 px-[5%] py-16">
      <h1 className="mb-8 text-4xl font-semibold">Omat kohteet</h1>

      {hasItems ? (
        <div className="grid grid-cols-4 gap-4">
          {allItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
