import { Label } from "@/src/shared/ui/label"
import { BdNumbersTable } from "./bd-numbers-table"

export
  function BdNumbersPage(
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