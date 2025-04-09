import { TableHead, TableHeader, TableRow } from "@/components/ui/table";


export
  default function ZhusTableHead (
) {
  return <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Отделения</TableHead>
      <TableHead className="text-center">Падение</TableHead>
      <TableHead className="text-center">Пролежни</TableHead>
      <TableHead className="text-center">Идентификация личности пациента</TableHead>
      <TableHead className="text-center">Событие, связанное с медицинским оборудованием или изделием</TableHead>
      <TableHead className="text-center">Событие, связанное с лекарственным средством</TableHead>
      <TableHead className="text-center">Инфекционное или паразитарное заболевание</TableHead>
      <TableHead className="text-center">ИСМП (инфекции, связанные с медицинской помощью)</TableHead>
      <TableHead className="text-center">Хирургические осложнения</TableHead>
      <TableHead>Другое</TableHead>
      <TableHead className="text-right">Всего</TableHead>
    </TableRow>
  </TableHeader>
}