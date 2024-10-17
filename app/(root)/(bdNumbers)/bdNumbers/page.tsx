import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"


  
  
  const numbers = [
    {
      invoice: "Первый номер",
      paymentStatus: "+79996666666",
    },
    {
      invoice: "Второй номер",
      paymentStatus: "+78888888888",
    },
    {
      invoice: "Третий номер",
      paymentStatus: "+77777777777",
    },
  ]

export
  default function BdNumbers() {
    return <section>
      <header>
        <div className="flex ">
          <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">База номеров</Label>
        </div>
      </header>
      <div className=" flex">
      <div className="p-4 basis-1/2">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Название</TableHead>
            <TableHead>Номер</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {numbers.map((number) => (
            <TableRow key={number.invoice}>
              <TableCell className="font-medium">{number.invoice}</TableCell>
              <TableCell className="font-medium tracking-wide">{number.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Всего номеров</TableCell>
            <TableCell className="text-right">{numbers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </div>
      </div>
    </section>
  }

