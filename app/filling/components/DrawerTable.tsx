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

const defaultDash: {id: number, date: Date, table: DashDepartment[]} = {
  id: 0,
  date: new Date(),
  table: [
    {
      id: 1,
      name: 'ТО',
      //wards DashWard[]
      numberOfSeats: 0,
      engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      free: 0, //Свободных коек
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
      engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      free: 0, //Свободных коек
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
      engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      free: 0, //Свободных коек
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
      engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      free: 0, //Свободных коек
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
      engaged: 0, //Всего находиться в стационаре, накопительным (чел.) 
      free: 0, //Свободных коек
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
    table
  }: {
    button: ReactNode,
    date?: Date | string,
    id?: number,
    table?: DashDepartment[]
  }
) {
  const [isNewDataTable, setNewDataTable] = useState()
  const GiveXMLS = () => {
    console.log(table)
    if(table) {
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      //@ts-ignore
      const ws = utils.json_to_sheet(table)
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
      const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' })
      const dataB = new Blob([excelBuffer], { type: fileType })
      saveAs(dataB, `${date}`)
      console.log(dataB)
    }
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
    const newTable = {
      date: new Date(),
      //@ts-ignore
      table: jsonData
    }
    //setNewDataTable(newTable)
    console.log(newTable)
    /*const fileDataSend = {
       id: item.id,
       month: month,
       year: year,
       data: JSON.stringify(jsonData)
    }*/
    //console.log(fileDataSend)
}
//несколько стадий заливки
//1 стадия - пост даша, он возвращает айди
//если ошибка, то отмена всех операций
//если все ок то поэтапная заливка департментов
//мэйби с числовой стадией, типа 5 из 5 отделений что то типа такого
//если все ок, то дравер клоуз
//если хуево то все остается на своих местах


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
            <div>
              {
                date
                ?
                date.toString()
                :
                ''
              } пикать дату на изменение
            </div>
            <div
              className="
              flex
              gap-4
              justify-center
              "
            >
              {//если данные есть то показывает кнопку выгрузки
                id && date && table
                ?
                <Button onClick={ () => GiveXMLS() }>выгрузить</Button>
                :
                ''
              }
              <Button><input type="file" onChange={ (e) => handleFile(e) }/></Button>
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
                ''
                :
                //если таблицы нет, ставит дефолт даш
                defaultDash.table.map((row: DashDepartment) => {
                  return <TableRow key={row.id}>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.planHuman}
                    </TableCell>
                    <TableCell>
                      {row.planRub}
                    </TableCell>
                    <TableCell>
                      {row.begAcc}
                    </TableCell>
                    <TableCell>
                      {row.admRec}
                    </TableCell>
                    <TableCell>
                      {row.disCome}
                    </TableCell>
                    <TableCell>
                      {row.disTax}
                    </TableCell>
                    <TableCell>
                      {row.patOver}
                    </TableCell>
                    <TableCell>
                      {row.storColed}
                    </TableCell>
                    <TableCell>
                      {row.transHuman}
                    </TableCell>
                    <TableCell>
                      {row.transRub}
                    </TableCell>
                    <TableCell>
                      {row.medPrice}
                    </TableCell>
                    <TableCell>
                      {row.dolgDead}
                    </TableCell>
                  </TableRow>
                })
              }
              </TableBody>
              <DrawerTableFooter table={table? table : defaultDash.table} />
            </Table>
          </main>
        </div>
      </div>
      <DrawerFooter>
        <Button>Сохранить</Button>
        <DrawerClose>
          <Button variant="outline">Отменить</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}

{/*isNewDataTable? 
  <div className="flex gap-4">
  <Button className="bg-blue-400 text-white" variant={'outline'} onClick={() => onChangeTable(fillingTable.id)}>изменить текущую таблицу</Button>
  <Button className="bg-blue-400 text-white" variant={'outline'} onClick={() => createTable()}>сохранить новую таблицу</Button>
  </div>
: ''*/}

{/*
    <TableCell>
    {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
    //@ts-ignore
    return sum + current.free
    }, 0)
    : 0
    {isNewDataTable ?
    <div className="text-green-400"> /
    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
    //@ts-ignore
    return sum + current.free
     }, 0)
     : 0
    }
     </div>
      : ''
</TableCell>*/}