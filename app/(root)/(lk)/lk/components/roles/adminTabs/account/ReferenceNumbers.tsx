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
import { ReferenceNumbers } from "@prisma/client"
import { HiTrash } from "react-icons/hi2"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import toast from "react-hot-toast"
import axios from "axios"
import { format } from "date-fns"
import ru from "date-fns/locale/ru";
import ReferenceChangePopover from "./accountComponents/ReferenceChangePopover"


export
  function ReferenceNumbersPage(
    {
      referenceNumbers,
      onGetReferenceNumbers
    }: {
      referenceNumbers: ReferenceNumbers[]
      onGetReferenceNumbers: () => Promise<void>
    }
) {

    /*place           String?
    department      String?
    number          String?
    internalNumber  String?
    operator        String?
    responsible     String?
    deviceType      String?
    deviceModel     String?
    note            String?
    forwarding      String?
    connected       String?
    status          String? */

  const columns: ColumnDef<ReferenceNumbers>[] = [
    {
      accessorKey: "id",
      header: "id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "department",
      header: () => <div className="text-right">Отделение</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("department")}</div>
      },
    },
    {
      accessorKey: "place",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Где установлено
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("place")}</div>,
    },
    {
      accessorKey: "number",
      header: "Номер телефона",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("number")}</div>
      ),
    },
    {
      accessorKey: "internalNumber",
      header: "Внутренний номер",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("internalNumber")), "PPP", {locale: ru})}</div>
      ),
    },
    {
      accessorKey: "operator",
      header: "Оператор",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("operator")), "PPP", {locale: ru})}</div>
      ),
    },
    {
      accessorKey: "responsible",
      header: "Ответственное лицо",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("responsible")), "PPP", {locale: ru})}</div>
      ),
    },
    {
      accessorKey: "deviceType",
      header: "Тип устройства",
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("deviceType")), "PPP", {locale: ru})}</div>
      ),
    },
      {
        accessorKey: "deviceModel",
        header: "Модель устройства",
        cell: ({ row }) => (
          <div className="capitalize">{format(new Date(row.getValue("deviceModel")), "PPP", {locale: ru})}</div>
        ),
      },
      {
        accessorKey: "note",
        header: "Примечание",
        cell: ({ row }) => (
          <div className="capitalize">{format(new Date(row.getValue("note")), "PPP", {locale: ru})}</div>
        ),
      },
      {
        accessorKey: "forwarding",
        header: "Переадресация на сотовый",
        cell: ({ row }) => (
          <div className="capitalize">{format(new Date(row.getValue("forwarding")), "PPP", {locale: ru})}</div>
        ),
      },
      {
        accessorKey: "connected",
        header: "Подключено/изменение(дата)",
        cell: ({ row }) => (
          <div className="capitalize">{format(new Date(row.getValue("connected")), "PPP", {locale: ru})}</div>
        ),
      },
      
      {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => (
          <div className="capitalize">{format(new Date(row.getValue("status")), "PPP", {locale: ru})}</div>
        ),
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
      //format the date
      cell: ({ row }) => (
        <div className="capitalize">{format(new Date(row.getValue("updatedAt")), "PPP", {locale: ru})}</div>
      ),
    },
    {
      id: "actionsChange",
      enableHiding: false,
      cell: ({ row }) => {
        return <ReferenceChangePopover row={row}/>//(
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
                    Вы действительно хотите удалить номер?
                  </p>
                </div>
                <div className="grid gap-2">
                  <Button variant={'destructive'} onClick={() => onDeleteReferenceNumber(row.getValue('id'))}>удалить</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )
      },
    },
  ]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  let onChangeUser = async (id: number) => {
    console.log(id)
    toast.error('еще не реализовано')
  }

  let onDeleteReferenceNumber = async (numberId: number) => {
    const postData = { id: numberId }

    const result = await axios.delete('/api/referenceNumbers', { data: postData })
    if (result.statusText === "OK") {
      toast.success('пользователь удален')
      onGetReferenceNumbers()
    } else {
      toast.error('Ошибка при удалении номера')
    }
  }

  const table = useReactTable({
    data: referenceNumbers,
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
          placeholder="Фильтр по отделению..."
          value={(table.getColumn("department")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("department")?.setFilterValue(event.target.value)
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
                  Нет результатов.
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