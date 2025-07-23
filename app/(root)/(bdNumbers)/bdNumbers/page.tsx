import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const numbers = [
  {
    place: "Администрация",
    department: "отделение",
    whereInstalled: "где установлено",
    number: "+79996666666",
    internalNumber: "внутр номер",
    operator: "оператор",
    deviceType: "тип устройства",
    deviceModel: "модель устройства",
    note: "примечание",
    forwarding: "переадресация",
    connected: "подключено",
    status: "status"
  },
  {
    place: "Администрация",
    department: "отделение",
    whereInstalled: "где установлено",
    number: "+79996666666",
    internalNumber: "внутр номер",
    operator: "оператор",
    deviceType: "тип устройства",
    deviceModel: "модель устройства",
    note: "примечание",
    forwarding: "132",
    connected: "123",
    status: "status"
  },
  {
    place: "Администрация",
    department: "отделение",
    whereInstalled: "где установлено",
    number: "+79996666666",
    internalNumber: "внутр номер",
    operator: "оператор",
    deviceType: "тип устройства",
    deviceModel: "модель устройства",
    note: "примечание",
    forwarding: "132",
    connected: "123",
    status: "status"
  },
]

export
  default function BdNumbers(

 ) {
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
              <TableHead className="">Объект</TableHead>
              <TableHead>Отделение</TableHead>
              <TableHead>Где установлено</TableHead>
              <TableHead>Номер телефона</TableHead>
              <TableHead>Внутренний номер</TableHead>
              <TableHead>Оператор</TableHead>
              <TableHead>Тип устройства</TableHead>
              <TableHead>Модель устройства</TableHead>
              <TableHead>Примечание</TableHead>
              <TableHead>Переадресация на сотовый</TableHead>
              <TableHead>Подключено/изменение(дата)</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              numbers.map((number) => (
                <TableRow key={number.whereInstalled}>
                  <TableCell className="font-medium">{number.place}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.department}</TableCell>
                  <TableCell className="font-medium">{number.whereInstalled}</TableCell>
                  <TableCell className="font-medium">{number.number}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.internalNumber}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.operator}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.deviceType}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.deviceModel}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.note}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.forwarding}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.connected}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.status}</TableCell>
                </TableRow>
              ))
            }
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

