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

  return <section 
    className="
    "
  >
    <UserCreate departments={departments} onGetUsers={onGetUsers}/>
    <UsersTable users={users} onGetUsers={onGetUsers}/>
  </section>
}
/**
 * <section
      className="
        mt-4
      "
    >
      
      <ul
        className="
          flex
          flex-col
          gap-4
        "
      >
        {users ? users.map((user) => {
          return <li key={user.id}
            className="
              flex
              justify-between
              p-2
              border
            "
          >
            <div
              className="
                flex
                gap-4
              "
            >
              <div>{user.id}</div>
              <div>{user.name}</div>
            </div>
            <div
              className="
                flex
                gap-4
              "
            >
              <div>{user.role}</div>
              <div>{user.login}</div>
            </div>
            <div
              className="
                flex
                gap-4
              "
            >
              <div>создана: {user.createdAt.toString()}</div>
              <div>изменена: {user.updatedAt.toString()}</div>
            </div>
            <div
              className="
                flex
                gap-4
              "
            >
              <Button variant={'outline'} onClick={onChangeUser}><HiPencil /></Button>
              <Popover>
                <PopoverTrigger>
                  <Button variant={'destructive'}><HiTrash /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Удаление</h4>
                      <p className="text-sm text-muted-foreground">
                        Вы действительно хотите удалить пользователя?
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Button variant={'destructive'} onClick={() => onDeleteUser(user.id)}>удалить</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </li>
        }) : ''}
      </ul>
    </section>
 */

