"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export
  function DashPagination({
    itemsDate,
    current,
    onPageChange
  }: {
    itemsDate: Date[]
    current: number
    onPageChange: (action: 'prev' | 'next' | 'date') => void
  }
) {
  //count of pages
  const pagesCount = itemsDate.length
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)




    console.log('current' ,current)
    console.log('pages' ,pages)
  return (
    <div className="w-full ml-4 mr-4 mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size={'lg'} onClick={() => onPageChange('prev')} />
          </PaginationItem>
          {
            itemsDate.map((date, index) => {
              return  <PaginationItem key={index}>
                        <PaginationLink size={'lg'} isActive={index === current - 1}  onClick={() => onPageChange('prev')} >{format(new Date(date), "P", {locale: ru})}</PaginationLink>
                      </PaginationItem>
            })
          }
          <PaginationItem>
            <PaginationNext size={'lg'} onClick={() => onPageChange('next')} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}