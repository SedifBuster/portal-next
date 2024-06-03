import * as React from "react"

import { Button } from "@/components/ui/button"
import { Department, Gender, Ward } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { HiMiniArrowDownOnSquareStack, HiMiniArrowSmallUp, HiPencil, HiTrash, HiUserMinus, HiUserPlus } from "react-icons/hi2"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HiSquaresPlus } from "react-icons/hi2";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import clsx from "clsx"
import { Checkbox } from "@/components/ui/checkbox"

export
  type DepId = {
  man: 'man',
  woman: 'woman',
  mutual: 'mutual'
  };

export
  type Indicator = 'given' | 'taken' | ''

export
  function UserWard(
    {
      ward,
      getWards,
      depId,
      taken,
      grade,
    }: {
      ward: Ward
      getWards: (id: number) => void
      depId: number
      taken?: boolean
      grade: string | undefined
    }
  ) {
    const [isVisibleDelete, setVisibleDelete] = React.useState<boolean>(false)
    const [isVisibleChange, setVisibleChange] = React.useState<boolean>(false)
    const [isVisibleReturn, setVisibleReturn] = React.useState<boolean>(false)

    const [isDepartments, setIsDepartmens] = React.useState<Department[]>([])

    let getDepartments = async () => {
      try {
        let result = await axios.get( '/api/department' )
        if ( result.status === 200 ) {
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
      const postData = { id: id }

      const result = await axios.delete( '/api/ward', { data: postData } )
      if ( result.statusText === "OK" ) {
        toast.success('палата удалена')
        setVisibleDelete(false)
        getWards(depId)
      } else {
        toast.error('Ошибка при удалении палаты')
      }
      if ( result.statusText === "OK" ) {
        const dashWardData = {
          dashDepId: ward.depId,
          number: Number(isNumber),
          numberOfSeats: Number(isNumberOfSeats),
          engaged: Number(isEngaged),
          free: Number(isFree),
          gender: isGender,
          reserve: isReserve,
          status: "deleted"
        }
        try {
          if(
            new Date(ward.updatedAt).getDay() === new Date().getDay()
            &&
            new Date(ward.updatedAt).getMonth() === new Date().getMonth()
            &&
            new Date(ward.updatedAt).getFullYear() === new Date().getFullYear()
            &&
            result.data === ward.number
          ) {
            console.log('tot zhe den')
            let dashWardUpdate = await axios.patch( '/api/dash/ward', {...dashWardData, id: id})//id ne tot kotory nuzhen
            if( dashWardUpdate.statusText !== "OK" ) return toast.error( "Ошибочный статус запроса")
            else if( dashWardUpdate.statusText === "OK") {
              const dashWardNumber: number = await dashWardUpdate.data
              console.log('dash ward' + ' ', dashWardNumber)
            }
          } else{
            console.log('drugoi den')
            let dashWardUpdate = await axios.post( '/api/dash/ward', dashWardData)
            if( dashWardUpdate.statusText !== "OK" ) return toast.error( "Ошибочный статус запроса")
            else if( dashWardUpdate.statusText === "OK") {
              const dashWardNumber: number = await dashWardUpdate.data
              console.log('dash ward' + ' ', dashWardNumber)
            }
          }
        } catch ( error ) {
          toast.error( "Ошибка при удалении палаты" )
          console.log( "Ошибка при удалении палаты", error )
        }
        setVisibleChange(false)
        getWards(depId)
        setVisibleReturn(false)
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
    const [isDepReserved, setDepReserved] = React.useState<boolean>(false)
    const [isDisabled, setDisabled] = React.useState<boolean>(false)

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
      if( postData.numberOfSeats < postData.engaged ) return toast.error( 'кол-во мест не должно быть меньше занятых' )
      for(let i = 0; i < 6; i++) {
        if(Number(checkupArray[i]) < 0) {
          return toast.error( 'Числа не должны быть отрицательными' )
        }
      }
      const result = await axios.patch( '/api/ward', postData )

      if ( result.statusText === "OK" ) {
        toast.success(`палата с номером ${result.data}  изменена`)
        //cюда нам надо вставить даш палаты
        const dashWardData = {
          dashDepId: ward.depId,
          number: Number(isNumber),
          numberOfSeats: Number(isNumberOfSeats),
          engaged: Number(isEngaged),
          free: Number(isFree),
          gender: isGender,
          reserve: isReserve
        }
        try {
          if( //сравнивать намбер палаты result.number === ward.number
            new Date(ward.updatedAt).getDay() === new Date().getDay()
            &&
            new Date(ward.updatedAt).getMonth() === new Date().getMonth()
            &&
            new Date(ward.updatedAt).getFullYear() === new Date().getFullYear()
            &&
            result.data === ward.number
          ) {
            console.log('tot zhe den')
            let dashWardUpdate = await axios.patch( '/api/dash/ward', {...dashWardData, id: id})//id ne tot kotory nuzhen
            if( dashWardUpdate.statusText !== "OK" ) return toast.error( "Ошибочный статус запроса")
            else if( dashWardUpdate.statusText === "OK") {
              const dashWardNumber: number = await dashWardUpdate.data
              console.log('dash ward' + ' ', dashWardNumber)
            }
          } else{
            console.log('drugoi den')
            //post body
            let dashWardUpdate = await axios.post( '/api/dash/ward', dashWardData)
            if( dashWardUpdate.statusText !== "OK" ) return toast.error( "Ошибочный статус запроса")
            else if( dashWardUpdate.statusText === "OK") {
              const dashWardNumber: number = await dashWardUpdate.data
              console.log('dash ward' + ' ', dashWardNumber)
            }
          }
        } catch ( error ) {
          toast.error( "Ошибка при создании палаты для дашборда" )
          console.log( "Ошибка при создании палаты для дашборда", error )
        }
        setVisibleChange(false)
        getWards(depId)
        setVisibleReturn(false)

      } else {
        toast.error('Ошибка при изменении палаты')
      }
    }

    let isTranslaredGender = (gender: string) => {
      switch ( gender ) {
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
      if( reserveString === null ) return null
      if( Number.isNaN(Number(reserveString)) === false ) {
        let result =  isDepartments.filter((dep) => {
          return dep.id === Number(reserveString)
        }).map((dep) => {
          return dep.name
        })[0]
        return result
      } else return reserveString
    }

    const [isIndicator, setIndicator] = React.useState<Indicator>('')

    let givenIndicator = (reserveString: string | null) => {
      //если число в резерве, проверка на департмент и ставим гивен
      if( Number.isNaN(Number(reserveString)) === false ) {
        let result =  isDepartments.filter((dep) => {
          return dep.id === Number(reserveString)
        }).map((dep) => {
          return dep.name
        })
        if( result[0] )  {
          setIndicator('given')
          setDepReserved(true)
          return
        } else {
          setIndicator('')
          setDepReserved(false)
          return
        }
      }
    }

    let onReturnWard = async (id: number) => {
      const postData = {
        id: id,
        depId: ward.depId,
        number: Number(isNumber),
        numberOfSeats: Number(isNumberOfSeats),
        engaged: Number(isEngaged),
        free: Number(isFree),
        gender: isGender,
        reserve: ''
      }
      const result = await axios.patch( '/api/ward', postData )

      if ( result.statusText === "OK" ) {
        toast.success( `палата с номером ${result.data}  возвращена` )
        setVisibleChange(false)
        getWards(depId)
        setReserve('')
        setVisibleReturn(false)
      } else {
        toast.error( 'Ошибка при возвращении палаты' )
      }
    }

    React.useEffect(() => {
      if( ward )
        givenIndicator(ward.reserve)
    },[isReserveDep])

return (
  <TableRow key={ward.id} className={clsx(`
    `,
    isIndicator === 'given' && 'bg-orange-100',
    taken && 'bg-lime-100'
    )
  }>
    <TableCell className="font-bold">{ward.number}</TableCell>
    <TableCell>{ward.numberOfSeats}</TableCell>
    <TableCell>{ward.engaged}</TableCell>
    <TableCell>{ward.free}</TableCell>
    <TableCell >{isTranslaredGender(ward.gender)}</TableCell>
    {/**проблема со строкой */}
    <TableCell className="text-wrap">
      {
        taken
        ?
        " палата от " + isDepartments.filter((dep) => {return dep.id === ward.depId})[0]?.name
        :
        isReserveDep(ward.reserve)
      }
    </TableCell>
    {!isDepReserved || taken?
      <TableCell className="flex gap-1">
        {/** 
        <Button variant={'outline'} onClick={(e) => setVisibleReserve(!isVisibleReserve)}><HiUserPlus /></Button>
        <Button variant={'outline'} onClick={(e) => setVisibleReserve(!isVisibleReserve)}><HiUserMinus /></Button>
        */}
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
              {grade === 'HEADNURSE' || grade === 'DEPNURSTAFF' || grade === 'CHIEFNURSE' || grade === 'TECHNICICAN'?
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="number" className="text-right">
                      номер палаты
                    </Label>
                    <p className="pl-4">{isNumber}</p>
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
                </>
              :
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="number" className="text-right">
                      номер палаты
                    </Label>
                    <p> {isNumber} </p>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="numberOfSeats" className="text-right">
                      кол-во мест
                    </Label>
                    <p>{isNumberOfSeats}</p> 
                  </div>
                </>
              }

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

              {grade === 'HEADNURSE' || grade === 'DEPNURSTAFF' || grade === 'CHIEFNURSE' || grade === 'TECHNICICAN'
              ?
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
              :
              ''
              }
              {/**gender */}
              {grade === 'DEPNURSTAFF' || grade === 'CHIEFNURSE' || grade === 'TECHNICICAN' ?
                !taken
                ?
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
                        {isDepartments?isDepartments.filter((dep) => {return dep.id !== depId && dep.name.toLowerCase() !== 'IT'.toLowerCase() && dep.name.toLowerCase() !== 'Chief'.toLowerCase() && dep.name.toLowerCase() !== 'ИТ'.toLowerCase()}).map((dep) => {
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

                    {/**ховер кнопки резета на пустую строку в резерве */}
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        {!isVisibleReserve?
                          <Button className="bg-blue-200" variant={'outline'} onClick={(e) => {
                            setReserve('')
                          }}><HiMiniArrowSmallUp /></Button>
                        :
                          ''
                        }
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">Очистить поле резерва</h4>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                Убирает привязку к отделению, очищает строку "резерв"
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                :
                ''
                :
                ''}
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => onChangeWard(ward.id)}>Сохранить изменения</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/*удаление палаты */}
          {grade === 'DEPNURSTAFF' || grade === 'CHIEFNURSE' || grade === 'TECHNICICAN' ?
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
          : ''}
        </TableCell>
        ://возвращение палаты себе
        grade === 'DEPNURSTAFF' || grade === 'CHIEFNURSE' || grade === 'TECHNICICAN' ?
        <TableCell className="flex gap-1">
          <Dialog open={isVisibleReturn} onOpenChange={() => setVisibleReturn(!isVisibleReturn)}>
            <DialogTrigger asChild>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button className="bg-blue-400" onClick={() => setVisibleReturn(true)}><HiMiniArrowDownOnSquareStack /></Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Забрать палату</h4>
                      <p className="text-sm">
                        Вернуть палату обратно в свое отделение
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Вернуть палату в свое отделение?</DialogTitle>
                <DialogDescription>
                  Палата вернется в отделение и будет доступна для редактирования.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button className="bg-blue-400" onClick={() => onReturnWard(ward.id)} >Вернуть</Button>
                <Button variant={'outline'} onClick={() => setVisibleReturn(false)}>Отменить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
        : ''
    }
    <TableCell>   <div className="flex items-center space-x-2">
      {/*disable  блокировка только теми кто владеет палатой
      реализовать блокировку и разблокировку со всей логикой (пиздец) добавить иконки с быстрым добавлением убавлением
      и пооооотом только решать проблемы с дашбордом
      */}
      <Checkbox id="terms" />
      <HoverCard>
          <HoverCardTrigger asChild>
          <label
            htmlFor="terms"
           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
           {ward.status === "active"? 'заблокировать' : 'разблокировать'}
           </label>
          </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Блокировка палаты</h4>
                    <p className="text-sm">
                      1. Если палата закреплена за отделением, но не используется по определенным причинам, то ее нужно заблокировать.
                      Это нужно чтобы показатели палаты которая не используется, не попадали в общую сводку.
                    </p>
                     <div className="flex items-center pt-2">
                       <span className="text-xs text-muted-foreground">
                       Поставьте галку чтобы заблокировать. Чтобы разблокировать уберите ее.
                     </span>
                   </div>
                   </div>
                 </div>
              </HoverCardContent>
            </HoverCard>
    </div>
    </TableCell>
    </TableRow>
  )
}