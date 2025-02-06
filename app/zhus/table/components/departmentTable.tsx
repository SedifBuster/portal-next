import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      return <TableRow className="bg-green-50" key={log.id}>
      <TableCell className="font-medium ">{format(log.date, "PPP HH:mm", {locale: ru})}</TableCell>
      <TableCell>{log.name} </TableCell>{/**и дата рождения */}
      <TableCell className="w-2">{log.place}</TableCell>

      <TableCell>{log.cause}</TableCell>
      <TableCell>{log.circs}</TableCell>
      <TableCell>{log.gauge}</TableCell>
      <TableCell className="w-2">{log.note}</TableCell>
      <TableCell>{log.liable}</TableCell>
      <TableCell>{log.comment}</TableCell>

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