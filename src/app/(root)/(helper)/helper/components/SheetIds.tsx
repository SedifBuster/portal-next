'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

export function SheetIds() {

    /*console.log(localStorage.getItem('id'))

    const localIds = localStorage.getItem('id[]')

    const [isIds, setIsIds] = useState<string[]>([])

    useEffect(() => {
        if(localIds !== null && localIds.length > 0){
            setIsIds(JSON.parse(localIds))
        }
    }, [localIds])

    const onClear = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        localStorage.removeItem('id[]')
    }*/

    return (
        <div 
            className="
                flex
                flex-col
                gap-4
            "
        >
            {/*<div>
                <h5
                    className="
                        pt-2
                    "
                >История</h5>
                <ul>
                    {isIds.map((id) => {
                        return <li key={id}>{id}</li>
                    })}
                </ul>

            </div>
            <Sheet>
                <SheetTrigger 
                className="
                    mb-4
                "
                >Подробная информация по заявкам</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <Button 
            onClick={onClear}
            variant="secondary"
            >
                очистить историю</Button>*/}
        </div>
    )
}