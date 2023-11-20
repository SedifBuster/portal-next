"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { Department, User } from "@prisma/client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import {
    HiTrash,
    HiPencil
} from "react-icons/hi2"
import { z } from "zod"

export function Admin() {


    //DEPARMENT
    const [isDepartments, setIsDepartmens] = useState<Department[]>([])
    const [isDepartmentName, setIsDepartmentName] = useState<string>('')
    async function createDepartment() {
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

    //USERS
    const [users, setUsers] = useState<User[]>([])
    //dodelat
    async function createUser() {
        const postData = {
            //name: isDepartmentName
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
        })
        ,
        sibling: z.boolean()
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            login: "",
            password: "",
            role: "",
            sibling: false
        },
    })

    useEffect(() => {
        getDepartments()
        getUsers()
    }, [])

    return (
        <section
            className="
                bg-white
                p-8
            "
        >
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
                                <div>{dep.id}</div>
                                <div>{dep.name}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <div>создана: {dep.createdAt.toString()}</div>
                                <div>изменена: {dep.updatedAt.toString()}</div>
                            </div>
                            <div className="
                                        flex
                                        gap-4
                                    ">
                                <Button variant={'outline'} onClick={changeDepartment}><HiPencil /></Button>
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
                        </li>
                    }) : ''}
                </ul>
            </section>




            <section
                className="
                        flex
                        gap-4
                        mt-8
                    "
            >

                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            создать пользователя
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Создать пользователя</SheetTitle>
                            <SheetDescription>
                                Помните, у каждого должна быть должность и профиль. Кликните по "создать" когда заполните все поля.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Имя
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Логин
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Пароль
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Роль
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                            <Form {...form}>
                                <form  className="space-y-8"> {/*onSubmit=form.handleSubmit(/*onSubmit*/}
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
                                        name="login"
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
                                        name="password"
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
                                        name="role"
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
                                        name="sibling"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Возникшая проблема</FormLabel>
                                                <FormControl>
                                                    {/*<Checkbox
                                                        placeholder="Мышка перестала подавать признаки жизни..."
                                                        {...field}
                                        />*/}
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
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">создать</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>


            </section>
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
        </section>
    )
}