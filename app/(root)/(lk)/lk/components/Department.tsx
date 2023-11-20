"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { User } from "./roles/User"
import { Admin } from "./roles/Admin"
import { Technicican } from "./roles/Technicican"
import { Sysadmin } from "./roles/Sysadmin"

export function Department() {

    const session = useSession()

    const [isRole, setIsRole] = useState<string | null | undefined>('')
    const [isPanel, setIsPanel] = useState<React.ReactElement>()

    useEffect(() => {
        if(session.status === "authenticated" && typeof session.data.user !== 'undefined') {
            setIsRole(localStorage.getItem('role'))
            setDash(isRole)
        }
    }, [session, isRole])

    let setDash = (role: string | null | undefined) => {
        if(typeof role === 'string')
        switch(role) {
            case 'admin':
                setIsPanel(<Admin />)
                break
            case 'technicican':
                setIsPanel(<Technicican />)
                break
            case 'sysadmin':
                setIsPanel(<Sysadmin />)
                break
            case 'user':
                setIsPanel(<User />)
                break
            default:
                setIsPanel(<User />)
                break
        }
    }

    return (
        <main 
            className="
                w-full
                h-full
                bg-slate-200
            "
        >
            {isPanel}
        </main>
    )
}