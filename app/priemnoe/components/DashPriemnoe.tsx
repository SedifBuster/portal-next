"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { PriemnoeCard } from "./PriemnoeCard"
import { Department, Ward } from "@prisma/client"

export function DashPriemnoe() {

  const [isDepartments, setDepartments] = React.useState<Department[]>()
  const [wards, setWards] = React.useState<Ward[]>([])

  let onFilterDepartments = (deps: Department[]) => {
    let result = deps.filter((dep) => {
      return dep.name.toLowerCase() === "ТО".toLowerCase() 
      || dep.name.toLowerCase() === "НО".toLowerCase() 
      || dep.name.toLowerCase() === "ХО".toLowerCase() 
      || dep.name.toLowerCase() === "Реаб".toLowerCase()
    })
    return result
  }

  let getDepartments = async () => {
    try {
        let result = await axios.get('/api/department')
        if (result.status === 200) {
          setDepartments(result.data)
        }
    } catch {
        console.log('error')
    }
}
let getWards = async () => {
    try {
        let result = await axios.get('/api/ward')
        if (result.status === 200) {
            setWards(result.data)
        }
    } catch {
        console.log('error')
    }
}

let onFilterWards = (wards: Ward[], depId: number) => {
  let result = wards.filter((ward) => {
    return ward.depId === depId
  })
  return result
}

  React.useEffect(() => {
    getDepartments()
    getWards()
  }, [])

  console.log(isDepartments)
  return (
    <div className="w-full ml-2 mr-2">
      <div className="rounded-md border h-screen">
      {isDepartments? 
        onFilterDepartments(isDepartments).map((dep) => {
          return <PriemnoeCard dep={dep} key={dep.id} wards={onFilterWards(wards, dep.id)} />
        })
      :
      ''}
      </div>
    </div>
  )
}