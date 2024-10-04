"use client"

import { useEffect, useState } from "react"
import { FilesCategory } from "./FilesCategory"
import { FileUpload } from "./FileUpload"
import axios from "axios"
import { FileCategory } from "@prisma/client"
import { FilesCategoryTable } from "./FilesCategoryTable"

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
    <FileUpload  categories={filesCategories} onGetFilesCategory={onGetFilesCategory}/>
    <FilesCategory onGetFilesCategory={onGetFilesCategory}/>
    {
    filesCategories
    ?
    <FilesCategoryTable categories={filesCategories} onGetFilesCategory={onGetFilesCategory}/>
    :
    ''
    }
  </> :
  ''
}