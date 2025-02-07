"use client"

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { format } from "date-fns"
import { ru } from "date-fns/locale"


const formSchema = z.object({
  login: z.string().min(4, {
    message: "Имя пользователя должно состоять как минимум из 4 символов.",
  }),
  password: z.string().min(5, {
    message: "Пароль должен состоять как минимум из 5 символов."
  }),
})

export
  default function AuthForm ({
  }: {
  }
) {

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.status === 'authenticated') {
      //router.push('/lk')
    }
  }, [session?.status, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        login: "",
        password: "",
      },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    signIn('credentials',
      {
        login: values.login,
        password: values.password,
        redirect: false
      }
    ).then((callback) => {
      if(callback?.error) {
        toast.error("Неправильный логин или пароль", {
           description: <p className="text-black">{`${format(new Date(), "PPP HH:mm", {locale: ru})}`}</p>
         })
      }
      if(callback?.ok && !callback?.error) {
        toast.success(`Успешный вход`, {
          description: format(new Date(), "PPP HH:mm", {locale: ru}),
        })
        //router.push('/lk')
      }
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
            name="login"
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
            name="password"
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