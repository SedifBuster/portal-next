
import { $Enums } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { HiPencil } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, useForm } from "react-hook-form"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/shared/ui/dialog";
import { Button } from "@/src/shared/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/shared/ui/select";


const formSchema = z.object({
  login: z.string().min(4, {
    message: "Имя пользователя должно состоять как минимум из 4 символов.",
  }),
  name: z.string().min(5, {
    message: "ФИО должно состоять как минимум из 5 символов."
  }),
  role: z.string({
    required_error: "Пожалуйста выберите роль",
  }),
})

const roles = [
  {
    value: 'USER',
    text: 'Пользователь'
  },
  {
    value: 'TECHNICICAN',
    text: 'Техник'
  },
  {
    value: 'SYSADMIN',
    text: 'Сисадмин'
  },
  {
    value: 'ADMIN',
    text: 'Админ'
  },
]

const positions = [
  {
    value: 'NURSE',
    text: 'медсестра - изменение значений'
  },
  {
    value: 'HEADNURSE',
    text: 'старшая медсестра - назначение, проверка'
  },
  {
    value: 'DEPNURSTAFF',
    text: 'зам по сред. мед. персоналу - менеджмент коек'
  },
  {
    value: 'CHIEFNURSE',
    text: 'главная медсестра - менеджмент коек'
  },
  {
    value: 'CMO',
    text: 'нач.мед. - просмотр'
  },
  {
    value: 'TECHNICICAN',
    text: 'технический специалист'
  },
]

export
  default function AccountChangePopover({
    row
  }: {
    row: Row<{
        id: number;
        login: string;
        name: string;
        password: string;
        role: $Enums.Role;
        token: string;
        createdAt: Date;
        updatedAt: Date;
    }>
  }
) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: row.getValue('login'),
      name: row.getValue('name'),
      role: row.getValue('role'),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values)
}

  return <Dialog>
    <DialogTrigger asChild>
      <Button variant={'outline'}><HiPencil /></Button>
    </DialogTrigger>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Изменить пользователя</DialogTitle>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ФИО</FormLabel>
                  <FormControl>
                    <Input placeholder="Иванов И.И." {...field} />
                  </FormControl>
                  <FormDescription>
                    Ваше отображаемое имя в системе.
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
                  <FormLabel>Роль</FormLabel>
                  <FormControl>
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
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Роль в системе. Юзер являются основной ролью.
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
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder="IvanovII" {...field} />
                  </FormControl>
                  <FormDescription>
                    Логин для входа в систему.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <DialogFooter>
      <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Сохранить изменения</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}