"use client"

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from "axios"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"

const formNewsSchema = z.object({
    nameNews: z.string().min(5),
    dateNews: z.date(),
    news: z.string().min(5),
    liable: z.string()
})

const formSchema = z.object({
    name: z.string().min(5, {
        message: "Имя пользователя должно состоять как минимум из 5 символов.",
    })
    ,
    login: z.string().min(5, {
        message: "Логин должно состоять как минимум из 5 символов."
    })
    ,
    password: z.string().min(4, {
        message: "Пароль должен состоять как минимум из 4 символов."
    })
    ,
    role: z.string({
        required_error: "Пожалуйста выберите роль",
    }).optional()
    ,
    department: z.string({
        required_error: "Пожалуйста выберите отделение",
    }).optional()
    ,
    grade: z.string({
        required_error: "Пожалуйста выберите должность",
    })
})

export
  function NewsTab(

) {

    const formNews = useForm<z.infer<typeof formNewsSchema>>({
        resolver: zodResolver(formNewsSchema),
        defaultValues: {
            nameNews: "",
            dateNews: new Date(),
            news: "",
            liable: '',
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            login: "",
            password: "",
        },
    })

    async function onSubmitNews(values: z.infer<typeof formNewsSchema>) {
        try {
            const userData = {
                nameNews: values.nameNews,
                dateNews: values.dateNews,
                news: values.news,
                liable: values.liable,
              }
              console.log(userData)

              const newNews = await axios.post('/api/news', userData)
              if(newNews.statusText !== 'OK') return toast.error("Ошибка при создании новости")
                else {
                    toast.success(`новость создана с id: ${newNews.data}`)
                }

        } catch (error) {
            toast.error("Ошибка при создании новости")
            console.log("Ошибка при создании нововсти: ", error)
        }
      }

  return <>
    <h6 className="text-lg font-bold mt-6">Загрузить новость</h6>
      <Form {...form}>
              <form onSubmit={formNews.handleSubmit(onSubmitNews)} className="space-y-2">
                <FormField
                  control={formNews.control}
                  name="nameNews"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название новости*</FormLabel>
                      <FormControl>
                        <Input className="h-7" placeholder="Сегодня произошло..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formNews.control}
                  name="news"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание новости*</FormLabel>
                      <FormControl>
                        <Textarea  className="h-7" placeholder="*********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formNews.control}
                  name="liable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отправитель*</FormLabel>
                      <FormControl>
                        <Input  className="h-7" placeholder="от..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
              <Button type="submit" onClick={formNews.handleSubmit(onSubmitNews)}>отправить новость</Button>
            </Form>
    </>

}