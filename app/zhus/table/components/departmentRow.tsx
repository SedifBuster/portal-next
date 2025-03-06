import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IZhus } from "../page";
import { ru } from "date-fns/locale"
import { format } from "date-fns"

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

import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";



export
  function DepartmentRow(
  {
    log,
    onChangeComment,
    onFetchData
  } : {
    log: IZhus
    onChangeComment: (id: number, comment: string) => Promise<string | number>
    onFetchData: (url: string) => Promise<IZhus[]>
  }
) {

  const [isComment, setComment] = useState(log.comment?log.comment : '')
  const [isProfile, setProfile] = useState<string>()

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

  useEffect(() => {
    if (session.status === "authenticated" && typeof session.data.user !== 'undefined') {
      getProfile(Number(session.data.user.id))
  }}, [])

  console.log(isProfile)

  /*const onTestComment = async (id: number, comment: string, url: string) => {
    onChangeComment(id, comment)

    const result = await onFetchData('http://localhost:5020/api/logs/')
    //if(result)


  }*/
  //console.log(session.data)

  //тут обновление по айди
  
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
      {
        //session.status === "authenticated"
        //&& typeof session.data.user !== 'undefined'
        //&& session.data.user.role === 'ADMIN'//(session.data.user.role === 'ADMIN' || session.data.user.role === 'USER')
        isProfile === 'CHIEFNURSE' || isProfile === 'TECHNICICAN'
        ?
        //isProfile && (isProfile === 'CMO' || isProfile === 'TECHNICICAN')
       //?
    <Dialog>
      <DialogTrigger asChild>
       <div className="w-20 h-20">{isComment}</div> 
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
            <p className="font-semibold">Отделение: <p className="font-normal">{log.department}</p></p>
            <p className="font-semibold">Дата: <p  className="font-normal">{format(new Date(log.date), "PPP HH:mm", {locale: ru})}</p></p>
            <p className="font-semibold">Имя пациента: <p className="font-normal">{log.name}</p></p>
            <p className="font-semibold">Место нежелательного события: <p  className="font-normal">{log.place}</p></p>
            <p className="font-semibold">Причина возникновения неж события: <p  className="font-normal">{log.cause}</p></p>
            <p className="font-semibold">Описание обстоятельств: <p  className="font-normal">{log.circs}</p></p>
            <p className="font-semibold">Принятые меры: <p  className="font-normal">{log.gauge}</p></p>
            <p className="font-semibold">Примечание: <p  className="font-normal">{log.note}</p></p>
            <p className="font-semibold">Ответственный: <p  className="font-normal">{log.liable}</p></p>
            <p className="font-semibold">Комментарий: </p>
            <Textarea value={isComment} onChange={(e) => setComment(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onChangeComment(log.id, isComment)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    :
    <div className="w-20 h-20">{log.comment}</div> 
          //:
          //<div className="w-20 h-20">{log.comment}</div> 
    }
    </TableCell>
  </TableRow>
}


