'use client'

import { ZhusTable } from "./zhusTable";
import { IZhus } from "../page";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DateTimePicker from "../../components/dateTime/dateTimePicker";


export function ZhusJournal(
  {
    onFetchData,
  }: {
    onFetchData: (url: string) => Promise<IZhus[]>
  }
) {

  const [fetchedData, setFetchedData] = useState<IZhus[]>([])
  const [settedData, setSettedData] = useState<IZhus[]>([])
  let dateForPrev = new Date()
  dateForPrev.setDate(dateForPrev.getDate() - 7)
  const [nowDate, setNowDate] = useState<Date>(new Date())
  const [prevDate, setPrevDate] = useState<Date>(dateForPrev)

  useEffect(() => {
    async function onGetData() {
      let resultOld = await onFetchData("http://192.168.0.148:5100/log")
      let result = await onFetchData("http://localhost:5020/api/logs")
     // console.log('new database', result)
     // console.log('old database', resultOld)

      if(result && resultOld)
        setFetchedData([...resultOld, ...result])
    }
    onGetData()
  }, [ onFetchData])

  useEffect(() => {
    if(fetchedData)
     setSettedData( fetchedData.filter((item) => {
        if(typeof item.date === 'string')
          return new Date(item.date).getTime() >= prevDate.getTime() && new Date(item.date).getTime() <= nowDate.getTime()
        else {
          return item.date.getTime() > prevDate.getTime() && item.date.getTime() < nowDate.getTime()
        }
    }))
  }, [nowDate, prevDate, fetchedData])


  console.log('on Fetched data', fetchedData)

  return <div className="container mx-auto flex flex-col items-center">
    <h1 className="font-bold text-lg">КГБУЗ «ВЛАДИВОСТОКСКАЯ КЛИНИЧЕСКАЯ БОЛЬНИЦА № 4»</h1>
      <p className="p-2">ОТЧЕТ ПО НЖС С

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[250px] justify-start text-left font-normal mr-2 ml-2",
                !prevDate && "text-muted-foreground"
              )}
            >
            <CalendarIcon className="mr-1 h-4 w-4" />
              {prevDate ? format(prevDate, "PPP HH:mm", {locale: ru}) : <span>Выберите время*</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={prevDate}
              onSelect={(event) => setPrevDate(event? event : new Date())}
              initialFocus
              locale={ru}
            />
            <div className="p-2 flex justify-center border-t">
              <DateTimePicker date={prevDate} setDate={(event) => setPrevDate(event? event : new Date())}/>
            </div>
          </PopoverContent>
        </Popover>

        по

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[250px] justify-start text-left font-normal mr-2 ml-2",
                !nowDate && "text-muted-foreground"
              )}
            >
            <CalendarIcon className="mr-1 h-4 w-4" />
              {nowDate ? format(nowDate, "PPP HH:mm", {locale: ru}) : <span>Выберите время*</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={nowDate}
              onSelect={(event) => setNowDate(event? event : new Date())}
              initialFocus
              locale={ru}
            />
            <div className="p-2 flex justify-center border-t">
              <DateTimePicker date={nowDate} setDate={(event) => setNowDate(event? event : new Date())}/>
            </div>
          </PopoverContent>
        </Popover>

      </p>
      <ZhusTable onFetchData={settedData}/>
  </div>
}