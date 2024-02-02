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
import React from "react"

export
  function CreateWardSheet(
    { depId, getWards }: { depId: number, getWards: (id: number) => void }
  ) {

  const formSchema = z.object({
    number: z.string().min(1, {
      message: "Обязательное поле",
    })
    ,
    numberOfSeats: z.string().optional()
    ,
    engaged: z.string().optional()
    ,
    free: z.number().optional()
    ,
    gender: z.string().optional()
    ,
    reserve: z.string().optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reserve: "",
      gender: "mutual",
      free: 0
    },
  })

  const [isVisible, setVisible] = React.useState<boolean>(false)
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const wardData = {
        depId: depId,
        number: Number(values.number),
        numberOfSeats: Number(values.numberOfSeats),
        engaged: Number(values.engaged),
        free: Number(values.free),
        gender: values.gender,
        reserve: values.reserve,
      }
      console.log(wardData)

      if
      (
        isNaN(wardData.engaged)
        || isNaN(wardData.free)
        || isNaN(wardData.number)
        || isNaN(wardData.numberOfSeats)
      ) return toast.error( 'уберите лишние символы с числовых значений' )

      if( wardData.numberOfSeats < wardData.engaged ) return toast.error( 'кол-во мест не должно быть меньше занятых' )

      const wardResult = await axios.post( '/api/ward', wardData )
      if( wardResult.statusText !== "OK" ) return toast.error( "Ошибка при создании палаты" )
      else if( wardResult.statusText === "OK" ) {
        const wardNumber: number = await wardResult.data
        toast.success( `палата создана с айди: ${wardNumber}` )
        getWards(depId)
        form.reset()
        setVisible(false)
        //cюда нам надо вставить даш палаты
        try {
          let dashWardResult = await axios.post( '/api/dash/ward')
          if( dashWardResult.statusText !== "OK" ) return toast.error( "Ошибочный статус запроса")
          else if( dashWardResult.statusText === "OK") {
            const dashWardNumber: number = await dashWardResult.data
            console.log('dash ward' + ' ', dashWardNumber)
          }
        } catch ( error ) {
          toast.error( "Ошибка при создании палаты для дашборда" )
          console.log( "Ошибка при создании палаты для дашборда", error )
        }

      }
    } catch ( error ) {
      toast.error( "Ошибка при создании палаты" )
      console.log( "Ошибка при создании палаты ", error )
    }
  }

  return (
    <section
      className="
        flex
        gap-4
      "
    >
      <Sheet open={isVisible}  onOpenChange={() => setVisible(!isVisible)}>
        <SheetTrigger >
          <Button className="mt-2 mr-2 mb-2 ml-1" onClick={() => setVisible(true)} > создать палату </Button>
        </SheetTrigger>
        <SheetContent side={'right'}>
          <SheetHeader>
            <SheetTitle> Создать палату </SheetTitle>
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
                      <FormLabel> Палата № * </FormLabel>
                      <FormControl>
                        <Input placeholder="1" {...field} />
                      </FormControl>
                      <FormDescription> число </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfSeats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Кол-во мест* </FormLabel>
                      <FormControl>
                        <Input placeholder="34" {...field} />
                      </FormControl>
                      <FormDescription> число </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engaged"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Занято </FormLabel>
                      <FormControl>
                        <Input placeholder="22" {...field} />
                      </FormControl>
                      <FormDescription> число </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Пол </FormLabel>
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
                      <FormLabel> Резерв по распоряжению </FormLabel>
                      <FormControl>
                        <Input  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit"> создать </Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}