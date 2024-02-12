"use client"

import { Button } from "@/components/ui/button"
import { DashDepartment } from "@prisma/client"
import { DrawerTable } from "./DrawerTable"

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
        {typeof date !== 'string' && typeof date === 'object'
          ?
          date.toISOString()
          :
          date
        }
      </div>
      {id
        ?
        <div>таблица номер {id}</div>
        :
        ''
      }
      <DrawerTable  button={
        <Button>
          {table
          ?
          'изменить'
          :
          'создать'
          }
        </Button>
      }/>
    </main>
  )
}