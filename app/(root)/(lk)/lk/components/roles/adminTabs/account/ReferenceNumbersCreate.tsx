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
import { Input } from "@/components/ui/input"

    /*place           String?
    department      String?
    number          String?
    internalNumber  String?
    operator        String?
    responsible     String?
    deviceType      String?
    deviceModel     String?
    note            String?
    forwarding      String?
    connected       String?
    status          String? */

const formSchema = z.object({
  place: z.string().optional()
  ,
  department: z.string().optional()
  ,
  number: z.string().optional()
  ,
  internalNumber: z.string().optional()
  ,
  operator: z.string().optional()
  ,
  responsible: z.string().optional()
  ,
  deviceType: z.string().optional()
  ,
  deviceModel: z.string().optional()
  ,
  note: z.string().optional()
  ,
  forwarding: z.string().optional()
  ,
  connected: z.string().optional()
  ,
  status: z.string().optional()
})

export
  function ReferenceNumbersCreate(
    {
      onGetReferenceNumbers
    }: {
      onGetReferenceNumbers: () => void
    }
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
      },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const numberData = {
        place: values.place,
        department: values.department,
        number: values.number,
        internalNumber: values.internalNumber,
        operator: values.operator,
        responsible: values.responsible,
        deviceType: values.deviceType,
        deviceModel: values.deviceModel,
        note: values.note,
        forwarding: values.forwarding,
        connected: values.connected,
        status: values.status,
      }
      console.log(numberData)

      const refNumbersResult = await axios.post('/api/referenceNumbers', numberData)
      if(refNumbersResult.statusText !== "OK") return toast.error("Ошибка при создании пользователя")
      else if(refNumbersResult.statusText === "OK") {
        const numberId: number = refNumbersResult.data.id
        toast.success(`номер создан с id: ${numberId}`)
        }
    } catch (error) {
      toast.error("Ошибка при создании номера")
      console.log("Ошибка при создании номера ", error)
    }
  }

  return <Sheet>
    <SheetTrigger>
      <Button>создать номер</Button>
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
                    {/*departments?departments.map((dep) => {
                      return <SelectItem value={dep.id.toString()} key={dep.id}>
                        {dep.name}
                      </SelectItem>
                    }): ''*/}
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