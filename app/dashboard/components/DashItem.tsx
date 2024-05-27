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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashDepartment } from "@prisma/client"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Charts } from "./Charts"

export const columns: ColumnDef<DashDepartment>[] = [
    {
      accessorKey: "name",
      header: "Отделение",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "planHuman",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            План (чел.)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase text-center">{row.getValue("planHuman")}</div>,
    },
    {
      accessorKey: "planRub",
      header: () => <div className="text-right">План (руб.)</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("planRub"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
        accessorKey: "begAcc",
        header: "Состояло на начало месяца (чел.)",
        cell: ({ row }) => (
          <div className="capitalize ">{row.getValue("begAcc")}</div>
        ),
      },
      {
        accessorKey: "admRec",
        header: "Поступили в приёмное, накопительным (чел.)",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("admRec")}</div>
        ),
      },
      {
        accessorKey: "totalStays",
        header: "Всего находится в стационаре (чел.) ot palat",
        cell: ({ row }) => (
  
          <div className="capitalize">
            {row.getValue("totalStays")}
            <>
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
                onClick={() => navigator.clipboard.writeText(row.getValue("totalStays"))}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           </>
          </div>
        ),
      },
      {
        accessorKey: "disCome",
        header: "Выбыло, накопительным (чел.)",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("disCome")}</div>
        ),
      },
      {
        accessorKey: "disTax",
        header: () => <div className="text-right">Выбывшие к оплате</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("disTax"))

          const formatted = new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
          }).format(amount)
          return <div className="text-right font-medium">{formatted}</div>
        },
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
        header: () => <div className="text-right">Передано оплату в ФОМС  (руб.) по КСГ</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("transRub"))

          const formatted = new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
          }).format(amount)
          return <div className="text-right font-medium">{formatted}</div>
        },
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
      id: "actions",
      header: "Свободных коек",
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
                onClick={() => navigator.clipboard.writeText(payment.name)}
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

export
  function DashItem({
    data,
    isStateLpu
  }: {
    data:DashDepartment[],
    isStateLpu?: DashDepartment | undefined
  }) {

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

  /*React.useEffect(() => {

    if(isStateLpu) {
      data = data.splice(data.length - 2 , 0 , isStateLpu)
    }
  }, [data])*/
//.splice(data.length - 2 , 0)

  const [isTest, setTest] = React.useState<DashDepartment[]>()
  const [isTest2, setTest2] = React.useState<DashDepartment[]>()

  React.useEffect(() => {
    if(data) {
      setTest(data)
    }
    /*if(isTest && isStateLpu) {
      setTest2(isTest.splice(0, 0, isStateLpu))
    }*/
  }, [data])

  /*React.useEffect(() => {
    if(isTest && isStateLpu) {
      setTest(isTest.splice(isTest?.length - 2 , 0, isStateLpu))
    }
  }, [isTest])*/
 
  return (
    <>
    { isTest?
    <Charts data={data}/>
    :
      null
  }

  

    <div className="w-full">
    {
     // tur bil filter, teper on vnizu
    } 
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} >
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
          {
            isStateLpu
            ?
            <TableFooter>
            <TableRow>
              <TableCell>
                {isStateLpu.name}
              </TableCell>
              <TableCell className="text-center">
                {isStateLpu.planHuman}
              </TableCell>
              <TableCell>
                {
                  new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    //@ts-ignore
                  }).format(parseFloat(isStateLpu.planRub.toString()))
                }
              </TableCell>
              <TableCell>
                {isStateLpu.begAcc}
              </TableCell>
              <TableCell>
                {isStateLpu.admRec}
              </TableCell>
              <TableCell>
                otpalat
              </TableCell>
              <TableCell>
              {isStateLpu.disCome}
              </TableCell>
              <TableCell>
              {
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  //@ts-ignore
                }).format(parseFloat(isStateLpu.disTax.toString()))
              }
              </TableCell>
              <TableCell>
              {isStateLpu.patOver}
              </TableCell>
              <TableCell>
              {isStateLpu.storColed}
              </TableCell>
              <TableCell>
              {isStateLpu.transHuman}
              </TableCell>
              <TableCell>
              {
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  //@ts-ignore
                }).format(parseFloat(isStateLpu.transRub.toString()))
              }
              </TableCell>
              <TableCell>
              {isStateLpu.medPrice}
              </TableCell>
              <TableCell>
              {isStateLpu.dolgDead}
              </TableCell>
              <TableCell>
              ot palat
              </TableCell>
            </TableRow>
          </TableFooter>
            :
            null
          }
        </Table>
      </div>
    </div>
    </>
  )
}

/*
      <div className="flex items-center justify-end space-x-2 py-4">
        
      </div>
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
*/

/*
     <div className="flex items-center py-4">
        <Input
          placeholder="Фильтр отделений..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div> 
      */