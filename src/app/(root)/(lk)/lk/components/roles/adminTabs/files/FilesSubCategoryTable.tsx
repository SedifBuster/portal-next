"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"


import { FileCategory } from "@prisma/client"
import { useState } from "react"

import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { ControllerRenderProps } from "react-hook-form"
import { Button } from "@/src/shared/ui/button"
import { Checkbox } from "@/src/shared/ui/checkbox"
import { Input } from "@/src/shared/ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/src/shared/ui/table"
import { Table } from "lucide-react"
//maybe cool
export
  function FilesSubCategoryTable(
    {
      categories,
      field
    }: {
      categories: FileCategory[]
      field: ControllerRenderProps<{
        name: string;
        category: any;
    }, "category">
    }
) {


  const columns: ColumnDef<FileCategory>[] = [
    {
      accessorKey: "id",
      header: "id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Название
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Дата создания",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("createdAt")), "PPP", {locale: ru})}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Дата посл. изменения",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("updatedAt")), "PPP", {locale: ru})}</div>
      ),
    },
    {
        id: "select",
        header: "выбрать",
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {row.toggleSelected(!!value); console.log(row.original, field); field.onChange(row.original)}}
            aria-label="Select row"//тут выбрать только одну, апи проверить сделать, добавить в таблицу категорий, добавить в базу знаний
          />
        ),//<FilesCategoryEdit id={row.getValue('id')} name={row.getValue('name')} onGetFilesCategory={onGetFilesCategory}/>
        enableSorting: false,
        enableHiding: false,
      },
  ]

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: categories,
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

  return (
    <div className="w-[50vw]">
      <div className="flex items-center py-4 px-1">
        <Input
          placeholder="Фильтр названий..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Предыдущая
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Следующая
          </Button>
        </div>
      </div>
    </div>
  )
}