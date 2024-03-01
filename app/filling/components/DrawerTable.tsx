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
      name: 'ТО',
      //wards DashWard[]
      numberOfSeats: 0,
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
      name: 'ХО',
      //wards DashWard[]
      numberOfSeats: 0,
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
      name: 'НО',
      //wards DashWard[]
      numberOfSeats: 0,
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
      name: 'Реаб',
      //wards DashWard[]
      numberOfSeats: 0,
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
      name: 'Паллиатив',
      //wards DashWard[]
      numberOfSeats: 0,
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
//несколько стадий заливки
//1 стадия - пост даша, он возвращает айди
//если ошибка, то отмена всех операций
//если все ок то поэтапная заливка департментов
//мэйби с числовой стадией, типа 5 из 5 отделений что то типа такого
//отображения состояния в лоадинг скрине
//если все ок, то дравер клоуз
//если хуево то все остается на своих местах
  const [isNewDate, setNewDate] = useState<Date>()
  const [isNewDepartments, setNewDepartments] = useState<DashDepartment[]>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isVisibleDelete, setVisibleDelete] = useState<boolean>(false)

  //1 stage - post dash
  const onReleaseDash = async (date: Date): Promise<string | number> => {
    try {
      const resultDash = await axios.post('/api/dash', { date })
      if( resultDash.statusText === "OK" ) {
        toast.success( 'Даш создан с айди: ', resultDash.data )
        return resultDash.data
      }
      else throw new Error( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при создании даша' )
      return `ошибка при создании даша: ${error}`
    }
  }
  //2 stage - post departments
  const onReleaseDashDepartment = async ( department: DashDepartment ) => {
    try {
      const resultDashDepartment = await axios.post('/api/dash/department', department)
      if( resultDashDepartment.statusText === "OK") {
        toast.success( 'Отделение создано с айди: ', resultDashDepartment.data)
        return resultDashDepartment.data
      }
      else throw new Error( 'Статус текста запроса' )
    } catch ( error ) {
      toast.error( 'Ошибка при создании отделения даша' )
      return `ошибка при создании отделения даша: ${error}`
    }
  }
  //3 stage - loading screen
  //4 stage - compile this
  const onPostData = async () => {
    try {

    } catch ( error ) {
      toast.error( 'Ошибка при заливки данных для даша' )
      return `ошибка при процессе заливки данных для даша: ${error}`
    }
  }

  const GiveXMLS = () => {

    const test = defaultDash.table.map((item) => {
      return {
        id: item.id,
        name: item.name,
        numberOfSeats: item.numberOfSeats,
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
    console.log(table)
    //if(table) {
      const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const ws = utils.json_to_sheet(test)
      console.log('ws ', ws)
      const wb = { Sheets: { 'table': ws }, SheetNames: ['table'] }
      console.log('wb ',wb)
      const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' })
      console.log('excel buffer ',excelBuffer)
      const dataB = new Blob([excelBuffer], { type: fileType })
      console.log(dataB)
      if(date)
      saveAs(dataB,
        `${new Date(date).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'

          })
        }.xlsx`
      )
    //}
  }
  //даш айди дается в момент заливки
  //апдейтет и креатед

  //тут мы должны преобразовать ексель в таблицу - массив зелененьких буковокб а отправкой на сервер будет заниматься другая функция
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
      const resultDash = await axios.delete( '/api/dash', { data: {id} })
      if( resultDash.statusText !== "OK" ) throw new Error( 'Статус текста запроса' )
      else {
        toast.success(`таблица под номером: ${resultDash.data} удалена` )
        getTables()
        setVisibleDelete(false)
      }
    } catch ( error ) {
      toast.error( 'Ошибка при удалении таблицы' )
      return `ошибка при удалении таблицы: ${error}`
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
            {/**DATE CHANGE */}
            <DashDate setDate={setNewDate} date={isNewDate}/>
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
              {//если данные есть то показывает кнопку выгрузки
                //id && date && table
                //?
                <Button onClick={GiveXMLS} className="gap-2"><HiMiniCloudArrowDown />выгрузить</Button>
                //:
                //''
              }
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
                ''//СЮДА НАДА ТАБЛИЦУ
                :
                //если таблицы нет, ставит дефолт даш
                defaultDash.table.map((row: DashDepartment, index) => {
                  return <TableRow key={row.id}>
                    <TableCell>
                      {row.name}
                      {isNewDepartments ?
                        <div className="text-green-400">
                          {
                            isNewDepartments[index].name
                            ?
                            isNewDepartments[index].name
                            :
                            0
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
                            isNewDepartments[index].planHuman
                            ?
                            isNewDepartments[index].planHuman
                            :
                            0
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
                            isNewDepartments[index].planRub
                            ?
                            isNewDepartments[index].planRub
                            :
                            0
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
                            isNewDepartments[index].begAcc
                            ?
                            isNewDepartments[index].begAcc
                            :
                            0
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
                            isNewDepartments[index].admRec
                            ?
                            isNewDepartments[index].admRec
                            :
                            0
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
                            isNewDepartments[index].disCome
                            ?
                            isNewDepartments[index].disCome
                            :
                            0
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
                            isNewDepartments[index].disTax
                            ?
                            isNewDepartments[index].disTax
                            :
                            0
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
                            isNewDepartments[index].patOver
                            ?
                            isNewDepartments[index].patOver
                            :
                            0
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
                            isNewDepartments[index].storColed
                            ?
                            isNewDepartments[index].storColed
                            :
                            0
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
                            isNewDepartments[index].transHuman
                            ?
                            isNewDepartments[index].transHuman
                            :
                            0
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
                            isNewDepartments[index].transRub
                            ?
                            isNewDepartments[index].transRub
                            :
                            0
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
                            isNewDepartments[index].medPrice
                            ?
                            isNewDepartments[index].medPrice
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
                            isNewDepartments[index].dolgDead
                            ?
                            isNewDepartments[index].dolgDead
                            :
                            0
                          }
                        </div>
                        : ''
                      }
                    </TableCell>
                  </TableRow>
                })
              }
              
              </TableBody>
              <DrawerTableFooter table={table? table : defaultDash.table} />
            </Table>
          </main>
          {/**<CustomLoading statusText="любой текст загрузки..." loading={isLoading}/> */}
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
          <Button className={clsx(``,
            id
            ?
            `w-1/4`
            :
            `w-2/4`
          )}
          disabled={!isNewDate && !isNewDepartments}
          >Сохранить</Button>
          {
            id
            ?
            <Dialog  open={isVisibleDelete} onOpenChange={() => setVisibleDelete(!isVisibleDelete)}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-1/4"  onClick={() => setVisibleDelete(true)}>Удалить</Button>
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