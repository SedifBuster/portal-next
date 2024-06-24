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
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { DashItemRow } from "./DashItemRow"

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
    stateLpu,
    date
  }: {
    data:DashDepartment[],
    stateLpu?: DashDepartment | undefined,
    date: Date
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
  const [chartData, setChartData] = React.useState<DashDepartment[]>()
  //@ts-ignore
  let isChartData = data.filter((i) => i.name.toLowerCase() !== "Паллиатив".toLowerCase()).concat([stateLpu])
  React.useEffect(() => {
    if(data && stateLpu) {
      setChartData(isChartData)
    }
  }, [data, stateLpu])

  React.useEffect(() => {
    if(chartData) 
      setChartData(chartData)
  }, [isChartData])


  const [isWards, setWards] = useState()

  let onSortedDepartments = (deps: DashDepartment[]) =>{
    deps.sort((a:DashDepartment, b:DashDepartment) => {
      if(a.name > b.name) return 1
      if(a.name < b.name) return -1
      return 0
    })

    return deps
  } 

  // not stabble
  let findDepartmentId = async() => {
    let result = await axios.get('/api/department')
    if (result.status !== 200)  throw new Error()
    if(!result.data) throw new Error()

    let deps = onSortedDepartments(result.data).filter((i) => {return i.name.toLowerCase() !== 'IT'.toLowerCase()})

    let dashDeps = onSortedDepartments(data)

    let dashDepsWithId: DashDepartment[] = dashDeps.map((dep: DashDepartment, index) => {
      return {...dep, defaultDepsId: deps[index].id}
    })

    return dashDepsWithId
  }

  let onSetDepartmentsWards = async() => {

  }


  let getWardsDeparment = async () => {
    try {


      let dashDepsWithId = await findDepartmentId()

      if (!dashDepsWithId)  throw new Error()

      
     console.log(dashDepsWithId)

     for(let i = 0; i < dashDepsWithId.length; i++) {

      //@ts-ignore
      let result = await axios.get(`/api/dash/ward/${dashDepsWithId[i].defaultDepsId}`)

      if (result.status !== 200)  throw new Error()
      if(!result.data) throw new Error()
        //замапить результ на ближайшее время еще статус не забудь еще резерв по номеру палаты!
      //по номеру палаты после по фильтра по дню?
        //@ts-ignore
      dashDepsWithId[i].totalStays = result.data.reduce((acc, currentValue) => acc + currentValue.engaged, 0)
       //@ts-ignore
      dashDepsWithId[i].freeBeds = result.data.reduce((acc, currentValue) => acc + currentValue.free, 0)


        console.log(dashDepsWithId)
              //filter by day now еще не сделан 
      /*let filteredDashes = result.data.map((item:any) => {
        return {...item, table: result.data.filter((dep: DashDepartment) => {
          return dep.dashId === item.id
        })}
      })*/

      //setWards(filteredDashes)
     }

    } catch  (error){
      toast.error(`ошибка при получении палат: ${(error as Error).message}`)
    }
  }


console.log(isWards)
  useEffect(() => {

    getWardsDeparment()
  }, [])



  return (
    <>
    { chartData?
    <Charts data={chartData}/>
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
                <DashItemRow key={row.id} row={row}/>
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
          {stateLpu?
            <TableFooter>
            <TableRow>
              <TableCell>
                ЛПУ
              </TableCell>
              <TableCell className="text-center">
              {
                stateLpu.planHuman
              }
              </TableCell>
              <TableCell>
                {
                  new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                    //@ts-ignore
                  }).format(parseFloat(stateLpu.planRub.toString()))
                }
              </TableCell>
              <TableCell>
                {
                  stateLpu.begAcc
                }
              </TableCell>
              <TableCell>
              {
                  stateLpu.admRec
                }
              </TableCell>
              <TableCell>
                otpalat
              </TableCell>
              <TableCell>
              {
                  stateLpu.disCome
                }
              </TableCell>
              <TableCell>
              {
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  //@ts-ignore
                }).format(parseFloat(stateLpu.disTax.toString()))
              }
              </TableCell>
              <TableCell>
              {
                  stateLpu.patOver
              }
              </TableCell>
              <TableCell>
              {
                  stateLpu.storColed
              }
              </TableCell>
              <TableCell>
              {
                  stateLpu.transHuman
              }
              </TableCell>
              <TableCell>
              {
                new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                  //@ts-ignore
                }).format(parseFloat(stateLpu.transRub.toString()))
              }
              </TableCell>
              <TableCell>
              {
                  stateLpu.medPrice
              }
              </TableCell>
              <TableCell>
              {
                  stateLpu.dolgDead
              }
              </TableCell>
              <TableCell>
              ot palat
              </TableCell>
            </TableRow>
          </TableFooter>
          :
          ''
          }
        </Table>
      </div>
    </div>
    </>
  )
}

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