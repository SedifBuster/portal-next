import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileBd } from "@prisma/client"
import Link from "next/link"
import { HiOutlineDocument } from "react-icons/hi2"
//cool
export
  function FilesTable({
    files,
    onDeleteFile
  } : {
    files: FileBd[]
    onDeleteFile: (id: number) => void
  }
) {
  return (
    <section>
      <header>
        <div className="flex ">
          <Label className="text-xl block subpixel-antialiased tracking-wide p-4">Файлы базы знаний</Label>
        </div>
      </header>
      <div className="flex flex-wrap gap-2">
        <ul className="flex flex-col justify-center p-2 gap-2">
          {
            files
              .map((fileDb) => {
                return <li key={fileDb.id} className="flex gap-2">
                <Link href={`http://192.168.0.148:5000/knowledgeBd/${fileDb.filePath}`} target="_blank" className="flex gap-2 items-center">
                  <HiOutlineDocument />
                  <p className="text-sm text-blue-700 flex"><div className="text-black pr-2"> К: </div>{fileDb.category} {fileDb.subCategory? <div className="text-black pl-2 pr-2"> ПодК: </div> : ''}{fileDb.subCategory} <div className="text-black pl-2 pr-2"> Имя: </div> {fileDb.name}</p>
                </Link>
                <Button variant={'destructive'} onClick={() => onDeleteFile(fileDb.id)}>удалить</Button>
                </li>
              })
          }
        </ul>
      </div>
    </section>
  )
}






















/*import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { HiOutlineDocument } from "react-icons/hi2";

export
  async function FilesTable(
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

        {
          Object.keys(finalArray)
            .map((key: string) =>
              <div key={key} className="px-2 h-auto m-2 p-6">
                <h6 className="text-lg">{key} ({finalArray[key].length})</h6>
                <ul className="flex flex-col justify-center p-2 gap-2">
                {
                  finalArray[key]
                    .map((key: {category: string, name: string, href: string}) => {
                      return <li key={key.href}>
                        <Link href={`/uploads/${key.href}`} target="_blank" className="flex gap-2 items-center">
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
    </main>
}*/
