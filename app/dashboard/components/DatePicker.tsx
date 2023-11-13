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
 
export function DatePicker() {

  const [date, setDate] = React.useState<Date>()
  
  const [testDate, isTestDate] = React.useState<Date[]>([new Date(2023, 10, 9), new Date(2023, 10, 10), new Date(2023, 10, 11), new Date(2023, 10, 12),])

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
          {date ? format(date, "PPP", {locale: ru}) : <span>Выберите дату</span>}
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
          disabled={filteredDays(testDate)}
          
        />
      </PopoverContent>
    </Popover>
  )
}