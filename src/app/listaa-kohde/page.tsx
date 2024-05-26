import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import listaaKohdeAction from "./actions";

export default async function ListaaKohdePage() {
  return (
    <main className="container mx-auto space-y-4 px-[5%] py-16">
      <h1 className="mb-8 text-4xl font-semibold">Listaa kohde myytäväksi</h1>
      <form
        className="mb-8 flex max-w-lg flex-col gap-4 rounded-md border p-4 shadow-sm"
        action={listaaKohdeAction}
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
        <Button className="self-end" type="submit">
          Listaa myytäväksi
        </Button>
      </form>
    </main>
  );
}
