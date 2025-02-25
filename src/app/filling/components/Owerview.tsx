"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Dash, DashDepartment } from "@prisma/client"
import { FillingItem } from "./FillingItem"
import toast from "react-hot-toast"

export
  interface DashInit extends Dash {
    table: DashDepartment[] | string
}

export
  function Owerview(
) {
  const [isTables, setTables] = useState<DashInit[]>()

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
          }).reverse()
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

  return (
    <main 
      className="
        h-screen
        w-screen
      "
    >
      <div
        className="
          overscroll-auto
          flex
          flex-wrap
          justify-start
          pt-2
          pl-2
          pb-6
          gap-2
        "
      >
        <FillingItem date={new Date().toString()} id={0}  getTables={getTables}/>
        {isTables
          ?
          isTables.map((item) => {
            return  <FillingItem key={item.id} date={item.date} id={item.id} table={item.table} getTables={getTables}/>
          })
          :
          ''
        }
      </div>
    </main>
  )
}