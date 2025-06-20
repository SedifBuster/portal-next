"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { flexRender, Row } from "@tanstack/react-table"
import { ZnoLog } from "@prisma/client"
import clsx from "clsx"

export
  default function ZnoTableRow ({
    row,
    priorDate
  } : {
    row: Row<ZnoLog>
    priorDate: Date
  }) {

    //console.log(new Date(row.getValue('createdAt')) <= priorDate)

  return <TableRow
    key={row.id}
    data-state={row.getIsSelected() && "selected"}
    className={clsx(`
            ""
            `,
            row.getValue("status")
            ?
            row.getValue('status') !== 'Completed' && new Date(row.getValue('createdAt')) <= priorDate
            ?
            "bg-red-400"
            :
            ''
            :
            ''
            ,
            //taken && 'bg-lime-100',
           // ward.status === "disabled" && 'bg-gray-200'
          )}
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
}