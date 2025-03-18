"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
import { DashDepartment } from "@prisma/client"
import { ReactNode, useState } from "react"
import { saveAs } from "file-saver"
import { read, utils, write } from 'xlsx'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DrawerTableFooter } from "./DrawerTableFooter"
import axios from "axios"
import toast from "react-hot-toast"
import { CustomLoading } from "./CustomLoading"
import { DashDate } from "./DashDate"
import clsx from "clsx"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { HiMiniCloudArrowDown, HiMiniCloudArrowUp } from "react-icons/hi2";

const defaultDash: {id: number, date: Date, table: DashDepartment[]} = {
  id: 0,
  date: new Date(),
  table: [
    {
      id: 1,
      name: 'ТО3',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 2,
      name: 'ТО4',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 3,
      name: 'СМП',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 4,
      name: 'ХО',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 5,
      name: 'НО',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 6,
      name: 'Реаб',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
    {
      id: 7,
      name: 'Паллиатив',
      //wards DashWard[]
      //engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      //free: 0, //Свободных коек
      createdAt: new Date(),
      updatedAt: new Date(),
      //to table
      planHuman: 0,
      planRub: 0,
      begAcc: 0,
      admRec: 0,
      disCome: 0,
      disTax: 0,
      patOver: 0,
      storColed: 0,
      transHuman: 0,
      transRub: 0,
      medPrice: 0,
      dolgDead: 0,
      dashId: 0,
    },
  ]
}

export
  function DrawerTable ({
    button,
    date,
    id,
    table,
    getTables
  }: {
    button: ReactNode,
    date?: Date | string,
    id?: number,
    table?: DashDepartment[],
    getTables: () => Promise<void>
  }
) {
  const [isNewDate, setNewDate] = useState<Date>()
  const [isNewDepartments, setNewDepartments] = useState<DashDepartment[]>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSending, setSending] = useState<boolean>(false)
  const [isSendingMessage, setSendingMessage] = useState<string>('загрузка...')
  const [isVisibleDelete, setVisibleDelete] = useState<boolean>(false)

  const onReleaseDash = async (date: Date): Promise<string | number> => {
    try {
      const resultDash = await axios.post('/api/dash', { date })
      if( resultDash.statusText === "OK" ) {
        toast.success( `Таблица создана с айди: ${resultDash.data} ` )
        return resultDash.data
      }
      else throw new Error( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при создании таблицы' )
      return `ошибка при создании таблицы: ${error}`
    }
  }

  const onUpdateDash = async (date: Date, id: number | undefined): Promise<string | number> => {
    try {
      const resultUpdateDash = await axios.patch('/api/dash', {date: date, id: id})
      if(resultUpdateDash.statusText === "OK") {
        toast.success( `Таблица обновлена с айди: ${resultUpdateDash.data}`)
        return resultUpdateDash.data
      }
      else throw new Error( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при обновлении таблицы')
      return `ошибка при обновлении таблицы: ${error}`
    }
  }

  const onReleaseDashDepartment = async ( department: DashDepartment) => {
    try {
      const resultDashDepartment = await axios.post('/api/dash/department', department)
      if( resultDashDepartment.statusText === "OK") {
        toast.success( `Отделение создано с айди: ${resultDashDepartment.data}`)
        return resultDashDepartment.data
      }
      else throw new Error( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при создании отделения таблицы' )
      return `ошибка при создании отделения таблицы: ${error}`
    }
  }

  const onUpdateDashDepartment = async ( department: DashDepartment) => {
    try {
      const resultUpdateDashDepartment = await axios.patch('/api/dash/department', department)
      if( resultUpdateDashDepartment.statusText === "OK") {
        toast.success( `Отделение обновлено с айди: ${resultUpdateDashDepartment.data}`)
        return resultUpdateDashDepartment.data
      }
      else throw new Error ( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при обновлении отделений таблицы')
      return `ошибка при обновлении отделений таблицы: ${error}`
    }
  }

  const GiveXMLS = ( tableForm: 'default' | 'regular') => {
    let test
    if(tableForm === 'default')
      test = defaultDash.table.map((item) => {
        return {
          id: item.id,
          name: item.name,
          planHuman: item.planHuman,
          planRub: item.planRub,
          begAcc: item.begAcc,
          admRec: item.admRec,
          disCome: item.disCome,
          disTax: item.disTax,
          patOver: item.patOver,
          storColed: item.storColed,
          transHuman: item.transHuman,
          transRub: item.transRub,
          medPrice: item.medPrice,
          dolgDead: item.dolgDead,
        }
      })
    else if (tableForm === 'regular') {
      //@ts-ignore
      test = table.map((item) => {
        return {
          id: item.id,
          name: item.name,
          planHuman: item.planHuman,
          planRub: item.planRub,
          begAcc: item.begAcc,
          admRec: item.admRec,
          disCome: item.disCome,
          disTax: item.disTax,
          patOver: item.patOver,
          storColed: item.storColed,
          transHuman: item.transHuman,
          transRub: item.transRub,
          medPrice: item.medPrice,
          dolgDead: item.dolgDead,
        }
      })
    }

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    //@ts-ignore
    const ws = utils.json_to_sheet(test)
    const wb = { Sheets: { 'table': ws }, SheetNames: ['table'] }
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' })
    const dataB = new Blob([excelBuffer], { type: fileType })
    if(date)
    saveAs(dataB,
      `${new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}.xlsx`
    )
  }

  const handleFile = async (e: any) => {
    const file: File = e.target.files[0]
    const dataFile = await file.arrayBuffer()
    const dataName = file.name
    const workbook = read(dataFile)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = utils.sheet_to_json(worksheet)
    console.log(dataName)
    console.log(jsonData)
    if(typeof jsonData === 'object')
    //@ts-ignore
    setNewDepartments(jsonData)
    console.log(isNewDepartments)
  }

  let onDeleteDash = async (id: number) => {
    try {
     const resultDep = await axios.delete( '/api/dash/department', {data: {id}})
     if( resultDep.statusText !== "OK" ) throw new Error( 'Статус текста запроса при удалении отделений' )

      const resultDash = await axios.delete( '/api/dash', { data: {id} } )

      if( resultDash.statusText !== "OK" ) throw new Error( 'Статус текста запроса при удалении таблицы' )
      else {
        toast.success( `таблица под номером: ${resultDash.data} удалена` )
        getTables()
        setVisibleDelete(false)
      }

    } catch ( error ) {
      toast.error( 'Ошибка при удалении таблицы' )
      return `ошибка при удалении таблицы: ${error}`
    }
  }

  const onPostData = async () => {
    try {
      setLoading(true)
      setSending(true)
      setSendingMessage('создание таблицы...')

      if(!isNewDate) {
        setSendingMessage('ошибка: нет даты')
        setLoading(false)
        return
      }
      let resultDash = await onReleaseDash(isNewDate)

      if(typeof resultDash === 'string') {
        setSendingMessage('ошибка: не вернул айди')
        setLoading(false)
        return
      }

      else if (typeof resultDash === 'number' && isNewDepartments) {
        const filteredDeps = isNewDepartments.map((dep) => {
          return {
            name: dep.name,
            planHuman: dep.planHuman,
            planRub: dep.planRub,
            begAcc: dep.begAcc,
            admRec: dep.admRec,
            disCome: dep.disCome,
            disTax: dep.disTax,
            patOver: dep.patOver,
            storColed: dep.storColed,
            transHuman: dep.transHuman,
            transRub: dep.transRub,
            medPrice: dep.medPrice,
            dolgDead: dep.dolgDead,
            dashId: resultDash
          }
        })
        for(let i = 0; i < filteredDeps?.length; i++) {
          setSendingMessage(`загрузка отделения номер ${i}...`)
          //@ts-ignore
          await onReleaseDashDepartment(filteredDeps[i])
        }
        setLoading(false)
        setSendingMessage(`загрузка завершена`)
        getTables()
        //убрать таблицу и обновить список таблиц
      }
    } catch ( error ) {
      toast.error( 'Ошибка при заливки данных для таблицы' )
      setLoading(false)
      return `ошибка при процессе заливки данных для таблицы: ${error}`
    }
  }

  let onUpdateData = async () => {
    try {
      setLoading(true)
      setSending(true)
      setSendingMessage('обновление таблицы...')

      if(!isNewDate) {
        setSendingMessage('ошибка: нет даты')
        setLoading(false)
        return
      }
      //поменять
      let resultDash = await onUpdateDash(isNewDate, id)

      if(typeof resultDash === 'string') {
        setSendingMessage('ошибка: не вернул айди')
        setLoading(false)
        return
      }

      else if (typeof resultDash === 'number' && isNewDepartments && table) {
          const filteredDeps = isNewDepartments.map((dep, index) => {
            return {
              id: table[index].id,
              name: dep.name,
              planHuman: dep.planHuman,
              planRub: dep.planRub,
              begAcc: dep.begAcc,
              admRec: dep.admRec,
              disCome: dep.disCome,
              disTax: dep.disTax,
              patOver: dep.patOver,
              storColed: dep.storColed,
              transHuman: dep.transHuman,
              transRub: dep.transRub,
              medPrice: dep.medPrice,
              dolgDead: dep.dolgDead,
              dashId: resultDash
            }
          })

        //поменять
        for(let i = 0; i < filteredDeps?.length; i++) {
          setSendingMessage(`обновление отделения номер ${i}...`)
          //@ts-ignore
          await onUpdateDashDepartment(filteredDeps[i])
        }
        setLoading(false)
        setSendingMessage(`обновление завершено`)
        //убрать таблицу и обновить список таблиц
        //получить айди старых и обновить по айди
        //старые найти с помощью айди и имени мб?
      }
    } catch ( error ) {
      toast.error( 'Ошибка при обновлении данных для таблицы' )
      setLoading(false)
      return `ошибка при процессе обновления данных для таблицы: ${error}`
    }

  }

  return (
    <Drawer>
      {button}
      <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          {
            id
            ?
            `Таблица под номером ${id}`
            :
            'Создание новой таблицы'
          }
        </DrawerTitle>
        <DrawerDescription>
          На этой странице вы можете создавать или изменять таблицы
        </DrawerDescription>
      </DrawerHeader>
      <div
        className="
          p-2
          flex
          justify-center
        "
      >
        <div>
          <main
            className="
              m-2
              text-center
              shadow-xl
              p-2
            "
          >
            {
              id?
              ''
              :
              <DashDate setDate={setNewDate} date={isNewDate}/>
            }
            
            <div
              className="p-2"
            >
              {
                date
                ?
                new Date(date).toLocaleString('ru', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              })
                :
                new Date().toLocaleString('ru', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              })
              }
            </div>
            <div
              className="
              flex
              gap-4
              justify-center
              "
            >
              <Button onClick={() => GiveXMLS(table? 'regular' : 'default')} className="gap-2">
                <HiMiniCloudArrowDown /> выгрузить
              </Button>
            {
              !id
              ?
              <>
              <Label htmlFor="file-upload"
              className="
                text-primary-foreground
                inline-flex
                items-center
                justify-center
                rounded-md
                text-sm
                font-medium
                ring-offset-background
                transition-colors
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                disabled:pointer-events-none
                disabled:opacity-50
                h-10 px-4 py-2
                bg-primary
                hover:bg-primary/80
                gap-2
                cursor-pointer
              "
            >
              <HiMiniCloudArrowUp /> загрузить
            </Label>
            <input type="file" id="file-upload" onChange={ (e) => handleFile(e) } className="hidden"/>
            </>
              :
              ''
            }

            </div>
            <Table
              className="
                mb-20
                mt-6
              "
            >
              <TableCaption> таблица заполнения </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"> Отделение </TableHead>
                  <TableHead> План (чел) </TableHead>
                  <TableHead> План (руб) </TableHead>
                  <TableHead> Состояло на начало месяца (чел) </TableHead>
                  <TableHead> Поступили в приёмное, накопительным (чел) </TableHead>
                  <TableHead> Выбыло, накопительным (чел) </TableHead>
                  <TableHead> Выбывшие к оплате </TableHead>
                  <TableHead> Пациенты свыше 10 дней (чел.) </TableHead>
                  <TableHead> Не закрыто историй в Барсе (шт.) </TableHead>
                  <TableHead> Передано оплату в ФОМС (шт.) </TableHead>
                  <TableHead> Передано оплату в ФОМС (руб.) по КСГ </TableHead>
                  <TableHead> Средняя стоимость лечения </TableHead>
                  <TableHead> Долг по умершим </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {/* мап по департаментам если нет то по новой таблице готовой для заполнениея */}
              {
                table
                ?
                table.map((row: DashDepartment, index) => {
                  return <TableRow key={row.id}>
                    <TableCell>
                      {row.name}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.name
                            ?
                            isNewDepartments[index]?.name
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.planHuman}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.planHuman
                            ?
                            isNewDepartments[index]?.planHuman
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.planRub}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.planRub
                            ?
                            isNewDepartments[index]?.planRub
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.begAcc}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.begAcc
                            ?
                            isNewDepartments[index]?.begAcc
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.admRec}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.admRec
                            ?
                            isNewDepartments[index]?.admRec
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.disCome}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.disCome
                            ?
                            isNewDepartments[index]?.disCome
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.disTax}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.disTax
                            ?
                            isNewDepartments[index]?.disTax
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.patOver}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.patOver
                            ?
                            isNewDepartments[index]?.patOver
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.storColed}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.storColed
                            ?
                            isNewDepartments[index]?.storColed
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.transHuman}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.transHuman
                            ?
                            isNewDepartments[index]?.transHuman
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.transRub}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.transRub
                            ?
                            isNewDepartments[index]?.transRub
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.medPrice}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.medPrice
                            ?
                            isNewDepartments[index]?.medPrice
                            :
                            0
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.dolgDead}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.dolgDead
                            ?
                            isNewDepartments[index]?.dolgDead
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                  </TableRow>
                })
                :
                //если таблицы нет, ставит дефолт даш
                defaultDash.table.map((row: DashDepartment, index) => {
                  return <TableRow key={row.id}>
                    <TableCell>
                      {row.name}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.name
                            ?
                            isNewDepartments[index]?.name
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.planHuman}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.planHuman
                            ?
                            isNewDepartments[index]?.planHuman
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.planRub}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.planRub
                            ?
                            isNewDepartments[index]?.planRub
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.begAcc}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.begAcc
                            ?
                            isNewDepartments[index]?.begAcc
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.admRec}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.admRec
                            ?
                            isNewDepartments[index]?.admRec
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.disCome}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.disCome
                            ?
                            isNewDepartments[index]?.disCome
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.disTax}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.disTax
                            ?
                            isNewDepartments[index]?.disTax
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.patOver}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.patOver
                            ?
                            isNewDepartments[index]?.patOver
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.storColed}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.storColed
                            ?
                            isNewDepartments[index]?.storColed
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.transHuman}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.transHuman
                            ?
                            isNewDepartments[index]?.transHuman
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.transRub}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.transRub
                            ?
                            isNewDepartments[index]?.transRub
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.medPrice}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.medPrice
                            ?
                            isNewDepartments[index]?.medPrice
                            :
                            0
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                    <TableCell>
                      {row.dolgDead}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index]?.dolgDead
                            ?
                            isNewDepartments[index]?.dolgDead
                            :
                            ''
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                  </TableRow>
                })
              }
              {
                isNewDepartments && isNewDepartments.length > 5
                ?
                isNewDepartments.slice(5).map((row) => { return <TableRow key={row.id}>
                <TableCell>
                  <div className="text-green-400">
                    {row.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.planHuman}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.planRub}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.begAcc}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.admRec}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.disCome}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.disTax}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.patOver}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.storColed}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.transHuman}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.transRub}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.medPrice}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-green-400">
                    {row.dolgDead}
                  </div>
                </TableCell>
              </TableRow>}
              )
                :
                ''
              }
              </TableBody>
              <DrawerTableFooter table={table? table : defaultDash.table} newTable={isNewDepartments}/>
            </Table>
          </main>
          {isSending? <CustomLoading statusText={isSendingMessage} loading={isLoading} setSending={setSending}/> : ''}
        </div>
      </div>
      <DrawerFooter>
        <div
          className="
            flex
            justify-center
            justify-items-center
            justify-self-center
            gap-1
          "
        >
          {
            id?
            ''
            :
            <Button className={clsx(``,
            id
            ?
            `w-1/4`
            :
            `w-2/4`
          )}
          disabled={!isNewDate && !isNewDepartments}
          onClick={() => table? undefined /*onUpdateData()*/ : onPostData()}
          //СОХРАНИТЬ
          >Сохранить</Button>
          }

          {
            id
            ?
            <Dialog  open={isVisibleDelete} onOpenChange={() => setVisibleDelete(!isVisibleDelete)}>
              <DialogTrigger asChild>
                <Button variant="destructive" className={clsx(``,
            id
            ?
            `w-2/4`
            :
            `w-2/4`
          )}  onClick={() => setVisibleDelete(true)}>Удалить</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Удаление таблицы</DialogTitle>
                  <DialogDescription>
                    Вы действительно хотите удалить таблицу под № {id}?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button  variant={'destructive'}  onClick={() => onDeleteDash(id)}>Удалить</Button>
                  <Button variant={'outline'}  onClick={() => setVisibleDelete(false)}>Отменить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            :
            ''
          }
        </div>
        <DrawerClose>
          <Button
            variant="outline"
            className="w-2/4"
            onClick={() => {setNewDate(undefined); setNewDepartments(undefined)}}
          >
            Отменить
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}