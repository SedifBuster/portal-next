"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formFilesSchema = z.object({
    fileName: z.string(),
    category: z.string(),
})

export
  function FileUpload({

  }: {

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

      formData.append("file", fileInput?.current?.files?.[0]!,`${values.category}_${values.fileName}`)

        /*const fileData = {
          fileName: values.fileName,
          category: values.category,
          file: formData
        }
        console.log(fileData.file.get('file').name)*/

        //const uploadFile = await axios.post('/api/uploadFiles', fileData)
        //if(uploadFile.statusText !== 'OK') return toast.error("Ошибка при загрузке файла")
          //else {
           //   toast.success(`файл успешно загружен: ${uploadFile.data}`)
          //}
     //console.log(fileData)
    } catch (error) {
      toast.error("Ошибка при загрузке файла")
      console.log("Ошибка при загрузке файла: ", error)
    }
  }



  return <>
  <h6 className="text-lg font-bold mt-6">Загрузить файл</h6>
      <Form {...formFiles}>
        <form onSubmit={formFiles.handleSubmit(onSubmitFile)} className="space-y-2">
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
              <FormItem>
                <FormLabel>Категория файла*</FormLabel>
                <FormControl>
                  <Input  className="h-7" placeholder="Лекарственная безопасность" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input lang="ru" type="file" name="file" ref={fileInput}/>
                {
                /* <FormField
                          control={formFiles.control}
                          name="file"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Файл*</FormLabel>
                              <FormControl>
                                <Input type="file" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />*/
                }
          <Button type="submit">Загрузить файл</Button>
        </form>
      </Form>
  </>
}