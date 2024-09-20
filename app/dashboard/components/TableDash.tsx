'use client'

import * as React from "react"
import { useEffect, useState } from "react"
import { Dash, DashDepartment, Department } from "@prisma/client"
import { DashItem } from "./DashItem"
import { DashSkeleton } from "./DashSkeleton"
import { DashPagination} from "./DashPagination"
import {toast} from "react-hot-toast"
import axios from "axios"

export
  interface DashInit extends Dash { table: DashDepartment[]}

export
  function TableDash({

  }: {
    //onGetDashs?: Promise<Dash[]>
    //onGetDeps?: Promise<DashDepartment[]>
  }
) {


  async function onGetDashs() {
    try {
      const response = await axios.get('/api/dash')
      console.log(response.data)
      if (response.status !== 200 && typeof response === typeof 'undefined') throw new Error('Failed to fetch dash data')
        
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  
  async function onGetDeps() {
    try {
      const response = await axios.get('/api/dash/department')
      console.log(response.data)
      if (response.status !== 200 && typeof response !== typeof 'undefined') throw new Error('Failed to fetch dep data')
  
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const [isTables, setTables] = useState<DashInit[]>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(1)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentItems = isTables?.slice(firstItemIndex, lastItemIndex)

  //filtered data
  const onFilterDashes = (dashes: Dash[], depaprtments: DashDepartment[]) => {
    console.log(dashes)
    let filteredDashes = dashes.map((item) => {
      return {...item, table: depaprtments.filter((dep) => {
        return dep.dashId === item.id
      })}
    })
    return filteredDashes
  }

  //getting data
  const getTables = async (tables: Promise<Dash[]>, deps: Promise<DashDepartment[]>) => {
    try {
      const loadToast = toast.loading('Загрузка...')
      let resultDashs = await tables
      let resultDeps = await deps

      if(!resultDashs && !resultDeps) throw new Error()
      toast.dismiss(loadToast)
      toast.success('Данные успешно загружены')

      setTables(onFilterDashes(resultDashs, resultDeps).reverse())
    } catch (error) {
      toast.error( `Ошибка при получении данных: ${error}` )
    }
  }

  //need refactoring
  const setupReduce = (table: DashDepartment[], name: string): number => {
   let withoutPal = table.filter((item) => { return item.name.toLowerCase() === "Паллиатив".toLowerCase()} )
    switch(name) {
      case "planHuman":
        let resultPlanHuman = table.reduce((sum, current) => {
          if(typeof current.planHuman === "number")
            return sum + current.planHuman
          else return 0
        }, 0)

        if(resultPlanHuman && withoutPal && withoutPal[0].planHuman)
          return resultPlanHuman - withoutPal[0].planHuman
        else return resultPlanHuman

      case "planRub":
        let resultPlanRub = table.reduce((sum, current) => {
          if(typeof current.planRub === "number")
            return sum + current.planRub
          else return 0
        }, 0)

        if(resultPlanRub && withoutPal && withoutPal[0].planRub)
          return resultPlanRub - withoutPal[0].planRub
        else return resultPlanRub

        case "begAcc":
          let resultBegAcc = table.reduce((sum, current) => {
            if(typeof current.begAcc === "number")
              return sum + current.begAcc
            else return 0
          }, 0)
  
          if(resultBegAcc && withoutPal && withoutPal[0].begAcc)
            return resultBegAcc - withoutPal[0].begAcc
          else return resultBegAcc

        case "admRec":
          let resultAdmRec = table.reduce((sum, current) => {
            if(typeof current.admRec === "number")
              return sum + current.admRec
            else return 0
          }, 0)

          if(resultAdmRec && withoutPal && withoutPal[0].admRec)
            return resultAdmRec - withoutPal[0].admRec
          else return resultAdmRec
  
        case "disCome":
          let resultDisCome = table.reduce((sum, current) => {
            if(typeof current.disCome === "number")
              return sum + current.disCome
            else return 0
          }, 0)

          if(resultDisCome && withoutPal && withoutPal[0].disCome)
            return resultDisCome - withoutPal[0].disCome
          else return resultDisCome

        case "disTax":
          let resultDisTax = table.reduce((sum, current) => {
            if(typeof current.disTax === "number")
              return sum + current.disTax
            else return 0
          }, 0)

          if(resultDisTax && withoutPal && withoutPal[0].disTax)
            return resultDisTax - withoutPal[0].disTax
          else return resultDisTax

        case "patOver":
          let resultPatOver = table.reduce((sum, current) => {
            if(typeof current.patOver === "number")
              return sum + current.patOver
            else return 0
        }, 0)

        if(resultPatOver && withoutPal && withoutPal[0].patOver)
          return resultPatOver - withoutPal[0].patOver
        else return resultPatOver

          case "storColed":
            let resultStorColed = table.reduce((sum, current) => {
              if(typeof current.storColed === "number")
                return sum + current.storColed
              else return 0
          }, 0)
  
          if(resultStorColed && withoutPal && withoutPal[0].storColed)
            return resultStorColed - withoutPal[0].storColed
          else return resultStorColed

          case "transHuman":
            let resultTransHuman = table.reduce((sum, current) => {
              if(typeof current.transHuman === "number")
                return sum + current.transHuman
              else return 0
          }, 0)
    
          if(resultTransHuman && withoutPal && withoutPal[0].transHuman)
            return resultTransHuman - withoutPal[0].transHuman
          else return resultTransHuman

          case "transRub":
            let resultTransRub = table.reduce((sum, current) => {
              if(typeof current.transRub === "number")
                return sum + current.transRub
              else return 0
          }, 0)
      
          if(resultTransRub && withoutPal && withoutPal[0].transRub)
            return resultTransRub - withoutPal[0].transRub
          else return resultTransRub

          case "medPrice":
            let resultMedPrice = table.reduce((sum, current) => {
              if(typeof current.medPrice === "number")
                return sum + current.medPrice
              else return 0
          }, 0)
        
          if(resultMedPrice && withoutPal && withoutPal[0].medPrice)
            return resultMedPrice - withoutPal[0].medPrice
          else return resultMedPrice

          case "dolgDead":
            let resultDolgDead = table.reduce((sum, current) => {
              if(typeof current.dolgDead === "number")
                return sum + current.dolgDead
              else return 0
          }, 0)
        
          if(resultDolgDead && withoutPal && withoutPal[0].dolgDead)
            return resultDolgDead - withoutPal[0].dolgDead
          else return resultDolgDead

          default: 
            return 0
      }
  }

  //mapping object
  const onCreateLPU = (table: DashDepartment[]) => {
    let lpu: DashDepartment = {
      id: 100,
      name: "ЛПУ",
      createdAt: new Date(),
      updatedAt: new Date(),
      planHuman: setupReduce(table, 'planHuman'),
      planRub: setupReduce(table, 'planRub'),
      begAcc: setupReduce(table, 'begAcc'),
      admRec: setupReduce(table, 'admRec'),
      disCome: setupReduce(table, 'disCome'),
      disTax: setupReduce(table, 'disTax'),
      patOver: setupReduce(table, 'patOver'),
      storColed: setupReduce(table, 'storColed'),
      transHuman: setupReduce(table, 'transHuman'),
      transRub: setupReduce(table, 'transRub'),
      medPrice: setupReduce(table, 'medPrice'),
      dolgDead: setupReduce(table, 'dolgDead'),
      dashId: table?table[0].id: 15
    }

    return lpu
  }

  useEffect(() => {
    console.log('update')
    //@ts-ignore
    getTables(onGetDashs(), onGetDeps())
    //@ts-ignore
    const timer = setInterval(() => getTables(onGetDashs(), onGetDeps()), 10000)

    return () => clearInterval(timer)
  }, [])

  return currentItems && isTables?
    <div className="flex">
      <>
        {
          currentItems.map((item) => {
            return <div key={item.id}>
                      <DashPagination
                        totalItems={isTables.length} 
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        date={item.date}
                        dashDates={isTables?.map((el) => {
                          return {date:new Date(el.date), id: el.id }
                        })}
                      />
                      <DashItem
                        data={item.table}
                        stateLpu={onCreateLPU(item.table)}
                        date={item.date}
                      />
                    </div>
          })
        }
      </>
    </div>
  :
  <DashSkeleton/>
}