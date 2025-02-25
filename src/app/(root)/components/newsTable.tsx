'use client'


import { New } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns"
import ru from "date-fns/locale/ru";
import { Label } from "@/src/shared/ui/label";

export
  function NewsTable(
) {
  const [isNews, setNews] = useState<New[]>()

  let getNews = async () => {
    try {
      let result = await axios.get('/api/news')
      if (result.statusText !== 'OK') throw new Error()

      setNews(result.data.reverse())
    } catch (error){
      console.log('error', error)
    }
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <div className=" h-[73vh] rounded-md p-2 border-green-100 border-2 shadow-sm overflow-auto flex flex-col gap-4">
      <h2 className="flex justify-center font-bold  text-xl">Новости</h2>
      <div className="h-[71vh] overflow-auto gap-4  flex-col flex p-2">
        {
          isNews && isNews.length > 0
          ?

          isNews.length > 10
          ?
          isNews.slice(0,10).map((news) => {
            return <div key={news.id} className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">{news.nameNews}</Label>
            <p className="text-sm border-b w-full mb-2">{format(new Date(news.dateNews), "PPP", {locale: ru})}</p>
            <p className="mb-4">{news.news}
            </p>
            <p>от {news.liable}</p>
          </div>
          })
          :
          isNews.map((news) => {
            return <div key={news.id} className="w-full border-2 border-gray-200 flex p-4 flex-col shadow-md">
            <Label className="text-xl border-b w-full">{news.nameNews}</Label>
            <p className="text-sm border-b w-full mb-2">{format(new Date(news.dateNews), "PPP", {locale: ru})}</p>
            <p className="mb-4">{news.news}
            </p>
            <p>от {news.liable}</p>
          </div>
          })
          :
          <p className="text-gray-400">новостей не найдено</p>
        }
      </div>
    </div>
  )
}