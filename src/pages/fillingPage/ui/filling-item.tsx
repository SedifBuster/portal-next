"use client"

import { DashDepartment } from "@prisma/client"

import clsx from "clsx"
import { DrawerTrigger } from "@/src/shared/ui/drawer"
import { DrawerTable } from "./filling-drawer-table"

export
  function FillingItem({
    date,
    id,
    table,
    getTables
  }: {
    date?: Date | string,
    id?: number,
    table?: DashDepartment[] | string,
    getTables: () => Promise<void>
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
          typeof date === 'string'
          ?
          new Date(date).toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
          :
          'дата не строка'
        }
      </div>
      {
        id
        ?
        <div>таблица № {id}</div>
        :
        <div>новая таблица</div>
      }
      <DrawerTable
        button={
          <DrawerTrigger
            className={
              clsx(
                `
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
                `,
                id
                ?
                `
                bg-primary
                hover:bg-primary/80
                `
                :
                `
                bg-blue-500
                hover:bg-blue-500/80
                `
              )
            }
          >
            {
              id
              ?
              'просмотр'
              :
              'создать'
            }
          </DrawerTrigger>
        }
      date={date}
      table={typeof table !== 'string' ? table : undefined}
      id={id}
      getTables={getTables}
      />
    </main>
  )
}