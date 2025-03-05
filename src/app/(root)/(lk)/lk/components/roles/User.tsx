"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import * as React from "react"


import { Department, Profile, Ward } from "@prisma/client"
import { UserCard } from "../Card"
import { CreateWardSheet } from "../CreateWardSheet"
import { UserWard } from "../Ward"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/src/shared/ui/table"
//pizdec
export function User() {
    const session = useSession()

    const [department, setDepartment] = useState<Department>()
    const [profile, setProfile] = useState<Profile>()
    const [wards, setWards] = useState<Ward[]>([])
    const [takenWards, setTakenWards] = useState<Ward[]>([])
    const [departments, setDepartments] = useState<Department[]>()

    let getProfile = async (id: number) => {
        let result = await axios.get(`/api/users/profile/${id}`)
        setProfile(result.data)
    }
    let getDepartment = async (id: number) => {
        let result = await axios.get(`/api/department/${id}`)
        setDepartment(result.data)
    }

    let getDepartments =async () => {
        let result = await axios.get('/api/department')
        setDepartments(result.data)
    }

    const [isTo, setTo] = useState<Department>()
    const [isXo, setXo] = useState<Department>()
    const [isHo, setHo] = useState<Department>()
    const [isReab, setReab] = useState<Department>()

    let getWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenWards(takenWards)

        }
    }

    useEffect(() => {
        if (session.status === "authenticated" && typeof session.data.user !== 'undefined') {
            getProfile(Number(session.data.user.id))
        }
        getDepartments()
    }, [])

    useEffect(() => {
        if (profile) {
            getDepartment(profile.depId)
        }

    }, [profile])

    useEffect(() => {
        if (department) {
            getWards(department.id)
        }
    }, [department])

    useEffect(() => {
        if(departments) {
            let ToName = departments.filter((dep) => {return dep.name === "ТО"})
            setTo(ToName[0])
            let XoName = departments.filter((dep) => {return dep.name === "ХО"})
            setXo(XoName[0])
            let HoName = departments.filter((dep) => {return dep.name === "НО"})
            setHo(HoName[0])
            let ReabName = departments.filter((dep) => {return dep.name === "Реаб"})
            setReab(ReabName[0])
        }
    }, [departments])

    useEffect(() => {
        if(department) {
            if(isTo) {
                //@ts-ignore
                getToWards(isTo.id)
            }
            if(isXo) {
                //@ts-ignore
                getXoWards(isXo.id)
            }
            if(isHo) {
                //@ts-ignore
                getHoWards(isHo.id)
            }
            if(isReab) {
                //@ts-ignore
                getReabWards(isReab.id)
            }
        }
    }, [department])

    useEffect(() => {
        let interval = setInterval(() => {
            console.log('update')
            //if(department) {
                if(isTo) {
                    //@ts-ignore
                    getToWards(isTo.id)
                }
                if(isXo) {
                    //@ts-ignore
                    getXoWards(isXo.id)
                }
                if(isHo) {
                    //@ts-ignore
                    getHoWards(isHo.id)
                }
                if(isReab) {
                    //@ts-ignore
                    getReabWards(isReab.id)
                }
           // }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    //указатель на то что палата отдана другим или взята из другого отделения
    //приемник своя даш панель- потом
    const [Towards, setToWards] = useState<Ward[]>([])
    const [Xowards, setXoWards] = useState<Ward[]>([])
    const [Howards, setHoWards] = useState<Ward[]>([])
    const [Reabwards, setReabWards] = useState<Ward[]>([])

    const [takenToWards, setTakenToWards] = useState<Ward[]>([])
    const [takenXoWards, setTakenXoWards] = useState<Ward[]>([])
    const [takenHoWards, setTakenHoWards] = useState<Ward[]>([])
    const [takenReabWards, setTakenReabWards] = useState<Ward[]>([])

    let getToWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setToWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenToWards(takenWards)

        }
    }
    let getXoWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setXoWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenXoWards(takenWards)

        }
    }
    let getHoWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setHoWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenHoWards(takenWards)

        }
    }
    let getReabWards = async (id: number) => {
        let result = await axios.get('/api/ward')
        if (result.data && department) {
            let filteredWards = result.data.filter((ward: Ward) => {
                return ward.depId === id
            })
            setReabWards(filteredWards)
            let takenWards = result.data.filter((ward: Ward) => {
                return Number(ward.reserve) === id
            })
            setTakenReabWards(takenWards)
        }
    }

    let givenFree = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.free
            }, 0)
        else return 0
    }

    let givenEngaged = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.engaged
            }, 0)
        else return 0
    }

    let givenNumberofSeats = (wards: Ward[]) => {
        let result = wards.filter((ward) => {

            let nonDepartment =
                Number(ward.reserve)/*строка реверс ищем айди*/ !== department?.id/*айди департамента*/
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))

            return nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if (result)
            return result.reduce((sum, current) => {
                return sum + current.numberOfSeats
            }, 0)
        else return 0
    }


    let blockedFree = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.free
            }, 0)
        else return 0
    }

    let blockedEngaged = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.engaged
            }, 0)
        else return 0
    }

    let blockedNumberofSeats = (wards: Ward[]) => {
        if (wards)
            return wards.filter((ward) => {
                return ward.status === 'disabled'
            }).reduce((sum, current) => {
                return sum + current.numberOfSeats
            }, 0)
        else return 0
    }


    //DEPNURSTAFF //зам по среднему мед персоналу - менеджит койки/ создание/резерв по распоряжению
    //CHIEFNURSE //главная медсестра - менеджит койки/ создание/резерв по распоряжению
    return (
        <div
            className="
            bg-white
            p-2
            flex
            flex-col
            gap-1
            "
        >
          <div className="flex justify-end mb-2">
            {/*Информация пользователя*/}
            {department && profile ? <UserCard department={department} profile={profile} name={session.data?.user.name} /> : ''}
          </div>
        {department?.name.toLowerCase() !== 'CHIEF'.toLowerCase() ?
                <div className="rounded-md border basis-4/5">
                    <div className="">
                        <h1 className="text-center mt-4 mb-2 text-lg font-bold">Сводка по местам</h1>
                        <h4 className="ml-2 font-medium">{new Date().toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h4>
                        <h4 className="ml-2 font-medium">Отделение: {department?.name}</h4>
                        {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ?
                            department ? <CreateWardSheet depId={department.id} getWards={getWards} /> : ''
                            :
                            ""
                        }

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в другое отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                            <div className="w-6 h-6 bg-gray-200"></div> заблокированы
                        </div>

                    </div>
                    <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {department ? wards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getWards} depId={department.id} grade={profile?.grade} />
                            )) : ''}
                            {department ? takenWards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getWards} depId={department.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        wards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(wards) -
                                        blockedNumberofSeats(wards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    wards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(wards) - 
                                    blockedEngaged(wards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    wards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(wards) -
                                    blockedFree(wards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
://CHIEF
                <div className="rounded-md border basis-4/5">
                    <div className="">
                        <h1 className="text-center mt-4 mb-2 text-lg font-bold">Сводка по местам</h1>
                        <h4 className="ml-2 font-medium">{new Date().toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h4>
                        <h4 className="ml-2 font-medium">Отделение: {isTo?.name}</h4>
                        {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ?
                            isTo ? <CreateWardSheet depId={isTo.id} getWards={getToWards} /> : ''
                            :
                            ""
                        }

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>

                    </div>
                    <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isTo ? Towards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getToWards} depId={isTo.id} grade={profile?.grade} />
                            )) : ''}
                            {isTo ? takenToWards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getToWards} depId={isTo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Towards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenToWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Towards)
                                        - blockedNumberofSeats(Towards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Towards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenToWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Towards) -
                                    blockedEngaged(Towards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Towards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenToWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Towards) -
                                    blockedFree(Towards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <h4 className="ml-2 font-medium">Отделение: {isXo?.name}</h4>
                        {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ?
                            isXo ? <CreateWardSheet depId={isXo.id} getWards={getXoWards} /> : ''
                            :
                            ""
                        }

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isXo ? Xowards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getXoWards} depId={isXo.id} grade={profile?.grade} />
                            )) : ''}
                            {isXo ? takenXoWards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getXoWards} depId={isXo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Xowards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenXoWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Xowards) - 
                                        blockedNumberofSeats(Xowards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Xowards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenXoWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Xowards) - 
                                    blockedEngaged(Xowards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Xowards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenXoWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Xowards) -
                                    blockedFree(Xowards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                    <h4 className="ml-2 font-medium">Отделение: {isHo?.name}</h4>
                        {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ?
                            isHo ? <CreateWardSheet depId={isHo.id} getWards={getHoWards} /> : ''
                            :
                            ""
                        }

                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isHo ? Howards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getHoWards} depId={isHo.id} grade={profile?.grade} />
                            )) : ''}
                            {isHo ? takenHoWards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getHoWards} depId={isHo.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Howards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenHoWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Howards) -
                                        blockedNumberofSeats(Howards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Howards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenHoWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Howards) -
                                    blockedEngaged(Howards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Howards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenHoWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Howards) - 
                                    blockedFree(Howards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <h4 className="ml-2 font-medium">Отделение: {isReab?.name}</h4>
                        {profile?.grade == 'CHIEFNURSE' || profile?.grade == 'DEPNURSTAFF' ?
                            isReab ? <CreateWardSheet depId={isReab.id} getWards={getReabWards} /> : ''
                            :
                            ""
                        }
                        <div className="flex gap-4 ml-2">
                            <div className="w-6 h-6 bg-orange-100"></div> взяты в отделение
                            <div className="w-6 h-6 bg-green-100"></div> отданы другим отделением
                        </div>
                        <Table>
                        <TableCaption>Лист палат.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">палата №</TableHead>
                                <TableHead>кол-во мест</TableHead>
                                <TableHead>занято</TableHead>
                                <TableHead>свободно</TableHead>
                                <TableHead>пол</TableHead>
                                <TableHead>резерв по распоряжению</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isReab ? Reabwards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getReabWards} depId={isReab.id} grade={profile?.grade} />
                            )) : ''}
                            {isReab ? takenReabWards.map((invoice) => (
                                <UserWard ward={invoice} key={invoice.id} getWards={getReabWards} depId={isReab.id} taken={true} grade={profile?.grade} />
                            )) : ''}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={1}>Кол-во мест:</TableCell>
                                <TableCell className="text-left">
                                    {
                                        Reabwards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) +
                                        takenReabWards.reduce((sum, current) => {
                                            return sum + current.numberOfSeats
                                        }, 0) -
                                        givenNumberofSeats(Reabwards) -
                                        blockedNumberofSeats(Reabwards)
                                    }
                                </TableCell>
                                <TableCell className="text-right">Занято:</TableCell>
                                <TableCell className="text-left">{
                                    Reabwards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) +
                                    takenReabWards.reduce((sum, current) => {
                                        return sum + current.engaged
                                    }, 0) -
                                    givenEngaged(Reabwards)
                                    - blockedEngaged(Reabwards)
                                }</TableCell>
                                <TableCell className="text-right">Свободно:</TableCell>
                                <TableCell className="text-left">{
                                    Reabwards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) +
                                    takenReabWards.reduce((sum, current) => {
                                        return sum + current.free
                                    }, 0) -
                                    givenFree(Reabwards) -
                                    blockedFree(Reabwards)
                                }</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            }


        </div>

    )

}

/*                <Input
                    placeholder="фильтр палат..."
                    value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("number")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Колонки <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.columnDef.header?.toString()}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>



                
    const columns: ColumnDef<Ward>[] = [
        {
            accessorKey: "number",
            header: "Палата №",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("number")}</div>
            ),
        },
        {
            accessorKey: "numberOfSeats",
            header: "кол-во мест",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("numberOfSeats")}</div>
            ),
        },
        {
            accessorKey: "engaged",
            header: "занято",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("engaged")}</div>
            ),
        },
        {
            accessorKey: "free",
            header: "свободно",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("free")}</div>
            ),
        },
        {
            accessorKey: "gender",
            header: "пол",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("gender")}</div>
            ),
        },
        {
            accessorKey: "reserve",
            header: "резерв по распоряжению",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("reserve")}</div>
            ),
        },
    ]

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
                */