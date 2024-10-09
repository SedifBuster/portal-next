"use client"

import { useEffect, useState } from "react"
import { FilesCategory } from "./FilesCategory"
import { FileUpload } from "./FileUpload"
import axios from "axios"
import { FileCategory } from "@prisma/client"
import { FilesCategoryTable } from "./FilesCategoryTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FilesTable } from "./FilesTable"
const files = await fs.readdir("./public/uploads")
export
  function FilesTab(

) {
  
  const [filesCategories, setFilesCategories] = useState<FileCategory[]>()

  let onGetFilesCategory = async () => {
    try {
      let result = await axios.get('/api/uploadFiles/filesCategory')
      if(result.status === 200) setFilesCategories(result.data)
    } catch(error) {
      console.log('error', error)
    }
  }

  let onGetFiles/*in progress */ = async () => {
    try {
      //let result = await axios.get('/api/users')
      //if (result.status === 200) setUsers(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }


  useEffect(() => {onGetFiles(); onGetFilesCategory()}, [])

  return filesCategories?<>


    <Tabs defaultValue="files" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="files">файлы</TabsTrigger>
        <TabsTrigger value="categories">категории файлов</TabsTrigger>
      </TabsList>
      <TabsContent value="files">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
              Отправка и удаление файлов.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FileUpload  categories={filesCategories} onGetFilesCategory={onGetFilesCategory}/>
            <FilesTable />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="categories">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
              Создание и удаление категорий для файлов
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <FilesCategory onGetFilesCategory={onGetFilesCategory}/>
           {
             filesCategories
             ?
             <FilesCategoryTable categories={filesCategories} onGetFilesCategory={onGetFilesCategory}/>
            :
            ''
           }
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </> :
  ''
}