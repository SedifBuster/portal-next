'use client'

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"

import MobileItem from "./MobileItem"
import usePrivateRoutes from "@/app/hooks/usePrivateRoutes"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

export default function MobileFooter() {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    const privateRoutes = usePrivateRoutes()
    const [isPrivate, setIsPrivate] = useState(false)

    const session = useSession()

    useEffect(() => {
        if(session && session.status ===  "authenticated") setIsPrivate(true) 
        else setIsPrivate(false)
    }, [session, session.status, session.update])

    if (isOpen) {
        return null
    }

    return (
        <div
            className="
                fixed
                justify-between
                w-full
                bottom-0
                z-40
                flex
                items-center
                bg-white
                border-t-[1px]
                lg:hidden
            "
        >
            {isPrivate?
                    privateRoutes.map((route) => (
                            <MobileItem 
                                key={route.href}
                                href={route.href}
                                active={route.active}
                                icon={route.icon}

                            />
                        ))
                    :
                    routes.map((route) => (
                        <MobileItem 
                            key={route.href}
                            href={route.href}
                            active={route.active}
                            icon={route.icon}
                        />
                    ))
                    }
        </div>
    )
}