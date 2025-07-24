"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import axios from "axios"
import { Input } from "@/components/ui/input"

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
      if(refNumbersResult.statusText !== "OK") return toast.error("Ошибка при создании номера")
      else {
        toast.success(`номер создан`)
        onGetReferenceNumbers()
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
        <SheetTitle>Создать номер</SheetTitle>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отделение</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Где установлено</FormLabel>
                <FormControl>
                  <Input className="h-5" {...field} />
                </FormControl>
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
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="internalNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Внутренний номер</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Оператор</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ответственное лицо</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="deviceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип устройства</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="deviceModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Модель устройства</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Примечание</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="forwarding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Переадресация на сотовый</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="connected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подключено/изменение(дата)</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Статус</FormLabel>
                <FormControl>
                  <Input  className="h-5" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        <SheetClose>
          <Button type="submit">отправить</Button>
        </SheetClose>
          
        </form>
      </Form>
    </SheetContent>
  </Sheet>
}


 /*
    
    
    deviceType      String?
    deviceModel     String?
    note            String?
    forwarding      String?
    connected       String?
    status          String? */

/**
 *           <FormField
            control={form.control}
            name="internalNumber"
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
 */