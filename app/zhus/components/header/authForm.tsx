"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    userName: z.string().min(3, {
        message: "Логин должно быть больше трех символов.",
    }),
    userPassword: z.string().min(3, {
        message: "Пароль должнен быть больше трех символов.",
    }),
  })

export
  default function AuthForm ({
    postAuth
  }: {
    postAuth: ( postData: any) => any
  }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      userPassword: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postAuth(values)
      .catch(error => {
        //toast.error("Произошла ошибка при отправке в ЖУС", {
         // description: <p className="text-black">{`${error}`}</p>
        ///})
      })
      .then(() => {
        //toast.success(`Случай успешно добавлен в ЖУС`, {
         // description: format(new Date(), "PPP HH:mm", {locale: ru}),
       // })
        form.reset()
      })
  }


  return <Dialog>
  <DialogTrigger className="border-2 h-12 p-2 text-center align center rounded-lg">Войти в аккаунт</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Войти в аккаунт</DialogTitle>
      

    </DialogHeader>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="IvanovVA" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                   <Input placeholder="*****" {...field} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4" type="submit">Отправить</Button>
        </form>
      </Form>
  </DialogContent>
</Dialog>
     
}