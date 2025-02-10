import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IZhus } from "../page";
import { ru } from "date-fns/locale"
import { format } from "date-fns"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


export
  function DepartmentTable(
  {
    logs,
    onSetupDepNameToRu
  } : {
  logs: IZhus[],
  onSetupDepNameToRu: (depName: string) => string
  }
) {

  //console.log(logs)

  return <Table className="w-full">
    <TableHeader  className="bg-green-100 w-full">
      <TableRow>
      <TableHead className="font-medium">дата</TableHead>
      <TableHead>имя пациента и дата рождения</TableHead>
      <TableHead>место нежелательного события</TableHead>
      <TableHead>причина возникновения неж события</TableHead>
      <TableHead>описание обстоятельств</TableHead>
      <TableHead>принятые меры</TableHead>
      <TableHead>примечание</TableHead>
      <TableHead>ответственный</TableHead>
      <TableHead>комментарий</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody> 
  {
    logs
    ?
    logs.map((log) => {

      const [isComment, setComment] = useState(log.comment)

      return <TableRow className="bg-green-50" key={log.id}>
      <TableCell className="font-medium ">{format(new Date(log.date), "PPP HH:mm", {locale: ru})}</TableCell>
      <TableCell>{log.name} </TableCell>{/**и дата рождения */}
      <TableCell className="w-2">{log.place}</TableCell>
      <TableCell>{log.cause}</TableCell>
      <TableCell>{log.circs}</TableCell>
      <TableCell>{log.gauge}</TableCell>
      <TableCell className="w-2">{log.note}</TableCell>
      <TableCell>{log.liable}</TableCell>
      <TableCell>
      <Dialog>
      <DialogTrigger asChild>
       <div className="w-20 h-20">{log.comment}</div> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[470px]">
        <DialogHeader>
          <DialogTitle>Комментарий</DialogTitle>
          <DialogDescription>
            Оставить или изменить комментарий
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 h-[80vh] overflow-auto ">
          <div className=" flex flex-col gap-4 mr-4">
            <p>Отделение: <p className="font-semibold">{onSetupDepNameToRu(log.department)}</p></p>
            <p>Дата: <p className="font-semibold">{format(new Date(log.date), "PPP HH:mm", {locale: ru})}</p></p>
            <p>Имя пациента: <p className="font-semibold">{log.name}</p></p>
            <p>Место нежелательного события: <p className="font-semibold">{log.place}</p></p>
            <p>Причина возникновения неж события: <p className="font-semibold">{log.cause}</p></p>
            <p>Описание обстоятельств: <p className="font-semibold">{log.circs}</p></p>
            <p>Принятые меры: <p className="font-semibold">{log.gauge}</p></p>
            <p>Примечание: <p className="font-semibold">{log.note}</p></p>
            <p>Ответственный: <p className="font-semibold">{log.liable}</p></p>
            <p>Комментарий: </p>
            <Textarea value={isComment} onChange={(e) => setComment(e)}/>

          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </TableCell>
    </TableRow>
    })

    :
    'событий не обнаружено'
  }
</TableBody>
  </Table>

}
//<TableHead>вид нежелательного события</TableHead>
//<TableCell>{log.event}</TableCell>
//<TableCell>{log.comment}</TableCell>
//<TableHead>комментарий</TableHead>///<TableHead>вид нежелательного случая</TableHead>


//old
/**
 import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IZhus } from "../page";
import { ru } from "date-fns/locale"
import { format } from "date-fns"


export
  function DepartmentTable(
  {
    logs
  } : {
  logs: IZhus[]
  }
) {

  //console.log(logs)

  return  <><TableRow className="bg-green-100 w-full">
    <TableHead className="font-medium">дата</TableHead>
    <TableHead>имя пациента и дата рождения</TableHead>
    <TableHead>место нежелательного события</TableHead>

    <TableHead>причина возникновения неж события</TableHead>
    <TableHead>описание обстоятельств</TableHead>
    <TableHead>принятые меры</TableHead>
    <TableHead>примечание</TableHead>
    <TableHead>ответственный</TableHead>

  </TableRow>
  {
    logs
    ?
    logs.map((log) => {
      return <TableRow className="bg-green-50" key={log.id}>
      <TableCell className="font-medium ">{format(log.date, "PPP HH:mm", {locale: ru})}</TableCell>
      <TableCell>{log.name} и дата рождения</TableCell>
      <TableCell>{log.place}</TableCell>

      <TableCell>{log.cause}</TableCell>
      <TableCell>{log.circs}</TableCell>
      <TableCell>{log.gauge}</TableCell>
      <TableCell>{log.note}</TableCell>
      <TableCell>{log.liable}</TableCell>

    </TableRow>
    })

    :
    'событий не обнаружено'
  }

  </>

}
//<TableHead>вид нежелательного события</TableHead>
//<TableCell>{log.event}</TableCell>
//<TableCell>{log.comment}</TableCell>
//<TableHead>комментарий</TableHead>
 */