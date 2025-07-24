import { Label } from "@/components/ui/label";
import { BdNumbersTable } from "./bdNumbersTable";

export
  default function BdNumbers(

 ) {
  return <section>
    <header>
      <div className="flex ">
        <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">База номеров</Label>
      </div>
    </header>
    <BdNumbersTable />
  </section>
}

