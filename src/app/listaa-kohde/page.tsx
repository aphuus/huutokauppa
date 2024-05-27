"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createItemAction,
  createUploadUrlAction,
} from "@/app/listaa-kohde/actions";

export default function ListaaKohdePage() {
  return (
    <main className="container mx-auto space-y-4 px-[5%] py-16">
      <h1 className="mb-8 text-4xl font-semibold">Listaa kohde myytäväksi</h1>
      <form
        className="mb-8 flex max-w-lg flex-col gap-4 rounded-md border p-4 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });

          const name = formData.get("name") as string;
          const startPrice = Number(formData.get("startPrice"));

          await createItemAction({
            name,
            startPrice,
            fileName: file.name,
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Nimeä myytävä kohde..."
        />
        <Input
          required
          className="max-w-lg"
          name="startPrice"
          type="number"
          step="0.01"
          placeholder="Syötä aloitushinta..."
        />
        <Input required name="file" type="file" />
        <Button className="self-end" type="submit">
          Listaa myytäväksi
        </Button>
      </form>
    </main>
  );
}
