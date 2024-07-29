"use client"

import * as React from "react"
import {
    Row,
  flexRender,
} from "@tanstack/react-table"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

export
  function DashItemRow({
    row,
  }: {
    row: Row<any>,
  }) {

  return (
    <TableRow
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
  )
}