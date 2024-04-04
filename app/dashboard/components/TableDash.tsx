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
  const [isIndex, setIndex] = React.useState<number>()
  const [isStateLpu, setStateLpu] = React.useState<DashDepartment>()

  //getting data
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

  //finding index
  const onExist = () => {
    if(isTables && isDash) {
      return isTables.findIndex(el => el.id === isDash.id)
    }
  }

  //buttons change table data
  const next = () => {
    if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
  }
  const previous = (/**react.mouseevent */) => {
    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        //tut che to poticat podergat
        console.log('dash posle previousa', isDash)
      }//else setDisabledPrev true
    }
  }
  const datePick = () => {
    /*
    let res = isTables.findIndex(el => el.date.toString() === date?.toString())
    if(res !== -1) {
     //@ts-ignore
     setDash(isTables[res])
    }
    if(isIndex && isIndex !== -1 && isTables) {
      if(isIndex !== 0) {
        setIndex(isIndex - 1)
        setDash(isTables[isIndex])
        console.log('dash posle previousa', isDash)
      }
    }
        if(typeof isIndex === 'number' && isIndex !== -1 && isTables) {
      if(isIndex < isTables.length - 1) {
        setIndex(isIndex + 1)
        setDash(isTables[isIndex])
        console.log('dash posle nexta', isDash)
      }
    }
    */
  }

  //create Lpu department
  const isLpu = (deps: DashDepartment[] ) => {
    if(!deps) return undefined

    let withoutPal = deps.filter((dep) => {
      return dep.name.toLowerCase() !== "Паллиатив".toLowerCase()
    })

    if(!withoutPal) return undefined

    let LpuDep: DashDepartment = {
      id: 0,
      name: "по ЛПУ",
      createdAt: new Date(),
      updatedAt: new Date(),
      planHuman: isValue(withoutPal.map((dep) => {return dep.planHuman})),
      planRub:   isValue(withoutPal.map((dep) => {return dep.planRub})),
      begAcc:    isValue(withoutPal.map((dep) => {return dep.begAcc})),
      admRec:    isValue(withoutPal.map((dep) => {return dep.admRec})),
      disCome:   isValue(withoutPal.map((dep) => {return dep.disCome})),
      disTax:    isValue(withoutPal.map((dep) => {return dep.disTax})),
      patOver:   isValue(withoutPal.map((dep) => {return dep.patOver})),
      storColed: isValue(withoutPal.map((dep) => {return dep.storColed})),
      transHuman:isValue(withoutPal.map((dep) => {return dep.transHuman})),
      transRub:  isValue(withoutPal.map((dep) => {return dep.transRub})),
      medPrice:  isValue(withoutPal.map((dep) => {return dep.medPrice})),
      dolgDead:  isValue(withoutPal.map((dep) => {return dep.dolgDead})),
      dashId:    isDash? isDash.id : 0
    }

    return LpuDep
  }
  const isValue = (lpuValues: (number | null) []): number => {
    if(!lpuValues) return 0

    let lpuValue = lpuValues.reduce((sum: number, current) => {
      //@ts-ignore
      return sum + current
    }, 0)

  return lpuValue
  }

  useEffect(() => {
    getTables()
  }, [])

  useEffect(() => {
    if(isTables)
    setDash(isTables[isTables.length - 1])
    setDate(isDash?.date)
  }, [isTables])

  useEffect(() => {
    if(isTables && isDash)
      console.log('index', onExist())
      setIndex(onExist())
      console.log('dash', isDash)
  }, [isTables])

  useEffect(() => {
    if(isDash)
    setStateLpu(isLpu(isDash.table))
    //console.log(isLpu(isDash.table))
    //setDash(isDash?.table.splice(isDash.table.length - 2, 0 , isLpu(isDash.table)))
  }, [isDash])

  /*useEffect(() => {
    if(isTestDep && isDash)
    setDash({
      id: isDash.id,
      date: isDash.date,
      table: isDash.table
    })

  }, [isTables])*/
  return (
    <div className="w-full ml-4 mr-4">
      {
        date && isTables && isDash
        ?
        <>
          <DatePicker date={date} setDate={setDate} previous={previous} next={next} testDate={isDash.date}
            dashDates={isTables?.map((el) => {
              return new Date(el.date)
            })}
          />
          {isIndex}
          <DashItem data={isDash.table} isStateLpu={isStateLpu} />
        </>
        :
        <DashSkeleton/>
      }
    </div>
  )
}