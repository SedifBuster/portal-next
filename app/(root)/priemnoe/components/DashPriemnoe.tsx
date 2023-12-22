"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Progress } from "@/components/ui/progress"
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


const data = [
  {
    department: "TO",
    planHuman: 392,
    planRub: 32327489,
    begAcc: 104,
    admRec: 671,
    totalStays: 113,
    disCome: 613,
    disTax: 24182815,
    patOver: 17,
    storColed: 9,
    transHuman: 179,
    transRub: 10414661,
    medPrice: 0,
    dolgDead: 73,
    freeBeds: 24
  },
  {
    department: "XO",
    planHuman: 392,
    planRub: 32327489,
    begAcc: 104,
    admRec: 671,
    totalStays: 113,
    disCome: 613,
    disTax: 24182815,
    patOver: 17,
    storColed: 9,
    transHuman: 580,
    transRub: 14541486,
    medPrice: 0,
    dolgDead: 73,
    freeBeds: 24
  },
  {
    department: "HO",
    planHuman: 392,
    planRub: 32327489,
    begAcc: 104,
    admRec: 671,
    totalStays: 113,
    disCome: 613,
    disTax: 24182815,
    patOver: 17,
    storColed: 9,
    transHuman: 108,
    transRub: 10924027,
    medPrice: 0,
    dolgDead: 73,
    freeBeds: 24
  },
  {
    department: "Reab",
    planHuman: 392,
    planRub: 32327489,
    begAcc: 104,
    admRec: 671,
    totalStays: 113,
    disCome: 613,
    disTax: 24182815,
    patOver: 17,
    storColed: 9,
    transHuman: 580,
    transRub: 10414661,
    medPrice: 0,
    dolgDead: 73,
    freeBeds: 24
  },
  {
    department: "Palliativ",
    planHuman: 392,
    planRub: 32327489,
    begAcc: 104,
    admRec: 671,
    totalStays: 113,
    disCome: 613,
    disTax: 24182815,
    patOver: 17,
    storColed: 9,
    transHuman: 1057,
    transRub: 74711040,
    medPrice: 0,
    dolgDead: 73,
    freeBeds: 24
  },
]

export const columns: ColumnDef[] = [

  {
    accessorKey: "department",
    header: "Отделение",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "planHuman",
    header: "План (чел)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("planHuman")}</div>
    ),
  },
  {
    accessorKey: "planRub",
    header: "План (руб)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("planRub")}</div>
    ),
  },
  {
    accessorKey: "begAcc",
    header: "Состояло на начало месяца (чел)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("begAcc")}</div>
    ),
  },
  {
    accessorKey: "admRec",
    header: "Поступили в приёмное, накопительным (чел)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("admRec")}</div>
    ),
  },
  {
    accessorKey: "totalStays",
    header: "Всего находится в стационаре (чел)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("totalStays")}</div>
    ),
  },
  {
    accessorKey: "disCome",
    header: "Выбыло, накопительным (чел)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("disCome")}</div>
    ),
  },
  {
    accessorKey: "disTax",
    header: "Выбывшие к оплате",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("disTax")}</div>
    ),
  },
  {
    accessorKey: "patOver",
    header: "Пациенты свыше 10 дней (чел.)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("patOver")}</div>
    ),
  },
  {
    accessorKey: "storColed",
    header: "Не закрыто историй в Барсе (шт.)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("storColed")}</div>
    ),
  },
  {
    accessorKey: "transHuman",
    header: "Передано оплату в ФОМС (шт.)",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transHuman")}</div>
    ),
  },
  {
    accessorKey: "transRub",
    header: "Передано оплату в ФОМС  (руб.) по КСГ",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transRub")}</div>
    ),
  },
  {
    accessorKey: "medPrice",
    header: "Средняя стоимость лечения",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("medPrice")}</div>
    ),
  },
  {
    accessorKey: "dolgDead",
    header: "Долг по умершим",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dolgDead")}</div>
    ),
  },
  {
    accessorKey: "freeBeds",
    header: "Свободных коек",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("freeBeds")}</div>
    ),
  },
]

const tableDashData: [] = [
  {
    date: new Date(2023, 10, 1),
    table: data
  },
  {
    date: new Date(2023, 10, 5),
    table: data
  },
  {
    date: new Date(2023, 10, 8),
    table: data
  },
  {
    date: new Date(2023, 10, 12),
    table: data
  },
  {
    date: new Date(2023, 10, 16),
    table: data
  },
  {
    date: new Date(2023, 10, 20),
    table: data
  },
  {
    date: new Date(2023, 10, 21),
    table: data
  }
]

export function DashPriemnoe() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

    const [isDepartments, setDepartments] = React.useState([])
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full ml-4 mr-4 mt-6">
      
      <div className="rounded-md border">
      <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isDepartments.map((dep) => (
          <TableRow key={dep.invoice}>
            <TableCell className="font-medium">{dep.invoice}</TableCell>
            <TableCell>{dep.paymentStatus}</TableCell>
            <TableCell>{dep.paymentMethod}</TableCell>
            <TableCell className="text-right">{dep.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
      </Table>
      </div>
    </div>
  )
}

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}

