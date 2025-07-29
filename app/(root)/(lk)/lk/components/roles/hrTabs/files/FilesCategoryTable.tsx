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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileCategory, SubFileCategory } from "@prisma/client"
import { HiTrash } from "react-icons/hi2"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import toast from "react-hot-toast"
import axios from "axios"
import FilesCategoryEdit from "./FilesCategoryEdit"
import { useState } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
//maybe cool
export
  function FilesCategoryTable(
    {
      categories,
      onGetFilesCategory,
      subcategories,
      onGetSubCategories
    }: {
      categories: FileCategory[]
      onGetFilesCategory: () => Promise<void>
      subcategories: SubFileCategory[]
      onGetSubCategories: () => Promise<void>
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
      accessorKey: "subcategories",
      header: "Подкатегории",
      cell: ({ row }) => 
        {
          let subCat = subcategories.filter((cat) => {
             return row.getValue('id') === cat.fileCategoryId
          }).map((cat) => {
            return <div key={cat.id} className="flex items-center gap-1">{cat.name}
              <Popover>
                <PopoverTrigger>
                  <Button className="w-6 h-6" size={'sm'} variant={'destructive'}>X</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Удаление</h4>
                      <p className="text-sm text-muted-foreground">
                        Вы действительно хотите удалить подкатегорию?
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Button variant={'destructive'} onClick={() => onDeleteSubCategory(cat.id)}>удалить</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          })
          return subCat.length > 0 ? subCat : "нет подкатегорий"
        },
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
      id: "actionsChange",
      enableHiding: false,
      cell: ({ row }) => {

        return <FilesCategoryEdit id={row.getValue('id')} name={row.getValue('name')} onGetFilesCategory={onGetFilesCategory}/>
      },
    },
    {
      id: "actionsDelete",
      enableHiding: false,
      cell: ({ row }) => {

        return (
          <Popover>
            <PopoverTrigger>
              <Button variant={'destructive'}><HiTrash /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Удаление</h4>
                  <p className="text-sm text-muted-foreground">
                    Вы действительно хотите удалить категорию?
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant={'destructive'} onClick={() => onDeleteCategory(row.getValue('id'))}>удалить</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  /**
   * {
        let subCat = subcategories.filter((subcategory) => {
          return row.getValue('id') === subcategory.fileCategoryId
        });
        subCat.length > 0 
        ?
        <ul>
          <li></li>
        </ul>
        :
        'нет подкатегорий'
        }
   */

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  let onDeleteCategory = async (categoryId: number) => {
    const postData = { id: categoryId }

    const result = await axios.delete('/api/uploadFiles/filesCategoryHr', { data: postData })
    if (result.statusText === "OK") {
      toast.success('категория удалена')
      onGetFilesCategory()
      onGetSubCategories()
    } else {
      toast.error('Ошибка при удалении категории')
    }
  }

  let onDeleteSubCategory = async (subCategoryId: number) => {
    const postData = { id: subCategoryId }

    const result = await axios.delete('/api/uploadFiles/subFilesCategoryHr', { data: postData })
    if (result.statusText === "OK") {
      toast.success('подкатегория удалена')
      onGetFilesCategory()
      onGetSubCategories()
    } else {
      toast.error('Ошибка при удалении подкатегории')
    }
  }

 

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
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
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