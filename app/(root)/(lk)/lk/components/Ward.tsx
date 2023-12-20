import * as React from "react"

import { Button } from "@/components/ui/button"
import { Department, Gender, Ward } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { HiPencil, HiTrash } from "react-icons/hi2"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HiSquaresPlus } from "react-icons/hi2";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"


export type DepId = {
    man: 'man',
    woman: 'woman',
    mutual: 'mutual'
  };

export type Indicator = 'given' | 'taken' | ''

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

    const [isDepartments, setIsDepartmens] = React.useState<Department[]>([])

    let getDepartments = async () => {
        try {
            let result = await axios.get('/api/department')
            if (result.status === 200) {
                setIsDepartmens(result.data)
            }
        } catch {
            console.log('error')
        }
    }

    React.useEffect(() => {
        getDepartments()
    }, [])

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

    //Изменение палаты
    const [isNumber, setNumber] = React.useState<number>(ward.number)
    const [isNumberOfSeats, setNumberOfSeats] = React.useState<number>(ward.numberOfSeats)
    const [isEngaged, setEngaged] = React.useState<number>(ward.engaged)
    const [isFree, setFree] = React.useState<number>(ward.free)
    const [isGender, setGender] = React.useState<Gender>(ward.gender)
    const [isReserve, setReserve] = React.useState<string | null>(ward.reserve)


    const [isVisibleReserve, setVisibleReserve] = React.useState<boolean>(false)
    let onChangeWard = async (id: number) => {

        const postData = {
            id: id,
            depId: ward.depId,
            number: Number(isNumber),
            numberOfSeats: Number(isNumberOfSeats),
            engaged: Number(isEngaged),
            free: Number(isFree),
            gender: isGender,
            reserve: isReserve
        }
        let checkupArray = Object.values(postData)
        for(let i = 0; i < 6; i++) {
            if(Number(checkupArray[i]) < 0) {
              return toast.error('Числа не должны быть отрицательными')
            }
        }
        const result = await axios.patch('/api/ward', postData)

        if (result.statusText === "OK") {
            toast.success(`палата с номером ${result.data}  изменена`)
            setVisibleChange(false)
            getWards(depId)
        } else {
            toast.error('Ошибка при изменении палаты')
        }
    }
    let isTranslaredGender = (gender: string) => {
        switch (gender) {
            case "man": 
                return "М"
            case "woman":
                return "Ж"
            case "mutual": 
                return "М/Ж"
            default:
                return gender
        }
    }
    let isReserveDep = (reserveString: string | null) => {
        if(reserveString === null) return null
        if(Number.isNaN(Number(reserveString)) === false) {
          let result =  isDepartments.filter((dep) => {
                return dep.id === Number(reserveString)
            }).map((dep) => {
                return dep.name
            })[0]
            return result
        } else return reserveString
    }

    const [isIndicator, setIndicator] = React.useState<Indicator>('')
    //указатель на то что палата отдана другим или взята из другого отделения
    //приемник своя даш панель- потом
    //взята зеленая отдана желтая
    //кнопка убрать быстро резерв с модальным
    let givenIndicator = (reserveString: string | null) => {

        //если число в резерве, проверка на департмент и ставим гивен
        if(Number.isNaN(Number(reserveString)) === false) {
          let result =  isDepartments.filter((dep) => {
                return dep.id === Number(reserveString)
            }).map((dep) => {
                return dep.name
            })
            if(result[0])  {
                setIndicator('given')
                return
            } else {
                setIndicator('')
                return
            }
        } //else {//если строка или пусто
            //else if(reserveString === null) {

               // let isTaken = isDepartments.filter((dep) => {
               //     return dep.id === ward.depId
                //})
                //setIndicator('taken')
/*              
                if(isTaken.length === 0) {

                } else return setIndicator('taken')
            }*/
            //если нет резервной строки ничего не делать////////////////////////////////////
            //if(reserveString === null) return setIndicator('')
        //}
    }

    React.useEffect(() => {
        givenIndicator(ward.reserve)
    },[])//[ward, setIndicator, isIndicator
   
    console.log('indicator ')

return (
    <TableRow key={ward.id} className={isIndicator? isIndicator === 'given'? 'bg-orange-100' : 'bg-lime-100' : "" }>
        <TableCell className="font-medium">{ward.number}</TableCell>
        <TableCell>{ward.numberOfSeats}</TableCell>
        <TableCell>{ward.engaged}</TableCell>
        <TableCell>{ward.free}</TableCell>
        <TableCell >{isTranslaredGender(ward.gender)}</TableCell>
        <TableCell>{isReserveDep(ward.reserve)}</TableCell>
        <TableCell className="flex gap-1">



            <Dialog open={isVisibleChange} onOpenChange={() => setVisibleChange(!isVisibleChange)}>
                <DialogTrigger asChild>
                    <Button variant={'outline'} onClick={() => setVisibleChange(true)}><HiPencil /></Button>
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
                            <Label htmlFor="number" className="text-right">
                                номер палаты
                            </Label>
                            <Input
                                value={isNumber}
                                type="number"
                                //@ts-ignore
                                onChange={(e) => setNumber(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="numberOfSeats" className="text-right">
                                кол-во мест
                            </Label>
                            <Input
                                value={isNumberOfSeats}
                                type="number"
                                //@ts-ignore
                                onChange={(e) => setNumberOfSeats(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="engaged" className="text-right">
                                занято
                            </Label>
                            <Input
                                value={isEngaged}
                                type="number"
                                //@ts-ignore
                                onChange={(e) => setEngaged(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="free" className="text-right">
                                свободно
                            </Label>
                            <Input
                                value={isFree}
                                type="number"
                                //@ts-ignore
                                onChange={(e) => setFree(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="gender" className="text-right">
                                пол
                            </Label>
                            {/*
                            //@ts-ignore*/}
                            <Select value={isGender} onValueChange={(e)=> setGender(e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="..."   className="col-span-3"/> 
                                </SelectTrigger>
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
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reserve" className="text-right">
                                резерв
                            </Label>
                            {
                            !isVisibleReserve
                            ?
                            //@ts-ignore
                            <Select  value={isReserve} onValueChange={(e) => setReserve(e)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="..." />
                                </SelectTrigger>
                                <SelectContent className="col-span-3">
                                    {isDepartments?isDepartments.map((dep) => {
                                        //filter
                                        return <SelectItem value={dep.id.toString()} key={dep.id}>
                                                    {dep.name}
                                                </SelectItem>
                                    }): ''}
                                </SelectContent>
                            </Select>

                            :
                            <Input
                                value={isReserve?isReserve: ''}
                                onChange={(e) => setReserve(e.target.value)}
                                className="col-span-2"
                            />
                            }
                            
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                <Button variant={'outline'} onClick={(e) => setVisibleReserve(!isVisibleReserve)}><HiSquaresPlus /></Button>
                                </HoverCardTrigger>
                                <Button variant={'outline'} onClick={(e) => setVisibleReserve(!isVisibleReserve)}><HiSquaresPlus /></Button>
                            <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">Резерв имеет два режима</h4>
                                <p className="text-sm">
                                 1. Резерв за отделением. Вам надо будет выбрать отделение за которым будет закреплена палата.
                                 </p>
                                 <p className="text-sm">
                                 2. Резерв по другим причинам.
                                 </p>
                            <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground">
                                     Нажмите на кнопку чтобы поменять режим
                                </span>
                                </div>
                                    </div>
                                    </div>
                            </HoverCardContent>
                        </HoverCard>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => onChangeWard(ward.id)}>Сохранить изменения</Button>
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
                            <Label htmlFor="number" className="text-right">
                                Номер палаты №
                            </Label>
                            {ward.number}
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="numberOfSeats" className="text-right">
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
