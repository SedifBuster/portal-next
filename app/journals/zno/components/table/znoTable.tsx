"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
import { HiMiniXMark, HiOutlineCheck, HiOutlinePencil } from "react-icons/hi2";
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { PopoverContent,} from "@/components/ui/popover"
import { toast } from "sonner"
import DateTimePicker from "../../components/dateTime/dateTimePicker"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@radix-ui/react-select"

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
  const [isChangedYellow, setIsChangedYellow] = React.useState<boolean>(true)
  const [isChangedGreen, setIsChangedGreen] = React.useState<boolean>(true)
  //const [isChangedYellowAndGreen, setIsChangedYellowAndGreen] = React.useState<boolean>(false)

  //локализация перевод и текущий статус перевод

  //функция переключения состояния и спрашивания какая у профиля должность
  const [isName, setIsName] = React.useState<string>()

  const onChangeChangedState = (row: Row<ZnoLog>) => {

    //тут спрашиваем кто персонаж что меняет поле
   


  }




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

  const [isRefactoring, setIsRefactoring] = React.useState<boolean>(true)

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
          isChangedYellow && isRefactoring
          ?
          <div className="capitalize"> 
          <Textarea value={isName} className="w-18 h-full" onChange={(e) => setIsName(e.target.value)}/>
          </div>
          :
          <div className="capitalize"> {row.getValue("name")}  </div>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      cell: ({ row }) => (
        isChangedYellow && isRefactoring
        ?
        <div className="lowercase">

          {isDate(row.getValue("dateOfBirth"))? format(row.getValue("dateOfBirth"), "PPP", {locale: ru}) : row.getValue("dateOfBirth")}

        </div>
        :
        <div className="lowercase">{isDate(row.getValue("dateOfBirth"))? format(row.getValue("dateOfBirth"), "PPP", {locale: ru}) : row.getValue("dateOfBirth")}</div>
      ),
    },
    {
      accessorKey: "localization",
      cell: ({ row }) => (
        isChangedYellow && isRefactoring
        ?
        <div className="capitalize">
           <Select onValueChange={row.getValue("localization")}  value={row.getValue("localization")} defaultValue={row.getValue("localization")}>
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="не выбрано" />
              </SelectTrigger>
           <SelectContent>
            {
              localisations.map(dep => {
                return <SelectItem key={dep.value} value={dep.value}>{dep.text}</SelectItem>
            })
            }
           </SelectContent>
           </Select>
          </div>
        :
        <div className="capitalize">{onChangeRuLocalisations(row.getValue("localization"))}</div>
      )
    },
    {
      accessorKey: "phoneNumber",
      cell: ({ row }) => (
        isChangedYellow && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("phoneNumber")} className="w-18 h-full"/>
        </div>
        :
        <div className="capitalize">{row.getValue("phoneNumber")}</div>
      )
    },
    {
      accessorKey: "numberOfHistory",
      cell: ({ row }) => (
        isChangedYellow && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("numberOfHistory")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("numberOfHistory")}</div>
      )
    },
    {
      accessorKey: "directedWher",
      cell: ({ row }) =>(
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("directedWher")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("directedWher")}</div>
      ) 
    },
    {
      accessorKey: "diagnosisVKB",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("diagnosisVKB")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("diagnosisVKB")}</div>
      )  
    },
    {
      accessorKey: "dateOfReferralToCAOP",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                   !row.getValue("dateOfReferralToCAOP") && "text-muted-foreground"
                )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                    {row.getValue("dateOfReferralToCAOP") ? format(row.getValue("dateOfReferralToCAOP"), "PPP", {locale: ru}) : <span>Выберите время*</span>}
              </Button>
             </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                 mode="single"
                 selected={row.getValue("dateOfReferralToCAOP")}
                 onSelect={row.getValue("dateOfReferralToCAOP")}
                 initialFocus
                 locale={ru}
              />
              <div className="p-2 flex justify-center border-t">
               <DateTimePicker date={row.getValue("dateOfReferralToCAOP")} setDate={row.getValue("dateOfReferralToCAOP")}/>
               </div>
           </PopoverContent>
          </Popover>
          </div>
        :
        <div className="capitalize">{isDate(row.getValue("dateOfReferralToCAOP"))? format(row.getValue("dateOfReferralToCAOP"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfReferralToCAOP")}</div>
      )  
    },
    {
      accessorKey: "dateOfVisitToCAOP",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
                    <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                   !row.getValue("dateOfVisitToCAOP") && "text-muted-foreground"
                )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                    {row.getValue("dateOfVisitToCAOP") ? format(row.getValue("dateOfVisitToCAOP"), "PPP", {locale: ru}) : <span>Выберите время*</span>}
              </Button>
             </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                 mode="single"
                 selected={row.getValue("dateOfVisitToCAOP")}
                 onSelect={row.getValue("dateOfVisitToCAOP")}
                 initialFocus
                 locale={ru}
              />
              <div className="p-2 flex justify-center border-t">
               <DateTimePicker date={row.getValue("dateOfVisitToCAOP")} setDate={row.getValue("dateOfVisitToCAOP")}/>
               </div>
           </PopoverContent>
          </Popover>
           </div>
        :
        <div className="capitalize">{isDate(row.getValue("dateOfVisitToCAOP"))? format(row.getValue("dateOfVisitToCAOP"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfVisitToCAOP")}</div>
      )   
    },
    {
      accessorKey: "diagnosisOfCAOP",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("diagnosisOfCAOP")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("diagnosisOfCAOP")}</div>
      )  
    },
    {
      accessorKey: "dateOfVisitToPKOD",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                   !row.getValue("dateOfVisitToPKOD") && "text-muted-foreground"
                )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                    {row.getValue("dateOfVisitToPKOD") ? format(row.getValue("dateOfVisitToPKOD"), "PPP", {locale: ru}) : <span>Выберите время*</span>}
              </Button>
             </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                 mode="single"
                 selected={row.getValue("dateOfVisitToPKOD")}
                 onSelect={row.getValue("dateOfVisitToPKOD")}
                 initialFocus
                 locale={ru}
              />
              <div className="p-2 flex justify-center border-t">
               <DateTimePicker date={row.getValue("dateOfVisitToPKOD")} setDate={row.getValue("dateOfVisitToPKOD")}/>
               </div>
           </PopoverContent>
          </Popover>
           </div>
        :
        <div className="capitalize">{isDate(row.getValue("dateOfVisitToPKOD"))? format(row.getValue("dateOfVisitToPKOD"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfVisitToPKOD")}</div>
      ) 
    },
    {
      accessorKey: "diagnosisOfPKOD",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("diagnosisOfPKOD")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("diagnosisOfPKOD")}</div>
      )  
    },
    {
      accessorKey: "dateOfTheConsultation",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
                    <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                   !row.getValue("dateOfTheConsultation") && "text-muted-foreground"
                )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                    {row.getValue("dateOfTheConsultation") ? format(row.getValue("dateOfTheConsultation"), "PPP", {locale: ru}) : <span>Выберите время*</span>}
              </Button>
             </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                 mode="single"
                 selected={row.getValue("dateOfTheConsultation")}
                 onSelect={row.getValue("dateOfTheConsultation")}
                 initialFocus
                 locale={ru}
              />
              <div className="p-2 flex justify-center border-t">
               <DateTimePicker date={row.getValue("dateOfTheConsultation")} setDate={row.getValue("dateOfTheConsultation")}/>
               </div>
           </PopoverContent>
          </Popover>
          </div>
        :
        <div className="capitalize">{isDate(row.getValue("dateOfTheConsultation"))? format(row.getValue("dateOfTheConsultation"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfTheConsultation")}</div>
      ) 
    },
    {
      accessorKey: "dateOfLastCallAndPersonalContact",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                   !row.getValue("dateOfLastCallAndPersonalContact") && "text-muted-foreground"
                )}
              >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                    {row.getValue("dateOfLastCallAndPersonalContact") ? format(row.getValue("dateOfLastCallAndPersonalContact"), "PPP", {locale: ru}) : <span>Выберите время*</span>}
              </Button>
             </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                 mode="single"
                 selected={row.getValue("dateOfLastCallAndPersonalContact")}
                 onSelect={row.getValue("dateOfLastCallAndPersonalContact")}
                 initialFocus
                 locale={ru}
              />
              <div className="p-2 flex justify-center border-t">
               <DateTimePicker date={row.getValue("dateOfLastCallAndPersonalContact")} setDate={row.getValue("dateOfLastCallAndPersonalContact")}/>
               </div>
           </PopoverContent>
          </Popover>
          </div>
        :
        <div className="capitalize">{isDate(row.getValue("dateOfLastCallAndPersonalContact"))? format(row.getValue("dateOfLastCallAndPersonalContact"), "PPP HH:mm", {locale: ru}) : row.getValue("dateOfLastCallAndPersonalContact")}</div>
      )
    },
    {
      accessorKey: "status",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Select onValueChange={row.getValue("status")}  value={row.getValue("status")} defaultValue={row.getValue("status")}>
            <SelectTrigger className="w-[320px]">
              <SelectValue placeholder="не выбрано" />
            </SelectTrigger>
          <SelectContent>
            {
              statuses.map(dep => {
                return <SelectItem key={dep.value} value={dep.value}>{dep.text}</SelectItem>
            })
            }
           </SelectContent>
           </Select>
          </div>
        :
        <div className="capitalize">{onChangeRuStatus(row.getValue("status"))}</div>
      )  
    },
    {
      accessorKey: "statusNote",
      cell: ({ row }) => (
        isChangedGreen && isRefactoring
        ?
        <div className="capitalize">
          <Textarea value={row.getValue("statusNote")} className="w-18 h-full"/>
          </div>
        :
        <div className="capitalize">{row.getValue("statusNote")}</div>
      ) 
    },
    {
      accessorKey: "statusNote",
      cell: ({ row }) => <div className="capitalize">
        {isChangedYellow || isChangedGreen && isRefactoring?
          <div className="flex flex-col gap-2">
            <Button variant={'destructive'}><HiMiniXMark /></Button>
            <Button variant={'outline'}><HiOutlineCheck /></Button>
          </div>
        :
        <Button variant={'outline'}><HiOutlinePencil/></Button>
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