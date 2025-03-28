"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
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
import { useEffect, useMemo, useState } from "react"
import { IFArray, IZhus } from "../page"
import { DepartmentTable } from "./departmentTable"
import ZhusTableRowTest from "./zhusTableRowTest"

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
    onChangeComment,
    onFetchData,
  } : {
    finalArr: IFArray[]
    onChangeComment: (id: number, comment: string) => Promise<string | number>
    onFetchData: (url: string) => Promise<IZhus[]>
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
  //перекидывать состояние в нижний стэйт
  const [subRow, setSubRow] = useState<{id: string;logs:IZhus[]}>()
  useEffect(() => {
    if(onFitFinalArrToTable(finalArr))
      setFinal(onFitFinalArrToTable(finalArr))
  },[finalArr])
  //чтобы при открытии других закрывалась та что открыта
  const columns = useMemo<ColumnDef<IFinal>[]>(
    () => [
      {
        accessorKey: 'department',
        header: () => 'Отделение',
        cell: ({ row }) => (
          <div style={{paddingLeft: `${row.depth * 2}rem`}} >
            <div className="text-start font-medium" >
              {row.getValue<IZhus[]>('logs').length > 0
              ?
              <button
                onClick={row.getToggleExpandedHandler()}
                {...{
                  style: { cursor: 'pointer' },
                }}
              >
                {row.getCanExpand()
                ?
                <>{row.getValue('department')}</>
                : 
                ''
                }
              </button>
            :
            row.getValue('department')
            }
            </div>
          </div>
        ),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'collapse',
        header: () => 'Падение',
        cell: ({row, cell}) => (
          <div className="select-none" onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('collapse')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('pressureSores')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('identificationOfThePatientsIdentity')})}>
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
        cell: ({row, cell}) => (
          <div  onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('anEventRelatedToAMedicalDeviceOrProduct')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('aDrugRelatedEvent')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('infectiousOrParasiticDisease')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('iSMP')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('surgicalComplications')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('anotherUndesirableEvent')})}>
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
        cell: ({row, cell}) => (
          <div onClick={() =>  setSubRow({id: cell.id, logs: row.getValue('logs')})}>
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
    <div className="">
      <div className="rounded-md border mt-6 ">
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
                <ZhusTableRowTest key={row.id} row={row} onChangeComment={onChangeComment} onFetchData={onFetchData}/>
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
          <TableFooter className=" text-base bg-primary">
        <TableRow>
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
            {/*isFinal.reduce((dep, 0) => {

            })*/}
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

export
  const renderSubComponent = (
    {
      row,
      onChangeComment,
      onFetchData
    } : {
      row: IZhus[]
      onChangeComment: (id: number, comment: string) => Promise<string | number>
      onFetchData: (url: string) => Promise<IZhus[]>
    }
) => {
  return (
    <div style={{ fontSize: '10px' }}>
      <DepartmentTable logs={row} onChangeComment={onChangeComment} onFetchData={onFetchData}/>
    </div>
  )
}