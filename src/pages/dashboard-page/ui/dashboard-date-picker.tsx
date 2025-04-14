"use client"

import * as React from "react"
import { addDays, eachDayOfInterval, format, isEqual } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/src/shared/lib/utils"


import { ru } from "date-fns/locale"
import { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/shared/ui/popover"
import { Button } from "@/src/shared/ui/button"
import { Calendar } from "@/src/shared/ui/calendar"


type dateForPick = {item: { date: Date, id: number}, count: number}

export
  function DatePicker({
    date,
    dashDates,
    setCurrentPage,
  } : {
    date: Date
    dashDates: {date: Date, id: number}[]
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
    //@ts-ignore
    let result = onFindDate(isDate, pages)
      if(result.length === 0) {
        return toast.error(('Таблица не найдена!'));
      } else {
        setCurrentPage(result[0].count)
      }
  }

useEffect(() => {
  onSelectDate()
}, [isDate])

  return (
    <div className="flex justify-center pb-2 mt-2">
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
            onSelect={setDate}
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