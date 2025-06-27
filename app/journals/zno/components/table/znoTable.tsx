"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import ZnoTableHead from "./znoTableHead"
import { ru } from "date-fns/locale"
import { format } from "date-fns"
import ZnoRowCreateNew from "./znoRowCreateNew"
import { Localization, StatusZno, ZnoLog } from "@prisma/client"
import ZnoTableRow from "./znoTableRow"
import { useSession } from "next-auth/react"
import { HiMiniXMark, HiOutlineCheck,} from "react-icons/hi2";
import ZnoRowChange from "./znoRowChange"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@radix-ui/react-dropdown-menu"

export interface UnitLocalization {
    value: Localization,
    text: string,
} 

export interface UnitStatus {
    value: StatusZno,
    text: string
}

const localisations: UnitLocalization[] = [
    {
      value: 'ZNOOfTheLipOropharynx',
      text: "ЗНО ГУБЫ (МКБ-10: С00), РОТОГЛОТКИ (МКБ 10:С01, С02.4, C05.1, С05.2, C09, C10), ПОЛОСТИ РТА (МКБ 10:C02.0, C02.1, C02.2, C02.3, C02.8, C02.9, С03, С04, C05.0, С06)"
    },
    {
      value: 'MalignancyOfTheEsophagusCardia',
      text: "ЗНО ПИЩЕВОДА, КАРДИИ (МКБ-10: С15, С16.0)"
    },
    {
      value: 'ZNOStomachCancer',
      text: "ЗНО ЖЕЛУДКА  (МКБ-10: С16)"
    },
    {
      value: 'MalignancyOfTheColonRectoSigMoidJointRectumAnusAnal',
      text: "ЗНО ОБОДОЧНОЙ КИШКИ, РЕКТО-СИГМОИДНОГО СОЕДИНЕНИЯ, ПРЯМОЙ КИШКИ, ЗАДНЕГО ПРОХОДА (АНУСА) И АНАЛЬНОГО КАНАЛА  (МКБ-10: С18, С19, С20, С21)"
    },
    {
      value: 'CancerOfTheLiverAndIntraheraticBileDucts',
      text: "ЗНО ПЕЧЕНИ И ВНУТРИПЕЧЕНОЧНЫХ ЖЕЛЧНЫХ ПРОТОКОВ  (МКБ-10: С22)"
    },
    {
      value: 'OncologyOfTheBiliarySystem',
      text: "ЗНО ЖЕЛЧЕВЫВОДЯЩЕЙ СИСТЕМЫ (МКБ-10: С22.1, С23, С24.0)"
    },
    {
      value: 'PancreaticCancer',
      text: "ЗНО ПОДЖЕЛУДОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С25)"
    },
    {
      value: 'NeuroendocrineTumor',
      text: "НЕЙРОЭНДОКРИНННОЙ ОПУХОЛИ (МКБ-10: C15, C16, C17, C18, C19.9, C20.9, C21, C23, C24, C25, C26, C34, C37.9, C73.9)"
    },
    {
      value: 'LarynxDisease',
      text: "ЗНО ГОРТАНИ  (МКБ-10: С32)"
    },
    {
      value: 'MalignancyOfTheTracheaLungMediastinumAndPleura',
      text: "ЗНО ТРАХЕИ, ЛЕГКОГО, ВИЛОЧКОВОЙ ЖЕЛЕЗЫ, СРЕДОСТЕНИЯ И ПЛЕВРЫ   (МКБ-10: С33, С34, С37, С38)"
    },
    {
      value: 'MelanomasAndMucousMembranes',
      text: "МЕЛАНОМЫ И СЛИЗИСТЫХ ОБОЛОЧЕК  (МКБ-10: C43, C51, C60.9, C63.2, C69.0, C00–C26, C30-C32, C52, C53 C77, C78, C79 D03.0-D03.9)"
    },
    {
      value: 'SquamousCellSkinCarcinomaBasalCellSkinCarcinomaMerkelsCarcinoma',
      text: "ПЛОСКОКЛЕТОЧНОГО РАКА КОЖИ, БАЗАЛЬНО-КЛЕТОЧНОГО РАКА КОЖИ, КАРЦИНОМЫ МЕРКЕЛЯ (МКБ-10: С44, D04)"
    },
    {
      value: 'SoftTissueSarcoma',
      text: "ЗНО САРКОМЫ МЯГКИХ ТКАНЕЙ  (МКБ-10: С 49)"
    },
    {
      value: 'BreastCancer',
      text: "ЗНО МОЛОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С50)"
    },
    {
      value: 'MalignancyOfTheVaulvaVaginaCervix',
      text: "ЗНО ВУЛЬВЫ, ВЛАГАЛИЩА, ШЕЙКИ МАТКИ,  (МКБ-10: С51, С52, С53)"
    },
    {
      value: 'EndometralDisease',
      text: "ЗНО ЭНДОМЕТРИЯ  (МКБ-10: С54)"
    },
    {
      value: 'OvarianCancerBorderlineTumorsNonepithelialTumorsOvarianCancer',
      text: "ЗНО ЯИЧНИКОВ: ПОГРАНИЧНЫЕ ОПУХОЛИ, НЕЭПИТЕЛИАЛЬНЫЕ ОПУХОЛИ, РАК ЯИЧНИКОВ (РАК МАТОЧНОЙ ТРУБЫ), ПЕРВИЧНЫЙ РАК БРЮШИНЫ В ЦАОП (МКБ-10: С56, С48.0, С48.2, С57)"
    },
    {
      value: 'ProstateCancer',
      text: "ЗНО ПРЕДСТАТЕЛЬНОЙ ЖЕЛЕЗЫ  (МКБ-10: С61)"
    },
    {
      value: 'TesticularCancer',
      text: "ЗНО ЯИЧКА  (МКБ-10: С62)"
    },
    {
      value: 'MalignancyOfTheRenalPelvisGlasCase',
      text: "ЗНО ПАРЕНХИМЫ ПОЧКИ, ЛОХАНКИ, ОЧЕТОЧНИКА (МКБ-10: С 64, С65, С66 )"
    },
    {
      value: 'BladderCancer',
      text: "ЗНО МОЧЕВОГО ПУЗЫРЯ  (МКБ-10: С67)"
    },
    {
      value: 'PrimaryTumorsOfTheCentralNervousSystemLimphoma',
      text: "ПЕРВИЧНЫХ ОПУХОЛЕЙ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ-10: С70, С71, С72, С75, С76), ПЕРВИЧНОЙ ЛИМФОМЫ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ 10: С81, С82, С83, С84, С85, С86, С87, С88)"
    },
    {
      value: 'ThyroidCancer',
      text: "ЗНО ЩИТОВИДНОЙ ЖЕЛЕЗЫ (МКБ-10: С73)"
    },
    {
      value: 'ZnoWithoutPrimaryLocalization',
      text: "ЗНО БЕЗ ПЕРВИЧНОЙ ЛОКАЛИЗАЦИИ (МКБ-10: С80)"
    },
    {
      value: 'HodgkinsLymphomaInAdultsFollicularLymphomaInAdults',
      text: "ЛИМФОМА ХОДЖКИНА У ВЗРОСЛЫХ (МКБ-10: С81), ФОЛЛИКУЛЯРНАЯ ЛИМФОМА У ВЗРОСЛЫХ (МКБ-10: С82), НЕХОДЖКИНСКАЯ ЛИМФОМА (МКБ-10: С83)"
    },
]

const statuses: UnitStatus[] = [
  {
    value: "awaitingReferralToCAOP",
    text: "ожидает направления в ЦАОП"
  },
  {
    value: "awaitingReferralToPKOD",
    text: "ожидает направления в ПКОД"
  },
  {
    value: "waitingForAConsultation",
    text: "Ожидает консилиум"
  },
  {
    value: "Completed",
    text: "Завершено"
  },
]

const isDate = (obj: Object) => Object.prototype.toString.call(obj) === '[object Date]';

export function ZnoTable({
    onFetchData,
    onPostData,
    onPatchZno
}: {
    onFetchData: (url: string) => Promise<ZnoLog[]>
    onPostData: (url: string, postData: BodyInit) => Promise<number>
    onPatchZno: (url: string, zno: ZnoLog) => void
}
) {

  const [zno, setZno] = React.useState<ZnoLog[]>([])
  const [isVisibleChange, setVisibleChange] = React.useState<boolean>(false)

  const priorDate = new Date(new Date().setDate(new Date().getDate() - 30))
  const searchValues = [
    {
      value: "name",
      text: "ФИО"
    },
    {
      value: "localization",
      text: "Локализация"
    },
    {
      value: "phoneNumber",
      text: "Телефон"
    },
    {
      value: "numberOfHistory",
      text: "№ истории"
    },
    {
      value: "diagnosisVKB",
      text: "Диагноз ВКБ4"
    },
    /*{
      value: "dateOfReferralToCAOP",
      text: "Дата направления в ЦАОП"
    },
    {
      value: "dateOfVisitToCAOP",
      text: "Дата посещения ЦАОПа"
    },*/
    {
      value: "diagnosisOfCAOP",
      text: "Диагноз ЦАОПа"
    },
    /*{
      value: "dateOfVisitToPKOD",
      text: "Дата посещения ПКОДа"
    },*/
    {
      value: "diagnosisOfPKOD",
      text: "Диагноз ПКОД"
    },
   /* {
      value: "dateOfTheConsultation",
      text: "Дата консилиума"
    },
    {
      value: "dateOfLastCallAndPersonalContact",
      text: "Дата последнего звонка/личный контакт"
    },*/
    {
      value: "status",
      text: "Текущий статус"
    },
    {
      value: "statusNote",
      text: "Текущий статус примечание"
    },
  ]

  const onChangeRuLocalisations = (value: string) => {
    switch (value) {
      case 'ZNOOfTheLipOropharynx':
        return "ЗНО ГУБЫ (МКБ-10: С00), РОТОГЛОТКИ (МКБ 10:С01, С02.4, C05.1, С05.2, C09, C10), ПОЛОСТИ РТА (МКБ 10:C02.0, C02.1, C02.2, C02.3, C02.8, C02.9, С03, С04, C05.0, С06)"
      case 'MalignancyOfTheEsophagusCardia':
        return "ЗНО ПИЩЕВОДА, КАРДИИ (МКБ-10: С15, С16.0)"
      case 'ZNOStomachCancer':
        return "ЗНО ЖЕЛУДКА  (МКБ-10: С16)"
      case 'MalignancyOfTheColonRectoSigMoidJointRectumAnusAnal':
        return "ЗНО ОБОДОЧНОЙ КИШКИ, РЕКТО-СИГМОИДНОГО СОЕДИНЕНИЯ, ПРЯМОЙ КИШКИ, ЗАДНЕГО ПРОХОДА (АНУСА) И АНАЛЬНОГО КАНАЛА  (МКБ-10: С18, С19, С20, С21)"
      case 'CancerOfTheLiverAndIntraheraticBileDucts':
        return "ЗНО ПЕЧЕНИ И ВНУТРИПЕЧЕНОЧНЫХ ЖЕЛЧНЫХ ПРОТОКОВ  (МКБ-10: С22)"
      case 'OncologyOfTheBiliarySystem':
        return "ЗНО ЖЕЛЧЕВЫВОДЯЩЕЙ СИСТЕМЫ (МКБ-10: С22.1, С23, С24.0)"
      case 'PancreaticCancer':
        return "ЗНО ПОДЖЕЛУДОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С25)"
      case 'NeuroendocrineTumor':
        return "НЕЙРОЭНДОКРИНННОЙ ОПУХОЛИ (МКБ-10: C15, C16, C17, C18, C19.9, C20.9, C21, C23, C24, C25, C26, C34, C37.9, C73.9)"
      case 'LarynxDisease':
        return "ЗНО ГОРТАНИ  (МКБ-10: С32)"
      case 'MalignancyOfTheTracheaLungMediastinumAndPleura':
        return "ЗНО ТРАХЕИ, ЛЕГКОГО, ВИЛОЧКОВОЙ ЖЕЛЕЗЫ, СРЕДОСТЕНИЯ И ПЛЕВРЫ   (МКБ-10: С33, С34, С37, С38)"
      case 'MelanomasAndMucousMembranes':
        return "МЕЛАНОМЫ И СЛИЗИСТЫХ ОБОЛОЧЕК  (МКБ-10: C43, C51, C60.9, C63.2, C69.0, C00–C26, C30-C32, C52, C53 C77, C78, C79 D03.0-D03.9)"
      case 'SquamousCellSkinCarcinomaBasalCellSkinCarcinomaMerkelsCarcinoma':
        return "ПЛОСКОКЛЕТОЧНОГО РАКА КОЖИ, БАЗАЛЬНО-КЛЕТОЧНОГО РАКА КОЖИ, КАРЦИНОМЫ МЕРКЕЛЯ (МКБ-10: С44, D04)"
      case 'SoftTissueSarcoma':
        return "ЗНО САРКОМЫ МЯГКИХ ТКАНЕЙ  (МКБ-10: С 49)"
      case 'BreastCancer':
        return "ЗНО МОЛОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С50)"
      case 'MalignancyOfTheVaulvaVaginaCervix':
        return "ЗНО ВУЛЬВЫ, ВЛАГАЛИЩА, ШЕЙКИ МАТКИ,  (МКБ-10: С51, С52, С53)"
      case 'EndometralDisease':
        return "ЗНО ЭНДОМЕТРИЯ  (МКБ-10: С54)"
      case 'OvarianCancerBorderlineTumorsNonepithelialTumorsOvarianCancer':
        return "ЗНО ЯИЧНИКОВ: ПОГРАНИЧНЫЕ ОПУХОЛИ, НЕЭПИТЕЛИАЛЬНЫЕ ОПУХОЛИ, РАК ЯИЧНИКОВ (РАК МАТОЧНОЙ ТРУБЫ), ПЕРВИЧНЫЙ РАК БРЮШИНЫ В ЦАОП (МКБ-10: С56, С48.0, С48.2, С57)"
      case 'ProstateCancer':
        return "ЗНО ПРЕДСТАТЕЛЬНОЙ ЖЕЛЕЗЫ  (МКБ-10: С61)"
      case 'TesticularCancer':
        return "ЗНО ЯИЧКА  (МКБ-10: С62)"
      case 'MalignancyOfTheRenalPelvisGlasCase':
        return "ЗНО ПАРЕНХИМЫ ПОЧКИ, ЛОХАНКИ, ОЧЕТОЧНИКА (МКБ-10: С 64, С65, С66 )"
      case 'BladderCancer':
        return "ЗНО МОЧЕВОГО ПУЗЫРЯ  (МКБ-10: С67)"
      case 'PrimaryTumorsOfTheCentralNervousSystemLimphoma':
        return "ПЕРВИЧНЫХ ОПУХОЛЕЙ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ-10: С70, С71, С72, С75, С76), ПЕРВИЧНОЙ ЛИМФОМЫ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ 10: С81, С82, С83, С84, С85, С86, С87, С88)"
      case 'ThyroidCancer':
        return "ЗНО ЩИТОВИДНОЙ ЖЕЛЕЗЫ (МКБ-10: С73)"
      case 'ZnoWithoutPrimaryLocalization':
        return "ЗНО БЕЗ ПЕРВИЧНОЙ ЛОКАЛИЗАЦИИ (МКБ-10: С80)"
      case 'HodgkinsLymphomaInAdultsFollicularLymphomaInAdults':
        return "ЛИМФОМА ХОДЖКИНА У ВЗРОСЛЫХ (МКБ-10: С81), ФОЛЛИКУЛЯРНАЯ ЛИМФОМА У ВЗРОСЛЫХ (МКБ-10: С82), НЕХОДЖКИНСКАЯ ЛИМФОМА (МКБ-10: С83)"
      default:
        return value
    }
  }

  const onChangeRuStatus = (value: string) => {
    switch (value) {
      case 'awaitingReferralToCAOP':
        return "ожидает направления в ЦАОП"
      case 'awaitingReferralToPKOD':
        return "ожидает направления в ПКОД"
      case 'waitingForAConsultation':
        return "Ожидает консилиум"
      case 'Completed':
        return "Завершено"
      default:
        return value
    }
  }

  const [isRefactoring] = React.useState<boolean>(false)
  const [isSearch, setIsSearch] = React.useState<string>(searchValues[0].value)

  const columns: ColumnDef<ZnoLog>[] = [
    {
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="capitalize ">
         <p className="text-center">{row.getValue('id')}</p>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="capitalize">
          {isDate(row.getValue("createdAt"))
            ?
            format(row.getValue("createdAt"), "PPP", {locale: ru})
            :
            format(new Date(row.getValue("createdAt")), "PPP", {locale: ru})}
        </div>
      ),
    },
    {
      accessorKey: "name",
      cell: ({row}) => {
        return <div className="capitalize">{row.getValue("name")}</div>
      }
    },
    {
      accessorKey: "dateOfBirth",
      cell: ({ row }) => (
        <div className="lowercase">
          {isDate(row.getValue("dateOfBirth"))
            ?
            format(row.getValue("dateOfBirth"), "PPP", {locale: ru})
            :
            format(new Date(row.getValue("dateOfBirth")), "PPP", {locale: ru})}
        </div>
      ),
    },
    {
      accessorKey: "localization",
      cell: ({ row }) => (
        <div className="capitalize">{onChangeRuLocalisations(row.getValue("localization"))}</div>
      )
    },
    {
      accessorKey: "phoneNumber",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("phoneNumber")}</div>
      )
    },
    {
      accessorKey: "numberOfHistory",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("numberOfHistory")}</div>
      )
    },
    /*{
      accessorKey: "directedWher",
      cell: ({ row }) =>(
        <div className="capitalize">{row.getValue("directedWher")}</div>
      ) 
    },*/
    {
      accessorKey: "diagnosisVKB",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("diagnosisVKB")}</div>
      )  
    },
    {
      accessorKey: "dateOfReferralToCAOP",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("dateOfReferralToCAOP") === null
            ?
            null
            :
            format(new Date(row.getValue("dateOfReferralToCAOP")), "PPP", {locale: ru})}
        </div>
      )
    },
    {
      accessorKey: "dateOfVisitToCAOP",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("dateOfVisitToCAOP") === null
            ?
            null
            :
            format(new Date(row.getValue("dateOfVisitToCAOP")), "PPP", {locale: ru})}
        </div>
      )
    },
    {
      accessorKey: "diagnosisOfCAOP",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("diagnosisOfCAOP")}</div>
      )  
    },
    {
      accessorKey: "dateOfVisitToPKOD",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("dateOfVisitToPKOD") === null
            ?
            null
            :
            format(new Date(row.getValue("dateOfVisitToPKOD")), "PPP", {locale: ru})}
        </div>
      ) 
    },
    {
      accessorKey: "diagnosisOfPKOD",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("diagnosisOfPKOD")}</div>
      )  
    },
    {
      accessorKey: "dateOfTheConsultation",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("dateOfTheConsultation") === null
            ?
            null
            :
            format(new Date(row.getValue("dateOfTheConsultation")), "PPP", {locale: ru})}
        </div>
      ) 
    },
    {
      accessorKey: "dateOfLastCallAndPersonalContact",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("dateOfLastCallAndPersonalContact") === null
            ?
            null
            :
            format(new Date(row.getValue("dateOfLastCallAndPersonalContact")), "PPP", {locale: ru})}
        </div>
      )
    },
    {
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="capitalize">{onChangeRuStatus(row.getValue("status"))}</div>
      )  
    },
    {
      accessorKey: "statusNote",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("statusNote")}</div>
      ) 
    },
    {
      accessorKey: "change",
      cell: ({ row }) => <div className="capitalize">
        { isRefactoring?
          <div className="flex flex-col gap-2">
            <Button variant={'destructive'}><HiMiniXMark /></Button>
            <Button variant={'outline'}><HiOutlineCheck /></Button>
          </div>
        : 
        isProfile == 'DOCTOR' || isProfile == 'OMO' || isProfile == 'SITEADMIN'|| isProfile == 'TECHNICICAN'
         ?
         <ZnoRowChange 
           profile={!isProfile? '' : isProfile }
           localisations={localisations}
           statuses={statuses}
           row={row}
           onPatchZno={onPatchZno}
           getZnoLogs={getZnoLogs}

         /> 
         : 
         ''
        }
        </div>
    },
  ]

  //[11:21, 24.04.2025] : Все могут видеть все поля
  //[11:21, 24.04.2025]: Никакие поля от пользователей не скрываем
  //сбоку изменить - изменять там, галочка и крестик, все менять на инпуты и тд

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})


  const [isProfile, setProfile] = React.useState<string>()

  const session = useSession()


  //console.log(columns)


  //DOCTOR
  //SITEADMIN
  //OMO

  //isProfile == 'DOCTOR' || isProfile == 'OMO' //vse
  //isProfile == 'SITEADMIN' //zelen

  let getProfile = async (id: number) => {
    //let result = await axios.get(`http://localhost:5020/api/users/profile/${id}`)
    let result = await onFetchData(`http://localhost:5020/api/users/profile/${id}`)
    console.log(result)
    if(result) {
      //@ts-ignore
      setProfile(result.grade)
      console.log(isProfile)
    }
  }


  let getZnoLogs = async () => {
    //let result = await axios.get(`http://localhost:5020/api/users/profile/${id}`)
    let result = await onFetchData(`http://localhost:5020/api/zno`)
    if(result) {
      //@ts-ignore
      setZno(result)
    }
}

//console.log(zno)

  const table = useReactTable({
    data: zno,
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

 // console.log(isSearch)

  React.useEffect(() => {
    if (session.status === "authenticated" && typeof session.data.user !== 'undefined') {
      getProfile(Number(session.data.user.id))
  }
  getZnoLogs()
  }, [session])

  return (
    <div className="w-full p-2 pt-1">
      <div className="flex items-center py-4 gap-2">
        {
            isProfile === 'DOCTOR' || isProfile === 'OMO'|| isProfile === 'TECHNICICAN'  //zelen?
            ?
            <ZnoRowCreateNew
              localisations={localisations}
              statuses={statuses}
              onPostData={onPostData}
              getZnoLogs={getZnoLogs}
              profile={!isProfile ? '' : isProfile}
              isVisibleChange={isVisibleChange}
              setVisibleChange={setVisibleChange}
              />
            :
            ''
        }

        <Select onValueChange={(value) => setIsSearch(value)} defaultValue={isSearch}>
          <SelectTrigger className="w-[200px] h-8 overflow-hidden text-ellipsis whitespace-nowrap">
            <SelectValue placeholder="не выбрано"/>
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-96 w-full rounded-md border">
              <div className="p-4">
                {
                  searchValues.map((loc) => (
                    <div key={loc.value}>
                      <SelectItem  value={loc.value}>{loc.text}</SelectItem>
                      <Separator className="my-2" />
                    </div>
                  ))
                }
              </div>
            </ScrollArea>
          </SelectContent>
        </Select>

         <Input
          placeholder="Найти..."
          value={(table.getColumn(/*"name"*/isSearch)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(/*"name"*/isSearch)?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-8"
        />
        
      </div>
      <div className="rounded-md border">
        <Table>
          <ZnoTableHead/>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ZnoTableRow key={row.id} row={row} priorDate={priorDate}/>
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