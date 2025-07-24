import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Row } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  place: z.any().optional()
  ,
  department: z.any().optional()
  ,
  number: z.any().optional()
  ,
  internalNumber: z.any().optional()
  ,
  operator: z.any().optional()
  ,
  responsible: z.any().optional()
  ,
  deviceType: z.any().optional()
  ,
  deviceModel: z.any().optional()
  ,
  note: z.any().optional()
  ,
  forwarding: z.any().optional()
  ,
  connected: z.any().optional()
  ,
  status: z.any().optional()
})

export
  default function ReferenceChangePopover({
    row,
    onGetReferenceNumbers
  }: {
    row: Row<any>,
    onGetReferenceNumbers: () => Promise<void>
  }
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
      defaultValues: {
        place: row.getValue('place')
        ,
        department: row.getValue('department')
        ,
        number: row.getValue('number')
        ,
        internalNumber: row.getValue('internalNumber')
        ,
        operator: row.getValue('operator')
        ,
        responsible: row.getValue('responsible')
        ,
        deviceType: row.getValue('deviceType')
        ,
        deviceModel: row.getValue('deviceModel')
        ,
        note: row.getValue('note')
        ,
        forwarding: row.getValue('forwarding')
        ,
        connected: row.getValue('connected')
        ,
        status: row.getValue('status')
        
      },
  })


 async function onSubmit(values: z.infer<typeof formSchema>) {
  console.log('otr')
    try {
      const numberData = {
        id: row.getValue("id"),
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

      const refNumbersResult = await axios.patch('/api/referenceNumbers', numberData)
      if(refNumbersResult.statusText !== "OK") return toast.error("Ошибка при изменении номера")
      else {
        toast.success(`номер изменен`)
        onGetReferenceNumbers()
      }
    } catch (error) {
      toast.error("Ошибка при изменении номера")
      console.log("Ошибка при изменении номера ", error)
    }
  }

  return <Dialog>
    <DialogTrigger asChild>
      <Button variant={'outline'} className="w-10 h-10 text-xs">изм</Button>
    </DialogTrigger>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Изменить номер</DialogTitle>
        <DialogDescription>
        </DialogDescription>
      </DialogHeader>
      <div 
        className="
          mt-8
          sm:mx-auto
          sm:w-full
          sm:max-w-md
        "
      >
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
          <Button type="submit">отправить</Button>

          
        </form>
      </Form>
      </div>
    </DialogContent>
  </Dialog>
}