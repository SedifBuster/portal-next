"use client"

import * as React from "react"
import { addDays, eachDayOfInterval, format, isEqual } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ru } from "date-fns/locale"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"


type dateForPick = {item: { date: Date, id: number}, count: number}

export
  function DatePicker({
    date,
    dashDates,
    currentPage,
    setCurrentPage,
  } : {
    date: Date
    dashDates: {date: Date, id: number}[]
    currentPage: number
    setCurrentPage: any
  }
) {

  const [isDate, setDate] = React.useState<Date | undefined>(date)
  //set pages array
  let pages = []
  if(dashDates)
  for(let i = 0; i <= Math.ceil(dashDates.length / 1); i++) {
    pages.push({item: dashDates[i - 1], count: i})
  }
  //remove dates without tables
  const filteredDays = useCallback((arrTrueDates: {date: Date, id: number}[]) => {
    let afterDays = addDays(new Date(), 300)
    let beforeDays = new Date(2023, 0,0)
  
    let arrDates = eachDayOfInterval({
      start: beforeDays,
      end: afterDays
    })

    let result: Date[] = []
    for(let i = 0; i < arrDates.length; i++) {
      for(let j = 0; j < arrTrueDates.length; j++) {
        if(isEqual(arrDates[i], arrTrueDates[j].date)) {
          arrDates.splice(i, 1)
        }
      }
    }
    result = [...arrDates]

    return result
  }, [dashDates])
  //click date  => does it exist or not exist 
  const onFindDate = (newDate: Date, dates: dateForPick[]) => {
    let result = []
      result = dates.filter((i) => i.item && i.item.date? i.item.date.getTime() === new Date(newDate).getTime() : null)
    return result
  }

  const onSelectDate = () => {
    console.log('select')
    let result = onFindDate(date, pages)
      if(result.length === 0) {
        return toast.error(('date is undefined'));
      } else {
        setCurrentPage(result[0].count)
      }
  }

useEffect(() => {
  //if(isDate && pages)
    //console.log('findDate',onFindDate(isDate, pages))
}, [isDate])




  return (
    <div className="flex justify-center pb-6 pt-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            { format(new Date(isDate? isDate : new Date()), "PPP", {locale: ru}) }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={isDate}
            onSelect={onSelectDate}
            initialFocus
            ISOWeek
            locale={ru}
            disabled={filteredDays(dashDates)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


/*
  let filteredDays = useCallback((arrTrueDates: Date[]) => {
    let afterDays = addDays(new Date(), 300)
    let beforeDays = new Date(2023, 0,0)
  
    let arrDates = eachDayOfInterval({
      start: beforeDays,
      end: afterDays
    })

    let result: Date[] = []
    for(let i = 0; i < arrDates.length; i++) {
      for(let j = 0; j < arrTrueDates.length; j++) {
        if(isEqual(arrDates[i], arrTrueDates[j])) {
          arrDates.splice(i, 1)
        }
      }
    }
    result = [...arrDates]

    return result
  }, [dashDates])
*/
/**    <Button
              variant="outline"
              size="sm"
              className="
              p-2 ml-4 pt-2
            "
            onClick={() => next()}
            >
              Следующая таблица
            </Button> */
            /**
             *       <Button
        variant="outline"
        size="sm"
        className="
          p-2 mr-4 pt-2 
        "
        onClick={() => previous()}
            >
              Предыдущая таблица
            </Button>
             */
//Versoin 1
/**
 * "use client"

import * as React from "react"
import { addDays, eachDayOfInterval, format, isEqual } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ru } from "date-fns/locale"

export
  function DatePicker({
    dashDates,
    date,
    setDate,
    previous,
    next,
    testDate
  } : {
    dashDates?: Date[],
    date?: Date | undefined,
    setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>,
    previous?: () => void
    next?: () => void
    testDate?: Date | undefined
  }
) {

  let filteredDays = (arrTrueDates: Date[]) => {
    let afterDays = addDays(new Date(), 300)
    let beforeDays = new Date(2023, 0,0)
  
    let arrDates = eachDayOfInterval({
      start: beforeDays,
      end: afterDays
    })
    let result: Date[] = []
    for(let i = 0; i < arrDates.length; i++) {
      for(let j = 0; j < arrTrueDates.length; j++) {
        if(isEqual(arrDates[i], arrTrueDates[j])) {
          arrDates.splice(i, 1)
        }
      }
    }
    result = [...arrDates]

    return result
  }

  React.useEffect(() => {

  }, [next, previous, testDate])

  return (
    <div className="flex justify-center pb-6 pt-2">

    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(new Date(testDate? testDate : new Date()), "PPP", {locale: ru}) : <span>Выберите дату</span>}date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          ISOWeek
          locale={ru}
          //disabled={filteredDays(dashDates)}
        />
      </PopoverContent>
    </Popover>

    </div>
  )
}
 */