import * as React from "react"

import { Button } from "@/components/ui/button"
import { Ward } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { HiPencil, HiTrash } from "react-icons/hi2"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"

export function UserWard(
    {
        ward,
        getWards,
        depId
    }: {
        ward: Ward
        getWards: (id: number) => void
        depId: number
    }
) {
    const [isVisibleDelete, setVisibleDelete] = React.useState<boolean>(false)
    const [isVisibleChange, setVisibleChange] = React.useState<boolean>(false)

    let onDeleteWard = async (id: number) => {

        const postData = { id: id}

        const result = await axios.delete('/api/ward', { data: postData })
        if (result.statusText === "OK") {
            toast.success('палата удалена')
            setVisibleDelete(false)
            getWards(depId)
        } else {
            toast.error('Ошибка при удалении палаты')
        }
    }

return (
    <TableRow key={ward.id}>
        <TableCell className="font-medium">{ward.number}</TableCell>
        <TableCell>{ward.numberOfSeats}</TableCell>
        <TableCell>{ward.engaged}</TableCell>
        <TableCell>{ward.free}</TableCell>
        <TableCell >{ward.gender}</TableCell>
        <TableCell>{ward.reserve}</TableCell>
        <TableCell className="flex gap-1">

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={'outline'}><HiPencil /></Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Изменение палаты</DialogTitle>
                        <DialogDescription>
                            Измените палату здесь. Нажмите сохранить когда закончите.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                номер палаты
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                кол-во мест
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                занято
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                свободно
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                пол
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                резерв
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>





            <Dialog open={isVisibleDelete} onOpenChange={() => setVisibleDelete(!isVisibleDelete)}>
                <DialogTrigger asChild>

                    <Button variant={'destructive'} onClick={() => setVisibleDelete(true)}><HiTrash /></Button>

                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Удаление палаты</DialogTitle>
                        <DialogDescription>
                            Вы действительно хотите удалить палату?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 py-4">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Номер палаты №
                            </Label>
                            {ward.number}
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Кол-во мест
                            </Label>
                            {ward.numberOfSeats}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => onDeleteWard(ward.id)} variant={'destructive'}>Удалить</Button>
                        <Button variant={'outline'} onClick={() => setVisibleDelete(false)}>Отменить</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TableCell>
    </TableRow>
)
}
