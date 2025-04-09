"use client"


import { Department, Profile, User, Ward } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { HiPencil, HiTrash } from "react-icons/hi2"

import { format } from "date-fns"
import ru from "date-fns/locale/ru";
import { Button } from "@/src/shared/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/shared/ui/popover"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/shared/ui/table"
import { Label } from "recharts"

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
  const [users] = useState<User[]>([])

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

  return <>
    <section
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
    <section
      className="
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
        {
          isDepartments
          ?
          isDepartments.map((dep) => {
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
                text-lg font-bold
              ">
                <div>{dep.id}</div>
                <div>{dep.name}</div>
              </div>
              <div
                className="
                  flex
                  gap-4
                  flex-align
                "
              >
                <div>создана: {format(new Date(dep.createdAt), "PPP", {locale: ru})}</div>
                <div>изменена: {format(new Date(dep.updatedAt), "PPP", {locale: ru})}</div>
              </div>
              <div
                className="
                  flex
                  gap-4
                  flex-align
                  justify-self-end
                  items-center
                "
              >
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

              <div className="col-span-2">
                <Label className="
                  flex
                  justify-center
                  items-center
                  font-bold
                  text-lg
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
                    {
                      wards.filter((ward) => {
                        return ward.depId === dep.id}).map((ward) => (
                          <TableRow key={ward.id}>
                            <TableCell className="font-medium">{ward.number}</TableCell>
                            <TableCell>{ward.numberOfSeats}</TableCell>
                            <TableCell>{ward.engaged}</TableCell>
                            <TableCell>{ward.free}</TableCell>
                            <TableCell>{ward.gender}</TableCell>
                            <TableCell className="text-right">{ward.reserve}</TableCell>
                          </TableRow>
                        ))
                    }
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
                        }
                      </TableCell>
                      <TableCell className="text-right">Свободно:</TableCell>
                      <TableCell className="text-left">{
                        wards.filter((ward) => {
                          return ward.depId === dep.id}).reduce((sum, current) => {
                            return sum + current.free
                        }, 0)
                        }
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="col-span-1">
                <Label
                  className="
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
                    {
                      profiles? profiles.filter((profile) => {
                        return profile.depId === dep.id}).map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium text-center">
                              {
                                users?users.filter((user) => {
                                  return user.id === profile.userId
                                })[0]?.name : ''
                              }
                            </TableCell>
                            <TableCell className="text-center">{profile.grade}</TableCell>
                          </TableRow>
                        )) : ''
                    }
                  </TableBody>
                </Table>
              </div>
            </li>
          }) : ''
        }
      </ul>
    </section>
  </>
}