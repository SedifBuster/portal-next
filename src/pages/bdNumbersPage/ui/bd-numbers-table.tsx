import { Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow 
} from "@/src/shared/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"

export
  function BdNumbersTable() {

    const [numbers, setNumbers] = useState<any>([])


 let onGetRefNumbers = async () => {
    try {
      let result = await axios.get('/api/referenceNumbers')
      if (result.status === 200) setNumbers(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }

 useEffect(() => { onGetRefNumbers()}, [])

    return <div className=" flex">
      <div className="p-4 basis-1/2">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Отделение</TableHead>
              <TableHead>Где установлено</TableHead>
              <TableHead>Номер телефона</TableHead>
              <TableHead>Внутренний номер</TableHead>
              <TableHead>Оператор</TableHead>
              <TableHead>Ответственное лицо</TableHead>
              <TableHead>Тип устройства</TableHead>
              <TableHead>Модель устройства</TableHead>
              <TableHead>Примечание</TableHead>
              <TableHead>Переадресация на сотовый</TableHead>
              <TableHead>Подключено/изменение(дата)</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              numbers.map((number: any) => (
                <TableRow key={number.id}>
                  <TableCell className="font-medium">{number.place}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.department}</TableCell>
                  <TableCell className="font-medium">{number.number}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.internalNumber}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.operator}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.responsible}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.deviceType}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.deviceModel}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.note}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.forwarding}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.connected}</TableCell>
                  <TableCell className="font-medium tracking-wide">{number.status}</TableCell>
                </TableRow>
                    /*place           String?
    department      String?
    number          String?
    internalNumber  String?
    operator        String?
    responsible     String?
    deviceType      String?
    deviceModel     String?
    note            String?
    forwarding      String?
    connected       String?
    status          String? */

              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Всего номеров</TableCell>
              <TableCell className="text-right">{numbers.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  }