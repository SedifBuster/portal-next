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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import ZnoTableHead from "./znoTableHead"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

type StatusEnum = "awaitingReferralToCAOP" |//ожидает направления в ЦАОП
                  "awaitingReferralToPKOD" |//ожидает направления в ПКОД
                  "waitingForAConsultation" |//Ожидает консилиум
                  "Completed"//Завершено

type LocalizationEnum = //PIZDEC
                         "ZNOOfTheLip/Oropharynx" |//ЗНО ГУБЫ (МКБ-10: С00), РОТОГЛОТКИ (МКБ 10:С01, С02.4, C05.1, С05.2, C09, C10), ПОЛОСТИ РТА (МКБ 10:C02.0, C02.1, C02.2, C02.3, C02.8, C02.9, С03, С04, C05.0, С06)
                         "MalignancyOfTheEsophagus/Cardia" |//ЗНО ПИЩЕВОДА, КАРДИИ (МКБ-10: С15, С16.0)
                         "ZNOStomachCancer" |//ЗНО ЖЕЛУДКА  (МКБ-10: С16)
                         "MalignancyOfTheColonRectoSigMoidJointRectumAnusAnal" |//ЗНО ОБОДОЧНОЙ КИШКИ, РЕКТО-СИГМОИДНОГО СОЕДИНЕНИЯ, ПРЯМОЙ КИШКИ, ЗАДНЕГО ПРОХОДА (АНУСА) И АНАЛЬНОГО КАНАЛА  (МКБ-10: С18, С19, С20, С21)
                         "CancerOfTheLiverAndIntraheraticBileDucts" |//ЗНО ПЕЧЕНИ И ВНУТРИПЕЧЕНОЧНЫХ ЖЕЛЧНЫХ ПРОТОКОВ  (МКБ-10: С22)
                         "OncologyOfTheBiliarySystem" |//ЗНО ЖЕЛЧЕВЫВОДЯЩЕЙ СИСТЕМЫ (МКБ-10: С22.1, С23, С24.0)
                         "PancreaticCancer" |//ЗНО ПОДЖЕЛУДОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С25)
                         "NeuroendocrineTumor" |//НЕЙРОЭНДОКРИНННОЙ ОПУХОЛИ (МКБ-10: C15, C16, C17, C18, C19.9, C20.9, C21, C23, C24, C25, C26, C34, C37.9, C73.9
                         "LarynxDisease" |//ЗНО ГОРТАНИ  (МКБ-10: С32)
                         "MalignancyOfTheTracheaLungMediastinumAndPleura" |//ЗНО ТРАХЕИ, ЛЕГКОГО, ВИЛОЧКОВОЙ ЖЕЛЕЗЫ, СРЕДОСТЕНИЯ И ПЛЕВРЫ   (МКБ-10: С33, С34, С37, С38)
                         "MelanomasAndMucousMembranes" |//МЕЛАНОМЫ И СЛИЗИСТЫХ ОБОЛОЧЕК  (МКБ-10: C43, C51, C60.9, C63.2, C69.0, C00–C26, C30-C32, C52, C53 C77, C78, C79 D03.0-D03.9)
                         "SquamousCellSkinCarcinomaBasalCellSkinCarcinomaMerkelsCarcinoma" |//ПЛОСКОКЛЕТОЧНОГО РАКА КОЖИ, БАЗАЛЬНО-КЛЕТОЧНОГО РАКА КОЖИ, КАРЦИНОМЫ МЕРКЕЛЯ (МКБ-10: С44, D04)
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         "" |
                         ""

export interface IZno {
  id: number
  createdAt: Date  //blue
  updatedAt: Date
  name: string             //yellow
  dateOfBirth: Date        //yellow
  localization: LocalizationEnum     //yellow
  phoneNumber: string      //yellow
  numberOfHistory: string  //yellow
  directedWher: string                      //green
  diagnosisVKB: string                      //green
  dateOfReferralToCAOP: Date                //green
  dateOfVisitToCAOP: Date                   //green
  diagnosisOfCAOP: string                   //green
  dateOfVisitToPKOD: Date                   //green
  diagnosisOfPKOD: string                   //green
  dateOfTheConsultation: Date               //green
  dateOfLastCallAndPersonalContact: Date    //green
  status: StatusEnum                        //green
  statusNote: string                        //green
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
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
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
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
  },
]

export function ZnoTable() {
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

  return (
    <div className="w-full p-2 pt-1">
      <div className="flex items-center py-4">
        <Input
          placeholder="Найти ФИО..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-8"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <ZnoTableHead />
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
                  Нет результатов.
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
            Предыдущая
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Следующая
          </Button>
        </div>
      </div>
    </div>
  )
}
