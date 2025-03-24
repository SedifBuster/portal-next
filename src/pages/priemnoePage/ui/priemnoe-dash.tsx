"use client"

import * as React from "react"
import axios from "axios"
import { Department, Ward } from "@prisma/client"
import { PriemnoeCard } from "./priemnoe-card"

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      getDepartments()
      getWards()
      console.log('update')
    }, 10000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  console.log(isDepartments)
  return (
    <div className="w-full ml-2 mr-2  h-screen">
      <p className="font-medium text-lg">Панель информации</p>
      <div className="rounded-md border">
      {isDepartments? 
        onFilterDepartments(isDepartments).map((dep) => {
          return <PriemnoeCard dep={dep} key={dep.id} wards={onFilterWards(wards, dep.id)} allWards={wards} />
        })
      :
      ''}
      </div>
    </div>
  )
}