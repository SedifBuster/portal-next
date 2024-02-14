"use client"

import { DashDepartment } from "@prisma/client"
import { DrawerTable } from "./DrawerTable"
import { DrawerTrigger } from "@/components/ui/drawer"

export
  function FillingItem({
    date,
    id,
    table
  }: {
    date?: Date | string,
    id?: number,
    table?: DashDepartment[] | string
  }
) {
  return (
    <main 
      className="
        basis-1/9
        text-center
        h-44
        border
        shadow
        bg-gray-100
        flex
        flex-col
        justify-around
        p-2
      "
    >
      <div>
        {
          typeof date !== 'string' && typeof date === 'object'
          ?
          date.toISOString()
          :
          date
        }
      </div>
      {
        id
        ?
        <div>таблица номер {id}</div>
        :
        ''
      }
      <DrawerTable  button={
        <DrawerTrigger
          className="
            bg-primary
            text-primary-foreground
            hover:bg-primary/90
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
          "
        >
          {table
          ?
          'изменить'
          :
          'создать'
          }
        </DrawerTrigger>
      }/>
    </main>
  )
}