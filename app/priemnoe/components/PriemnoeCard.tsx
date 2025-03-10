"use client"

import * as React from "react"

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
import { ProgressCustom } from "@/components/ui/progressCustom"
import clsx from "clsx"

export function PriemnoeCard({dep, wards, allWards} : {dep: Department, wards: Ward[], allWards: Ward[]}) {
    const [progress, setProgress] = React.useState(13)


    let given = (wards: Ward[], field: 'numberOfSeats' | 'free' | 'engaged') => {
        let result = wards.filter((ward) => {
            let nonDepartment = 
                Number(ward.reserve) !== dep?.id
                &&
                ward.reserve
                &&
                !isNaN(Number(ward.reserve))
        
                return  nonDepartment
            })
        
            if(result) {
                switch (field) {
                    case 'numberOfSeats':
                        return result.reduce((sum, current) => {
                            return sum + current.numberOfSeats
                        }, 0)
                    case 'engaged':
                        return result.reduce((sum, current) => {
                            return sum + current.engaged
                        }, 0)
                    case 'free':
                        return result.reduce((sum, current) => {
                            return sum + current.free
                        }, 0)
                    default:
                        return 0
                }
            } else return 0
    }

    let taken = (wards: Ward[], field: 'numberOfSeats' | 'free' | 'engaged') => {
        let result = wards.filter((ward) => {
            return Number(ward.reserve) === dep.id
            })
        
            if(result) {
                switch (field) {
                    case 'numberOfSeats':
                        return result.reduce((sum, current) => {
                            return sum + current.numberOfSeats
                        }, 0)
                    case 'engaged':
                        return result.reduce((sum, current) => {
                            return sum + current.engaged
                        }, 0)
                    case 'free':
                        return result.reduce((sum, current) => {
                            return sum + current.free
                        }, 0)
                    default:
                        return 0
                }
            } else return 0
    }

    let onChangeIndicator = (numberOfSeats: number, free: number) => {
       let indicator = 100 - (free / numberOfSeats *  100)
       setProgress(indicator)
       return indicator
    }

    let numberOfSeats =  wards.reduce((sum, current) => {return sum + current.numberOfSeats}, 0)+taken(allWards, 'numberOfSeats')-given(wards, 'numberOfSeats')
    let engaged = wards.reduce((sum, current) => {return sum + current.engaged}, 0)+taken(allWards, 'engaged')-given(wards, 'engaged')
    let free = wards.reduce((sum, current) => {return sum + current.free}, 0)+taken(allWards, 'free')-given(wards, 'free')

    React.useEffect(() => {
        onChangeIndicator(numberOfSeats, free)
    }, [wards, allWards])

  return (  
      <Table className="mb-6 md:h-48">
      {/*<TableCaption>панель отделения</TableCaption>*/}
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
            <TableCell className="font-medium text-xl">{dep.name}</TableCell>
            <TableCell className="bold text-lg">
                { numberOfSeats }
            </TableCell>
            <TableCell className="bold text-lg">
                { engaged }
            </TableCell>
            <TableCell className="bold text-lg">
                { free }
            </TableCell>
            <TableCell className="bold text-lg">
                <p>{!isNaN(progress)?Math.trunc(progress) + '%' : ''}</p>
               
                <ProgressCustom value={progress} 
                indicatorColor={
                    clsx(`bg-blue-300 `,
                        progress > 33 && progress < 66 && 'bg-gradient-to-r from-red-500 from-60% to-orange-500 to-90%',
                        progress <= 33 && 'bg-red-500',
                        progress > 66 && 'bg-gradient-to-r from-red-500 from-10% via-orange-500 via-50% to-green-500 to-90%'
                        )
                } className="w-[100%] h-8" />
               
            </TableCell>
        </TableRow>
      </TableBody>
      </Table>
  )
}
// <Progress value={progress} className="w-[100%]" />
//"bg-blue-300"
  /*{//numberOfSeats - колво мест
    wards.reduce((sum, current) => {
        return sum + current.numberOfSeats
    }, 0)
    + 
    /*takenWards.reduce((sum, current) => {
        return sum + current.numberOfSeats
    }, 0)
    taken(allWards, 'numberOfSeats')
    -
    given(wards, 'numberOfSeats')
}*/


//clsx(`bg-blue-300 `,
//progress > 33 && progress < 66 && 'bg-gradient-to-r from-red-500 from-33% to-orange-500 to-66%',
//progress < 33 && 'bg-red-500',
//progress > 66 && 'bg-gradient-to-r from-red-500 from-33% via-orange-500 via-66% to-green-500 to-100%'
//)
    //progreess nan gradient//shobi otnimalos 
    //"bg-gradient-to-r from-red-500 via-orange-500 to-green-500"


    /*<ProgressCustom value={progress} 
    indicatorColor={
        'bg-black'
    } 
    className="w-[100%] h-8 bg-gradient-to-r from-red-500 from-33% via-orange-500 via-66% to-green-500 to-100%" />*/

    /*<ProgressCustom value={progress} 
    indicatorColor={
        clsx(`bg-blue-300 `,
            progress > 33 && progress < 66 && 'bg-gradient-to-r from-red-500 from-10% to-orange-500 to-90%',
            progress <= 33 && 'bg-red-500',
            progress > 66 && 'bg-gradient-to-r from-red-500 from-33% via-orange-500 via-66% to-green-500 to-100%'
            )
    } className="w-[100%] h-8" />*/


                    