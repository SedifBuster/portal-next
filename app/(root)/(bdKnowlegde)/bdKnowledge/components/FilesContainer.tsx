"use client"


import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileBd } from "@prisma/client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { HiOutlineDocument } from "react-icons/hi2"

export
  function FilesContainer({

  } : {
  }
  ) {

    const [fileNames, setFileNames] = useState<FileBd[]>([])
    console.log(fileNames)

    let onGetFiles = async () => {
      try {
        let result = await axios.get('/api/uploadFiles')
        if (result.status === 200) setFileNames(result.data)
      } catch(error) {
        console.log('error: ', error)
      }
    }

    const groupBy = (array: any, key: any) =>
      array.reduce((accumulator: any, object: any) => {
        (accumulator[object[key]] ??= []).push(object);
        return accumulator;
      },
    {});
  
    let finalArray: FileBd[] = groupBy(fileNames, 'category')

   // useEffect(() => {
     // if(fileNames)
       // finalArray = groupBy(fileNames, 'category')
   // }, [fileNames])
  
    useEffect(() => { onGetFiles()}, [])
    return fileNames?(
      <section>
    <header>
        <div className="flex ">
          <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">База знаний</Label>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
      {/** <ul className="flex flex-col justify-center p-2 gap-2">
        {
          fileNames
            .map((fileDb) => {
              return <li key={fileDb.id}>
              <Link href={`http://192.168.0.148:5000/knowledgeBd/${fileDb.filePath}`} target="_blank" className="flex gap-2 items-center">
                <HiOutlineDocument />
                <p className="text-sm text-blue-700">{fileDb.category} {fileDb.name}</p>
              </Link>
            </li>
            })}
       </ul>*/}



       {
          Object.keys(finalArray)
            .map((key: string) =>
              <div key={key} className="px-2 h-auto m-2 p-6">
                {
                  //@ts-ignore
                <h6 className="text-lg">{key} ({finalArray[key].length})</h6>
                }
                <ul className="flex flex-col justify-center p-2 gap-2">
                 
                {//@ts-ignore
                  finalArray[key]
                    .map((key: FileBd) => {
                      return <li key={key.id}>
                        <Link href={`http://192.168.0.148:5000/knowledgeBd/${key.filePath}`} target="_blank" className="flex gap-2 items-center">
                          <HiOutlineDocument />
                          <p className="text-sm text-blue-700">{key.name}</p>
                        </Link>
                      </li>
                    }
                  )
                }
                </ul>

              </div>
            )
        }
      </div>
      </section>
    ): "Файлов не найдено"
  }


/*import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { HiOutlineDocument } from "react-icons/hi2";

export
  async function FilesContainer(
  {
    files,
  }: {
    files: string[]
  }
) {

  const onSplitFileNames = (files: string[]) => {
    let onObjectArr: any = []
    for(let i = 0; i < files.length; i++) {
      onObjectArr.push({category: files[i].split('_')[0], name: files[i].split('_')[1], href: files[i]})
    }
    return onObjectArr
  }

  let splitedFiles: {category: string, name: string, href: string}[] = onSplitFileNames(files)

  const groupBy = (array: any, key: any) =>
    array.reduce((accumulator: any, object: any) => {
      (accumulator[object[key]] ??= []).push(object);
      return accumulator;
    },
  {});

  const onFilterFileNames = (files: {category: string, name: string, href: string}[]) => {

    let groupedFiles = groupBy(splitedFiles, 'category')

    return groupedFiles
  }

  let finalArray = onFilterFileNames(splitedFiles)

  return <main>
        <div>
        <Link href={'/'}>
          <Button variant={'secondary'} className="m-2" >на главную</Button>
        </Link>
      </div>
      <header>
        <div className="flex ">
          <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">База знаний</Label>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">

      </div>
    </main>
}*/