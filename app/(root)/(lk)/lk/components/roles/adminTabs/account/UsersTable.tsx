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

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { User } from "@prisma/client"
import { HiPencil, HiTrash } from "react-icons/hi2"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import toast from "react-hot-toast"
import axios from "axios"





export
  function UsersTable(
    {
      users,
      onGetUsers
    }: {
      users: User[]
      onGetUsers: () => Promise<void>
    }
) {

   const columns: ColumnDef<User>[] = [
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
                ФИО
              </Button>
            )
          },
          cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
          accessorKey: "role",
          header: () => <div className="text-right">Роль</div>,
          cell: ({ row }) => {
            const amount = parseFloat(row.getValue("role"))
      
            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)
      
            return <div className="text-right font-medium">{/*formatted*/row.getValue("role")}</div>
          },
        },
        {
          accessorKey: "login",
          header: "Логин",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("login")}</div>
          ),
        },
        {
          accessorKey: "createdAt",
          header: "Дата создания",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("createdAt")}</div>
          ),
        },
        {
          accessorKey: "updatedAt",
          header: "Дата посл. изменения",
          cell: ({ row }) => (
            <div className="capitalize">{row.getValue("updatedAt")}</div>
          ),
        },
        {
          id: "actionsChange",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original
      
            return (
              <Button variant={'outline'} onClick={onChangeUser}><HiPencil /></Button>
            )
          },
        },
        {
          id: "actionsDelete",
          enableHiding: false,
          cell: ({ row }) => {
            const payment = row.original
      
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
                              Вы действительно хотите удалить пользователя?
                            </p>
                          </div>
                          <div className="grid gap-2">
                            <Button variant={'destructive'} onClick={() => onDeleteUser(row.getValue('id'))}>удалить</Button>
                          </div>
                        </div>
                      </PopoverContent>
            </Popover>
            )
          },
        },
      ]
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  let onChangeUser = async () => {
    toast.error('еще не реализовано')
  }
  let onDeleteUser = async (userId: number) => {
    const postData = { id: userId }

    const result = await axios.delete('/api/users', { data: postData })
    if (result.statusText === "OK") {
      toast.success('пользователь удален')
      onGetUsers()
    } else {
      toast.error('Ошибка при удалении пользователя')
    }
  }



  const table = useReactTable({
    data: users,
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}