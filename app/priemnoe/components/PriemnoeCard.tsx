"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Department, Ward } from "@prisma/client"

export function PriemnoeCard({dep, wards} : {dep: Department, wards: Ward[]}) {
    const [progress, setProgress] = React.useState(13)
    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
      }, [])
    //колво мест
    //занято
    //свободно
    //хуйня индикатор

    //const [wards, setWards] = React.useState<Ward[]>([])
      console.log(wards)
  return (  
      <Table className="mb-6">
      <TableCaption>панель отделения</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Отделение</TableHead>
          <TableHead>Кол-во мест</TableHead>
          <TableHead>Занято</TableHead>
          <TableHead>Свободно</TableHead>
          <TableHead className="text-right">Индикатор</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
            <TableCell className="bold text-lg">{dep.name}</TableCell>
            <TableCell className="bold text-lg">{wards.reduce((sum, current) => {
                                                    return sum + current.numberOfSeats
                                                }, 0)}</TableCell>
            <TableCell className="bold text-lg">{wards.reduce((sum, current) => {
                                                    return sum + current.engaged
                                                }, 0)}</TableCell>
            <TableCell className="bold text-lg">{wards.reduce((sum, current) => {
                                                    return sum + current.free
                                                }, 0)}</TableCell>
            <TableCell className="bold text-lg"><Progress value={progress} className="w-[100%]" /></TableCell>
        </TableRow>
      </TableBody>
      {/*<TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
  </TableFooter>*/}
      </Table>

  )
}

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}

