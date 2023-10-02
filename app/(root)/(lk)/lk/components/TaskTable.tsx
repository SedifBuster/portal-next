"use client"

import { Task } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Search } from "./Search"

export function TaskTable() {

    const [isTasks, setIsTasks] = useState<Task[]>([])

    let getTasks = async () => {
      try {
        let result = await axios.get('/api/task')
        if(result.status === 200) {
            setIsTasks(result.data)
        }
      } catch {
        console.log('error')
      }
    }
    useEffect(() => {
        getTasks()
    }, [])
    

    return (
        <div 
            className="
                px-2
                py-2
                basis-5/6
                sm:w-full
                sm:h-screen
            "
        >
            <Search />
            {isTasks?.map((task) => {
                return <div key={task.id}><div>{task.cabinet}</div><div>{task.name}</div><div>{task.problem}</div></div>
            })}
            sda
        </div>
    )
}