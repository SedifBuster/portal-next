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
import {ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Charts } from "./Charts"
import { DatePicker } from "./DatePicker"

export type Department = {
  department: string
  planHuman: number
  planRub: number
  begAcc: number
  admRec: number
  totalStays: number
  disCome: number
  disTax: number
  patOver: number
  storColed: number
  transHuman: number
  transRub: number
  medPrice: number
  dolgDead: number
  freeBeds: number
}

export type dash = {
  date: Date;
  table: Department[];
}

const data: Department[] = [
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

export const columns: ColumnDef<Department>[] = [
  /*{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },*/
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
  /*{
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.department)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },*/
]

const tableDashData: dash[] = [
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

export function DataTable() {
  const [isDash, setDash] = React.useState<dash>()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


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

  React.useEffect(() => {
    if(tableDashData)
    setDash(tableDashData[tableDashData.length - 1])
  }, [])

  console.log(isDash)
  return (
    <div className="w-full ml-4 mr-4">
      <div className="flex justify-center pb-6 pt-2">
        <DatePicker />
      </div>
      <div className="flex p-2">
        <Charts data={data} />
      </div>
      <div className="flex items-center py-4">

        <Input
          placeholder="фильтр отделений..."
          value={(table.getColumn("department")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("department")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Колонки <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

//       <div className="flex-1 text-sm text-muted-foreground">
//{table.getFilteredSelectedRowModel().rows.length} of{" "}
//{table.getFilteredRowModel().rows.length} row(s) selected.
//</div>
