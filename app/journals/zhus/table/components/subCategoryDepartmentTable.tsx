import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IZhus } from "../page";
import { DepartmentRow } from "./departmentRow";

export
  function SubCategoryDepartmentTable(
    {
      logs,
      onChangeComment,
      onFetchData,
      color,
      colorRow
    } : {
    logs: IZhus[]
    onChangeComment: (id: number, comment: string) => Promise<string | number>
    onFetchData: (url: string) => Promise<IZhus[]>
    color?: string
    colorRow?: string
    }
) {

  return  <Table className="w-full">
    <TableHeader  className={color}>
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
          return <DepartmentRow key={log.id} log={log} onChangeComment={onChangeComment} onFetchData={onFetchData} rowColor={colorRow}/>
        })
        :
        'событий не обнаружено'
      }
    </TableBody>
  </Table>
}