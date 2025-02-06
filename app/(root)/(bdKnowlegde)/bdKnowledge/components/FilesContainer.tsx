"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu,
   DropdownMenuContent,
    DropdownMenuGroup,
     DropdownMenuItem,
      DropdownMenuLabel,
       DropdownMenuPortal,
        DropdownMenuSeparator,
         DropdownMenuShortcut,
          DropdownMenuSub,
           DropdownMenuSubContent,
            DropdownMenuSubTrigger,
             DropdownMenuTrigger
             } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { FileBd, SubFileCategory } from "@prisma/client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { HiOutlineArrowUturnDown, HiOutlineDocument } from "react-icons/hi2"

export
  function FilesContainer({
  }: {
  }
) {
  const [fileNames, setFileNames] = useState<FileBd[]>([])
  const [subCategories, setSubCategories] = useState<SubFileCategory[]>()

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

  let onGetSubCategories = async () => {
    try {
      let result = await axios.get('/api/uploadFiles/subFilesCategory')
      if (result.status === 200) setSubCategories(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }


  let finalArray: FileBd[] = groupBy(fileNames, 'category')

  useEffect(() => { onGetFiles()}, [])
  return fileNames?(
    <section>
      <header>
        <div className="flex ">
          <Label className="text-5xl block subpixel-antialiased tracking-wide p-4">База знаний</Label>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
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
                     Object.keys(groupBy(finalArray[key], "subCategory"))
                       .map((keysub: string) => 
                         
                          <div key={keysub} className="px-2">
                            { //@ts-ignore
                              keysub !== "null" ? 
                              <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                              <h6 className="cursor-pointer flex items-center gap-1">{keysub}<HiOutlineArrowUturnDown /></h6>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>{keysub}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                   {//@ts-ignore
                                  groupBy(finalArray[key], "subCategory")[keysub].map((key: FileBd) => {
                                    return <DropdownMenuItem key={key.id}>
                              <Link href={`http://192.168.0.148:5000/knowledgeBd/${key.filePath}`} target="_blank" className="flex gap-2 items-center">
                                <HiOutlineDocument />
                                <p className="text-sm text-blue-700">{key.name}</p>
                              </Link>
                            </DropdownMenuItem>
                          })
                        }
                       </DropdownMenuGroup>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  :
                  null
                }

                      <ul className="flex flex-col justify-center p-2 gap-2">
                        {//@ts-ignore
                          groupBy(finalArray[key], "subCategory")[keysub].map((key: FileBd) => {
                            if(keysub === "null")
                            return <li key={key.id}>
                              <Link href={`http://192.168.0.148:5000/knowledgeBd/${key.filePath}`} target="_blank" className="flex gap-2 items-center">
                                <HiOutlineDocument />
                                <p className="text-sm text-blue-700">{key.name}</p>
                              </Link>
                            </li>
                          })
                        }
                      </ul>
                          </div>
                     )
                }

                {//@ts-ignore
                /*
                  finalArray[key]
                  .map((key: FileBd) => {
                    return <li key={key.id}>
                      <Link href={`http://192.168.0.148:5000/knowledgeBd/${key.filePath}`} target="_blank" className="flex gap-2 items-center">
                        <HiOutlineDocument />
                        <p className="text-sm text-blue-700">{key.subCategory} {key.name}</p>
                      </Link>
                    </li>
                  }
                )
                  */
              }
                </ul>
              </div>
            )
        }
      </div>
    </section>
  ): "Файлов не найдено"
}

/**
 * {//@ts-ignore
                  finalArray[key]
                    .map((key: FileBd) => {
                      return <li key={key.id}>
                        <Link href={`http://192.168.0.148:5000/knowledgeBd/${key.filePath}`} target="_blank" className="flex gap-2 items-center">
                          <HiOutlineDocument />
                          <p className="text-sm text-blue-700">{key.subCategory} {key.name}</p>
                        </Link>
                      </li>
                    }
                  )
                }

                  <h6>
                                {key !== "null" ? key {finalArray[key].length} : 'sad'}
                              </h6>
 */