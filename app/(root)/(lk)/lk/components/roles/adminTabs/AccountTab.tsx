"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Department, User} from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import axios from "axios"
import { z } from "zod"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HiPencil, HiTrash } from "react-icons/hi2"

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
  function AccountTab(

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

  const [departments, setDepartmens] = useState<Department[]>([])
  const [users, setUsers] = useState<User[]>([])

  let onGetUsers = async () => {
    try {
      let result = await axios.get('/api/users')
      if (result.status === 200) setUsers(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }

  let onChangeUser = async () => {
    toast.error('еще не реализовано')
  }

  let onDeleteUser = async (userId: number) => {
    const postData = {
      id: userId
    }

  const result = await axios.delete('/api/users', { data: postData })
    if (result.statusText === "OK") {
      toast.success('пользователь удален')
      onGetUsers()
    } else {
      toast.error('Ошибка при удалении пользователя')
    }
  }

  useEffect(() => {onGetUsers()}, [])

  return <section 
            className="
              flex
              flex-col
              jystify-start
              content-start
              gap-4
              mt-8
            "
  >
    <Sheet>
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
        <div>
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
                        <SelectItem value="USER">
                          Юзер
                        </SelectItem>
                        <SelectItem value="TECHNICICAN">
                          Техник
                        </SelectItem>
                        <SelectItem value="SYSADMIN">
                          Сисадмин
                        </SelectItem>
                        <SelectItem value="ADMIN">
                          Админ
                        </SelectItem>
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
                                            <SelectItem value="NURSE">
                                                медсестра - изменение значений
                                            </SelectItem>
                                            <SelectItem value="HEADNURSE">
                                                старшая медсестра - назначение, проверка
                                            </SelectItem>
                                            <SelectItem value="DEPNURSTAFF">
                                                зам по сред. мед. персоналу - менеджмент коек
                                            </SelectItem>
                                            <SelectItem value="CHIEFNURSE">
                                                главная медсестра - менеджмент коек
                                            </SelectItem>
                                            <SelectItem value="CMO">
                                                нач.мед. - просмотр
                                            </SelectItem>
                                            <SelectItem value="TECHNICICAN">
                                                технический специалист
                                            </SelectItem>
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
            </div>
        </SheetContent>
    </Sheet>
    <section className="
                    mt-4
                "
            >
                <ul
                    className="
                        flex
                        flex-col
                        gap-4
                    "
                >
                    {users ? users.map((user) => {
                        return <li key={user.id}
                            className="
                                        flex
                                        justify-between
                                        p-2
                                        border
                                    "
                        >
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <div>{user.id}</div>
                                <div>{user.name}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <div>{user.role}</div>
                                <div>{user.login}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <div>создана: {user.createdAt.toString()}</div>
                                <div>изменена: {user.updatedAt.toString()}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <Button variant={'outline'} onClick={onChangeUser}><HiPencil /></Button>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant={'destructive'}><HiTrash /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Удаление</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Вы действительно хотите удалить пользователя?
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <Button variant={'destructive'} onClick={() => onDeleteUser(user.id)}>удалить</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </li>
                    }) : ''}
                </ul>
            </section>
</section>
  }