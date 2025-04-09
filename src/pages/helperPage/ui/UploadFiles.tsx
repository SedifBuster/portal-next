'use client'

import { Dispatch, SetStateAction, useEffect } from "react"
import { FileItem } from "./FileItem"

const MAX_FILE_SIZE = 1000000
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const FILE_QUANTITY = 10

interface UploadFilesProps {
    files: File[],
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function UploadFiles({
    setFiles,
    files
}: UploadFilesProps) {

    const newFiles: File[] = []

    let handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
            if (event.target.files?.length < FILE_QUANTITY) {
                for (let i = 0; i < event.target.files?.length; i++) {
                    if (event.target.files[i].size < MAX_FILE_SIZE)
                        newFiles.push(event.target.files[i])
                }
                if (files.length === 0) {
                    setFiles(newFiles)
                } else if (files.length > 0) {
                    for (let i = 0; i < event.target.files?.length; i++) {
                        if (event.target.files[i].size < MAX_FILE_SIZE)
                            setFiles((state: any) => [...state, newFiles[i]])
                    }
                }
            }
    }

    /*var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
        var label	 = input.nextElementSibling,
            labelVal = label.innerHTML;
    
        input.addEventListener( 'change', function( e )
        {
            var fileName = '';
            if( this.files && this.files.length > 1 )
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            else
                fileName = e.target.value.split( '\' ).pop();
    
            if( fileName )
                label.querySelector( 'span' ).innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });
    });*/


    const deleteLocalFile = (index: number) => {
        files.splice(index, 1)
    }

    useEffect(() => {
        console.log('update')

    }, [files, deleteLocalFile])

    return (
        <div>
            <label
                className="
                    hover:border-b-2
                    cursor-pointer
                "
            >
                <input
                    type="file"
                    name="file"
                    onChange={handleFile}
                    className="
                        hidden
                    "
                />
                прикрепить файлы

            </label>
            <div 
                className="
                    flex
                    flex-col
                    gap-1
                "
            >
                {files.map(
                    (file, index) => {
                        return <FileItem key={index} name={file.name} index={index} deleteFile={deleteLocalFile} />
                    }
                )
                }
            </div>
        </div>
    )
}