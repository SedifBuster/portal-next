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

const data: IZno[] = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Идукаева  Павла Галиновна",
    dateOfBirth: new Date(),
    localization: "ZNOOfTheLip/Oropharynx",
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
        localization: "ZNOOfTheLip/Oropharynx",
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
        localization: "ZNOOfTheLip/Oropharynx",
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
        localization: "ZNOOfTheLip/Oropharynx",
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
        localization: "ZNOOfTheLip/Oropharynx",
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
        localization: "ZNOOfTheLip/Oropharynx",
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
              localization: "ZNOOfTheLip/Oropharynx",
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
              localization: "ZNOOfTheLip/Oropharynx",
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
              localization: "ZNOOfTheLip/Oropharynx",
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
              localization: "ZNOOfTheLip/Oropharynx",
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
            localization: "ZNOOfTheLip/Oropharynx",
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
                  localization: "ZNOOfTheLip/Oropharynx",
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
                  localization: "ZNOOfTheLip/Oropharynx",
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
                  localization: "ZNOOfTheLip/Oropharynx",
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
                  localization: "ZNOOfTheLip/Oropharynx",
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

  console.log(data)

export type StatusEnum = "awaitingReferralToCAOP" |//ожидает направления в ЦАОП
                  "awaitingReferralToPKOD" |//ожидает направления в ПКОД
                  "waitingForAConsultation" |//Ожидает консилиум
                  "Completed"//Завершено

export type LocalizationEnum = //PIZDEC
  "ZNOOfTheLip/Oropharynx" |//ЗНО ГУБЫ (МКБ-10: С00), РОТОГЛОТКИ (МКБ 10:С01, С02.4, C05.1, С05.2, C09, C10), ПОЛОСТИ РТА (МКБ 10:C02.0, C02.1, C02.2, C02.3, C02.8, C02.9, С03, С04, C05.0, С06)
  "MalignancyOfTheEsophagus/Cardia" |//ЗНО ПИЩЕВОДА, КАРДИИ (МКБ-10: С15, С16.0)
  "ZNOStomachCancer" |//ЗНО ЖЕЛУДКА  (МКБ-10: С16)
  "MalignancyOfTheColonRectoSigMoidJointRectumAnusAnal" |//ЗНО ОБОДОЧНОЙ КИШКИ, РЕКТО-СИГМОИДНОГО СОЕДИНЕНИЯ, ПРЯМОЙ КИШКИ, ЗАДНЕГО ПРОХОДА (АНУСА) И АНАЛЬНОГО КАНАЛА  (МКБ-10: С18, С19, С20, С21)
  "CancerOfTheLiverAndIntraheraticBileDucts" |//ЗНО ПЕЧЕНИ И ВНУТРИПЕЧЕНОЧНЫХ ЖЕЛЧНЫХ ПРОТОКОВ  (МКБ-10: С22)
  "OncologyOfTheBiliarySystem" |//ЗНО ЖЕЛЧЕВЫВОДЯЩЕЙ СИСТЕМЫ (МКБ-10: С22.1, С23, С24.0)
  "PancreaticCancer" |//ЗНО ПОДЖЕЛУДОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С25)
  "NeuroendocrineTumor" |//НЕЙРОЭНДОКРИНННОЙ ОПУХОЛИ (МКБ-10: C15, C16, C17, C18, C19.9, C20.9, C21, C23, C24, C25, C26, C34, C37.9, C73.9
  "LarynxDisease" |//ЗНО ГОРТАНИ  (МКБ-10: С32)
  "MalignancyOfTheTracheaLungMediastinumAndPleura" |//ЗНО ТРАХЕИ, ЛЕГКОГО, ВИЛОЧКОВОЙ ЖЕЛЕЗЫ, СРЕДОСТЕНИЯ И ПЛЕВРЫ   (МКБ-10: С33, С34, С37, С38)
  "MelanomasAndMucousMembranes" |//МЕЛАНОМЫ И СЛИЗИСТЫХ ОБОЛОЧЕК  (МКБ-10: C43, C51, C60.9, C63.2, C69.0, C00–C26, C30-C32, C52, C53 C77, C78, C79 D03.0-D03.9)
  "SquamousCellSkinCarcinomaBasalCellSkinCarcinomaMerkelsCarcinoma" |//ПЛОСКОКЛЕТОЧНОГО РАКА КОЖИ, БАЗАЛЬНО-КЛЕТОЧНОГО РАКА КОЖИ, КАРЦИНОМЫ МЕРКЕЛЯ (МКБ-10: С44, D04)
  "SoftTissueSarcoma" |//ЗНО САРКОМЫ МЯГКИХ ТКАНЕЙ  (МКБ-10: С 49)
  "BreastCancer" |//ЗНО МОЛОЧНОЙ ЖЕЛЕЗЫ  (МКБ-10: С50)
  "MalignancyOfTheVaulvaVaginaCervix" |//ЗНО ВУЛЬВЫ, ВЛАГАЛИЩА, ШЕЙКИ МАТКИ,  (МКБ-10: С51, С52, С53) 
  "EndometralDisease" |//ЗНО ЭНДОМЕТРИЯ  (МКБ-10: С54)
  "OvarianCancerBorderlineTumorsNonepithelialTumorsOvarianCancer" |//ЗНО ЯИЧНИКОВ: ПОГРАНИЧНЫЕ ОПУХОЛИ, НЕЭПИТЕЛИАЛЬНЫЕ ОПУХОЛИ, РАК ЯИЧНИКОВ (РАК МАТОЧНОЙ ТРУБЫ), ПЕРВИЧНЫЙ РАК БРЮШИНЫ В ЦАОП (МКБ-10: С56, С48.0, С48.2, С57)
  "ProstateCancer" |//ЗНО ПРЕДСТАТЕЛЬНОЙ ЖЕЛЕЗЫ  (МКБ-10: С61)
  "TesticularCancer" |//ЗНО ЯИЧКА  (МКБ-10: С62)
  "MalignancyOfTheRenalPelvisGlasCase" |//ЗНО ПАРЕНХИМЫ ПОЧКИ, ЛОХАНКИ, ОЧЕТОЧНИКА (МКБ-10: С 64, С65, С66 )
  "BladderCancer" |//ЗНО МОЧЕВОГО ПУЗЫРЯ  (МКБ-10: С67)
  "PrimaryTumorsOfTheCentralNervousSystemLimphomaOfTheCentralNervousSystem" |//ПЕРВИЧНЫХ ОПУХОЛЕЙ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ-10: С70, С71, С72, С75, С76), ПЕРВИЧНОЙ ЛИМФОМЫ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ (МКБ 10: С81, С82, С83, С84, С85, С86, С87, С88) 
  "ThyroidCancer" |//ЗНО ЩИТОВИДНОЙ ЖЕЛЕЗЫ (МКБ-10: С73)
  "ZnoWithoutPrimaryLocalization" |//ЗНО БЕЗ ПЕРВИЧНОЙ ЛОКАЛИЗАЦИИ (МКБ-10: С80)
  "HodgkinsLymphomaInAdultsFollicularLymphomaInAdults"//ЛИМФОМА ХОДЖКИНА У ВЗРОСЛЫХ (МКБ-10: С81), ФОЛЛИКУЛЯРНАЯ ЛИМФОМА У ВЗРОСЛЫХ (МКБ-10: С82), НЕХОДЖКИНСКАЯ ЛИМФОМА (МКБ-10: С83) 

export interface IZno {
  id: number
  createdAt: Date
  updatedAt: Date
  name: string             //yellow
  dateOfBirth: Date        //yellow
  localization: LocalizationEnum     //yellow
  phoneNumber: string      //yellow
  numberOfHistory: string  //yellow
  directedWher: string                      //green
  diagnosisVKB: string                      //green
  dateOfReferralToCAOP: Date                //green
  dateOfVisitToCAOP: Date                   //green
  diagnosisOfCAOP: string                   //green
  dateOfVisitToPKOD: Date                   //green
  diagnosisOfPKOD: string                   //green
  dateOfTheConsultation: Date               //green
  dateOfLastCallAndPersonalContact: Date    //green
  status: StatusEnum                        //green
  statusNote: string                        //green
}

export const columns: ColumnDef<IZno>[] = [
  {
    id: "createdAt",
    cell: ({ row }) => (
        <div className="capitalize">{row.getValue("createdAt")/**format(row.getValue("createdAt"), "PPP HH:mm", {locale: ru})*/}</div>
    ),
  },
  {
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "dateOfBirth",
    cell: ({ row }) => <div className="lowercase">{row.getValue("dateOfBirth").toString()}</div>,
  },
  {
    accessorKey: "localization",
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("localization")}</div>
    },
  },
  {
    id: "phoneNumber",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("phoneNumber")}</div>
    },
  },
  {
    id: "numberOfHistory",
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("numberOfHistory")}</div>
    },
  },
  {
    id: "directedWher",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("directedWher")}</div>
    },
  },
  {
    id: "diagnosisVKB",
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("diagnosisVKB")}</div>
    },
  },
  {
    id: "dateOfReferralToCAOP",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("dateOfReferralToCAOP")}</div>
    },
  },
  {
    id: "dateOfVisitToCAOP",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("dateOfVisitToCAOP")}</div>
    },
  },
  {
    id: "diagnosisOfCAOP",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("diagnosisOfCAOP")}</div>
    },
  },
  {
    id: "dateOfVisitToPKOD",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("dateOfVisitToPKOD")}</div>
    },
  },
  {
    id: "diagnosisOfPKOD",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("diagnosisOfPKOD")}</div>
    },
  },
  {
    id: "dateOfTheConsultation",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("dateOfTheConsultation")}</div>
    },
  },
  {
    id: "dateOfLastCallAndPersonalContact",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("dateOfLastCallAndPersonalContact")}</div>
    },
  },
  {
    id: "status",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("status")}</div>
    },
  },
  {
    id: "statusNote",
    enableHiding: false,
    cell: ({ row }) => {
        <div className="capitalize">{row.getValue("statusNote")}</div>
    },
  },
]

export function ZnoTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
          <ZnoTableHead />
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
