"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import * as React from "react"

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
import { Department, Profile, Ward } from "@prisma/client"
import { UserCard } from "../Card"
import { CreateWardSheet } from "../CreateWardSheet"
import { UserWard } from "../Ward"

export function User() {
    const session = useSession()

    const [department, setDepartment] = useState<Department>()
    const [profile, setProfile] = useState<Profile>()
    const [wards, setWards] = useState<Ward[]>([])
    const [takenWards, setTakenWards] = useState<Ward[]>([])

    let getProfile = async (id: number) => {
        let result = await axios.get(`/api/users/profile/${id}`)
        setProfile(result.data)
    }
    let getDepartment = async (id: number) => {
        let result = await axios.get(`/api/department/${id}`)
        setDepartment(result.data)
    }

    let getWards = async (id: number) => {
        let result = await axios.get('/api/ward')
            if(result.data && department) {
               let filteredWards =  result.data.filter((ward: Ward) => {
                    return ward.depId === id})
                setWards(filteredWards)
               let takenWards = result.data.filter((ward: Ward) => {
                    return Number(ward.reserve) === id
               })
               setTakenWards(takenWards)

            }
    }

    useEffect(() => {
        if (session.status === "authenticated" && typeof session.data.user !== 'undefined') {
            getProfile(Number(session.data.user.id))
        }
    }, [])

    useEffect(() => {
        if (profile) {
            getDepartment(profile.depId)
        }

    }, [profile])

    useEffect(() => {
        if(department) {
            getWards(department.id)
        }
    }, [department])

    //указатель на то что палата отдана другим или взята из другого отделения
    //приемник своя даш панель- потом

    let givenFree = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment = 
            Number(ward.reserve)/*строка реверс ищем айди*/  !== department?.id/*айди департамента*/
            &&
            ward.reserve
            &&
            !isNaN(Number(ward.reserve))

            return  nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if(result) 
        return result.reduce((sum, current) => {
            return sum + current.free
        }, 0)
        else return 0 
    }

    let givenEngaged = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment = 
            Number(ward.reserve)/*строка реверс ищем айди*/  !== department?.id/*айди департамента*/
            &&
            ward.reserve
            &&
            !isNaN(Number(ward.reserve))

            return  nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if(result) 
        return result.reduce((sum, current) => {
            return sum + current.engaged
        }, 0)
        else return 0 
    }

    let givenNumberofSeats = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment = 
            Number(ward.reserve)/*строка реверс ищем айди*/  !== department?.id/*айди департамента*/
            &&
            ward.reserve
            &&
            !isNaN(Number(ward.reserve))

            return  nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if(result) 
        return result.reduce((sum, current) => {
            return sum + current.numberOfSeats
        }, 0)
        else return 0 
    }

    return (
        <div
            className="
            bg-white
            p-4
            flex
            gap-4
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
                    <h4 className="ml-2 font-medium">Отделение: {department?.name}</h4>
                    {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ? 
                       department? <CreateWardSheet depId={department.id} getWards={getWards}/> : ''
                        : 
                        ""
                    }
                    
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
                        {department?wards.map((invoice) => (
                            <UserWard ward={invoice}  key={invoice.id} getWards={getWards} depId={department.id} grade={profile?.grade} />
                        )):''}
                        {department?takenWards.map((invoice) => (
                            <UserWard ward={invoice}  key={invoice.id} getWards={getWards} depId={department.id} taken={true}  grade={profile?.grade}  />
                        )):''}
                    </TableBody>

                    <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                        <TableCell className="text-left">
                                            {
                                             wards.reduce((sum, current) => {
                                                    return sum + current.numberOfSeats
                                                }, 0) + 
                                                takenWards.reduce((sum, current) => {
                                                    return sum + current.numberOfSeats
                                                }, 0) -
                                                givenNumberofSeats(wards)
                                            }
                                                </TableCell>
                                        <TableCell className="text-right">Занято:</TableCell>
                                        <TableCell className="text-left">{
                                             wards.reduce((sum, current) => {
                                                    return sum + current.engaged
                                                }, 0) + 
                                                takenWards.reduce((sum, current) => {
                                                    return sum + current.engaged
                                                }, 0) -
                                                givenEngaged(wards)
                                            }</TableCell>
                                        <TableCell className="text-right">Свободно:</TableCell>
                                        <TableCell className="text-left">{
                                             wards.reduce((sum, current) => {
                                                    return sum + current.free
                                                }, 0) + 
                                                takenWards.reduce((sum, current) => {
                                                    return sum + current.free
                                                }, 0) -
                                                givenFree(wards)
                                            }</TableCell>
                                    </TableRow>
                                </TableFooter>
                </Table>
            </div>

            <div className="flex justify-end mr-2 mb-2 h-64">
                {department && profile ?<UserCard department={department} profile={profile} name={session.data?.user.name} /> : ''}
            </div>
        </div>
    )

}

/*                <Input
                    placeholder="фильтр палат..."
                    value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("number")?.setFilterValue(event.target.value)
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



                
    const columns: ColumnDef<Ward>[] = [
        {
            accessorKey: "number",
            header: "Палата №",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("number")}</div>
            ),
        },
        {
            accessorKey: "numberOfSeats",
            header: "кол-во мест",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("numberOfSeats")}</div>
            ),
        },
        {
            accessorKey: "engaged",
            header: "занято",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("engaged")}</div>
            ),
        },
        {
            accessorKey: "free",
            header: "свободно",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("free")}</div>
            ),
        },
        {
            accessorKey: "gender",
            header: "пол",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("gender")}</div>
            ),
        },
        {
            accessorKey: "reserve",
            header: "резерв по распоряжению",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("reserve")}</div>
            ),
        },
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
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
                */