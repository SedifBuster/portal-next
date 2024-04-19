"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export
  function DashPagination({
    items,
    current,
    onPageChange
  }: {
    items: {date: any, count: any }[]
    current: number
    onPageChange: (action: 'prev' | 'next' | 'date', count: number) => void
  }
) {
  /*count of pages
  //const pagesCount = itemsDate.length
 // const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)
   // console.log('current' ,current)
   // console.log('pages' ,pages)*/
  console.log('current page', current)
   return (
    <div className="w-full ml-4 mr-4 mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size={'lg'} />
          </PaginationItem>
          {
            items.map((item, index) => {
              return  <PaginationItem key={index}>
                        <PaginationLink size={'lg'} isActive={index === current - 1}
                          onClick={() => onPageChange('prev', item.count)} >
                          {format(new Date(item.date), "P", {locale: ru})}
                        </PaginationLink>
                      </PaginationItem>
            })
          }
          <PaginationItem>
            <PaginationNext size={'lg'} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}