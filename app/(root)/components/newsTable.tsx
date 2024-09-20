'use client'

import { Label } from "@/components/ui/label";
import { New } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { addDays, eachDayOfInterval, format, isEqual } from "date-fns"
import ru from "date-fns/locale/ru";


export function NewsTable() {
    const [isNews, setNews] = useState<New[]>()

    let getNews = async () => {
      try {
          let result = await axios.get('/api/news')
          if (result.status === 200) {
              setNews(result.data)
              console.log(result.data)
          }
      } catch {
          console.log('error')
      }
  }
  

  useEffect(() => {
    getNews()
  }, [])
  
  console.log(isNews)


    return (
        <div className="basis-2/5 h-[80vh] rounded-md p-4 border-green-100 border-2 shadow-sm overflow-auto flex flex-col gap-4">

        {
        isNews && isNews.length > 0
        ?
          isNews.length > 10
          ?
          isNews.reverse().slice(0,10).map((news) => {
            return <div key={news.id} className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">{news.nameNews}</Label>
            <p className="text-sm border-b w-full mb-2">{format(new Date(news.dateNews), "PPP", {locale: ru})}</p>
            <p className="mb-4">{news.news}
            </p>
          </div>
        })
        :
        isNews.reverse().map((news) => {
            return <div key={news.id} className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">{news.nameNews}</Label>
            <p className="text-sm border-b w-full mb-2">{format(new Date(news.dateNews), "PPP", {locale: ru})}</p>
            <p className="mb-4">{news.news}
            </p>
          </div>
        })
        :
        <p className="text-gray-400">новостей не найдено</p>
        }



        </div>
    )
}


/**
 *           <div className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">Заголовок новости</Label>
            <p className="text-sm border-b w-full mb-2">Дата новости</p>
            <p className="mb-4">Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости Текст новости
            </p>
          </div>
 */