"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Fragment, useEffect, useMemo, useState } from "react"
import { IFArray, IZhus } from "../page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DepartmentTable } from "./departmentTable"


interface IFinal {
  department: string,
  logs: IZhus[],
  collapse: IZhus[],
  pressureSores: IZhus[],
  identificationOfThePatientsIdentity: IZhus[],
  anEventRelatedToAMedicalDeviceOrProduct: IZhus[],
  aDrugRelatedEvent: IZhus[],
  infectiousOrParasiticDisease: IZhus[],
  iSMP: IZhus[],
  surgicalComplications: IZhus[],
  anotherUndesirableEvent: IZhus[],
}

export function TableTest(
  {
    finalArr,
  } : {
    finalArr: IFArray[]
  }
) {

//change data to table fit data
  const onFitFinalArrToTable = (arr: IFArray[]) => {
    return arr.map((row) => {
      return {
        ...row,
        collapse: row.logs.filter((log) => log.event === 'Падение' || log.event === 'Collapse'),
        pressureSores: row.logs.filter((log) => log.event === 'Пролежни' || log.event === 'PressureSores'),
        identificationOfThePatientsIdentity: row.logs.filter((log) => log.event === 'Идентификация личности пациента' || log.event === 'IdentificationOfThePatientsIdentity'),
        anEventRelatedToAMedicalDeviceOrProduct: row.logs.filter((log) => log.event === 'Событие, связаное с медицинским оборудованием или изделием' || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct'),
        aDrugRelatedEvent: row.logs.filter((log) => log.event === 'Событие, связанное с лекартсвенным средством' || log.event === 'Событие, связанное с лекарственным средством' || log.event === 'ADrugRelatedEvent'),
        infectiousOrParasiticDisease: row.logs.filter((log) => log.event === 'Инфекционное или паразитарное заболевание' || log.event === 'InfectiousOrParasiticDisease'),
        iSMP: row.logs.filter((log) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)' || log.event === 'ISMP'),
        surgicalComplications: row.logs.filter((log) => log.event === 'Хирургические осложнения' || log.event === 'SurgicalComplications'),
        anotherUndesirableEvent: row.logs.filter((log) => log.event === 'Другое нежелательное событие' || log.event === 'AnotherUndesirableEvent'),
      }
    })
  }
  const [isFinal, setFinal] = useState<IFinal[]>([])
  const [subRow, setSubRow] = useState<IZhus[]>()
  useEffect(() => {
    if(onFitFinalArrToTable(finalArr))
      setFinal(onFitFinalArrToTable(finalArr))
  },[finalArr])

  //console.log(isFinal)

    //bad, maybe exists a better solution
  const onSetupDepNameToRu = (depName: string) => {
        switch (depName) {
          case 'Surgical':
            return 'Хирургия'
          case 'Pulmonology':
            return 'Пульмонология'
          case 'Policlinic':
            return 'Поликлиника'
          case 'Therapeutic':
            return 'Терапия'
          case 'Reception':
            return 'Приемное'
          case 'Neurology':
            return 'Неврология'
          case 'Rehabilitation':
            return 'Реабилитация'
          case 'Laboratory':
            return 'Лаборатория'
          case 'Xray':
            return 'Рентгенология'
          case 'Reanimation':
            return 'Реанимация'
          case 'Administration':
            return 'Администрация'
          case 'Opp':
            return 'ОПП'
          case 'Pao':
            return 'ПАО'
          case 'Ceo':
            return 'СЭО'
          case 'Aho':
            return 'АХО' 
          default:
            return depName
        }
  }

  const columns = useMemo<ColumnDef<IFinal>[]>(
    () => [
      {
        accessorKey: 'department',
        header: ({ table }) => (
          <>
            Отделение
          </>
        ),
        cell: ({ row}) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            <div className="text-start font-medium " onClick={() =>  setSubRow(row.getValue('logs'))}>
            {row.getValue<IZhus[]>('logs').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {onSetupDepNameToRu(row.getValue('department'))}
                </>
                : 
                ''
              }
            </button>
            :
            onSetupDepNameToRu(row.getValue('department'))
            }
{/*            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                //onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {onSetupDepNameToRu(row.getValue('department'))}
                {/*console.log(row._getAllCellsByColumnId())}
                {/*console.log(cell.getValue())/}
                </>
                : 
                ''
              </div>}

            </button>*/}
            </div>
          </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'collapse',
        header: () => 'Падение',
        cell: ({row}) => (
             <div className="select-none" onClick={() =>  setSubRow(row.getValue('collapse'))}>
            {row.getValue<IZhus[]>('collapse').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('collapse').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('collapse').length
            }
              </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'pressureSores',
        header: () => 'Пролежни',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('pressureSores'))}>
            {row.getValue<IZhus[]>('pressureSores').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('pressureSores').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('pressureSores').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'identificationOfThePatientsIdentity',
        header: () => 'Идентификация личности пациента',
        cell: ({row}) => (
           <div onClick={() =>  setSubRow(row.getValue('identificationOfThePatientsIdentity'))}>
            {row.getValue<IZhus[]>('identificationOfThePatientsIdentity').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('identificationOfThePatientsIdentity').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('identificationOfThePatientsIdentity').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'anEventRelatedToAMedicalDeviceOrProduct',
        header: () => 'Событие, связанное с медицинским оборудованием или изделием',
        cell: ({row}) => (
          <div  onClick={() =>  setSubRow(row.getValue('anEventRelatedToAMedicalDeviceOrProduct'))}>
           {row.getValue<IZhus[]>('anEventRelatedToAMedicalDeviceOrProduct').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('anEventRelatedToAMedicalDeviceOrProduct').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('anEventRelatedToAMedicalDeviceOrProduct').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'aDrugRelatedEvent',
        header: () => 'Событие, связанное с лекарственным средством',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('aDrugRelatedEvent'))}>
          {row.getValue<IZhus[]>('aDrugRelatedEvent').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('aDrugRelatedEvent').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('aDrugRelatedEvent').length
            }

            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'infectiousOrParasiticDisease',
        header: () => 'Инфекционное или паразитарное заболевание',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('infectiousOrParasiticDisease'))}>
          {row.getValue<IZhus[]>('infectiousOrParasiticDisease').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('infectiousOrParasiticDisease').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('infectiousOrParasiticDisease').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'iSMP',
        header: () => 'ИСМП (инфекции, связанные с медицинской помощью)',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('iSMP'))}>
          {row.getValue<IZhus[]>('iSMP').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('iSMP').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('iSMP').length
            }
           
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'surgicalComplications',
        header: () => 'Хирургические осложнения',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('surgicalComplications'))}>
           {row.getValue<IZhus[]>('surgicalComplications').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('surgicalComplications').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('surgicalComplications').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'anotherUndesirableEvent',
        header: () => 'Другое',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('anotherUndesirableEvent'))}>
           {row.getValue<IZhus[]>('anotherUndesirableEvent').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('anotherUndesirableEvent').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('anotherUndesirableEvent').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'logs',
        header: () => 'Всего',
        cell: ({row}) => (
          <div onClick={() =>  setSubRow(row.getValue('logs'))}>
           {row.getValue<IZhus[]>('logs').length > 0
            ?
            <button
              onClick={row.getToggleExpandedHandler()}
              {...{
                style: { cursor: 'pointer' },
              }}
            >
              {row.getCanExpand()? 
                <>
                {row.getValue<string>('logs').length}
                </>
                : 
                ''
              }
            </button>
            :
            row.getValue<string>('logs').length
            }
            </div>
        ),
        footer: props => props.column.id,
      },
    ],
    []
  )
  const [expanded, setExpanded] = useState<ExpandedState>({})


  const onChangeComment = (id: number, text: string) => {
    //api logic
  }

  const table = useReactTable({
    data: isFinal,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
  })

  return (
    <div className="w-full ">
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
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
                <Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <tr>
                    {/* 2nd row is a custom 1 cell row */}
                    {/*console.log(row._getAllCellsByColumnId())*/}
                    <td colSpan={row.getVisibleCells().length}>
                      {subRow && subRow?.length > 0
                      ?
                      renderSubComponent({ row: subRow })
                      :
                      null
                    }
                    </td>
                  </tr>
                )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
        <TableRow className="bg-gray-200">
          <TableCell>Итого</TableCell>
          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.collapse.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.pressureSores.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.identificationOfThePatientsIdentity.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.anEventRelatedToAMedicalDeviceOrProduct.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.aDrugRelatedEvent.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.infectiousOrParasiticDisease.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.iSMP.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.surgicalComplications.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {isFinal.reduce((accum, curr) => accum + curr.anotherUndesirableEvent.length, 0)}
          </TableCell>

          <TableCell className="text-center">
            {/**neeed refactor */}
            {isFinal.length}
          </TableCell>
        </TableRow>
      </TableFooter>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
      </div>
    </div>
  )
}

const renderSubComponent = ({ row }: { row: IZhus[]/*Row<IFinal>*/; arrName?: string }) => {
  return (
    <div style={{ fontSize: '10px' }}>
      <DepartmentTable logs={row} />
    </div>
  )
}

//<code>{JSON.stringify(row.original, null, 2)}</code>
//<DepartmentTable logs={row.getValue(arrName)} />
////<code>{JSON.stringify(row.getValue('logs'), null, 2)}</code>
/**
 
  function Filter({
    column,
    table,
  }: {
    column: Column<any, any>
    table: any
  }) {
    const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id)
  
    const columnFilterValue = column.getFilterValue()
  
    return typeof firstValue === 'number' ? (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
    ) : (
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="w-36 border shadow rounded"
      />
    )
  }
 */