"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileCategory } from "@prisma/client"
import axios from "axios"

const formFilesSchema = z.object({
  fileName: z.string().min(3),
  category: z.string().min(3),
})
//cool
export
  function FileUpload({
    onGetFiles,
    categories
  }: {
    onGetFiles: () => Promise<void>
    categories: FileCategory[]
  }
) {
  const fileInput = useRef<HTMLInputElement>(null)

  const formFiles = useForm<z.infer<typeof formFilesSchema>>({
    resolver: zodResolver(formFilesSchema),
      defaultValues: {
        fileName: '',
        category: ''
      }
  })

  async function onSubmitFile(values: z.infer<typeof formFilesSchema>) {
    try {
      const formData = new FormData()
      console.log(values)
      formData.append("file", fileInput?.current?.files?.[0]!)

      if(fileInput?.current?.files?.[0]!.size && fileInput?.current?.files?.[0]!.size > 15728640/*1,5e+7*/) return toast.error('файл слишком большой!')

      const postFileName = {
        name: values.fileName,
        category: values.category,
        //@ts-ignore
        filePath: formData.get('file').name
      }

      const uploadFileName = await axios.post('/api/uploadFiles', postFileName)

      if(!uploadFileName) {toast.error('Ошибка на стороне сервера'); throw new Error}

      const uploadFile = await axios.post('http://192.168.0.148:5000/knowledgeBd', formData)

      if(uploadFile.statusText !== 'OK') throw new Error

      toast.success(`файл успешно загружен`)
      formFiles.reset()
      onGetFiles()

    } catch (error) {
      toast.error("Ошибка при загрузке файла")
      console.log("Ошибка при загрузке файла: ", error)
    }
  }

  return <>
    <h6 className="text-lg font-bold mt-6">Загрузить файл</h6>
      <Form {...formFiles}>
        <form onSubmit={formFiles.handleSubmit(onSubmitFile)} className="space-y-4">
          <FormField
            control={formFiles.control}
            name="fileName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название файла*</FormLabel>
                  <FormControl>
                    <Input className="h-7" placeholder="Об утверждении стандарта..." {...field} />
                  </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formFiles.control}
            name="category"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Категория файла*</FormLabel>
                <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="h-7">
                        <SelectValue placeholder="..."/>
                      </SelectTrigger>
                    </FormControl>
                  <SelectContent>
                   {categories.map((category) => {
                      return <SelectItem value={category.name} key={category.id}>
                        {category.name}
                      </SelectItem>
                    })} 
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input className="mt-12" lang="ru" type="file" name="file" ref={fileInput}/>
          <Button type="submit">Загрузить файл</Button>
        </form>
      </Form>
  </>
}