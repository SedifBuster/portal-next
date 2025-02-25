"use client"

import { useEffect, useState } from "react"
import { FilesCategory } from "./FilesCategory"
import { FileUpload } from "./FileUpload"
import axios from "axios"
import { FileBd, FileCategory, SubFileCategory } from "@prisma/client"
import { FilesCategoryTable } from "./FilesCategoryTable"


import { FilesTable } from "./FilesTable"
import toast from "react-hot-toast"
import { FilesSubCategory } from "./FilesSubCategory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/shared/ui/card"
//maybe cool
export
  function FilesTab(

) {
  const [filesCategories, setFilesCategories] = useState<FileCategory[]>()
  const [fileNames, setFileNames] = useState<FileBd[]>()
  const [subcategories, setSubcategories] = useState<SubFileCategory[]>()

  let onGetFilesCategory = async () => {
    try {
      let result = await axios.get('/api/uploadFiles/filesCategory')
      if(result.status === 200) setFilesCategories(result.data)
    } catch(error) {
      console.log('error', error)
    }
  }

  let onGetSubCategories = async () => {
    try {
      let result = await axios.get('/api/uploadFiles/subFilesCategory')
      if (result.status === 200) setSubcategories(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }

  let onGetFiles = async () => {
    try {
      let result = await axios.get('/api/uploadFiles')
      if (result.status === 200) setFileNames(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }

  let onDeleteFile = async (id: number) => {
    try {
      const postData = { id: id }

      let result = await axios.delete('/api/uploadFiles',{data: postData} )
      if (result.statusText === "OK") {
        toast.success('файл удален')
        onGetFiles()
      } else {
        toast.error('Ошибка при удалении файла')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {onGetFiles(); onGetFilesCategory();onGetSubCategories()}, [])

  return filesCategories && subcategories?<>
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
            <FileUpload  categories={filesCategories} onGetFiles={onGetFiles}  subcategories={subcategories} />
            {fileNames? <FilesTable files={fileNames} onDeleteFile={onDeleteFile}/>: 'файлов не обнаружено'}
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
            <div className="flex gap-2">
            <FilesCategory onGetFilesCategory={onGetFilesCategory} subcategories={subcategories} onGetSubCategories={onGetSubCategories}/>
            <FilesSubCategory onGetFilesCategory={onGetFilesCategory} filesCategories={filesCategories} onGetSubCategories={onGetSubCategories}/>
            </div>
       
           {
             filesCategories
             ?
             <FilesCategoryTable categories={filesCategories} onGetFilesCategory={onGetFilesCategory} subcategories={subcategories} onGetSubCategories={onGetSubCategories}/>
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