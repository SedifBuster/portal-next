"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import clsx from "clsx"
import * as React from "react"
import { DatePicker } from "./DatePicker"

export
  function DashPagination({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    date,
    dashDates,
  }: {
    totalItems: any
    itemsPerPage: number
    currentPage: number
    setCurrentPage: any
    date: Date
    dashDates: {date: Date, id: number}[]
  }
) {

  let pages = []

  const [isDisableNext, setDisableNext] = React.useState(false)
  const [isDisablePrev, setDisablePrev] = React.useState(true)

  for(let i = 0; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i)
  }

  const handleNextPage = () => {
    if(currentPage < pages.length - 1) 
      setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if( currentPage > 1)
      setCurrentPage(currentPage -1)
  }
  //показывать первые четыре страницы если есть
  //показывать даты на кнопках снизу
  //лпу ебаное
  React.useEffect(() => {
    if(currentPage === pages.length - 1) setDisableNext(true)
    else setDisableNext(!isDisableNext)

    if(currentPage === 0) setDisablePrev(true)
    else setDisablePrev(!isDisablePrev)

  },[setCurrentPage])
  //опцоонально добавить лоадинг при переключении если будет долго
  //палаты
   return (
    <div className="w-full mt-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size={'lg'} onClick={() => handleNextPage()} 
              className={
                clsx("cursor-pointer",
                //!isDisableNext && 'bg-gray-300'
                )} />
          </PaginationItem>
          <DatePicker
                  date={date}
                  setCurrentPage={setCurrentPage}
                  dashDates={dashDates}
                />
        {
        /*
          pages.slice(1).map( (page, idx) => (
            <PaginationItem key={idx}>
                        <PaginationLink size={'lg'} isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)} >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
          ) )
        */
        }
          <PaginationItem>
            <PaginationNext size={'lg'} onClick={() => handlePrevPage()} 
            className={
                clsx(`cursor-pointer`,
                //!isDisablePrev ? `bg-gray-300` : ``
                )} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}











/*
"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import * as React from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DashInit } from "./TableDash"

export
  function DashPagination({
    items,
    current,
    pageSize,
    onPageChange
  }: {
    items: number//{date: any, count: any }[]
    current: number
    pageSize: number
    onPageChange: any //(action: 'prev' | 'next' | 'date', count: number) => void
  }
) {


  const pagesCount = Math.ceil(items / pageSize)

  if(pagesCount === 1) return null
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

   return (
    <div className="w-full ml-4 mr-4 mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious size={'lg'} />
          </PaginationItem>
          {/*
            items.map((item, index) => {
              return  <PaginationItem key={index}>
                        <PaginationLink size={'lg'} isActive={index === current - 1}
                          onClick={() => onPageChange('prev', item.count)} >
                          {format(new Date(item.date), "P", {locale: ru})}
                        </PaginationLink>
                      </PaginationItem>
            })
          }

          {
            pages.map((page, index) => (
              <PaginationItem key={index}>
                        <PaginationLink size={'lg'} isActive={page === current} onClick={ () => onPageChange(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationNext size={'lg'} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export const paginate = (items: any[], pageNumber: number, pageSize: number) => {
  console.log('items' ,items)
  const startIndex = (pageNumber - 1) * pageSize
  console.log('start index' ,startIndex)
  console.log(pageSize)
  return items.slice(startIndex, startIndex + pageSize)
}

*/


















/*"use client"

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
   // console.log('pages' ,pages)
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
}*/