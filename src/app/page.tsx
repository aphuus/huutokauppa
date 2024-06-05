import { database } from "@/db/database";
import ItemCard from "@/components/item-card";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <>
      <h1 className="mb-8 text-4xl font-semibold">Myytävät kohteet</h1>

      <div className="grid grid-cols-3 gap-4">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
