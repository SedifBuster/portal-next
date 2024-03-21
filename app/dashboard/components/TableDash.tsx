"use client"

import * as React from "react"
import { DatePicker } from "./DatePicker"
import axios from "axios"
import { useEffect, useState } from "react"
import { Dash, DashDepartment } from "@prisma/client"
import toast from "react-hot-toast"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"

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

  const onNextDash = (type: 'next' | 'previous' | 'date') => {
  if(isTables && isDash) {
  let index = isTables.findIndex(el => el.id === isDash.id)
  console.log('testIndex' ,index)

  switch(type) {

    case 'next': 
    console.log('next')
    //return () => {
      //@ts-ignore
      if(index < isTables.length) {
        index --
        //@ts-ignore
        setDash(isTables[index])
        console.log(isDash)
        break
      }
    //}

    case 'previous':
    console.log('previos')
    return () => {
      //@ts-ignore
      if(index !== 0 && index < isTables.length) {
        index --
        //@ts-ignore
        setDash(isTables[index])
      }
    }

    case 'date':
      console.log('date')
      return () => {
        //@ts-ignore
       let res = isTables.findIndex(el => el.date.toString() === date?.toString())
       if(res !== -1) {
        //@ts-ignore
        setDash(isTables[res])
       }
      }

    default:
      return () => undefined
  }
}
  }



  useEffect(() => {
    if(isTables && isDash)
    //onNextDash('next')
  console.log(onNextDash('next'))
  }, [isTables])
  

  return (
    <div className="w-full ml-4 mr-4">
      {
        date && isTables && isDash
        ?
        <>
          <DatePicker date={date} setDate={setDate}
          dashDates={isTables?.map((el) => {
            return new Date(el.date)
          })}
          />
          <DashItem data={isDash.table} />
        </>
        :
        <DashSkeleton/>
      }
    </div>
  )
}


//switch case
/*return () => {
const value = array[index]
if(index < array.length) {
index ++
}
console.log(isDash)
console.log(value)
return value
}*/