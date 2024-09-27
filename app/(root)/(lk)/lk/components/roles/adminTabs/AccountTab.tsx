import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"



export
  function AccountTab() {
    return <section
    className="
            flex
            gap-4
            mt-8
        "
>
    <Sheet>
        <SheetTrigger>
            <Button>
                создать пользователя
            </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Создать пользователя</SheetTitle>
                <SheetDescription>
                    Помните, у каждого должна быть должность и профиль. Кликните по "создать" когда заполните все поля.
                </SheetDescription>
            </SheetHeader>
            <div>
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
                                            <SelectItem value="USER">
                                                Юзер
                                            </SelectItem>
                                            <SelectItem value="TECHNICICAN">
                                                Техник
                                            </SelectItem>
                                            <SelectItem value="SYSADMIN">
                                                Сисадмин
                                            </SelectItem>
                                            <SelectItem value="ADMIN">
                                                Админ
                                            </SelectItem>
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
                                            <SelectItem value="NURSE">
                                                медсестра - изменение значений
                                            </SelectItem>
                                            <SelectItem value="HEADNURSE">
                                                старшая медсестра - назначение, проверка
                                            </SelectItem>
                                            <SelectItem value="DEPNURSTAFF">
                                                зам по сред. мед. персоналу - менеджмент коек
                                            </SelectItem>
                                            <SelectItem value="CHIEFNURSE">
                                                главная медсестра - менеджмент коек
                                            </SelectItem>
                                            <SelectItem value="CMO">
                                                нач.мед. - просмотр
                                            </SelectItem>
                                            <SelectItem value="TECHNICICAN">
                                                технический специалист
                                            </SelectItem>
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
                                            {isDepartments?isDepartments.map((dep) => {
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
                            <Button type="submit">отправить</Button>
                    </form>
                </Form>
            </div>
        </SheetContent>
    </Sheet>
</section>
  }