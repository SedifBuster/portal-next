'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { IZhus } from "../page"
import ZhusTableHead from "./zhusTableHead"
import ZhusTableRow from "./zhusTableRow"
import { TableTest } from "./tableTest"
import { useEffect, useState } from "react"

export
  function ZhusTable({
    onFetchData
  }: {
    onFetchData: IZhus[]
  }
) {

  //names from deparments
  let depsNamesArr: string[] = []
  ///filter by department name
  const onFilterDataByDep = (data: IZhus[], dep: string) => {

    console.log("dep", dep)
    console.log("data", data)
    //TODO НАПИСАТЬ ФУНКЦИЮ ФИЛЬТРА ПО ОТДЕЛЕНИЮ

    return {department: dep, logs: [...data.filter(log => log.department === dep)]}
  }

 
  //...
  const onSetDepsNames = (data: IZhus[]) => {
    const namesSet = new Set<string>()
    for(let i = 0; i < data.length; i++) {
      namesSet.add(data[i].department)
    }
   return depsNamesArr = Array.from(namesSet)
  }
  //
  onSetDepsNames(onFetchData)
  //so final array...
  const onSetDeps = () => {
    let arr = []
    for(let i = 0; i < depsNamesArr.length; i++) {
      //console.log(onFilterDataByDep(onFetchData, depsNamesArr[i]))
      arr.push(onFilterDataByDep(onFetchData, depsNamesArr[i])) 
    }
    return arr
  }
  let finalArr = onSetDeps()

 // console.log(finalArr)

  return (
      <TableTest finalArr={finalArr}/>
    )
}

//old2
/**
 <Table>
      <TableCaption>Лист нежелательных событий.</TableCaption>
      <ZhusTableHead />
      <TableBody>
        {
          finalArr
          ?
          finalArr.map((task: {department: string; logs: IZhus[] }, index) => {
            return <ZhusTableRow key={task.department} rowData={task}/>                                              //<> </>
              }
            )
            :
            'Случаев не найдено'
        }
      </TableBody>
    {
      finalArr
      //in the end
      ?
      <TableFooter>
        <TableRow>
          <TableCell>Итого</TableCell>
          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Падение'
                                                || log.event === 'Collapse').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Пролежни'
                                                || log.event === 'PressureSores').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Идентификация личности пациента'
                                                || log.event === 'IdentificationOfThePatientsIdentity').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                                                || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                                              || log.event === 'Событие, связанное с лекарственным средством'
                                                              || log.event === 'ADrugRelatedEvent').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                                || log.event === 'InfectiousOrParasiticDisease').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                                || log.event === 'ISMP').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                                || log.event === 'SurgicalComplications').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                                || log.event === 'AnotherUndesirableEvent').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.length}
          </TableCell>

        </TableRow>
      </TableFooter>
      :
      null
    }
    </Table>

 */

  //old
  /**
   'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { IZhus } from "../page"
import { DepartmentTable } from "./departmentTable"
import { Dispatch, SetStateAction, useState } from "react"
import clsx from "clsx"
import ZhusTableHead from "./zhusTableHead"

export
  function ZhusTable({
    onFetchData
  }: {
    onFetchData: IZhus[]
  }
) {
  {/**поменять тут  то что бы без мусора}
  const namesSet = new Set()
  let depsNamesArr: string[] | unknown[] = []

  const onFilterDataByDep = (data: IZhus[], dep: string | unknown) => {
    let result = data.filter(log => log.department === dep)

    return {department: dep, logs: [...result]}
  }

  const onSetDepsNames = (data: IZhus[]) => {
    for(let i = 0; i < data.length; i++) {
      namesSet.add(data[i].department)
    }
   return depsNamesArr = Array.from(namesSet)
  }

  onSetDepsNames(onFetchData)

  const onSetDeps = () => {
    let arr = []
    for(let i = 0; i < depsNamesArr.length; i++) {
      arr.push(onFilterDataByDep(onFetchData, depsNamesArr[i])) 
    }
    return arr
  }

  let finalArr = onSetDeps()

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

  //bad, maybe exists a better solution
  const onSetupDepName = (dep: string) => {
    switch (dep) {
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
        return dep
    }
  }

  //todo
  //переместить строку таблицы в компоненту и оттуда танцевать
  return (
    <Table>
      <TableCaption>Лист нежелательных событий.</TableCaption>
      <ZhusTableHead />
      <TableBody>
        {
          finalArr
          ?
          finalArr.map((task: any) => {
            const [isOpen, setOpen] = useState<boolean>(false)
            const [isDepFilter, setDepFilter] = useState<IZhus[]>()

            let reabEng = finalArr.filter(log => log.department === "Reabilitation")[0]
            if(reabEng)
              if(task.department === "Реабилитация")
                task.logs = [...task.logs,...reabEng.logs]

            let OPMP = finalArr.filter(log => log.department === "ОПМП")[0]
            if(OPMP)
              if(task.department === "ОПП")
                task.logs = [...task.logs, ...OPMP.logs]

            if(task.department !== 'ОПМП' && task.department !== 'Reabilitation')

            return<> <TableRow  key={task.department}>

                <TableCell className="font-medium">
                  {onSetupDepName(task.department)}
                </TableCell>



                <TableCell
                  className={
                    clsx("text-center hover:bg-green-600 hover:text-white cursor-pointer",
                      isDepFilter && isDepFilter[0]? isDepFilter[0].event === 'Падение' && 'bg-green-600 text-white' : '')}
                  onClick={() => 
                    onClickCell(task.logs.filter((log: IZhus) => log.event === 'Падение' || log.event === 'Collapse'),
                      setDepFilter, isOpen, setOpen)
                  }
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Падение' || log.event === 'Collapse').length}
                </TableCell>



                <TableCell
                  className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() =>
                    onClickCell(task.logs.filter((log: IZhus) => log.event === 'Пролежни' || log.event === 'PressureSores'),
                      setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Пролежни' || log.event === 'PressureSores').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() =>
                    onClickCell(task.logs.filter(
                      (log: IZhus) => log.event === 'Идентификация личности пациента'
                                      || log.event === 'IdentificationOfThePatientsIdentity'),
                      setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter(
                    (log: IZhus) => log.event === 'Идентификация личности пациента'
                                    || log.event === 'IdentificationOfThePatientsIdentity').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() =>
                    onClickCell(task.logs.filter(
                      (log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                                      || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct'),
                        setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter(
                    (log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                                    || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                    || log.event === 'Событие, связанное с лекарственным средством'
                    || log.event === 'ADrugRelatedEvent'
                  ), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                                    || log.event === 'Событие, связанное с лекарственным средством'
                                                    || log.event === 'ADrugRelatedEvent').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                                                              || log.event === 'InfectiousOrParasiticDisease'
                  ), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                                    || log.event === 'InfectiousOrParasiticDisease').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                                                              || log.event === 'ISMP'
                  ), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                                    || log.event === 'ISMP').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                                                              || log.event === 'SurgicalComplications'
                  ), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                                    || log.event === 'SurgicalComplications').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                                                              || log.event === 'AnotherUndesirableEvent'
                  ), setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                                    || log.event === 'AnotherUndesirableEvent').length}
                </TableCell>



                <TableCell className="text-center hover:bg-green-600 hover:text-white cursor-pointer"
                  onClick={() => onClickCell(task.logs, setDepFilter, isOpen, setOpen)}
                >
                  {task.logs.length}
                </TableCell>

              </TableRow>
            </>
              {
                !isOpen
                
                ?
                <DepartmentTable logs={isDepFilter}/>
                :
                null
              }
            
              }
            )
            :
            'Случаев не найдено'
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Итого</TableCell>
          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Падение'
                                                || log.event === 'Collapse').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Пролежни'
                                                || log.event === 'PressureSores').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Идентификация личности пациента'
                                                || log.event === 'IdentificationOfThePatientsIdentity').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связаное с медицинским оборудованием или изделием'
                                                || log.event === 'AnEventRelatedToAMedicalDeviceOrProduct').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Событие, связанное с лекартсвенным средством'
                                                              || log.event === 'Событие, связанное с лекарственным средством'
                                                              || log.event === 'ADrugRelatedEvent').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Инфекционное или паразитарное заболевание'
                                                || log.event === 'InfectiousOrParasiticDisease').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'ИСМП (инфекции, связанные с медицинской помощью)'
                                                || log.event === 'ISMP').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Хирургические осложнения'
                                                || log.event === 'SurgicalComplications').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.filter((log: IZhus) => log.event === 'Другое нежелательное событие'
                                                || log.event === 'AnotherUndesirableEvent').length}
          </TableCell>

          <TableCell className="text-center">
            {onFetchData.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    )
  }
   */