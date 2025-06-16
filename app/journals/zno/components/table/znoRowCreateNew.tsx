"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ru } from "date-fns/locale"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import DateTimePicker from "../../components/dateTime/dateTimePicker"
import { UnitLocalization, UnitStatus } from "./znoTable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@radix-ui/react-select"
import { Fragment, useState } from "react"

const formSchema = z.object({
    name: z.string().min(3, {
      message: "Ф.И.О должно быть больше двух символов.",
    }),
    dateOfBirth: z.date().optional(),
    localization: z.string().min(2),
    phoneNumber: z.string().min(2),
    numberOfHistory: z.string().min(2),
    directedWher: z.string().optional(),
    diagnosisVKB: z.string().optional(),
    dateOfReferralToCAOP: z.date().optional(),
    dateOfVisitToCAOP: z.date().optional(),
    diagnosisOfCAOP: z.string().optional(),
    dateOfVisitToPKOD: z.date().optional(),
    diagnosisOfPKOD: z.string().optional(),
    dateOfTheConsultation: z.date().optional(),
    dateOfLastCallAndPersonalContact: z.date().optional(),
    status: z.string().optional(),
    statusNote: z.string().optional(),
})

export default function ZnoRowCreateNew ({
    localisations,
    statuses,
    onPostData,
    getZnoLogs,
    profile
}: {
    localisations: UnitLocalization[]
    statuses: UnitStatus[]
    onPostData: (url: string, postData: BodyInit) => Promise<number>
    getZnoLogs: () => void
    profile: string
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      localization: "",
      phoneNumber: "",
      numberOfHistory: "",
      diagnosisVKB: "",
      diagnosisOfCAOP: "",
      diagnosisOfPKOD: ""
    },
  })

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";  
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(new Date(date) === undefined) return toast.error("Введите дату рождения", {
      description: <p className="text-black">{``}</p>
    })

    //@ts-ignore
    await onPostData("http://localhost:5020/api/zno", {...values, dateOfBirth: new Date(date)})
      .catch(error => {
        toast.error("Произошла ошибка при отправке в ЗНО", {
          description: <p className="text-black">{`${error}`}</p>
        })
      })
      .then(() => {
        toast.success(`Запись успешно добавлена в ЗНО`, {
          description: format(new Date(), "PPP HH:mm", {locale: ru}),
        })
        form.reset()
      })
      getZnoLogs()
  }

  const [date, setDate] = useState("");

  return <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          создать поле
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Создать поле</DialogTitle>
          <DialogDescription>
            Создание поля для ЗНО журнала. Нажмите сохранить когда закончите.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
          <div className="bg-yellow-50 p-6 rounded-md flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ФИО</FormLabel>
                <FormControl>
                  <Input className="w-[200px]"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата рождения</FormLabel>
                <FormControl>
                <div className="flex-1">
        <div className="relative">
          {date && (
            <span
              className="absolute left-2 bottom-2 bg-white px-2 text-sm text-gray-600"
              style={{ pointerEvents: "none" }} >
                {formatDisplayDate(date)}
            </span>
          )}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-md shadow-sm focus:border-[#9F5316] focus:ring-[#9F5316] p-2 " required  />
        </div>
      </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="localization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Локализация</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
                    <SelectValue placeholder="не выбрано"/>
                    </SelectTrigger>
                    <SelectContent>
                    <ScrollArea className="h-96 w-full rounded-md border">
                        <div className="p-4">
                          {
                            localisations.map((loc) => (
                              <div key={loc.value}>
                                <SelectItem  value={loc.value}>{loc.text}</SelectItem>
                                <Separator className="my-2" />
                              </div>
                            ))
                          }
                        </div>
                    </ScrollArea>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input className="w-[200px]" placeholder="+79999999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="numberOfHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>№ истории</FormLabel>
                  <FormControl>
                    <Input className="w-[200px]" placeholder="2255/56" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />
          </div>
          {
          !form.getFieldState('numberOfHistory').isDirty ||
          !form.getFieldState('localization').isDirty || !form.getFieldState('phoneNumber').isDirty
          || !form.getFieldState('name').isDirty
          ?
          ''
          :
          <div className="bg-green-50 p-6 rounded-md flex flex-wrap gap-4">
          {/*}<FormField
            control={form.control}
            name="directedWher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Направлен(а) куда</FormLabel>
                <FormControl>
                  <Input className="w-[200px]"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />*/}
          <FormField
            control={form.control}
            name="diagnosisVKB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Диагноз ВКБ4</FormLabel>
                <FormControl>
                  <Input className="w-[200px]"  {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfReferralToCAOP"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата направления в ЦАОП</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="dateOfVisitToCAOP"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата посещения ЦАОПа</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="diagnosisOfCAOP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Диагноз ЦАОПа</FormLabel>
                <FormControl>
                  <Input className="w-[200px]"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfVisitToPKOD"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата посещения ПКОДа</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
            control={form.control}
            name="diagnosisOfPKOD"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Диагноз ПКОД</FormLabel>
                <FormControl>
                  <Input className="w-[200px]"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfTheConsultation"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата консилиума</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="dateOfLastCallAndPersonalContact"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Дата последнего звонка/личный контакт</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
           <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текущий статус</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="не выбрано" />
                    </SelectTrigger>
                    <SelectContent>
                    <ScrollArea className=" w-full rounded-md border">
                        <div className="p-4">
                          {//тут убрать длину  у селект валуе
                            statuses.map((status) => (
                              <div key={status.value}>
                                <SelectItem value={status.value}>{status.text}</SelectItem>
                                <Separator className="my-2" />
                              </div>
                            ))}
                        </div>
                    </ScrollArea>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="statusNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текущий статус примечание</FormLabel>
                <FormControl>
                  <Textarea className="w-[200px]"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
}
          <DialogFooter>
          <Button type="submit">сохранить</Button>
        </DialogFooter>
        </form>
      </Form>
        </div>
      </DialogContent>
    </Dialog>
  </div>
}


{/**Input type="date" {...field}/>
                  * <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-[200px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                      >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP", {locale: ru}) : <span>Выберите время*</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                         mode="single"
                         selected={field.value}
                         onSelect={field.onChange}
                         initialFocus
                         locale={ru}
                        />
                        <div className="p-2 flex justify-center border-t">
                        <DateTimePicker date={field.value} setDate={field.onChange}/>
                        </div>
                        </PopoverContent>
                </Popover>
                  * 
                  */} 