"use client"

import { useEffect, useState } from "react"
import { Department, User} from "@prisma/client"
import axios from "axios"
import { UserCreate } from "./UserCreate"
import { UsersTable } from "./UsersTable"

export
  function AccountTab(
) {
  const [departments, setDepartments] = useState<Department[]>([])
  const [users, setUsers] = useState<User[]>([])

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

  useEffect(() => {onGetUsers(); onGetDepartments()}, [])

  return <section>
    <UserCreate departments={departments} onGetUsers={onGetUsers}/>
    <UsersTable users={users} onGetUsers={onGetUsers}/>
  </section>
}