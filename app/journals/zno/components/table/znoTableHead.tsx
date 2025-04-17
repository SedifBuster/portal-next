import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export
  default function ZnoTableHead (
) {
  return <TableHeader>
    <TableRow>
      <TableHead className="w-[100px] p-4 pl-1 pr-1 text-xs bg-blue-50">Дата выявления подозрения</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-yellow-50">ФИО</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-yellow-50">Дата рождения</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-yellow-50">Локализация</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-yellow-50">Телефон</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-yellow-50">№ истории</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Направлен(а) куда</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Диагноз ВКБ4</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Дата направления в ЦАОП</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Дата посещения ЦАОПа</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Диагноз ЦАОПа</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Дата посещения ПКОДа</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Диагноз ПКОД</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Дата консилиума</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Дата последнего звонка/личный контакт</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Текущий статус</TableHead>
      <TableHead className="text-center pl-1 pr-1 text-xs bg-green-50">Текущий статус примечание</TableHead>
      <TableHead className="text-center pl-4 pr-4 text-muted bg-green-50">...</TableHead>
    </TableRow>
  </TableHeader>
}