'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

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
      <div className="flex flex-wrap">

        {
          Object.keys(finalArray)
            .map((key: string) =>
              <div key={key} className="px-2 h-auto m-2 p-6">
                <h6 className="text-lg">{key} ({finalArray[key].length})</h6>
                {
                  finalArray[key]
                    .map((key: {category: string, name: string, href: string}) => {
                      return <a href={`/uploads/${key.href}`} target="_blank" key={key.href}>
                        <p className="text-sm">{key.name}</p>
                      </a>
                    }
                  )
                }
              </div>
            )
        }
      </div>
    </main>
}
/*
        {splitedFiles.map((file: any) => (
          <div key={file.name} className="px-2 h-auto w-1/3 border">
           <a href={`/uploads/${file.href}`} target="_blank"><p>{file.category}</p>{file.name}</a> 
          </div>
        ))}
 */