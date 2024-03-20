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
import axios from "axios"
import { useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"

export
  interface DashInit extends Dash {
    table: DashDepartment[]
}

export
  function DataTable(
) {
  const [isTables, setTables] = useState<DashInit[]>()
  const [isDash, setDash] = React.useState<DashInit>()
  const [date, setDate] = React.useState<Date>()
  let getTables = async () => {
    try {
      let result = await axios.get('/api/dash')
      if (result.status === 200) {
        toast.success(`таблицы код ${result.status}`)
        let resultDep = await axios.get('/api/dash/department')
        toast.success(`отделения код ${resultDep.status}`)
        if(resultDep.data && result.data) {
          console.log(resultDep.status)
         let filteredDashes = result.data.map((item: Dash) => {
            return {...item, table: resultDep.data.filter((dep: DashDepartment) => {
             return dep.dashId === item.id
            })}
          })
          console.log(filteredDashes)
          setTables(filteredDashes)
        }
      }
    } catch {
      console.log('error')
    }
  }
  useEffect(() => {
    getTables()
  }, [])
  useEffect(() => {
    if(isTables)
    setDash(isTables[isTables.length - 1])
    setDate(isDash?.date)
  }, [isTables])

  return (
    <div className="w-full ml-4 mr-4">
      {
        date && isTables && isDash
        ?
        <>
        <DatePicker date={date} setDate={setDate} dashDates={isTables?.map((el) => {
          return new Date(el.date)
        })}/>
        <DashItem data={isDash.table} />
        </>
        :
        ""
      }
    </div>
  )
}