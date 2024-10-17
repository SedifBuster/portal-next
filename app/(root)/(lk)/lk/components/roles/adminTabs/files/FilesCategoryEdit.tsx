"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileCategory } from "@prisma/client"
import { HiPencil} from "react-icons/hi2"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import toast from "react-hot-toast"
import axios from "axios"

export
  default function FilesCategoryEdit(
    {
      id,
      name,
      onGetFilesCategory
    }: {
      id: number
      name: string
      onGetFilesCategory: () => Promise<void>
    }
  ) {

    const [isName, setName] = React.useState<string>(name)

    let onChangeCategory = async (id: number, name: string) => {
        try {
          const postData = {
            id: id,
            name,
          }
          const result = await axios.patch( '/api/uploadFiles/filesCategory', postData )
          if ( result.statusText === "OK" ) {
            toast.success(`категория с номером ${result.data}  изменена`)
            onGetFilesCategory()
          }
        } catch ( error ) {
          console.log( "Ошибка при изменении категории", error )
          toast.error('Ошибка при изменении категории')
        }
      }


    return <Dialog>
    <DialogTrigger asChild>
    <Button variant={'outline'}><HiPencil /></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Изменить категорию</DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Название
          </Label>
          <Input id="name" value={isName} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={() => onChangeCategory(id, isName)}>Сохранить изменения</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  }