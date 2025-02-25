'use client'

import { Button } from "@/src/shared/ui/button"



interface FileItemProps {
    name: string
    index: number
    deleteFile: (index: number) => void
}

export function FileItem({
    name,
    index,
    deleteFile
}: FileItemProps) {

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        deleteFile(index)
    }

    return (
        <li
            className="
                flex
                gap-4
                content-center
                items-center
            "
        >
            {name}
            <Button
                variant="destructive"
                size="icon"
                className="
                cursor-pointer
                h-8
            "
                onClick={(e) => {e.preventDefault(); deleteFile(index)}}
            >
                X
            </Button>
        </li>
    )
}