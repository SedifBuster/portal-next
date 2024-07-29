'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { saveAs } from "file-saver"
import { read, utils, write } from 'xlsx'
import { File } from "buffer"
import toast from "react-hot-toast"
import axios from "axios"
import { Department, Ward } from "@prisma/client"
import { DashInit } from "./Owerview"

export function FillingTable({
    fillingTable,
    getTables
}: {
    fillingTable: DashInit
    getTables: () => void
}) {

   /* const [isNewDataTable, setNewDataTable] = useState<DashInit>()

    const GiveXMLS = () => {
        console.log(fillingTable)
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const ws = utils.json_to_sheet(JSON.parse(fillingTable.table))
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' })
        const dataB = new Blob([excelBuffer], { type: fileType })

        saveAs(dataB, `${fillingTable.date}`)
        console.log(dataB)
    }

    const handleFile = async (e: any) => {

        const file: File = e.target.files[0]
        const dataFile = await file.arrayBuffer()
        const dataName = file.name
        const workbook = read(dataFile)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = utils.sheet_to_json(worksheet)
        console.log(dataName)
        console.log(jsonData)
        const newTable: fillingTable = {
            date: new Date(),
            //@ts-ignore
            table: jsonData
        }
        setNewDataTable(newTable)
        console.log(newTable)

        /*const fileDataSend = {
           id: item.id,
           month: month,
           year: year,
           data: JSON.stringify(jsonData)
        }
        //console.log(fileDataSend)

    }
    */
    //создать таблицу бд - succ
    //посчитать лпу - succ
    //создать тестовую хуйню - succ
    // отобразить вверху
    // затетстить выгрузку загрузку
    // с датой че нить придумать
    //подгрузить варды и просуммировать всю хуйню взяты приняты
    // финальный тест

  /*  const createTable = async () => {
        const postData = {
            date: isNewDataTable?.date,
            table: JSON.stringify(isNewDataTable?.table)
            }
        const result = await axios.post('/api/dash', postData)
        if (result.statusText === "OK") {
            toast.success('Таблица создана')
            setNewDataTable(undefined)
        } else {
            toast.error('Ошибка при создании таблицы')
        }
    }
    console.log(isNewDataTable?.table)
    let onChangeTable = async (id: number) => {

       /* const postData = {
            id: id,
            date: isNewDataTable?.date,
            table: JSON.stringify(isNewDataTable?.table)
            }
           {
                id: 2,
                name: isNewDataTable[0].name,
                numberOfSeats: isNewDataTable[0].numberOfSeats,
                engaged: 
            }
            numberOfSeats Int? @default(0)
            engaged Int? @default(0)//Всего находиться в стационаре, накопительным (чел.) 
            free Int? @default(0)//Свободных коек
            createdAt DateTime @default(now())
            updatedAt DateTime @updatedAt
            //to table
            planHuman Int? @default(0)
            planRub Int? @default(0)
            begAcc Int? @default(0)
            admRec Int?  @default(0)
            //totalStays Int? //Всего находиться в стационаре, накопительным (чел.) 
            disCome Int? @default(0) 
            disTax Int? @default(0)
            patOver Int? @default(0)
            storColed Int? @default(0)
            transHuman Int? @default(0)
            transRub Int? @default(0)
            medPrice Int? @default(0)
            dolgDead Int? @default(0)
            //freeBeds Int? //Свободных коек
            profile Profile[]

        const result = await axios.patch('/api/dash', postData)

        if (result.statusText === "OK") {
            toast.success(`таблица с айди ${result.data}  изменена`)
            getTables()
            setNewDataTable(undefined)

        } else {
            toast.error('Ошибка при изменении таблицы')
        }
        
    }*/
    //WARDS
    /*
    const [isDepartments, setIsDepartmens] = useState<Department[]>([])
    const [wards, setWards] = useState<Ward[]>([])

    let givenFree = (wards: Ward[], depId: number) => {
        let result = wards.filter((ward) => {

            let nonDepartment = 
            Number(ward.reserve)/*строка реверс ищем айди  !== depId/*айди департамента
            &&
            ward.reserve
            &&
            !isNaN(Number(ward.reserve))

            return  nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if(result) 
        return result.reduce((sum, current) => {
            return sum + current.free
        }, 0)
        else return 0 
    }

    let givenEngaged = (wards: Ward[], depId: number) => {
        let result = wards.filter((ward) => {

            let nonDepartment = 
            Number(ward.reserve)/*строка реверс ищем айди  !== depId/*айди департамента
            &&
            ward.reserve
            &&
            !isNaN(Number(ward.reserve))

            return  nonDepartment//поиск по департменту если есть то нахрен Number(ward.reserve)  === department?.id
        })

        if(result) 
        return result.reduce((sum, current) => {
            return sum + current.engaged
        }, 0)
        else return 0 
    }


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


        



    useEffect(() => {
        getWards()
        getDepartments()
    }, [])

    useEffect(() => {
        //onTakeWards()
    }, [isDepartments])


    //TO
    let TOWards = wards.filter((ward) => {
        return ward.depId === 2
    })
    let TOtakenWards = wards.filter((ward: Ward) => {
        return Number(ward.reserve) === 2
   })
    let TOGivenFree = givenFree(TOWards, 2)
    let ToGivenEngaged = givenEngaged(TOWards, 2)
    console.log(ToGivenEngaged)
    console.log(TOGivenFree)
    console.log(TOWards)
    //XO
    let XOWards = wards.filter((ward) => {
        return ward.depId === 3
    })
    let XOtakenWards = wards.filter((ward: Ward) => {
        return Number(ward.reserve) === 3
   })
    let XOGivenFree = givenFree(XOWards, 3)
    let XOGivenEngaged = givenEngaged(XOWards, 3)
    console.log(XOGivenEngaged)
    console.log(XOGivenFree)
    console.log(XOWards)
    console.log(XOtakenWards)
    //HO
    let HOWards = wards.filter((ward) => {
        return ward.depId === 4
    })
    let HOtakenWards = wards.filter((ward: Ward) => {
        return Number(ward.reserve) === 4
   })
    let HOGivenFree = givenFree(HOWards, 4)
    let HOGivenEngaged = givenEngaged(HOWards, 4)
    //REAB
    let ReabWards = wards.filter((ward) => {
        return ward.depId === 5
    })
    let ReabtakenWards = wards.filter((ward: Ward) => {
        return Number(ward.reserve) === 5
   })
    let ReabGivenFree = givenFree(ReabWards, 5)
    let ReabGivenEngaged = givenEngaged(ReabWards, 5)

    //PALL
    let PallWards = wards.filter((ward) => {
        return ward.depId === 6
    })
    let PalltakenWards = wards.filter((ward: Ward) => {
        return Number(ward.reserve) === 6
   })
    let PallGivenFree = givenFree(ReabWards, 6)
    let PallGivenEngaged = givenEngaged(ReabWards, 6)

                                        */
    return (
        <main
            className="
                m-2
                text-center
                shadow-xl
                p-2
            "
        >
            {/*<div>{fillingTable.date.toDateString()} пикать дату на изменение</div>
            <div className="flex gap-4 justify-center">
                <Button onClick={() => GiveXMLS()}>выгрузить</Button>
                <Button><input type="file" onChange={(e) => handleFile(e)} /></Button>
            </div>
            <Table>
                <TableCaption>Таблица заполнения</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Отделение</TableHead>
                        <TableHead>План (чел)</TableHead>
                        <TableHead>План (руб)</TableHead>
                        <TableHead>Состояло на начало месяца (чел)</TableHead>
                        <TableHead>Поступили в приёмное, накопительным (чел)</TableHead>
                        <TableHead>Всего находится в стационаре (чел)</TableHead>
                        <TableHead>Выбыло, накопительным (чел)</TableHead>
                        <TableHead>Выбывшие к оплате</TableHead>
                        <TableHead>Пациенты свыше 10 дней (чел.)</TableHead>
                        <TableHead>Не закрыто историй в Барсе (шт.)</TableHead>
                        <TableHead>Передано оплату в ФОМС (шт.)</TableHead>
                        <TableHead>Передано оплату в ФОМС (руб.) по КСГ</TableHead>
                        <TableHead>Средняя стоимость лечения</TableHead>
                        <TableHead>Долг по умершим</TableHead>
                        <TableHead>Свободных коек</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {JSON.parse(fillingTable.table).map((dep: any, index: any) => {
                        return <TableRow key={dep.id}>
                            <TableCell>{dep.name ? dep.name : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].name
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                            </TableCell>
                            <TableCell>
                                {dep.planHuman ? dep.planHuman : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].planHuman
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                            </TableCell>
                            <TableCell>
                                {dep.planRub ? dep.planRub : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].planRub
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                            </TableCell>
                            <TableCell>
                                {dep.begAcc ? dep.begAcc : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].begAcc
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.admRec ? dep.admRec : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].admRec
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.engaged ? dep.engaged : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].engaged
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.disCome ? dep.disCome : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].disCome
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.disTax ? dep.disTax : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].disTax
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.patOver ? dep.patOver : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].patOver
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.storColed ? dep.storColed : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].storColed
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>

                            <TableCell>
                                {dep.transHuman ? dep.transHuman : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].transHuman
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                            </TableCell>
                            <TableCell>
                                {dep.transRub ? dep.transRub : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].transRub
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.medPrice ? dep.medPrice : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].medPrice
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.dolgDead ? dep.dolgDead : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].dolgDead
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>
                            <TableCell>
                                {dep.free ? dep.free : 0}
                                {isNewDataTable ?
                                    <div className="text-green-400"> /
                                        {isNewDataTable.table ? isNewDataTable.table[index].free
                                            : 0
                                        }
                                    </div>
                                    : ''
                                }
                                </TableCell>

                        </TableRow>
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell >По ЛПУ</TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.planHuman
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.planHuman
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.planRub
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.planRub
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.begAcc
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.begAcc
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.admRec
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.admRec
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.engaged
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.engaged
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.disCome
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.disCome
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.disTax
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.disTax
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.patOver
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.patOver
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.storColed
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.storColed
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.transHuman
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.transHuman
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.transRub
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.transRub
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.medPrice
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.medPrice
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.dolgDead
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.dolgDead
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                        <TableCell>
                            {fillingTable.table ? JSON.parse(fillingTable.table).reduce((sum, current) => {
                                //@ts-ignore
                                return sum + current.free
                            }, 0)
                                : 0
                            }
                            {isNewDataTable ?
                                <div className="text-green-400"> /
                                    {isNewDataTable.table ? isNewDataTable.table.reduce((sum, current) => {
                                        //@ts-ignore
                                        return sum + current.free
                                    }, 0)
                                        : 0
                                    }
                                </div>
                                : ''
                            }
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {isNewDataTable? 
                        <div className="flex gap-4">
                        <Button className="bg-blue-400 text-white" variant={'outline'} onClick={() => onChangeTable(fillingTable.id)}>изменить текущую таблицу</Button>
                        <Button className="bg-blue-400 text-white" variant={'outline'} onClick={() => createTable()}>сохранить новую таблицу</Button>
                    </div>
            : ''}
            */}
        </main>
    )
}