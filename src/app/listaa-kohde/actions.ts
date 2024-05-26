"use server";

import { redirect } from "next/navigation";

import { database } from "@/db/database";
import { items } from "@/db/schema";
import { auth } from "@/auth";

export default async function listaaKohdeAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    userId: user.id,
    name: formData.get("name") as string,
    startPrice: Number(formData.get("startPrice")),
  });

  redirect("/");
}
