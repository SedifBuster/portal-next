"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import { flexRender, Row } from "@tanstack/react-table"
import { ZnoLog } from "@prisma/client"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export
  default function ZnoTableRow ({
    row
  } : {
    row: Row<ZnoLog>
  }) {

  return <TableRow
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
}