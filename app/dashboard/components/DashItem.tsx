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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashDepartment, DashWard, Ward } from "@prisma/client"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Charts } from "./Charts"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { DashItemRow } from "./DashItemRow"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HiOutlineRectangleStack } from "react-icons/hi2"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface DashWithWards extends DashDepartment {
  totalStays: number,
  freeBeds: number,
  wards: DashWard[]
}

export const columns: ColumnDef<DashWithWards>[] = [
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
        header: "Всего находится в стационаре (чел.)",
        
        cell: ({ row }) => (

          <div className="capitalize">
            {row.getValue("totalStays")}
            {/*<>
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
                {//@ts-ignore
                //console.log(row.getValue("wards"))
                ////row.getValue("wards").map((i: any) => {
                  //return <p>{i.name}</p>
                //})
                
                //row.getUniqueValues("wards")
                }
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           </>*/}
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
      accessorKey: 'freeBeds',
      //id: "actions",
      header: "Свободных коек",
      enableHiding: false,
      cell: ({ row }) => {
        //const payment = row.original
        return (
          <div className="capitalize">
          {row.getValue('freeBeds')}
          {/*<DropdownMenu>
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
          </DropdownMenu>*/}
          </div>
        )
      },
    },
    {
      accessorKey: 'wards',
      //id: "actions",
      header: "Палаты",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{row.getValue('name')} палаты</DropdownMenuLabel>
            {//@ts-ignore
            row.getValue("wards").length !== 0
            ?//@ts-ignore
              row.getValue("wards").length < 6 
              ?
              <ScrollArea className="max-h-72 h-36 w-full rounded-md">

              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Номер</TableHead>
                    <TableHead>Кол-во мест</TableHead>
                    <TableHead>занято</TableHead>
                    <TableHead className="text-right">свободно</TableHead>
                    <TableHead className="text-right">резерв</TableHead>
                  </TableRow>
                </TableHeader>
                
              <TableBody>
                {//@ts-ignore
                row.getValue('wards').map((ward) => (
                  
                  <TableRow key={ward.id} className="m-0 p-0">

                    <TableCell className="font-medium text-center m-2 p-2">{ward.number}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.numberOfSeats}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.engaged}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.free}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.reserve}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1} className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    row.getValue("wards").length
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.numberOfSeats, 0)
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                  {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.engaged, 0)
                  }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                 {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.free, 0)
                  }
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            </ScrollArea>
              :
            <ScrollArea className="max-h-72 h-72 w-full rounded-md">

              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Номер</TableHead>
                    <TableHead>Кол-во мест</TableHead>
                    <TableHead>занято</TableHead>
                    <TableHead className="text-right">свободно</TableHead>
                    <TableHead className="text-right">резерв</TableHead>
                  </TableRow>
                </TableHeader>
                
              <TableBody>
                {//@ts-ignore
                row.getValue('wards').map((ward) => (
                  
                  <TableRow key={ward.id} className="m-0 p-0">

                    <TableCell className="font-medium text-center m-2 p-2">{ward.number}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.numberOfSeats}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.engaged}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.free}</TableCell>
                    <TableCell className="text-center m-0 p-0">{ward.reserve}</TableCell>

                  </TableRow>
                ))}
              </TableBody>
              
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1} className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    row.getValue("wards").length
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.numberOfSeats, 0)
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                  {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.engaged, 0)
                  }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                 {//@ts-ignore
                    row.getValue("wards").reduce((acc, currentValue) => acc + currentValue.free, 0)
                  }
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            </ScrollArea>
            :
            <p className="ml-2">палат не обнаружено</p>
            }
              
              <DropdownMenuItem>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          </>
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
  const [isData, setData] = useState<any>([])
  const table = useReactTable({
    data: isData,
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
  const [isWardsNow, setWardsNow] = useState<Ward[]>([])
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

  let onSortDepartmentWards = (wards: any) => {
    //let filtredArr = wards.map((ward) => {
     // return 
    //})
    
    //let filteredArr = wards.filter((ward) => {
    //  return ward.number === 
    //})

    /**let uniqSet = new Set()
    //let testSet = new Set()
    //let uniqSet = []
    let testSet = []
    for(let i = 0; i < wards.length; i++) {
      for(let j = 0; j < i; j++) {
        if(wards[j].number === wards[i].number) {
          uniqSet.add(wards[i])
          //uniqSet.push(wards[i])
        }// else {
          //testSet.add(wards[j])
          //testSet.push(wards[j])
        //}
      }
    }

    let uniq = Array.from(uniqSet)//uniqSet//
   // let test = testSet//Array.from(testSet)
    //console.log(uniq)

    return [...uniq, [...wards]]*/

    let res: DashWard[] = []
    console.log(res)
    for(let i = 0; i < wards.length; i++) {
     let duplicate = wards.filter((w: any) => w.number === wards[i].number)

     if(duplicate)
      if(duplicate.length === 1){
        res.push(wards[i])
      } else if(duplicate.length > 1){

        wards.splice(i, 1)

        res = [...res, duplicate]

        let onS = wards.findIndex((w: any) => w.number === wards[i].number)
        console.log(onS)
        if(onS)
          wards.splice(onS, 1)
         //res = [...res, duplicate]

        //res = [...res]

      } else res = [...res]

    }

    return res
  /*let sorted = wards.slice().sort((a, b) =>  a.number - b.number)
  console.log(sorted)
  let results = [];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1].number === sorted[i].number) {
      results.push(sorted[i]);
    }

  }
  let testRes = []
  if(results)
  for (let j = 1; j < results.length; j++) {
    if (results[j - 1].number === results[j].number) {
      testRes.push(results[j]);
    }

  }
  console.log(testRes)
  let test = Array.from(new Set(results))*/

  //return [...test]

  //const findUniqueDuplicates = (arr: DashWard[]) => arr.filter((e, i, a) => a.indexOf(e) !== i && a.lastIndexOf(e) === i);

  //return findUniqueDuplicates(wards)



  }

  let getWardsDeparment = async () => {
    try {

            //получение палат которые на данный момент
      let resultNowWards = await axios.get(`/api/ward`)

      if (resultNowWards.status !== 200)  throw new Error()
      if(!resultNowWards.data) throw new Error()
      
      setWardsNow(resultNowWards.data)

      let dashDepsWithId = await findDepartmentId()

      if (!dashDepsWithId)  throw new Error()

     //console.log(dashDepsWithId)

     for(let i = 0; i < dashDepsWithId.length; i++) {
      //@ts-ignore
      let resultWards = await axios.get(`/api/dash/ward/${dashDepsWithId[i].defaultDepsId}`)

      if (resultWards.status !== 200)  throw new Error()
      if(!resultWards.data) throw new Error()

       // console.log(resultWards.data)
        //замапить результ на ближайшее время еще статус не забудь еще резерв по номеру палаты!
      //по номеру палаты после по фильтра по дню?

      
      //@ts-ignore
      dashDepsWithId[i].wards = resultWards.data
      //фильтр чтобы были палата только ДО даты даша
      //@ts-ignore
      if(dashDepsWithId[i].wards) {
        //@ts-ignore
       let withoutAfterWards =  dashDepsWithId[i].wards.filter((ward) => {

        //НЕ ЗАБУДЬ ПОМЕНЯТЬ СТРЕЛОЧКУ ПОВЕРНИ
        return new Date(ward.updatedAt ).getTime() >= new Date(date).getTime()
       }).filter((ward: any) => {
        return ward.status !== 'deleted' && ward.status !== 'disabled'
       })
       //console.log(withoutAfterWards)
       //@ts-ignore
       dashDepsWithId[i].wards = withoutAfterWards
       //@ts-ignore
      // dashDepsWithId[i].wards = onSortDepartmentWards(dashDepsWithId[i].wards)
       //отсев левых
       //сортировка по дате
       //полученные
       //отданные
       //удаленные нахуй
       console.log(onSortDepartmentWards(dashDepsWithId[i].wards))
       //В КОНЦЕ ДОЛЖНО БЫТЬ
      //@ts-ignore
      dashDepsWithId[i].totalStays = dashDepsWithId[i].wards.reduce((acc, currentValue) => acc + currentValue.engaged, 0)
      //@ts-ignore
      dashDepsWithId[i].freeBeds = dashDepsWithId[i].wards.reduce((acc, currentValue) => acc + currentValue.free, 0)
      }

     }
     setData(dashDepsWithId.sort((a:DashDepartment, b:DashDepartment) => {
      if(a.id > b.id) return 1
      if(a.id < b.id) return -1
      return 0
    }))

    } catch  (error){
      toast.error(`ошибка при получении палат: ${(error as Error).message}`)
    }
  }

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
    <div className="w-full mr-2 ml-2">
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
              <TableCell>

              <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-0 pl-2 pr-2"> <HiOutlineRectangleStack size={25}/> </Button>
      </DialogTrigger>
   
      <DialogContent className="sm:max-w-[924px] cursor-pointer">
        <DialogHeader>
          <DialogTitle>Палаты отделений</DialogTitle>
          <DialogDescription>
           {/**  Make changes to your profile here. Click save when you're done.*/}
          </DialogDescription>
        </DialogHeader>

                <Tabs defaultValue="inTime">
                  <TabsList>
                    <TabsTrigger value="inTime">на тот момент</TabsTrigger>
                    <TabsTrigger value="inNow">на данный момент</TabsTrigger>
                  </TabsList>



                  <TabsContent value="inTime">
                  in time in time in time
                  </TabsContent>



                  <TabsContent value="inNow">
                    <Table>
                  <ScrollArea className="h-96 w-full rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Номер</TableHead>
                    <TableHead className="text-center">Кол-во мест</TableHead>
                    <TableHead  className="text-center">занято</TableHead>
                    <TableHead className="text-center">свободно</TableHead>
                    <TableHead className="text-center">резерв</TableHead>
                  </TableRow>
                </TableHeader>
                
              <TableBody>

              {
              isWardsNow
              ?
              isWardsNow.map((row) => {
                return <TableRow key={row.id} className="m-0 p-0">
                          <TableCell className="font-medium text-center m-2 p-2">{row.number}</TableCell>
                          <TableCell className="text-center">{row.numberOfSeats}</TableCell>
                          <TableCell className="text-center">{row.engaged}</TableCell>
                          <TableCell className="text-center">{row.free}</TableCell>
                          <TableCell className="text-center">{row.reserve}</TableCell>
                        </TableRow>
              })
              :
              ''
            }
              </TableBody>
              </ScrollArea>
            </Table></TabsContent>
        </Tabs>


              

      </DialogContent>
    </Dialog>
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