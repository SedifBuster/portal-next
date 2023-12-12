"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

export function CreateWardSheet({depId}: {depId: number}) {

    const formSchema = z.object({
        number: z.number().min(1, {
            message: "Обязательное поле",
        })
        ,
        numberOfSeats: z.number().optional()
        ,
        engaged: z.number().optional()
        ,
        free: z.number().optional()
        ,
        gender: z.string().optional()
        ,
        reserve: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const userData = {
                depID: depId,
                number: values.number,
                numberOfSeats: values.numberOfSeats,
                engaged: values.engaged,
                free: values.free,
                gender: values.gender,
                reserve: values.reserve,
              }

            const userResult = await axios.post('/api/register', userData)
            if(userResult.statusText !== "OK") return toast.error("Ошибка при создании пользователя")
            else if(userResult.statusText === "OK") {
                const userId: number = userResult.data.id
                toast.success(`пользователь создан с id: ${userId}`)
                if(!userId) return toast.error("Id не найден")
                const profileData = {
                    userId,
                    //depId: Number(values.department),
                    //grade: values.grade
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
                }
            }
        } catch (error) {
            toast.error("Ошибка при создании пользователя")
            console.log("Ошибка при создании пользователя ", error)
        }
      }
    return (
        <section
            className="
            flex
            gap-4
        "
        >
            <Sheet>
                <SheetTrigger>
                <Button className="mt-2 mr-2 mb-2 ml-1">создать палату</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Создать палату</SheetTitle>
                        <SheetDescription>
                            Создание палаты для своего отделения.
                        </SheetDescription>
                    </SheetHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Палата № *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="numberOfSeats"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Кол-во мест*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="34" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="engaged"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Занято</FormLabel>
                                            <FormControl>
                                                <Input placeholder="22" {...field} />
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
                                    name="free"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Свободно</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12" {...field} />
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
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Пол</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={'mutual'}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="man">
                                                        М
                                                    </SelectItem>
                                                    <SelectItem value="woman">
                                                        Ж
                                                    </SelectItem>
                                                    <SelectItem value="mutual">
                                                        М/Ж
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                               <FormField
                                    control={form.control}
                                    name="reserve"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Резерв по распоряжению</FormLabel>
                                            <FormControl>
                                                <Input  {...field} />
                                            </FormControl>
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
    )
}