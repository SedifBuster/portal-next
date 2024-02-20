"use client"

import { useEffect, useState } from "react"
import { FillingTable } from "./FillingTable"
import axios from "axios"
import toast from "react-hot-toast"
import { Dash, DashDepartment } from "@prisma/client"
import { FillingItem } from "./FillingItem"
import { CustomLoading } from "./CustomLoading"

export
  interface DashInit extends Dash {
    table: DashDepartment[] | string
}

export
  function Owerview(
) {
  //получить данные
  //возможность выгрузить и загрузить ексель
  //создать таблицу
  //из страрой таблицы
    /*const [isTable, setTable] = useState<DashInit>({
        id: 1,
        date: new Date(),
        table: JSON.stringify([{
            name: "TO",
            planHuman: 307,
            planRub: 14024358,
            begAcc: 93,
            admRec: 670,
            engaged: 130,//Всего находиться в стационаре, накопительным (чел.) 
            disCome: 607,
            disTax: 18187807,
            patOver: 12,
            storColed: 11,
            transHuman: 0,
            transRub:0,
            medPrice: 0,
            dolgDead: 23,
            
            numberOfSeats: 23,
            free: 7,//свободные койки
            //freeBeds: 7,//свободные койки
            //totalStays: 130,

            id: 2,
            createdAt: new Date(),
            updatedAt : new Date(),
          },
          {
            name: "XO",
            planHuman: 122,
            planRub: 5774724,
            begAcc: 39,
            admRec: 151,
            engaged: 27,//Всего находиться в стационаре, накопительным (чел.) 
            disCome: 151,
            disTax: 9023299,
            patOver: 2,
            storColed: 3,
            transHuman: 0,
            transRub:0,
            medPrice: 0,
            dolgDead: 24,
            
            numberOfSeats: 23,
            free: 18,//свободные койки
            //freeBeds: 7,//свободные койки
            //totalStays: 130,

            id: 3,
            createdAt: new Date(),
            updatedAt : new Date(),
          },
          {
            name: "НO",
            planHuman: 132,
            planRub: 6769332,
            begAcc: 41,
            admRec: 107,
            engaged: 33,//Всего находиться в стационаре, накопительным (чел.) 
            disCome: 107,
            disTax: 8265158,
            patOver: 2,
            storColed: 3,
            transHuman: 0,
            transRub:0,
            medPrice: 0,
            dolgDead: 5,
            
            numberOfSeats: 19,
            free: 19,//свободные койки
            //freeBeds: 7,//свободные койки
            //totalStays: 130,

            id: 4,
            createdAt: new Date(),
            updatedAt : new Date(),
          }, {
            name: "Реаб",
            planHuman: 98,
            planRub: 6713532,
            begAcc: 54,
            admRec: 139,
            engaged: 39,//Всего находиться в стационаре, накопительным (чел.) 
            disCome: 144,
            disTax: 13182835,
            patOver: 0,
            storColed: 1,
            transHuman: 0,
            transRub:0,
            medPrice: 0,
            dolgDead: 0,
            
            numberOfSeats: 19,
            free: 8,//свободные койки
            //freeBeds: 7,//свободные койки
            //totalStays: 130,

            id: 5,
            createdAt: new Date(),
            updatedAt : new Date(),
          },
          {
            name: "Паллиатив",
            planHuman: 23,
            planRub: 108000,
            begAcc: 25,
            admRec: 21,
            engaged: 33,//Всего находиться в стационаре, накопительным (чел.) 
            disCome: 16,
            disTax: 0,
            patOver: 0,
            storColed: 1,
            transHuman: 0,
            transRub:0,
            medPrice: 0,
            dolgDead: 0,
            
            numberOfSeats: 19,
            free: 4,//свободные койки
            //freeBeds: 7,//свободные койки
            //totalStays: 130,

            id: 6,
            createdAt: new Date(),
            updatedAt : new Date(),
          },
        ])
  })*/
  /*let onChangeTable = (table: DashInit) => {
    if(table)
    setTable(table)
    else return toast.error('таблица не найдена')
  }*/
  const [isVisible, setVisible] = useState(false)
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
        <FillingItem date={'Создать новую таблицу'} id={0}/>
        {isTables
          ?
          isTables.reverse().map((table) => {
            return  <FillingItem date={new Date()/**тут из табле все вытаскиваем */} id={0}/>
          })
          :
          ''
        }
      </div>
    </main>
  )
}