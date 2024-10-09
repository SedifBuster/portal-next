"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"

const formFilesCategorySchema = z.object({
  name: z.string().min(5),
})

export
  function FilesCategory({
    onGetFilesCategory
  }: {
    onGetFilesCategory: () => Promise<void>
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
      const categoryData = {
        name: values.name
      }
      console.log(categoryData)

      const categoryResult = await axios.post('/api/uploadFiles/filesCategory', categoryData)
      if(categoryResult.statusText !== "OK") return toast.error("Ошибка при создании категории")

      //const categoryName: string = categoryResult.data.id
      toast.success(`категория создана `)//с названием: ${categoryName}
      onGetFilesCategory()
      formFilesCategory.reset()

    } catch (error) {
      toast.error("Ошибка при создании категории")
      console.log("Ошибка при создании категории: ", error)
    }
  }

  return <>
    <h6 className="text-lg font-bold">Создать категорию</h6>
      <Form {...formFilesCategory}>
        <form onSubmit={formFilesCategory.handleSubmit(onSubmitFileCategory)} className="space-y-2">
          <FormField
            control={formFilesCategory.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название категории*</FormLabel>
                <FormControl>
                  <Input className="h-7" placeholder="..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Создать</Button>
        </form>
      </Form>
  </>
}