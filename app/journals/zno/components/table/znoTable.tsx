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
import { Input } from "@/components/ui/input"
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
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"

const data: ZnoLog[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Идукаева  Павла Галиновна",
    dateOfBirth: new Date(),
    localization: "ZNOOfTheLipOropharynx",
    phoneNumber: "8999999999",
    numberOfHistory: "2255/56",
    directedWher: "FKS hirurg",
    diagnosisVKB: "k64.0",
    dateOfReferralToCAOP: new Date(),
    dateOfVisitToCAOP: new Date(),
    diagnosisOfCAOP: "C25 ",
    dateOfVisitToPKOD: new Date(),
    diagnosisOfPKOD: "C25 ",
    dateOfTheConsultation: new Date(),
    dateOfLastCallAndPersonalContact: new Date(),
    status: "waitingForAConsultation",
    statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //green
  },
  {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Идукаева  Павла Галиновна",
        dateOfBirth: new Date(),
        localization: "ZNOOfTheLipOropharynx",
        phoneNumber: "8999999999",
        numberOfHistory: "2255/56",
        directedWher: "FKS hirurg",
        diagnosisVKB: "k64.0",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "C25 ",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "C25 ",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "waitingForAConsultation",
        statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
    },
    {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Идукаева  Павла Галиновна",
        dateOfBirth: new Date(),
        localization: "ZNOOfTheLipOropharynx",
        phoneNumber: "8999999999",
        numberOfHistory: "2255/56",
        directedWher: "FKS hirurg",
        diagnosisVKB: "k64.0",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "C25 ",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "C25 ",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "waitingForAConsultation",
        statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
    },
    {
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Идукаева  Павла Галиновна",
        dateOfBirth: new Date(),
        localization: "ZNOOfTheLipOropharynx",
        phoneNumber: "8999999999",
        numberOfHistory: "2255/56",
        directedWher: "FKS hirurg",
        diagnosisVKB: "k64.0",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "C25 ",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "C25 ",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "waitingForAConsultation",
        statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
    },
    {
        id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Идукаева  Павла Галиновна",
        dateOfBirth: new Date(),
        localization: "ZNOOfTheLipOropharynx",
        phoneNumber: "8999999999",
        numberOfHistory: "2255/56",
        directedWher: "FKS hirurg",
        diagnosisVKB: "k64.0",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "C25 ",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "C25 ",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "waitingForAConsultation",
        statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
    },
    {
        id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Идукаева  Павла Галиновна",
        dateOfBirth: new Date(),
        localization: "ZNOOfTheLipOropharynx",
        phoneNumber: "8999999999",
        numberOfHistory: "2255/56",
        directedWher: "FKS hirurg",
        diagnosisVKB: "k64.0",
        dateOfReferralToCAOP: new Date(),
        dateOfVisitToCAOP: new Date(),
        diagnosisOfCAOP: "C25 ",
        dateOfVisitToPKOD: new Date(),
        diagnosisOfPKOD: "C25 ",
        dateOfTheConsultation: new Date(),
        dateOfLastCallAndPersonalContact: new Date(),
        status: "waitingForAConsultation",
        statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //green
          },
          {
              id: 7,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: "Идукаева  Павла Галиновна",
              dateOfBirth: new Date(),
              localization: "ZNOOfTheLipOropharynx",
              phoneNumber: "8999999999",
              numberOfHistory: "2255/56",
              directedWher: "FKS hirurg",
              diagnosisVKB: "k64.0",
              dateOfReferralToCAOP: new Date(),
              dateOfVisitToCAOP: new Date(),
              diagnosisOfCAOP: "C25 ",
              dateOfVisitToPKOD: new Date(),
              diagnosisOfPKOD: "C25 ",
              dateOfTheConsultation: new Date(),
              dateOfLastCallAndPersonalContact: new Date(),
              status: "waitingForAConsultation",
              statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
          },
          {
              id: 8,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: "Идукаева  Павла Галиновна",
              dateOfBirth: new Date(),
              localization: "ZNOOfTheLipOropharynx",
              phoneNumber: "8999999999",
              numberOfHistory: "2255/56",
              directedWher: "FKS hirurg",
              diagnosisVKB: "k64.0",
              dateOfReferralToCAOP: new Date(),
              dateOfVisitToCAOP: new Date(),
              diagnosisOfCAOP: "C25 ",
              dateOfVisitToPKOD: new Date(),
              diagnosisOfPKOD: "C25 ",
              dateOfTheConsultation: new Date(),
              dateOfLastCallAndPersonalContact: new Date(),
              status: "waitingForAConsultation",
              statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
          },
          {
              id: 9,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: "Идукаева  Павла Галиновна",
              dateOfBirth: new Date(),
              localization: "ZNOOfTheLipOropharynx",
              phoneNumber: "8999999999",
              numberOfHistory: "2255/56",
              directedWher: "FKS hirurg",
              diagnosisVKB: "k64.0",
              dateOfReferralToCAOP: new Date(),
              dateOfVisitToCAOP: new Date(),
              diagnosisOfCAOP: "C25 ",
              dateOfVisitToPKOD: new Date(),
              diagnosisOfPKOD: "C25 ",
              dateOfTheConsultation: new Date(),
              dateOfLastCallAndPersonalContact: new Date(),
              status: "waitingForAConsultation",
              statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
          },
          {
              id: 10,
              createdAt: new Date(),
              updatedAt: new Date(),
              name: "Идукаева  Павла Галиновна",
              dateOfBirth: new Date(),
              localization: "ZNOOfTheLipOropharynx",
              phoneNumber: "8999999999",
              numberOfHistory: "2255/56",
              directedWher: "FKS hirurg",
              diagnosisVKB: "k64.0",
              dateOfReferralToCAOP: new Date(),
              dateOfVisitToCAOP: new Date(),
              diagnosisOfCAOP: "C25 ",
              dateOfVisitToPKOD: new Date(),
              diagnosisOfPKOD: "C25 ",
              dateOfTheConsultation: new Date(),
              dateOfLastCallAndPersonalContact: new Date(),
              status: "waitingForAConsultation",
              statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
          },
          {
            id: 11,
            createdAt: new Date(),
            updatedAt: new Date(),
            name: "Идукаева  Павла Галиновна",
            dateOfBirth: new Date(),
            localization: "ZNOOfTheLipOropharynx",
            phoneNumber: "8999999999",
            numberOfHistory: "2255/56",
            directedWher: "FKS hirurg",
            diagnosisVKB: "k64.0",
            dateOfReferralToCAOP: new Date(),
            dateOfVisitToCAOP: new Date(),
            diagnosisOfCAOP: "C25 ",
            dateOfVisitToPKOD: new Date(),
            diagnosisOfPKOD: "C25 ",
            dateOfTheConsultation: new Date(),
            dateOfLastCallAndPersonalContact: new Date(),
            status: "waitingForAConsultation",
            statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //green
              },
              {
                  id: 12,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  name: "Идукаева  Павла Галиновна",
                  dateOfBirth: new Date(),
                  localization: "ZNOOfTheLipOropharynx",
                  phoneNumber: "8999999999",
                  numberOfHistory: "2255/56",
                  directedWher: "FKS hirurg",
                  diagnosisVKB: "k64.0",
                  dateOfReferralToCAOP: new Date(),
                  dateOfVisitToCAOP: new Date(),
                  diagnosisOfCAOP: "C25 ",
                  dateOfVisitToPKOD: new Date(),
                  diagnosisOfPKOD: "C25 ",
                  dateOfTheConsultation: new Date(),
                  dateOfLastCallAndPersonalContact: new Date(),
                  status: "waitingForAConsultation",
                  statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
              },
              {
                  id: 13,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  name: "Идукаева  Павла Галиновна",
                  dateOfBirth: new Date(),
                  localization: "ZNOOfTheLipOropharynx",
                  phoneNumber: "8999999999",
                  numberOfHistory: "2255/56",
                  directedWher: "FKS hirurg",
                  diagnosisVKB: "k64.0",
                  dateOfReferralToCAOP: new Date(),
                  dateOfVisitToCAOP: new Date(),
                  diagnosisOfCAOP: "C25 ",
                  dateOfVisitToPKOD: new Date(),
                  diagnosisOfPKOD: "C25 ",
                  dateOfTheConsultation: new Date(),
                  dateOfLastCallAndPersonalContact: new Date(),
                  status: "waitingForAConsultation",
                  statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
              },
              {
                  id: 14,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  name: "Идукаева  Павла Галиновна",
                  dateOfBirth: new Date(),
                  localization: "ZNOOfTheLipOropharynx",
                  phoneNumber: "8999999999",
                  numberOfHistory: "2255/56",
                  directedWher: "FKS hirurg",
                  diagnosisVKB: "k64.0",
                  dateOfReferralToCAOP: new Date(),
                  dateOfVisitToCAOP: new Date(),
                  diagnosisOfCAOP: "C25 ",
                  dateOfVisitToPKOD: new Date(),
                  diagnosisOfPKOD: "C25 ",
                  dateOfTheConsultation: new Date(),
                  dateOfLastCallAndPersonalContact: new Date(),
                  status: "waitingForAConsultation",
                  statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
              },
              {
                  id: 15,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  name: "Идукаева  Павла Галиновна",
                  dateOfBirth: new Date(),
                  localization: "ZNOOfTheLipOropharynx",
                  phoneNumber: "8999999999",
                  numberOfHistory: "2255/56",
                  directedWher: "FKS hirurg",
                  diagnosisVKB: "k64.0",
                  dateOfReferralToCAOP: new Date(),
                  dateOfVisitToCAOP: new Date(),
                  diagnosisOfCAOP: "C25 ",
                  dateOfVisitToPKOD: new Date(),
                  diagnosisOfPKOD: "C25 ",
                  dateOfTheConsultation: new Date(),
                  dateOfLastCallAndPersonalContact: new Date(),
                  status: "waitingForAConsultation",
                  statusNote: "Эндоскопические признаки спаечного процесса в малом тазу. Диверитикулит сигмовидной кишки, без признаков дивертикулита. Внутренний геморрой"                        //gree
              },
  ]

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
    onFetchData
}: {
    onFetchData: (url: string) => Promise<ZnoLog[]>
}
) {

  //change znologs states
  const [isChangedYellow, setIsChangedYellow] = React.useState<boolean>(false)
  const [isChangedGreen, setIsChangedGreen] = React.useState<boolean>(false)
  //const [isChangedYellowAndGreen, setIsChangedYellowAndGreen] = React.useState<boolean>(false)

  const columns: ColumnDef<ZnoLog>[] = [
    {
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="capitalize">
          {isDate(row.getValue("createdAt"))? format(row.getValue("createdAt"), "PPP", {locale: ru}) : row.getValue("createdAt")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      cell: ({ row }) => (
        <ContextMenu>
          <ContextMenuTrigger className="h-full w-full items-center justify-center rounded-md border border-dashed text-sm">
            <div className="capitalize"> {row.getValue("name")}  </div>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <ContextMenuItem inset>
              Изменить строку
              <ContextMenuShortcut>⌘[</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      cell: ({ row }) => <div className="lowercase">{isDate(row.getValue("dateOfBirth"))? format(row.getValue("dateOfBirth"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfBirth")}</div>,
    },
    {
      accessorKey: "localization",
      cell: ({ row }) => <div className="capitalize">{row.getValue("localization")}</div>
    },
    {
      accessorKey: "phoneNumber",
      cell: ({ row }) => <div className="capitalize">{row.getValue("phoneNumber")}</div>
    },
    {
      accessorKey: "numberOfHistory",
      cell: ({ row }) => <div className="capitalize">{row.getValue("numberOfHistory")}</div>
    },
    {
      accessorKey: "directedWher",
      cell: ({ row }) => <div className="capitalize">{row.getValue("directedWher")}</div>
    },
    {
      accessorKey: "diagnosisVKB",
      cell: ({ row }) => <div className="capitalize">{row.getValue("diagnosisVKB")}</div>
    },
    {
      accessorKey: "dateOfReferralToCAOP",
      cell: ({ row }) => <div className="capitalize">{isDate(row.getValue("dateOfReferralToCAOP"))? format(row.getValue("dateOfReferralToCAOP"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfReferralToCAOP")}</div>
    },
    {
      accessorKey: "dateOfVisitToCAOP",
      cell: ({ row }) => <div className="capitalize">{isDate(row.getValue("dateOfVisitToCAOP"))? format(row.getValue("dateOfVisitToCAOP"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfVisitToCAOP")}</div>
    },
    {
      accessorKey: "diagnosisOfCAOP",
      cell: ({ row }) => <div className="capitalize">{row.getValue("diagnosisOfCAOP")}</div>
    },
    {
      accessorKey: "dateOfVisitToPKOD",
      cell: ({ row }) => <div className="capitalize">{isDate(row.getValue("dateOfVisitToPKOD"))? format(row.getValue("dateOfVisitToPKOD"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfVisitToPKOD")}</div>
    },
    {
      accessorKey: "diagnosisOfPKOD",
      cell: ({ row }) => <div className="capitalize">{row.getValue("diagnosisOfPKOD")}</div>
    },
    {
      accessorKey: "dateOfTheConsultation",
      cell: ({ row }) => <div className="capitalize">{isDate(row.getValue("dateOfTheConsultation"))? format(row.getValue("dateOfTheConsultation"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfTheConsultation")}</div>
    },
    {
      accessorKey: "dateOfLastCallAndPersonalContact",
      cell: ({ row }) => <div className="capitalize">{isDate(row.getValue("dateOfLastCallAndPersonalContact"))? format(row.getValue("dateOfLastCallAndPersonalContact"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfLastCallAndPersonalContact")}</div>
    },
    {
      accessorKey: "status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>
    },
    {
      accessorKey: "statusNote",
      cell: ({ row }) => <div className="capitalize">{row.getValue("statusNote")}</div>
    },
    {
      accessorKey: "statusNote",
      cell: ({ row }) => <div className="capitalize">
        <Button>ism</Button>

        <Button>otm</Button>
        <Button>sohr</Button>
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
  
    let getProfile = async (id: number) => {
      //let result = await axios.get(`http://localhost:5020/api/users/profile/${id}`)
      let result = await onFetchData(`http://localhost:5020/api/users/profile/${id}`)
      console.log(result)
      if(result) {
        //@ts-ignore
        setProfile(result.grade)
      }
  }
  
    React.useEffect(() => {
      if (session.status === "authenticated" && typeof session.data.user !== 'undefined') {
        getProfile(Number(session.data.user.id))
    }}, [])

    const table = useReactTable({
  data,
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
    <div className="w-full p-2 pt-1">
      <div className="flex items-center py-4">
      <ZnoRowCreateNew  localisations={localisations} statuses={statuses}/>
        <Input
          placeholder="Найти ФИО..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-8"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <ZnoTableHead/>
          <TableBody>
            <>
            
            </>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <ZnoTableRow key={row.id} row={row}/>

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