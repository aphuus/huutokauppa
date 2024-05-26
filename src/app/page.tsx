import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function HomePage() {
  const session = await auth();

  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto px-[5%] py-12">
      {session ? <SignOut /> : <SignIn />}

      <form
        action={async (formData: FormData) => {
          "use server";

          await database.insert(items).values({
            name: formData.get("name") as string,
            userId: session?.user?.id!,
          });
          revalidatePath("/");
        }}
      >
        <Input name="name" placeholder="Nimeä myytävä kohde..." />
        <Button type="submit">Listaa myytäväksi</Button>
      </form>

      {allItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
