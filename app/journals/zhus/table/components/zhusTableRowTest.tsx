
import {
  flexRender,
  Row,
} from "@tanstack/react-table"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Fragment, useState } from "react"
import { IZhus } from "../page"
import { renderSubComponent } from "./tableTest"

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

export
  default function ZhusTableRowTest(
  {
    row,
    onChangeComment,
    onFetchData,
  }: {
    row: Row<IFinal>
    onChangeComment: (id: number, comment: string) => Promise<string | number>
    onFetchData: (url: string) => Promise<IZhus[]>
  }
) {

  const [isSubRow, setIsSubRow] = useState<IZhus[]>()

  const onSetCellId = (cellId: string) => {
  let result = cellId.split("_").reverse()[0]

  if(result === 'department') return 'logs'
  else return result
    //url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")

  }

  return <Fragment key={row.id}>
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
    >
      {//вот тут саб роу обработчик и отдельный компонент табл роу
      row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="text-center" onClick={() => setIsSubRow(row.getValue(onSetCellId(cell.id)))}>
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
          
          {isSubRow && isSubRow?.length > 0
          ?
          renderSubComponent({ row: isSubRow, onChangeComment, onFetchData})
          :
          null
        }
        </td>
      </tr>
    )}
    </Fragment>
  }