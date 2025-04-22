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

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Ф.И.О должно быть больше двух символов.",
    }),
    dateOfBirth: z.date(),
    localization: z.string().min(2),
    phoneNumber: z.string().min(2),
    numberOfHistory: z.string().min(2),
    directedWher: z.string().min(2).optional(),
    diagnosisVKB: z.string().optional(),
    dateOfReferralToCAOP: z.date().optional(),
    dateOfVisitToCAOP: z.date().optional(),
    diagnosisOfCAOP: z.string().min(2).optional(),
    dateOfVisitToPKOD: z.date().optional(),
    diagnosisOfPKOD: z.string().min(2).optional(),
    dateOfTheConsultation: z.date().optional(),
    dateOfLastCallAndPersonalContact: z.date().optional(),
    status: z.string().min(2).optional(),
    statusNote: z.string().min(2).optional(),
})


export default function ZnoRowCreateNew ({
    localisations,
    statuses
}: {
    localisations: UnitLocalization[]
    statuses: UnitStatus[]
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        dateOfBirth: new Date(),
        localization: "",
        phoneNumber: "",
        numberOfHistory: "",
        directedWher: "",
        diagnosisVKB: "",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "",
        statusNote: ""
    },
  })

    async function onSubmit(values: z.infer<typeof formSchema>) {
    /*  await postLog("http://localhost:5020/api/logs", values)
        .catch(error => {
          toast.error("Произошла ошибка при отправке в ЖУС", {
            description: <p className="text-black">{`${error}`}</p>
          })
        })
        .then(() => {
          toast.success(`Случай успешно добавлен в ЖУС`, {
            description: format(new Date(), "PPP HH:mm", {locale: ru}),
          })
          form.reset()
        })*/
    }


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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
            name="localization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Локализация</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[700px]">
                    <SelectValue placeholder="не выбрано" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        localisations.map(loc => {
                            return <SelectItem key={loc.value} value={loc.value}>{loc.text}</SelectItem>
                        })
                      }
                    </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
           // !form.getFieldState('name').isDirty
           // ?
           // ''
            //: className="animate-appear"<div className="animate-appear">
             // <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1"></div>
            <div className="animate-appear">
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                <FormItem className="flex flex-col pt-2">
                <FormLabel className="pb-0.5">Выберите время*</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[320px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                     {field.value ? format(field.value, "PPP HH:mm", {locale: ru}) : <span>Выберите время*</span>}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ф.И.О. пациента*</FormLabel>
                  <FormControl>
                    <Input className="w-[320px]" placeholder="Иванов И.И." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Место нежелательного события*</FormLabel>
                <FormControl>
                  <Input className="w-[320px]" placeholder="Неврологическое отделение, палата 1334" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вид нежелательного события*</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="не выбрано" />
                    </SelectTrigger>
                    <SelectContent>
                      {/*
                        problems.map(problem => {
                            return <SelectItem key={problem.value} value={problem.value}>{problem.text}</SelectItem>
                        })
                      */}
                    </SelectContent>
                </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Причина возникновения нежелательного события*</FormLabel>
                <FormControl>
                  <Textarea placeholder="Событие возникло..." className="w-[670px] max-lg:w-[100%]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание обстоятельств, при которых произошло нежелательное событие*</FormLabel>
                <FormControl>
                <Textarea placeholder="Событие произошло при..." className="w-[670px] max-lg:w-[100%]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Принятые меры по устранению последствий нежелательного события*</FormLabel>
                <FormControl>
                <Textarea placeholder="Были предприняты..." className="w-[670px] max-lg:w-[100%]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Примечание</FormLabel>
                <FormControl>
                <Textarea placeholder="В событии..." className="w-[670px] max-lg:w-[100%]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отвественный*</FormLabel>
                <FormControl>
                  <Input className="w-[320px]" placeholder="Никитов В.В." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-4" type="submit">Отправить</Button>
          </div>
          }
        </form>
      </Form>
        </div>
        <DialogFooter>
          <Button type="submit">сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}

               {/* <Select onValueChange={field.onChange}  value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="не выбрано" />
                  </SelectTrigger>
                    <SelectContent>
                      I
                        departments.map(dep => {
                          return <SelectItem key={dep.value} value={dep.value}>{dep.text}</SelectItem>
                        })
                     
                    </SelectContent>
                </Select>
                */ }

/**
 * V2
 * "use client"

import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { z } from "zod"
import { ru } from "date-fns/locale"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
  import { Calendar } from "@/components/ui/calendar"
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DateTimePicker from "@/app/journals/zhus/components/dateTime/dateTimePicker";
import { Input } from "@/components/ui/input";

/*
  id: number
  createdAt: Date
  updatedAt: Date
  name: string             //yellow
  dateOfBirth: Date        //yellow
  localization: LocalizationEnum     //yellow
  phoneNumber: string      //yellow
  numberOfHistory: string  //yellow
  directedWher: string                      //green
  diagnosisVKB: string                      //green
  dateOfReferralToCAOP: Date                //green
  dateOfVisitToCAOP: Date                   //green
  diagnosisOfCAOP: string                   //green
  dateOfVisitToPKOD: Date                   //green
  diagnosisOfPKOD: string                   //green
  dateOfTheConsultation: Date               //green
  dateOfLastCallAndPersonalContact: Date    //green
  status: StatusEnum                        //green
  statusNote: string                        //green


const formSchema = z.object({
    name: z.string().min(3, {
        message: "Ф.И.О должно быть больше двух символов.",
    }),
    dateOfBirth: z.date(),
    localization: z.string().min(2),
    phoneNumber: z.string().min(2),
    numberOfHistory: z.string().min(2),
    directedWher: z.string().min(2).optional(),
    diagnosisVKB: z.string().optional(),
    dateOfReferralToCAOP: z.date().optional(),
    dateOfVisitToCAOP: z.date().optional(),
    diagnosisOfCAOP: z.string().min(2).optional(),
    dateOfVisitToPKOD: z.date().optional(),
    diagnosisOfPKOD: z.string().min(2).optional(),
    dateOfTheConsultation: z.date().optional(),
    dateOfLastCallAndPersonalContact: z.date().optional(),
    status: z.string().min(2).optional(),
    statusNote: z.string().min(2).optional(),
})


export default function ZnoRowCreateNew ({
    vis,
    onChangeVis
}: {
    vis: boolean
    onChangeVis: (vis: boolean) => void
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        dateOfBirth: new Date(),
        localization: "",
        phoneNumber: "",
        numberOfHistory: "",
        directedWher: "",
        diagnosisVKB: "",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "",
        statusNote: ""
    },
  })

    async function onSubmit(values: z.infer<typeof formSchema>) {
     /* await postLog("http://localhost:5020/api/logs", values)
        .catch(error => {
          toast.error("Произошла ошибка при отправке в ЖУС", {
            description: <p className="text-black">{`${error}`}</p>
          })
        })
        .then(() => {
          toast.success(`Случай успешно добавлен в ЖУС`, {
            description: format(new Date(), "PPP HH:mm", {locale: ru}),
          })
          form.reset()
        })
    }

  return vis
  ?
  <tr>
    <td>
      {format(new Date(), "PPP HH:mm", {locale: ru})}
    </td>
    <td>
    
     </td>
     <td>
     <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        отменить
    </Button>
    <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        сохранить
    </Button>
     </td>
   </tr>
:
<div>
    <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        создать поле
    </Button>
</div>

}
 */

{
    /* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange}  value={field.value} defaultValue={field.value}>
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="не выбрано" />
                      </SelectTrigger>
                        <SelectContent>
                          {/*
                            departments.map(dep => {
                              return <SelectItem key={dep.value} value={dep.value}>{dep.text}</SelectItem>
                            })
                          }
                        </SelectContent>
                    </Select>
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
                    <FormLabel className="pb-0.5">Выберите время*</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[320px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                         {field.value ? format(field.value, "PPP HH:mm", {locale: ru}) : <span>Выберите время*</span>}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ф.И.О. пациента*</FormLabel>
                      <FormControl>
                        <Input className="w-[320px]" placeholder="Иванов И.И." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="localization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Место нежелательного события*</FormLabel>
                    <FormControl>
                      <Input className="w-[320px]" placeholder="Неврологическое отделение, палата 1334" {...field} />
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
                    <FormLabel>Вид нежелательного события*</FormLabel>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="не выбрано" />
                        </SelectTrigger>
                        <SelectContent>
                          {/*
                            problems.map(problem => {
                                return <SelectItem key={problem.value} value={problem.value}>{problem.text}</SelectItem>
                            })
                          }
                        </SelectContent>
                    </Select>
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
                    <FormLabel>Причина возникновения нежелательного события*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Событие возникло..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание обстоятельств, при которых произошло нежелательное событие*</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Событие произошло при..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Принятые меры по устранению последствий нежелательного события*</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Были предприняты..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Примечание</FormLabel>
                    <FormControl>
                    <Textarea placeholder="В событии..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отвественный*</FormLabel>
                    <FormControl>
                      <Input className="w-[320px]" placeholder="Никитов В.В." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4" type="submit">Отправить</Button>

            </form>
          </Form>*/}

/***
 * "use client"

import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { z } from "zod"
import { ru } from "date-fns/locale"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
  import { Calendar } from "@/components/ui/calendar"
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DateTimePicker from "@/app/journals/zhus/components/dateTime/dateTimePicker";
import { Input } from "@/components/ui/input";

/*
  id: number
  createdAt: Date
  updatedAt: Date
  name: string             //yellow
  dateOfBirth: Date        //yellow
  localization: LocalizationEnum     //yellow
  phoneNumber: string      //yellow
  numberOfHistory: string  //yellow
  directedWher: string                      //green
  diagnosisVKB: string                      //green
  dateOfReferralToCAOP: Date                //green
  dateOfVisitToCAOP: Date                   //green
  diagnosisOfCAOP: string                   //green
  dateOfVisitToPKOD: Date                   //green
  diagnosisOfPKOD: string                   //green
  dateOfTheConsultation: Date               //green
  dateOfLastCallAndPersonalContact: Date    //green
  status: StatusEnum                        //green
  statusNote: string                        //green


const formSchema = z.object({
    name: z.string().min(3, {
        message: "Ф.И.О должно быть больше двух символов.",
    }),
    dateOfBirth: z.date(),
    localization: z.string().min(2),
    phoneNumber: z.string().min(2),
    numberOfHistory: z.string().min(2),
    directedWher: z.string().min(2).optional(),
    diagnosisVKB: z.string().optional(),
    dateOfReferralToCAOP: z.date().optional(),
    dateOfVisitToCAOP: z.date().optional(),
    diagnosisOfCAOP: z.string().min(2).optional(),
    dateOfVisitToPKOD: z.date().optional(),
    diagnosisOfPKOD: z.string().min(2).optional(),
    dateOfTheConsultation: z.date().optional(),
    dateOfLastCallAndPersonalContact: z.date().optional(),
    status: z.string().min(2).optional(),
    statusNote: z.string().min(2).optional(),
})


export default function ZnoRowCreateNew ({
    vis,
    onChangeVis
}: {
    vis: boolean
    onChangeVis: (vis: boolean) => void
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        dateOfBirth: new Date(),
        localization: "",
        phoneNumber: "",
        numberOfHistory: "",
        directedWher: "",
        diagnosisVKB: "",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "",
        statusNote: ""
    },
  })

    async function onSubmit(values: z.infer<typeof formSchema>) {
     /* await postLog("http://localhost:5020/api/logs", values)
        .catch(error => {
          toast.error("Произошла ошибка при отправке в ЖУС", {
            description: <p className="text-black">{`${error}`}</p>
          })
        })
        .then(() => {
          toast.success(`Случай успешно добавлен в ЖУС`, {
            description: format(new Date(), "PPP HH:mm", {locale: ru}),
          })
          form.reset()
        })
    
 {/**<Table className="w-full p-6">
  return vis
  ?
 <div>
  <TableRow>
    <TableCell>
    {format(new Date(), "PPP HH:mm", {locale: ru})}
    </TableCell>
    <TableCell>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберите свое отделение*</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}  value={field.value} defaultValue={field.value}>
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="не выбрано" />
                      </SelectTrigger>
                        <SelectContent>
                          {/*
                            departments.map(dep => {
                              return <SelectItem key={dep.value} value={dep.value}>{dep.text}</SelectItem>
                            })
                        
                        </SelectContent>
                    </Select>
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
                    <FormLabel className="pb-0.5">Выберите время*</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[320px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                         {field.value ? format(field.value, "PPP HH:mm", {locale: ru}) : <span>Выберите время*</span>}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ф.И.О. пациента*</FormLabel>
                      <FormControl>
                        <Input className="w-[320px]" placeholder="Иванов И.И." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="localization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Место нежелательного события*</FormLabel>
                    <FormControl>
                      <Input className="w-[320px]" placeholder="Неврологическое отделение, палата 1334" {...field} />
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
                    <FormLabel>Вид нежелательного события*</FormLabel>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="не выбрано" />
                        </SelectTrigger>
                        <SelectContent>
                          {/*
                            problems.map(problem => {
                                return <SelectItem key={problem.value} value={problem.value}>{problem.text}</SelectItem>
                            })
                       
                        </SelectContent>
                    </Select>
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
                    <FormLabel>Причина возникновения нежелательного события*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Событие возникло..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание обстоятельств, при которых произошло нежелательное событие*</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Событие произошло при..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Принятые меры по устранению последствий нежелательного события*</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Были предприняты..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Примечание</FormLabel>
                    <FormControl>
                    <Textarea placeholder="В событии..." className="w-[670px] max-lg:w-[100%]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosisOfPKOD"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отвественный*</FormLabel>
                    <FormControl>
                      <Input className="w-[320px]" placeholder="Никитов В.В." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4" type="submit">Отправить</Button>

           
            </form>
          </Form>
          </TableCell>
          
    <TableCell>
    ФИО
    </TableCell>
    <TableCell>
    Дата рождения
    </TableCell>
    <TableCell>
    Локализация
    </TableCell>
    <TableCell>
    Телефон
    </TableCell>
    <TableCell>
    № истории
    </TableCell>
    <TableCell>
    Направлен(а) куда
    </TableCell>
    <TableCell>
    Диагноз ВКБ4
    </TableCell>
    <TableCell>
    Дата направления в ЦАОП
    </TableCell>
    <TableCell>
    Дата посещения ЦАОПа
    </TableCell>
    <TableCell>
    Диагноз ЦАОПа
    </TableCell>
    <TableCell>
    Дата посещения ПКОДа
    </TableCell>
    <TableCell>
    Диагноз ПКОД
    </TableCell>
    <TableCell>
    Дата консилиума
    </TableCell>
    <TableCell>
    Дата последнего звонка/личный контакт
    </TableCell>
    <TableCell>
    Текущий статус
    </TableCell>
    <TableCell>
    Текущий статус примечание
    </TableCell>
      }
   <TableCell>
    <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        отменить
    </Button>
    <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        сохранить
    </Button>
    </TableCell>
  
    </TableRow>
    </div>
:
<div>
    <Button variant={'outline'} className="m-1" onClick={() => onChangeVis(vis)}>
        создать поле
    </Button>
</div>

}
 */