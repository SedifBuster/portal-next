"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useForm } from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/src/shared/ui/form"
import { Input } from "@/src/shared/ui/input"
import { Button } from "@/src/shared/ui/button"

const formSchema = z.object({
  login: z.string().min(4, {
    message: "Имя пользователя должно состоять как минимум из 4 символов.",
  }),
  password: z.string().min(5, {
    message: "Пароль должен состоять как минимум из 5 символов."
  }),
})

export
  function AuthForm(

) {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.push('/lk')
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
        toast.error('Неправильный логин или пароль')
      }
      if(callback?.ok && !callback?.error) {
        toast.success('Успешный вход')
        router.push('/lk')
      }
    })
  }

  return (
    <div 
      className="
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
      "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder="IvanovII" {...field} />
                </FormControl>
                <FormDescription>
                  Ваш логин для входа в систему.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="..." {...field} />
                </FormControl>
                <FormDescription>
                  Ваш пароль.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">войти</Button>
        </form>
      </Form>
    </div>
  )
}