import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const formSchema = z.object({
    comment: z.string()
  })

export default function DepartmentModal ({log}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ''
    },
  })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      await postAuth(values)
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

    return <Dialog>
    <DialogTrigger className="border-2 h-12 p-2 text-center align center rounded-lg">Войти в аккаунт</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Войти в аккаунт</DialogTitle>
        <ul>
            <li>{log.values}</li>
        </ul>
        
  
      </DialogHeader>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder="IvanovVA" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" type="submit">Отправить</Button>
          </form>
        </Form>
    </DialogContent>
  </Dialog>
}