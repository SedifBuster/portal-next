'use client'


import { useEffect, useState } from "react"

import DesktopItem from "./DesktopItem"
import { useSession } from "next-auth/react"

import useRoutes from "@/src/app/hooks/useRoutes"
import usePrivateRoutes from "@/src/app/hooks/usePrivateRoutes"

export default function DesktopSidebar() {
    const routes = useRoutes()
    const privateRoutes = usePrivateRoutes()
    const [isOpen, setIsOpen] = useState(false)

    const session = useSession()

    useEffect(() => {
        if(session && session.status ===  "authenticated") setIsOpen(true) 
        else setIsOpen(false)
    }, [session, session.status, session.update])

    return (
        <div
            className="
               hidden
               lg:fixed
               lg:inset-y-0
               lg:left-0
               lg:z-40
               lg:w-60
               pl-4
               pr-6
               xl:pr-6
               xl:pl-4
               lg:overflow-y-auto
               lg:bg-white
               lg:border-r-[1px]
               lg:pb-4
               lg:flex
               lg:flex-col
               justify-between 
            "
        >
            <nav
                className="
                    mt-4
                    flex
                    flex-col
                    justify-between
                "
            >
                <ul
                    role="list"
                    className="
                    flex
                    flex-col
                    items-center
                    space-y-1
                    "
                >
                    {isOpen?
                    privateRoutes.map((item) => (
                        <DesktopItem 
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                        />
                    ))
                    :
                    routes.map((item) => (
                        <DesktopItem 
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                        />
                    ))
                    }
                </ul>
            </nav>
        </div>
    )
} 