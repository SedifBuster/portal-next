"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import axios from "axios"
import { Department } from "@prisma/client"
import { Input } from "@/components/ui/input"

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
  function UserCreate(
    {
      departments,
      onGetUsers
    }: {
      departments: Department[]
      onGetUsers: () => void
    }
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        login: "",
        password: "",
      },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userData = {
        name: values.name,
        login: values.login,
        password: values.password,
        role: values.role,
      }
      console.log(userData)

      const userResult = await axios.post('/api/register', userData)
      if(userResult.statusText !== "OK") return toast.error("Ошибка при создании пользователя")
      else if(userResult.statusText === "OK") {
        const userId: number = userResult.data.id
        toast.success(`пользователь создан с id: ${userId}`)

        if(!userId) return toast.error("Id не найден")
        const profileData = {
          userId,
          depId: Number(values.department),
          grade: values.grade
        }

        const profileResult = await axios.post('/api/users/profile', profileData)
        if(profileResult.statusText !== "OK") {
          const deletedUser = {
            id: userId
          }

          const deletedUserResult = await axios.delete('/api/users', { data: deletedUser})
          if(deletedUserResult.statusText === "OK") return toast.error("Пользователь удален")
          else {
            toast.error("Ошибка при удалении профиля")
          }
          return toast.error("Ошибка при создании профиля")
        }
        else if(profileResult.statusText === "OK") {
          toast.success(`профиль создан с id: ${profileResult.data}`)
          form.reset()
          onGetUsers()
        }
      }
    } catch (error) {
      toast.error("Ошибка при создании пользователя")
      console.log("Ошибка при создании пользователя ", error)
    }
  }

  const roles = [
    {
      value: 'USER',
      text: 'Пользователь'
    },
    {
      value: 'TECHNICICAN',
      text: 'Техник'
    },
    {
      value: 'SYSADMIN',
      text: 'Сисадмин'
    },
    {
      value: 'ADMIN',
      text: 'Админ'
    },
  ]

  const positions = [
    {
      value: 'NURSE',
      text: 'медсестра - изменение значений'
    },
    {
      value: 'HEADNURSE',
      text: 'старшая медсестра - назначение, проверка'
    },
    {
      value: 'DOCTOR',
      text: 'Врач/фельдшер - желтые/зеленые'
    },
    {
      value: 'SITEADMIN',
      text: 'Администратор участка - зеленые'
    },
    {
      value: 'OMO',
      text: 'ОМО - желтые/зеленые'
    },
    {
      value: 'DEPNURSTAFF',
      text: 'зам по сред. мед. персоналу - менеджмент коек'
    },
    {
      value: 'CHIEFNURSE',
      text: 'главная медсестра - менеджмент коек'
    },
    {
      value: 'CMO',
      text: 'нач.мед. - просмотр'
    },
    {
      value: 'TECHNICICAN',
      text: 'технический специалист'
    },
  ]

  return <Sheet>
    <SheetTrigger>
      <Button>создать пользователя</Button>
    </SheetTrigger>
    <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Создать пользователя</SheetTitle>
        <SheetDescription>
          Помните, у каждого должна быть должность и профиль. Кликните по "создать" когда заполните все поля.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя*</FormLabel>
                <FormControl>
                  <Input className="h-7" placeholder="Иванов И.И." {...field} />
                </FormControl>
                <FormDescription>
                  Фамилия и инициалы.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин*</FormLabel>
                <FormControl>
                  <Input  className="h-7" placeholder="Ivanov7" {...field} />
                </FormControl>
                <FormDescription>
                  Для авторизации.
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
                <FormLabel>Пароль*</FormLabel>
                <FormControl>
                  <Input  className="h-7" placeholder="*********" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Для авторизации.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Роль*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-7">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map(role => {
                      return <SelectItem key={role.value} value={role.value}>
                        {role.text}
                      </SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Стандартная: Юзер.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Должность*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-7">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {positions.map(position => {
                      return <SelectItem key={position.value} value={position.value}>
                        {position.text}
                      </SelectItem>
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Если айти - технический специалист
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отделение</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-7">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments?departments.map((dep) => {
                      return <SelectItem value={dep.id.toString()} key={dep.id}>
                        {dep.name}
                      </SelectItem>
                    }): ''}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Если не технический специалист.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">отправить</Button>
        </form>
      </Form>
    </SheetContent>
  </Sheet>
}