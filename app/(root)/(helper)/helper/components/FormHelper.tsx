"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя пользователя должно состоять как минимум из 2 символов.",
  }),
  cabinet: z.string().min(1, {
    message: "Номер кабинета должен состоять как минимум из 1 символа"
  }),
  number: z.string().min(9, {
    message: "Номер телефона должен состоять как минимум из 9 символов"
  }),
  category: z.string({
    required_error: "Пожалуйста выберите категорию",
  })
  ,
  problem: z.string().min(5, {
    message: " должен состоять как минимум из 9 символов"
  }),

})

export function FormHelper() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cabinet: "",
      number: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const postData = {
      name: values.name,
      cabinet: values.cabinet,
      number: values.number,
      category: values.category,
      problem: values.problem,
      //add file upload
    }
    console.log(values)
    console.log(postData)
    axios.post('/api/task', postData)
    //send task
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ф.И.О.</FormLabel>
              <FormControl>
                <Input placeholder="Иванов И.И." {...field} />
              </FormControl>
              <FormDescription>
                Ваши Фамилия и инициалы.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cabinet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер кабинета</FormLabel>
              <FormControl>
                <Input placeholder="017" {...field} />
              </FormControl>
              <FormDescription>
                Заполните без знака №.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input placeholder="+79996667788" {...field} />
              </FormControl>
              <FormDescription>
                Чтобы мы смогли до вас дозвониться.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Категория проблемы</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="проблема не выбрана" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="problemWithPC">
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
                </SelectContent>
              </Select>
              <FormDescription>
                Выберите наиболее подходящую категорию.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Возникшая проблема</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Мышка перестала подавать признаки жизни..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Подробно опишите возникшую проблему.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">отправить</Button>
      </form>
    </Form>
  )
}