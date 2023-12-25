'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { fillingTable } from "./Owerview"
import { saveAs } from "file-saver"
import { read, utils, write } from 'xlsx'
import { File } from "buffer"
import { Department } from "@prisma/client"




export function FillingTable({
    fillingTable
}: {
    fillingTable: fillingTable
}) {

    const [isNewDataTable, setNewDataTable] = useState<fillingTable>()

    const GiveXMLS = () => {
        console.log(fillingTable)
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const ws = utils.json_to_sheet(fillingTable.table)
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
        }*/
        //console.log(fileDataSend)

    }

    //создать таблицу бд - succ
    //посчитать лпу - succ
    //создать тестовую хуйню - succ
    // отобразить вверху
    // затетстить выгрузку загрузку
    // с датой че нить придумать
    //подгрузить варды и просуммировать всю хуйню взяты приняты
    // финальный тест


    return (
        <main
            className="
                m-2
                text-center
                shadow-xl
                p-2
            "
        >
            <div>{fillingTable.date.toDateString()} пикать дату на изменение</div>
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
                    {fillingTable.table.map((dep, index) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
                            {fillingTable.table ? fillingTable.table.reduce((sum, current) => {
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
            <div className="flex gap-4">
                <Button className="bg-blue-400 text-white" variant={'outline'}>изменить текущую таблицу</Button>
                <Button className="bg-blue-400 text-white" variant={'outline'}>сохранить новую таблицу</Button>
            </div>
        </main>
    )
}