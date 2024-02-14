"use client"

import { TableCell, TableFooter, TableRow } from "@/components/ui/table"
import { DashDepartment } from "@prisma/client"

export
  function DrawerTableFooter({
    table
  } : {
    table: DashDepartment[]
  }
) {
  /*по лпу редус по всем для визуализации*/ 
  return (
    <TableFooter>
      <TableRow>

        <TableCell >
          По ЛПУ
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.planHuman
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.planHuman
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.planRub
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.planRub
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.begAcc
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.begAcc
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.admRec
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.admRec
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.disCome
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.disCome
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.disTax
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.disTax
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
               return cell!.patOver
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.patOver
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.storColed
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.storColed
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.transHuman
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.transHuman
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.transRub
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.transRub
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.medPrice
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.medPrice
            }, 0)
            :
            0
          }
        </TableCell>

        <TableCell>
          {
            table
            ?
            table.filter((cell) => {
              return cell!.dolgDead
            }).reduce((sum, current) => {
              //@ts-ignore
              return sum + current.dolgDead
            }, 0)
            :
            0
          }
        </TableCell>

      </TableRow>
    </TableFooter>
  )
}