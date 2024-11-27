"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const formFilesCategorySchema = z.object({
  name: z.string().min(5),
  category: z.string()
})
//cool
export
  function FilesSubCategory({
    onGetFilesCategory,
    filesCategories
  }: {
    onGetFilesCategory: () => Promise<void>
    filesCategories:  {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]
  }
) {

  const formFilesCategory = useForm<z.infer<typeof formFilesCategorySchema>>({
    resolver: zodResolver(formFilesCategorySchema),
      defaultValues: {
        name: '',
        category: '',
      }
  })

  async function onSubmitFileCategory(values: z.infer<typeof formFilesCategorySchema>) {
    try {
      /*const categoryData = {
        name: values.name
      }
      console.log(categoryData)

      const categoryResult = await axios.post('/api/uploadFiles/filesCategory', categoryData)
      if(categoryResult.statusText !== "OK") return toast.error("Ошибка при создании категории")

      toast.success(`подкатегория создана `)
      onGetFilesCategory()
      formFilesCategory.reset()
*/
    console.log(values.name)

    } catch (error) {
      toast.error("Ошибка при создании категории")
      console.log("Ошибка при создании категории: ", error)
    }
  }

  return <div className="w-[50%]">
    <Dialog>
      <DialogTrigger asChild>
        <Button>Создать подкатегорию</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Создание подкатегории</DialogTitle>
        </DialogHeader>
        <Form {...formFilesCategory}>
          <form onSubmit={formFilesCategory.handleSubmit(onSubmitFileCategory)} className="space-y-2 flex gap-6 flex-wrap items-start">
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
              <FormItem className="w-96">
                <FormLabel>Выберите категорию к которой относится подкатегория*</FormLabel>
                <FormControl>

                </FormControl>
              </FormItem>
            )}
          />

        </form>
      </Form>
        <DialogFooter>
          <Button type="submit">Создать подкатегорию</Button>
        </DialogFooter>
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