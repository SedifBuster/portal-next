"use client"

import { useEffect, useState } from "react"
import { Department, ReferenceNumbers, User} from "@prisma/client"
import axios from "axios"
import { UserCreate } from "./UserCreate"
import { UsersTable } from "./UsersTable"
import { ReferenceNumbersPage } from "./ReferenceNumbers"
import { ReferenceNumbersCreate } from "./ReferenceNumbersCreate"

export
  function AccountTab(
) {
  const [departments, setDepartments] = useState<Department[]>([])
  const [users, setUsers] = useState<User[]>([])

  const [referenceNumbers, setReferenceNumbers] =useState<ReferenceNumbers[]>([])

  let onGetDepartments = async () => {
    try {
      let result = await axios.get('/api/department')
      if(result.status === 200) setDepartments(result.data)
    } catch(error) {
      console.log('error', error)
    }
  }
  let onGetUsers = async () => {
    try {
      let result = await axios.get('/api/users')
      if (result.status === 200) setUsers(result.data)
    } catch(error) {
      console.log('error: ', error)
    }
  }

  let onGetReferenceNumbers = async () => {
    try {
      let result = await axios.get('/api/referenceNumbers')
      if(result.status === 200) setReferenceNumbers(result.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {onGetUsers(); onGetDepartments(); onGetReferenceNumbers()}, [])

  return <section>
    <UserCreate departments={departments} onGetUsers={onGetUsers}/>
    <UsersTable users={users} onGetUsers={onGetUsers}/>
    <ReferenceNumbersCreate onGetReferenceNumbers={onGetReferenceNumbers}/>
    <ReferenceNumbersPage  referenceNumbers={referenceNumbers} onGetReferenceNumbers={onGetReferenceNumbers}/>
  </section>
}