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
import { DashInit } from "./TableDash"

export
  function DatePicker({
    dashDates,
    date,
    setDate,

  } : {
    dashDates: Date[],
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>

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


  return (
    <div className="flex justify-center pb-6 pt-2">
      <Button
        variant="outline"
        size="sm"
        className="
          p-2 mr-4 pt-2 
        "
            >
              Предыдущая таблица
            </Button>
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
          {date ? format(new Date(date), "PPP", {locale: ru}) : <span>Выберите дату</span>}
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
          disabled={filteredDays(dashDates)}
        />
      </PopoverContent>
    </Popover>
    <Button
              variant="outline"
              size="sm"
              className="
              p-2 ml-4 pt-2
            "
            
            >
              Следующая таблица
            </Button>
    </div>
  )
}