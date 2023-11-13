"use client"

import { Task } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Search } from "./Search"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"


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

    // a little function to help us with reordering the result
    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
  
    return result;
    }



    let onDragEnd = (result: DropResult) => {
        const { destination, source } = result
        // dropped outside the list
        if(!destination) {
            return
        }
        if (
            destination.droppableId === source.droppableId && destination.index === source.index
        ) {
            return
        }
        //@ts-ignore
        const items: DropResult = reorder( isTasks , source.index,   destination.index )

        //@ts-ignore
        //setIsTasks(items)
    }

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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {
                        provided => (
                            <div ref={provided.innerRef} {...provided.droppableProps} 
                                className="
                                    h-2/3
                                    border-4
                                    flex
                                    flex-col
                                    gap-2
                                "
                            >
                                {isTasks?.map((task, index) => {
                                    return <Draggable draggableId={task.id.toString()} index={index}>
                                        {provided => (
                                            <div {...provided.draggableProps}
                                                 {...provided.dragHandleProps}
                                                 ref={provided.innerRef}
                                                 key={task.id}
                                                 className="
                                                    bg-white
                                                 "
                                                 >
                                                    <div>{task.id}</div>
                                                    <div>{task.createdAt.toString()}</div>
                                                    <div>{task.cabinet}</div>
                                                    <div>{task.name}</div>
                                                    <div>{task.number}</div>
                                                    <div>{task.problem}</div>
                                                    <div>{task.condition}</div>
                                                    <div>{task.category}</div>
                                                    <div>{task.priority}</div>
                                                </div>
                                        )}
                                            </Draggable>
                                })}

                            </div>
                        )
                    }
                    

                </Droppable>
                </DragDropContext>
        </div>
    )
}