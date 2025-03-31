"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { UnitIssue } from "../page"
import DateTimePicker from "../../components/dateTime/dateTimePicker"

  type UnitDep = {
  value: "Surgical" | "Pulmonology" | "Policlinic" | "Therapeutic" | "Reception" | "Neurology" | "Rehabilitation" | "Laboratory" | "Xray" | "Reanimation" | "Administration" | "Opp" | "Pao" | "Ceo" | "Aho",
  text: string,
}

const formSchema = z.object({
    department: z.string(),
    name: z.string().min(3, {
        message: "Ф.И.О должно быть больше двух символов.",
    }),
    date: z.date(),
    place: z.string().min(2, {
        message: "Опишите место события.",
    }),
    event: z.string().min(2, {
        message: "Выберите вид события.",
      }),
    circs: z.string().min(2, {
        message: "При каких обстоятельствах.",
      }),
    gauge: z.string().min(2, {
        message: "Какие меры были предприняты.",
      }),
    note: z.string(),
    liable: z.string().min(2, {
      message: "Больше двух символов.",
      }),
    cause: z.string().min(2, {
        message: "Опишите причину возникновения.",
      }),
  })

export
  default function FormRecord(
    {
      problems,
      departments,
      postLog,
    }: {
      problems: UnitIssue[]
      departments: {
        value: string;
        text: string;
    }[]
      postLog: (url: string, postData: any) => Promise<number>
    }
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        department: "",
        name: "",
        date: new Date(),
        place: "",
        event: "",
        circs: "",
        gauge: "",
        note: "",
        liable: "",
        cause: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await postLog("http://localhost:5020/api/logs", values)
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

  return (
    <section className="w-2/4 max-lg:w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите свое отделение*</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange}  value={field.value} defaultValue={field.value}>
                  <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="не выбрано" />
                  </SelectTrigger>
                    <SelectContent>
                      {
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
          {
            !form.getFieldState('department').isDirty
            ?
            ''
            :
            <div className="animate-appear">
              <div className="grid grid-cols-2 gap-2 max-lg:grid-cols-1">
                <FormField
                  control={form.control}
                  name="date"
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
            name="place"
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
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вид нежелательного события*</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="не выбрано" />
                    </SelectTrigger>
                    <SelectContent>
                      {
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
          </div>
          <FormField
            control={form.control}
            name="cause"
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
            name="circs"
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
            name="gauge"
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
            name="note"
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
            name="liable"
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
    </section>
  )
}