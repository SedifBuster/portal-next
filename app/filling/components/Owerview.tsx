"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Dash, DashDepartment } from "@prisma/client"
import { FillingItem } from "./FillingItem"

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
        setTables(result.data)
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
          isTables.reverse().map((item) => {
            return  <FillingItem key={item.id} date={item.date} id={item.id} table={item.table} getTables={getTables}/>
          })
          :
          ''
        }
      </div>
    </main>
  )
}