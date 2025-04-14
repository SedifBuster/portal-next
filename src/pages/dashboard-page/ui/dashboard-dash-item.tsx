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

import { DashDepartment, DashWard, Department, Profile, Ward } from "@prisma/client"
import { ArrowUpDown } from "lucide-react"
import { Charts } from "./dashboard-charts"
import axios from "axios"

import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { DashItemRow } from "./dashboard-dash-item-row"


import { HiOutlineRectangleStack } from "react-icons/hi2"

import clsx from "clsx"
import { Button } from "@/src/shared/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/shared/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/ui/dialog"
import { ScrollArea } from "@/src/shared/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { Label } from "recharts"
import { DashWardExplore } from "../../lkPage/ui/DashWardExplore"



interface DashWithWards extends DashDepartment {
  totalStays?: number,
  freeBeds?: number,
  wards?: DashWard[],
  defaultDepsId?: number
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
        let given: any | undefined = {}

         // given = columns.find((depart: any) => {
          //console.log(dep.id)
          //return Number(row.reserve) === depart.id
         // })
         // console.log('given', given)
  
        return (
          <>
          {/*<DropdownMenu>
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
                  
                  <TableRow key={ward.id} className= {clsx(`m-0 p-0`,
                      typeof Number(ward.reserve) === typeof 'number' &&'bg-orange-100'
                    )}>

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
                  
                  <TableRow key={ward.id} className={clsx(`m-0 p-0`,
                   typeof Number(ward.reserve) === typeof 'number' && 'bg-orange-100'
                   )}>

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
          </DropdownMenu>*/}
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
  }
) {
    const [department, setDepartment] = useState<Department>()
    const [profile, setProfile] = useState<Profile>()
    const [wards, setWards] = useState<Ward[]>([])
    const [takenWards, setTakenWards] = useState<Ward[]>([])
    const [departments, setDepartments] = useState<Department[]>()

    let getDepartments =async () => {
        let result = await axios.get('/api/department')
        setDepartments(result.data)
    }


    const [isTo, setTo] = useState<Department>()
    const [isXo, setXo] = useState<Department>()
    const [isHo, setHo] = useState<Department>()
    const [isReab, setReab] = useState<Department>()

    let getWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenWards(takenWards)

        }
    }

    useEffect(() => {
        getDepartments()
    }, [])

    useEffect(() => {
      let interval = setInterval(() => {
      getDepartments()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

    useEffect(() => {
        if(departments) {
            let ToName = departments.filter((dep) => {return dep.name === "ТО"})
            setTo(ToName[0])
            let XoName = departments.filter((dep) => {return dep.name === "ХО"})
            setXo(XoName[0])
            let HoName = departments.filter((dep) => {return dep.name === "НО"})
            setHo(HoName[0])
            let ReabName = departments.filter((dep) => {return dep.name === "Реаб"})
            setReab(ReabName[0])
        }
    }, [departments])

    useEffect(() => {
        if(departments) {
            if(isTo) {
                //@ts-ignore
                getToWards(isTo.id)
            }
            if(isXo) {
                //@ts-ignore
                getXoWards(isXo.id)
            }
            if(isHo) {
                //@ts-ignore
                getHoWards(isHo.id)
            }
            if(isReab) {
                //@ts-ignore
                getReabWards(isReab.id)
            }
        }
    }, [departments])

    useEffect(() => {
        let interval = setInterval(() => {
            //console.log('update now wards')

           // console.log(isTo?.id)
            //if(department) {
                if(isTo) {
                    //@ts-ignore
                    getToWards(isTo.id)
                }
                if(isXo) {
                    //@ts-ignore
                    getXoWards(isXo.id)
                }
                if(isHo) {
                    //@ts-ignore
                    getHoWards(isHo.id)
                }
                if(isReab) {
                    //@ts-ignore
                    getReabWards(isReab.id)
                }
           // }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    //указатель на то что палата отдана другим или взята из другого отделения
    //приемник своя даш панель- потом
    const [Towards, setToWards] = useState<Ward[]>([])
    const [Xowards, setXoWards] = useState<Ward[]>([])
    const [Howards, setHoWards] = useState<Ward[]>([])
    const [Reabwards, setReabWards] = useState<Ward[]>([])

    const [takenToWards, setTakenToWards] = useState<Ward[]>([])
    const [takenXoWards, setTakenXoWards] = useState<Ward[]>([])
    const [takenHoWards, setTakenHoWards] = useState<Ward[]>([])
    const [takenReabWards, setTakenReabWards] = useState<Ward[]>([])

  

    let getToWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setToWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenToWards(takenWards)
            
        }
    }
    //console.log(Towards)
    let getXoWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setXoWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenXoWards(takenWards)

        }
    }
    let getHoWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setHoWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenHoWards(takenWards)

        }
    }
    let getReabWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setReabWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenReabWards(takenWards)
        }
    }

    let givenFree = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.free
            }, 0)
        else return 0
    }

    let givenEngaged = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.engaged
            }, 0)
        else return 0
    }

    let givenNumberofSeats = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.numberOfSeats
            }, 0)
        else return 0
    }


    let blockedFree = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.free
            }, 0)
        else return 0
    }

    let blockedEngaged = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.engaged
            }, 0)
        else return 0
    }

    let blockedNumberofSeats = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.numberOfSeats
            }, 0)
        else return 0
    }


    //DEPNURSTAFF //зам по среднему мед персоналу - менеджит койки/ создание/резерв по распоряжению
    //CHIEFNURSE //главная медсестра - менеджит койки/ создание/резерв по распоряжению



  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
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
  const [chartData, setChartData] = useState<DashDepartment[]>()
  const [isWardsNow, setWardsNow] = useState<Ward[]>([])
  const [isDeparmentsNow, setDeparmentsNow] = useState<any[]>([])
  //const [isTaken, setTaken] = useState<any[]>([])
  //@ts-ignore
  let isChartData = data.filter((i) => i.name.toLowerCase() !== "Паллиатив".toLowerCase()).concat([stateLpu])
  useEffect(() => {
    if(data && stateLpu) {
      setChartData(isChartData)
    }
  }, [data, stateLpu])

  useEffect(() => {
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
      setDeparmentsNow(result.data)
     // testDep = result.data
    let deps = onSortedDepartments(result.data).filter((i) => {return i.name.toLowerCase() !== 'IT'.toLowerCase()})

    let dashDeps = onSortedDepartments(data)

    let dashDepsWithId: DashDepartment[] = dashDeps.map((dep: DashDepartment, index) => {
      return {...dep, defaultDepsId: deps[index].id}
    })

    return dashDepsWithId
  }

  let onSortDepartmentWards = (wards: DashWard[]) => {
    let sortedWards = wards.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())//wards.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
   // console.log("sortedWards" , sortedWards)

    let res: DashWard[] = []
    for(let i = 0; i < wards.length; i++) {
     let onFindDuplicate = sortedWards
     .filter((w: DashWard) => w.number === wards[i].number)

     if(onFindDuplicate)

      if(onFindDuplicate.length === 1) res = [...res, onFindDuplicate[0]]

      else {

        if(res.length > 1)
          if(!res.some((ward: DashWard) => ward.number === onFindDuplicate[0].number)) {
        //console.log(res.some((ward: DashWard) => ward.number === onFindDuplicate[0].number))
            res = [...res, onFindDuplicate[onFindDuplicate.length - 1]]

          }


      }

    }
   // console.log('конечный результат',res)
    return res
  }



  let getWardsDeparment = async () => {
    try {
      //получение палат которые на данный момент
      let resultNowWards = await axios.get(`/api/ward`)
        if( resultNowWards.status !== 200 ) throw new Error()
        if( !resultNowWards.data ) throw new Error()
      setWardsNow( resultNowWards.data )
      //ищем и связываем id отделений
      let dashDepsWithId: DashWithWards[] = await findDepartmentId()
        if( !dashDepsWithId ) throw new Error()


      /*for(let i = 0; i < dashDepsWithId.length; i++) {
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


       dashDepsWithId[i].wards = onSortDepartmentWards(dashDepsWithId[i].wards)
       //В КОНЦЕ ДОЛЖНО БЫТЬ
      //@ts-ignore
      dashDepsWithId[i].totalStays = dashDepsWithId[i].wards.reduce((acc, currentValue) => acc + currentValue.engaged, 0)
      //@ts-ignore
      dashDepsWithId[i].freeBeds = dashDepsWithId[i].wards.reduce((acc, currentValue) => acc + currentValue.free, 0)
      }

     }*/
      
      /*let releaseArr = await Promise.all(dashDepsWithId.map((dep) => {
        try{
          let resultWards = await axios.get(`/api/dash/ward/${dep.defaultDepsId}`)
            if (resultWards.status !== 200)  throw new Error()
            if(!resultWards.data) throw new Error()

          dep.wards = resultWards.data

          let withoutAfterWards: DashWard[] = []

          if(dep.wards)
            withoutAfterWards =  dep.wards.filter((ward) => {
            //НЕ ЗАБУДЬ ПОМЕНЯТЬ СТРЕЛОЧКУ ПОВЕРНИ
              return new Date(ward.updatedAt ).getTime() >= new Date(date).getTime()
             }).filter((ward: any) => {
              return ward.status !== 'deleted' && ward.status !== 'disabled'
             }) 

             dep.wards = withoutAfterWards

             
           dep.wards = onSortDepartmentWards(dep.wards)
           //В КОНЦЕ ДОЛЖНО БЫТЬ
          //@ts-ignore
          dep.totalStays = dep.wards.reduce((acc, currentValue) => acc + currentValue.engaged, 0)
          //@ts-ignore
          dep.freeBeds = dep.wards.reduce((acc, currentValue) => acc + currentValue.free, 0)
           setData(dashDepsWithId.sort((a:DashDepartment, b:DashDepartment) => {
            if(a.id > b.id) return 1
            if(a.id < b.id) return -1
            return 0
          }))

          return dep
        }catch {

      }
      } 
  )
    ) 

      console.log(releaseArr)*/

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
          return new Date(ward.updatedAt ).getTime() <= new Date(date).getTime()
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
  
  
         dashDepsWithId[i].wards = onSortDepartmentWards(dashDepsWithId[i].wards)
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
  //console.log(isDeparmentsNow)

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
      <div className="rounded-md border ml-2 mr-2">
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
                {isData && isData[0] &&  isData[0].totalStays?isData.reduce((a: any, b: any) => {
                    return a + b.totalStays
                }, 0)
                : 
                0}
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
              {isData && isData[0] &&  isData[0].freeBeds?isData.reduce((a: any, b: any) => {
                    return a + b.freeBeds
                }, 0)
                : 
                0}
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
                  <ScrollArea className="h-[38rem] w-full rounded-md">
                  {
                    isData && isData[0] && isData[0].wards?
                    isData.map((dep: any) => {
                      let takenWards: any = []
                      if( dep.wards.length > 0)
                      return <div key={dep.id}>
                        <Label className="">{dep.name}</Label>
                        <Table>
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
              dep.wards
              ?
              dep.wards.map((row: any) => {
                  //отданные
                   let given: any | undefined = {}
                   let takenId: any
                   let taken: any | undefined = []
                   if(isDeparmentsNow) {


                     given = isDeparmentsNow.find((depart: any) => {
                     //console.log(dep.id)
                     return Number(row.reserve) === depart.id
                     })


                     //taken = dep.wards.filter((ward: DashWard) => {
                      
                     // console.log(dep.id)
                     // return Number(ward.reserve) === dep.id
                    //})
                      takenId = isDeparmentsNow.filter((depart: any) => {
                        return Number(row.reserve) === depart.id
                      })

                      if(takenId && takenId[0]) {
                        //console.log(takenId.id)
                        taken = dep.wards.filter((ward: DashWard) => {
                          return Number(ward.reserve) === takenId[0].id
                        })
                      }


                    //console.log(taken)
                    if(taken && row)
                      //console.log('row',row)
                    takenWards = [...takenWards, ...taken]
                    //console.log(takenWards)

                   }

                return <TableRow key={row.id} className={ clsx(`m-0 p-0`,
                  given && 'bg-orange-100'
                  )}>
                            <TableCell className="font-medium text-center m-2 p-2">{row.number}</TableCell>
                            <TableCell className="text-center">{row.numberOfSeats}</TableCell>
                             <TableCell className="text-center">{row.engaged}</TableCell>
                            <TableCell className="text-center">{row.free}</TableCell>
                            <TableCell className="text-center">{given? given.name :row.reserve}</TableCell>
                            
                          </TableRow>
              })
              :
              ''
              }
              {
              /*
                takenWards
                ?
                takenWards.filter((ward: DashWard) => {
                  console.log(ward.number)
                  console.log(dep.defaultDepsId)
                  return Number(ward.reserve) === dep.defaultDepsId
                }).map((row:any) => {
                  return <TableRow key={row.id} className={ clsx(`m-0 p-0 bg-lime-100`
                    )}>
                              <TableCell className="font-medium text-center m-2 p-2">{row.number}</TableCell>
                              <TableCell className="text-center">{row.numberOfSeats}</TableCell>
                               <TableCell className="text-center">{row.engaged}</TableCell>
                              <TableCell className="text-center">{row.free}</TableCell>
                              <TableCell className="text-center">{/*given? given.name :row.reserve}</TableCell>
                              
                            </TableRow>
                })

                :
                ''
              */
              }
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1} className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    dep.wards.length
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                    {//@ts-ignore
                    dep.wards.reduce((acc, currentValue) => acc + currentValue.numberOfSeats, 0)
                    }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                  {//@ts-ignore
                    dep.wards.reduce((acc, currentValue) => acc + currentValue.engaged, 0)
                  }
                  </TableCell>
                  <TableCell className="font-medium text-center m-2 p-2">
                 {//@ts-ignore
                    dep.wards.reduce((acc, currentValue) => acc + currentValue.free, 0)
                  }
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
                            </div>
                            else <Label>sad</Label>
                    })
                    :
                    ''
                  }
                  </ScrollArea>
                  </TabsContent>

                  <TabsContent value="inNow">




                  <ScrollArea className="h-[38rem] w-full rounded-md">




              {
              isWardsNow
              ?
        <div
            className="
            bg-white
            p-2
            flex
            flex-col
            gap-1
            "
        >
                <div className="rounded-md border basis-4/5">
                    <div className="">
                        <h1 className="text-center mt-4 mb-2 text-lg font-bold">Сводка по местам</h1>
                        <h4 className="ml-2 font-medium">{new Date().toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h4>
                        <h4 className="ml-2 font-medium">Отделение: {isTo?.name}</h4>
                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>

                    </div>
                    <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isTo ? Towards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getToWards} depId={isTo.id} grade={profile?.grade} />
                            )) : ''}
                            {isTo ? takenToWards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getToWards} depId={isTo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Towards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenToWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Towards)
                                        - blockedNumberofSeats(Towards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Towards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenToWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Towards) -
                                    blockedEngaged(Towards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Towards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenToWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Towards) -
                                    blockedFree(Towards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <h4 className="ml-2 font-medium">Отделение: {isXo?.name}</h4>

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isXo ? Xowards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getXoWards} depId={isXo.id} grade={profile?.grade} />
                            )) : ''}
                            {isXo ? takenXoWards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getXoWards} depId={isXo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Xowards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenXoWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Xowards) - 
                                        blockedNumberofSeats(Xowards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Xowards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenXoWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Xowards) - 
                                    blockedEngaged(Xowards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Xowards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenXoWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Xowards) -
                                    blockedFree(Xowards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <h4 className="ml-2 font-medium">Отделение: {isHo?.name}</h4>

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isHo ? Howards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getHoWards} depId={isHo.id} grade={profile?.grade} />
                            )) : ''}
                            {isHo ? takenHoWards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getHoWards} depId={isHo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Howards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenHoWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Howards) -
                                        blockedNumberofSeats(Howards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Howards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenHoWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Howards) -
                                    blockedEngaged(Howards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Howards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenHoWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Howards) - 
                                    blockedFree(Howards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <h4 className="ml-2 font-medium">Отделение: {isReab?.name}</h4>
                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isReab ? Reabwards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getReabWards} depId={isReab.id} grade={profile?.grade} />
                            )) : ''}
                            {isReab ? takenReabWards.map((invoice) => (
                                <DashWardExplore ward={invoice} key={invoice.id} getWards={getReabWards} depId={isReab.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Reabwards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenReabWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Reabwards) -
                                        blockedNumberofSeats(Reabwards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Reabwards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenReabWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Reabwards)
                                    - blockedEngaged(Reabwards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Reabwards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenReabWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Reabwards) -
                                    blockedFree(Reabwards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            


        </div>
              :
              ''
            }
                                </ScrollArea>
 </TabsContent>
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


      /*                    <Table>
                  <ScrollArea className="h-[38rem] w-full rounded-md">
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
             </ScrollArea>
            </Table>
*/
              