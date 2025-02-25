"use client"

import { TableCell, TableRow } from "@/components/ui/table"
import clsx from "clsx"
import { IZhus } from "../page"
import { Dispatch, SetStateAction, useState } from "react"
import { DepartmentTable } from "./departmentTable"

export
  default function ZhusTableRow(
{
    rowData
}: {
    rowData: {department: string; logs: IZhus[] }
}
) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isDepFilter, setDepFilter] = useState<IZhus[]>()
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
  //on click cell show the subtable
  //need fix?
  const onClickCell = (
    trigger: boolean,
    logs: IZhus[],
    onChangeTrigger: Dispatch<SetStateAction<boolean>>,
    onChangeLogs: Dispatch<SetStateAction<IZhus[] | undefined>>
    ) => {

    if(trigger) {
      onChangeTrigger(!trigger)
      onChangeLogs([])
    }
    else {
      if(logs.length !== 0)
      onChangeTrigger(true)
      onChangeLogs(logs)
    }
  }

  return <TableRow >
      <TableCell className="font-medium">
        {onSetupDepNameToRu(rowData.department)}
      </TableCell>

    <TableCell
      className={
        clsx("text-center hover:bg-green-600 hover:text-white cursor-pointer",
          isDepFilter && isDepFilter[0]? isDepFilter[0].event === 'Падение' && 'bg-green-600 text-white' : '')}
      onClick={() => 
        onClickCell(
            isOpen,
            rowData.logs.filter((log: IZhus) => log.event === 'Падение' || log.event === 'Collapse'),
            setOpen,
            setDepFilter
            )
      }
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Падение' || log.event === 'Collapse').length}
    </TableCell>



    <TableCell
      className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() =>
        onClickCell(
          isOpen,
          rowData.logs.filter((log: IZhus) => log.event === 'Пролежни' || log.event === 'PressureSores'),
          setOpen,
          setDepFilter,
          )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Пролежни' || log.event === 'PressureSores').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() =>
        onClickCell(
          isOpen,
          rowData.logs.filter(
          (log: IZhus) => log.event === 'Идентификация личности пациента'
                          || log.event === 'IdentificationOfThePatientsIdentity'),
          setOpen,
          setDepFilter
        )}
    >
      {rowData.logs.filter(
        (log: IZhus) => log.event === 'Идентификация личности пациента'
                        || log.event === 'IdentificationOfThePatientsIdentity').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() =>
        onClickCell(
          isOpen,
          rowData.logs.filter(
          (log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                          || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct'),
          setOpen,
          setDepFilter
        )}
    >
      {rowData.logs.filter(
        (log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                        || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
        || log.event === 'Событие, связанное с лекарственным средством'
        || log.event === 'ADrugRelatedEvent'
        ),
        setOpen,
        setDepFilter
      )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                        || log.event === 'Событие, связанное с лекарственным средством'
                                        || log.event === 'ADrugRelatedEvent').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                                                  || log.event === 'InfectiousOrParasiticDisease'
        ),
        setOpen,
        setDepFilter
      )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                        || log.event === 'InfectiousOrParasiticDisease').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                                                  || log.event === 'ISMP'
        ),
        setOpen,
        setDepFilter
      )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                        || log.event === 'ISMP').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                                                  || log.event === 'SurgicalComplications'
        ),
        setOpen,
        setDepFilter
      )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                        || log.event === 'SurgicalComplications').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                                                  || log.event === 'AnotherUndesirableEvent'
        ),
        setOpen,
        setDepFilter
       )}
    >
      {rowData.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                        || log.event === 'AnotherUndesirableEvent').length}
    </TableCell>



    <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
      onClick={() => onClickCell(
        isOpen,
        rowData.logs,
        setOpen,
        setDepFilter
      )}
    >
      {rowData.logs.length}
    </TableCell>
    
  </TableRow>
  {
                isOpen && isDepFilter
                
                ?

                ''//<DepartmentTable logs={isDepFilter}/>
                :
                null
              }
}