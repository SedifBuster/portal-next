"use client"
 
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"


import { ru } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/shared/ui/popover"
import { Button } from "@/src/shared/ui/button"
import { Calendar } from "@/src/shared/ui/calendar"
 
export
  function DashDate({
    date,
    setDate,
  }: {
    date: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  }
) {
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
        />
      </PopoverContent>
    </Popover>
  )
}