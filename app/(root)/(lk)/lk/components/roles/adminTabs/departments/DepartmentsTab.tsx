"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Department, Profile, User, Ward } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { HiPencil, HiTrash } from "react-icons/hi2"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

export
  function DepartmentsTab(

) {

    const [isDepartmentName, setIsDepartmentName] = useState<string>('')
    const [isDepartments, setIsDepartmens] = useState<Department[]>([])

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

    const createDepartment = async () => {
        const postData = {
            name: isDepartmentName
        }
        const result = await axios.post('/api/department', postData)
        if (result.statusText === "OK") {
            toast.success('Отделение создано')
            getDepartments()
            setIsDepartmentName('')
        } else {
            toast.error('Ошибка при создании')
        }
    }
    let deleteDepartment = async (depId: number) => {
        const postData = {
            id: depId
        }
        const result = await axios.delete('/api/department', { data: postData })
        if (result.statusText === "OK") {
            toast.success('Отделение удалено')
            getDepartments()
        } else {
            toast.error('Ошибка при удалении')
        }
    }
    const [users, setUsers] = useState<User[]>([])

    const [wards, setWards] = useState<Ward[]>([])
    let getWards = async () => {
        try {
            let result = await axios.get('/api/ward')
            if (result.status === 200) {
                setWards(result.data)
            }
        } catch {
            console.log('error')
        }
    }

    let getProfiles = async() => {
        try {
            let result = await axios.get('/api/users/profile')
            if (result.status === 200) {
                setProfiles(result.data)
            }
        } catch {
            console.log('error')
        } 
    }

    const [profiles, setProfiles] = useState<Profile[]>([])

    useEffect(() => {
        getDepartments()
        getProfiles()
        getWards()
    }, [])


  return <><section
  className="
          flex
          gap-4
      "
>
  <input
      placeholder="отделение"
      value={isDepartmentName}
      onChange={e => setIsDepartmentName(e.target.value)}
      className="
          border-2
          border-teal-400
      "
  />
  <Button onClick={createDepartment}>
      создать
  </Button>
</section>
<section className="
      mt-4
  "
>
  <ul
      className="
          flex
          flex-col
          gap-4
      "
  >
      {isDepartments ? isDepartments.map((dep) => {
          return <li key={dep.id}
              className="
                          grid
                          grid-cols-3
                          gap-4
                          p-2
                          border
                      "
          >
              <div className="
                          flex
                          gap-4
                      ">
                  <div>{dep.id}</div>
                  <div>{dep.name}</div>
              </div>
              <div className="
                          flex
                          gap-4
                          flex-align
                      ">
                  <div>создана: {dep.createdAt.toString()}</div>
                  <div>изменена: {dep.updatedAt.toString()}</div>
              </div>
              <div className="
                          flex
                          gap-4
                          flex-align
                          justify-self-end
                          items-center
                      ">
                          <Button variant={'outline'}><HiPencil /></Button>

                  <Popover>
                      <PopoverTrigger>
                          <Button variant={'destructive'}><HiTrash /></Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                          <div className="grid gap-4">
                              <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Удаление</h4>
                                  <p className="text-sm text-muted-foreground">
                                      Вы действительно хотите удалить отделение?
                                  </p>
                              </div>
                              <div className="grid gap-2">
                                  <Button variant={'destructive'} onClick={() => deleteDepartment(dep.id)}>удалить</Button>
                              </div>
                          </div>
                      </PopoverContent>
                  </Popover>

              </div>
              <div className="col-span-3">
                  <Table className="w-full">
                      <TableHeader>
                          <TableRow>
                              <TableHead>План(чел)</TableHead>
                              <TableHead>План (руб.)</TableHead>
                              <TableHead className="text-right">Состояло на начало месяца (чел.)</TableHead>
                              <TableHead className="text-right">Поступили в приёмное, накопительным (чел.)</TableHead>
                              <TableHead className="text-right">Всего находится в стационаре (чел.) ot ward</TableHead>
                              <TableHead className="text-right">Выбыло, накопительным (чел.)</TableHead>
                              <TableHead className="text-right">Выбывшие к оплате</TableHead>
                              <TableHead className="text-right">Пациенты свыше 10 дней (чел.)</TableHead>
                              <TableHead className="text-right">Не закрыто историй в Барсе (шт.)</TableHead>
                              <TableHead className="text-right">Передано оплату в ФОМС (шт.)</TableHead>
                              <TableHead className="text-right">Передано оплату в ФОМС  (руб.) по КСГ</TableHead>
                              <TableHead className="text-right">Средняя стоимость лечения</TableHead>
                              <TableHead className="text-right">Долг по умершим</TableHead>
                              <TableHead className="text-right">Свободных коек ot ward</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                              <TableRow>
                                  <TableCell>{dep.planHuman}</TableCell>
                                  <TableCell>{dep.planRub}</TableCell>
                                  <TableCell className="text-right">{dep.begAcc}</TableCell>
                                  <TableCell className="text-right">{dep.admRec}</TableCell>
                                  <TableCell className="text-right">{/*dep.totalStays*/"ot ward"}</TableCell>
                                  <TableCell className="text-right">{dep.disCome}</TableCell>
                                  <TableCell className="text-right">{dep.disTax}</TableCell>
                                  <TableCell className="text-right">{dep.patOver}</TableCell>
                                  <TableCell className="text-right">{dep.storColed}</TableCell>
                                  <TableCell className="text-right">{dep.transHuman}</TableCell>
                                  <TableCell className="text-right">{dep.transRub}</TableCell>
                                  <TableCell className="text-right">{dep.medPrice}</TableCell>
                                  <TableCell className="text-right">{dep.dolgDead}</TableCell>
                                  <TableCell className="text-right">{/*dep.freeBeds*/"ot ward"}</TableCell>
                              </TableRow>
                      </TableBody>
                  </Table>
              </div>

              <div className="col-span-2">
                  <Label className="
                                  flex
                                  justify-center
                                  items-center
                                  font-bold
                                  "
                  >
                          Сводка по местам
                  </Label>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[100px]">Палата №</TableHead>
                          <TableHead className="text-right">Кол-во мест</TableHead>
                          <TableHead className="text-right">Занято</TableHead>
                          <TableHead className="text-right">Свободно</TableHead>
                          <TableHead className="text-right">Пол</TableHead>
                          <TableHead className="text-right">Резерв по распоряжению</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {wards.filter((ward) => {
                          return ward.depId === dep.id}).map((ward) => (
                          <TableRow key={ward.id}>
                              <TableCell className="font-medium">{ward.number}</TableCell>
                              <TableCell>{ward.numberOfSeats}</TableCell>
                              <TableCell>{ward.engaged}</TableCell>
                              <TableCell>{ward.free}</TableCell>
                              <TableCell>{ward.gender}</TableCell>
                              <TableCell className="text-right">{ward.reserve}</TableCell>
                          </TableRow>
                          ))}
                  </TableBody>
                  <TableFooter>
                      <TableRow>
                          <TableCell colSpan={1}>Кол-во мест:</TableCell>
                          <TableCell className="text-left">
                              {
                               wards.filter((ward) => {
                                  return ward.depId === dep.id}).reduce((sum, current) => {
                                      return sum + current.numberOfSeats
                                  }, 0)
                              }
                                  </TableCell>
                          <TableCell className="text-right">Занято:</TableCell>
                          <TableCell className="text-left">{
                               wards.filter((ward) => {
                                  return ward.depId === dep.id}).reduce((sum, current) => {
                                      return sum + current.engaged
                                  }, 0)
                              }</TableCell>
                          <TableCell className="text-right">Свободно:</TableCell>
                          <TableCell className="text-left">{
                               wards.filter((ward) => {
                                  return ward.depId === dep.id}).reduce((sum, current) => {
                                      return sum + current.free
                                  }, 0)
                              }</TableCell>
                      </TableRow>
                  </TableFooter>
              </Table>

              </div>

              <div className="col-span-1">
                  <Label className="
                                  flex
                                  justify-center
                                  items-center
                                  font-bold
                                  "
                  >
                          Аккаунты
                  </Label>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead className="w-[100px]">имя</TableHead>
                          <TableHead className="text-center">должность</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {profiles? profiles.filter((profile) => {
                          return profile.depId === dep.id}).map((profile) => (
                          <TableRow key={profile.id}>
                              <TableCell className="font-medium text-center" >
                                  {
                                      users?users.filter((user) => {
                                          return user.id === profile.userId
                                      })[0]?.name : ''
                                  }
                              </TableCell>
                              <TableCell className="text-center">{profile.grade}</TableCell>
                          </TableRow>
                          )) : ''}
                  </TableBody>
              </Table>

              </div>
          </li>
      }) : ''}
  </ul>
</section>
</>
}