"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef } from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { date, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import axios from "axios"
import { Department, Profile, User, Ward } from "@prisma/client"

import toast from "react-hot-toast"
import {
    HiTrash,
    HiPencil
} from "react-icons/hi2"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format, setDate } from "date-fns"
import { CalendarIcon, Calendar } from "lucide-react"
import ru from "date-fns/locale/ru"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminTab } from "./adminTabs/AdminTab"
import { AccountTab } from "./adminTabs/AccountTab"


export function Admin() {

    //DEPARTMENT
    const [isDepartments, setIsDepartmens] = useState<Department[]>([])
    const [isDepartmentName, setIsDepartmentName] = useState<string>('')
    let getDepartments = async () => {
        try {
            let result = await axios.get('/api/department')
            if (result.status === 200) {
                setIsDepartmens(result.data)
            }
        } catch {
            console.log('error')
        }
    }
    const [isDate, setDate] = useState<Date>(new Date())
    const createDepartment = async () => {
        const postData = {
            name: isDepartmentName
        }
        const result = await axios.post('/api/department', postData)
        if (result.statusText === "OK") {
            toast.success('Отделение создано')
            getDepartments()
            setIsDepartmentName('')
        } else {
            toast.error('Ошибка при создании')
        }
    }
    let deleteDepartment = async (depId: number) => {
        const postData = {
            id: depId
        }
        const result = await axios.delete('/api/department', { data: postData })
        if (result.statusText === "OK") {
            toast.success('Отделение удалено')
            getDepartments()
        } else {
            toast.error('Ошибка при удалении')
        }
    }
    let changeDepartment = async () => {
        toast.error('еще не реализовано')
    }
    const router = useRouter()
    //USERS
    const [users, setUsers] = useState<User[]>([])
    const [profiles, setProfiles] = useState<Profile[]>([])
    let getUsers = async () => {
        try {
            let result = await axios.get('/api/users')
            if (result.status === 200) {
                setUsers(result.data)
            }
        } catch {
            console.log('error')
        }
    }
    let getProfiles = async() => {
        try {
            let result = await axios.get('/api/users/profile')
            if (result.status === 200) {
                setProfiles(result.data)
            }
        } catch {
            console.log('error')
        } 
    }
    let deleteUser = async (userId: number) => {
        const postData = {
            id: userId
        }

        const result = await axios.delete('/api/users', { data: postData })
        if (result.statusText === "OK") {
            toast.success('пользователь удален')
            getUsers()
        } else {
            toast.error('Ошибка при удалении пользователя')
        }
    }
    let changeUser = async () => {
        toast.error('еще не реализовано')
    }

    //WARDS
    const [wards, setWards] = useState<Ward[]>([])
    let getWards = async () => {
        try {
            let result = await axios.get('/api/ward')
            if (result.status === 200) {
                setWards(result.data)
            }
        } catch {
            console.log('error')
        }
    }

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

    const formNewsSchema = z.object({
        nameNews: z.string().min(5),
        dateNews: z.date(),
        news: z.string().min(5),
        liable: z.string()
    })

    const formNews = useForm<z.infer<typeof formNewsSchema>>({
        resolver: zodResolver(formNewsSchema),
        defaultValues: {
            nameNews: "",
            dateNews: new Date(),
            news: "",
            liable: '',
        }
    })

    const formFilesSchema = z.object({
        fileName: z.string(),
        category: z.string(),
        //file: z.instanceof(File)
    })

    const formFiles = useForm<z.infer<typeof formFilesSchema>>({
        resolver: zodResolver(formFilesSchema),
        defaultValues: {
          fileName: '',
          category: ''
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

    useEffect(() => {
        getDepartments()
        getUsers()
        getProfiles()
        getWards()
    }, [])
    
    console.log(users)
    console.log(profiles)

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
                    getUsers()
                }
            }
        } catch (error) {
            toast.error("Ошибка при создании пользователя")
            console.log("Ошибка при создании пользователя ", error)
        }
      }

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


      const fileInput = useRef<HTMLInputElement>(null)

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

      const tabs = [
        {
          value: "accounts",
          title: "Аккаунты",
          description: "Список аккаунтов приложения. Добавляйте, изменяйте и удаляйте аккаунты здесь.",
          tabContent: <AccountTab />
        },
        {
          value: "departments",
          title: "Отделения",
          description: "Change your password here. After saving, you'll be logged out.",
          tabContent: <div>asdasd</div>
        },
        {
          value: "news",
          title: "Новости",
          description: "Управляйте новостной лентой здесь.",
          tabContent: <div>asdasd</div>
        },
        {
          value: "files",
          title: "Файлы",
          description: "Change your password here. After saving, you'll be logged out.",
          tabContent: <div>asdasd</div>
        },
        {
          value: "settings",
          title: "Настройки",
          description: " ",
          tabContent: <div>asdasd</div>
        },
      ]

    return (
        <section
            className="
                bg-white
                p-8
            "
        >

<div className="flex justify-end p-4">
<Button onClick={async() => {
                   await signOut({
                        redirect: false,
                        callbackUrl: `/`
                    })
                    router.push('/')
                    localStorage.clear()
                }}>
                    выйти
                </Button>
</div>




  <Tabs defaultValue="account" className="w-full">
    <TabsList className="grid w-full grid-cols-5">
      {
        tabs.map((tab) => {
          return <TabsTrigger value={tab.value}>{tab.title}</TabsTrigger>
        })
      }
    </TabsList>

    <AdminTab value={tabs[0].value} title={tabs[0].title} description={tabs[0].description} tabContent={tabs[0].tabContent}/>

    <TabsContent value="account">
      <Card>
        <CardHeader>
          <CardTitle>Акаунты</CardTitle>
          <CardDescription>
            Список аккаунтов приложения. Добавляйте, изменяйте и удаляйте аккаунты здесь.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
            {/*Создание пользователя */}
            <section
                className="
                        flex
                        gap-4
                        mt-8
                    "
            >
                <Sheet>
                    <SheetTrigger>
                        <Button>
                            создать пользователя
                        </Button>
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
                                                        {isDepartments?isDepartments.map((dep) => {
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
            </section>

            {/*Контейнер юзеров */}                                            
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
                                <Button variant={'outline'} onClick={changeUser}><HiPencil /></Button>
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
                                                <Button variant={'destructive'} onClick={() => deleteUser(user.id)}>удалить</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </li>
                    }) : ''}
                </ul>
            </section>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </TabsContent>

      <TabsContent value="news">
        <Card>
          <CardHeader>
            <CardTitle>Новости</CardTitle>
            <CardDescription>
              Управляйте новостной лентой здесь.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
            </Form>

          </CardContent>
          <CardFooter>
          <Button type="submit" onClick={formNews.handleSubmit(onSubmitNews)}>отправить новость</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="files">
        <Card>
          <CardHeader>
            <CardTitle>Файлы</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <h6 className="text-lg font-bold mt-6">Загрузить файл</h6>
            <Form {...form}>
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
              </form>
            </Form>
          </CardContent>
          <CardFooter>
          <Button type="submit" onClick={formFiles.handleSubmit(onSubmitFile)}>загрузить файл</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="departments">
        <Card>
          <CardHeader>
            <CardTitle>Отделения</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <section
                className="
                        flex
                        gap-4
                    "
            >
                <input
                    placeholder="отделение"
                    value={isDepartmentName}
                    onChange={e => setIsDepartmentName(e.target.value)}
                    className="
                        border-2
                        border-teal-400
                    "
                />
                <Button onClick={createDepartment}>
                    создать
                </Button>
            </section>
            {/*Контейнер отделений */} 
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
                    {isDepartments ? isDepartments.map((dep) => {
                        return <li key={dep.id}
                            className="
                                        grid
                                        grid-cols-3
                                        gap-4
                                        p-2
                                        border
                                    "
                        >
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <div>{dep.id}</div>
                                <div>{dep.name}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                        flex-align
                                    ">
                                <div>создана: {dep.createdAt.toString()}</div>
                                <div>изменена: {dep.updatedAt.toString()}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                        flex-align
                                        justify-self-end
                                        items-center
                                    ">
                                        <Button variant={'outline'}><HiPencil /></Button>

                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant={'destructive'}><HiTrash /></Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Удаление</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Вы действительно хотите удалить отделение?
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                <Button variant={'destructive'} onClick={() => deleteDepartment(dep.id)}>удалить</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            </div>
                            <div className="col-span-3">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>План(чел)</TableHead>
                                            <TableHead>План (руб.)</TableHead>
                                            <TableHead className="text-right">Состояло на начало месяца (чел.)</TableHead>
                                            <TableHead className="text-right">Поступили в приёмное, накопительным (чел.)</TableHead>
                                            <TableHead className="text-right">Всего находится в стационаре (чел.) ot ward</TableHead>
                                            <TableHead className="text-right">Выбыло, накопительным (чел.)</TableHead>
                                            <TableHead className="text-right">Выбывшие к оплате</TableHead>
                                            <TableHead className="text-right">Пациенты свыше 10 дней (чел.)</TableHead>
                                            <TableHead className="text-right">Не закрыто историй в Барсе (шт.)</TableHead>
                                            <TableHead className="text-right">Передано оплату в ФОМС (шт.)</TableHead>
                                            <TableHead className="text-right">Передано оплату в ФОМС  (руб.) по КСГ</TableHead>
                                            <TableHead className="text-right">Средняя стоимость лечения</TableHead>
                                            <TableHead className="text-right">Долг по умершим</TableHead>
                                            <TableHead className="text-right">Свободных коек ot ward</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                            <TableRow>
                                                <TableCell>{dep.planHuman}</TableCell>
                                                <TableCell>{dep.planRub}</TableCell>
                                                <TableCell className="text-right">{dep.begAcc}</TableCell>
                                                <TableCell className="text-right">{dep.admRec}</TableCell>
                                                <TableCell className="text-right">{/*dep.totalStays*/"ot ward"}</TableCell>
                                                <TableCell className="text-right">{dep.disCome}</TableCell>
                                                <TableCell className="text-right">{dep.disTax}</TableCell>
                                                <TableCell className="text-right">{dep.patOver}</TableCell>
                                                <TableCell className="text-right">{dep.storColed}</TableCell>
                                                <TableCell className="text-right">{dep.transHuman}</TableCell>
                                                <TableCell className="text-right">{dep.transRub}</TableCell>
                                                <TableCell className="text-right">{dep.medPrice}</TableCell>
                                                <TableCell className="text-right">{dep.dolgDead}</TableCell>
                                                <TableCell className="text-right">{/*dep.freeBeds*/"ot ward"}</TableCell>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="col-span-2">
                                <Label className="
                                                flex
                                                justify-center
                                                items-center
                                                font-bold
                                                "
                                >
                                        Сводка по местам
                                </Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Палата №</TableHead>
                                        <TableHead className="text-right">Кол-во мест</TableHead>
                                        <TableHead className="text-right">Занято</TableHead>
                                        <TableHead className="text-right">Свободно</TableHead>
                                        <TableHead className="text-right">Пол</TableHead>
                                        <TableHead className="text-right">Резерв по распоряжению</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {wards.filter((ward) => {
                                        return ward.depId === dep.id}).map((ward) => (
                                        <TableRow key={ward.id}>
                                            <TableCell className="font-medium">{ward.number}</TableCell>
                                            <TableCell>{ward.numberOfSeats}</TableCell>
                                            <TableCell>{ward.engaged}</TableCell>
                                            <TableCell>{ward.free}</TableCell>
                                            <TableCell>{ward.gender}</TableCell>
                                            <TableCell className="text-right">{ward.reserve}</TableCell>
                                        </TableRow>
                                        ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                        <TableCell className="text-left">
                                            {
                                             wards.filter((ward) => {
                                                return ward.depId === dep.id}).reduce((sum, current) => {
                                                    return sum + current.numberOfSeats
                                                }, 0)
                                            }
                                                </TableCell>
                                        <TableCell className="text-right">Занято:</TableCell>
                                        <TableCell className="text-left">{
                                             wards.filter((ward) => {
                                                return ward.depId === dep.id}).reduce((sum, current) => {
                                                    return sum + current.engaged
                                                }, 0)
                                            }</TableCell>
                                        <TableCell className="text-right">Свободно:</TableCell>
                                        <TableCell className="text-left">{
                                             wards.filter((ward) => {
                                                return ward.depId === dep.id}).reduce((sum, current) => {
                                                    return sum + current.free
                                                }, 0)
                                            }</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>

                            </div>

                            <div className="col-span-1">
                                <Label className="
                                                flex
                                                justify-center
                                                items-center
                                                font-bold
                                                "
                                >
                                        Аккаунты
                                </Label>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">имя</TableHead>
                                        <TableHead className="text-center">должность</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {profiles? profiles.filter((profile) => {
                                        return profile.depId === dep.id}).map((profile) => (
                                        <TableRow key={profile.id}>
                                            <TableCell className="font-medium text-center" >
                                                {
                                                    users?users.filter((user) => {
                                                        return user.id === profile.userId
                                                    })[0]?.name : ''
                                                }
                                            </TableCell>
                                            <TableCell className="text-center">{profile.grade}</TableCell>
                                        </TableRow>
                                        )) : ''}
                                </TableBody>
                            </Table>

                            </div>
                        </li>
                    }) : ''}
                </ul>
            </section>

          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>





        </section>
    )
}