"use client"

import { Task } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

export function Search() {

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
                sm:mx-auto
                sm:w-full
                sm:h-20
                border-2
                border-gray-900
                bg-white
            "
        >
            search
        </div>
    )
}