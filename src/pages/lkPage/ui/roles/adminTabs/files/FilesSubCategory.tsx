"use client"


import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { z } from "zod"

import axios from "axios"

import { FilesSubCategoryTable } from "./FilesSubCategoryTable"
import { Button } from "@/src/shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/shared/ui/form"
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/src/shared/ui/dialog"
import { Input } from "@/src/shared/ui/input"



const formFilesCategorySchema = z.object({
  name: z.string().min(5),
  category: z.any()
})
//cool
export
  function FilesSubCategory({
    onGetFilesCategory,
    filesCategories,
    onGetSubCategories
  }: {
    onGetFilesCategory: () => Promise<void>
    filesCategories:  {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]
    onGetSubCategories: () => Promise<void>
  }
) {

  const formFilesCategory = useForm<z.infer<typeof formFilesCategorySchema>>({
    resolver: zodResolver(formFilesCategorySchema),
      defaultValues: {
        name: '',
      }
  })

  async function onSubmitFileCategory(values: z.infer<typeof formFilesCategorySchema>) {
    try {
      const subCategoryData = {
        name: values.name,
        fileCategoryId: values.category.id,
      }
      console.log(subCategoryData)

      const subCategoryResult = await axios.post('/api/uploadFiles/subFilesCategory', subCategoryData)
      if(subCategoryResult.statusText !== "OK") return toast.error("Ошибка при создании категории")

      toast.success(`подкатегория создана `)
      onGetFilesCategory()
      onGetSubCategories()
      formFilesCategory.reset()

    console.log(values)

    } catch (error) {
      toast.error("Ошибка при создании категории")
      console.log("Ошибка при создании категории: ", error)
    }
  }

  return <div className="">
    <Dialog>
      <DialogTrigger asChild>
        <Button>Создать подкатегорию</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[55vw]">
        <DialogHeader>
          <DialogTitle>Создание подкатегории</DialogTitle>
        </DialogHeader>
        <Form {...formFilesCategory}>
          <form onSubmit={formFilesCategory.handleSubmit(onSubmitFileCategory)} className="space-y-2 flex flex-col gap-2 flex-wrap items-start">
            <FormField
              control={formFilesCategory.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название подкатегории*</FormLabel>
                  <FormControl>
                    <Input className="h-7 w-96" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            control={formFilesCategory.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите категорию к которой относится подкатегория*, выберите только одну!</FormLabel>
                <FormControl>
                    <div className="h-[70vh] overflow-auto w-full ">
                    <FilesSubCategoryTable categories={filesCategories} field={field}/>
                    </div>
                    
                </FormControl>
              </FormItem>
            )}
          />
        <DialogFooter>
          <Button type="submit">Создать подкатегорию</Button>
        </DialogFooter>
        </form>
      </Form>

      </DialogContent>
    </Dialog>
  </div>
}

/**
 *                   <SelectItem value="problemWithPC">
                    Проблема с персональным компьютером
                  </SelectItem>
                  <SelectItem value="problemWithOrgTechnics">
                    Проблема с принтером
                  </SelectItem>
                  <SelectItem value="problemWithMIS">
                    Проблема с МИС БАРС
                  </SelectItem>
                  <SelectItem value="newMISAccount">
                    Создание учетной записи
                  </SelectItem>
    <SelectItem value="uploadNewProgramm">
      Установка новых программ, обновление программного обеспечения
    </SelectItem>
 */