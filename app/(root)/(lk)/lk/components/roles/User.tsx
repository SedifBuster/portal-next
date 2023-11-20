"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function User() {

    const session = useSession()

    const [isName, setIsName] = useState<string | null | undefined>('')
    const [isRole, setIsRole] = useState<string | null | undefined>('')
    const [isPanel, setIsPanel] = useState<string>()//<React.Component>

    useEffect(() => {
        if(session.status === "authenticated" && typeof session.data.user !== 'undefined') {
            setIsName(session.data?.user.name)
            setIsRole(localStorage.getItem('role'))
            setMiniInstruction(isRole)
        }
    }, [session, isRole])



    let setMiniInstruction = (role: string | null | undefined) => {
        if(typeof role === 'string')
        switch(role) {
            case 'admin':
                setIsPanel(
                    'Вы имеете возможность польностью контролировать приложение. Пользуйтесь этим.'
                )
                break
            case 'technicican':
                setIsPanel(
                    'Принимайте и выполняйте заявки. Еще можете их искать.'
                )
                break
            case 'sysadmin':
                setIsPanel(
                    'Направляйте техников волевой рукой. Организация процессов на ваших плечах.'
                )
                break
            case 'user':
                setIsPanel(
                    'Вы самый обычный юзер. Живите с этим.'
                )
                break
            default:
                setIsPanel(
                    'Счастливчик. Вас не определила система.'
                )
                break
        }
    }

    return (
        <div 
            className="

            "
        >
            <section
                className="
                    p-3
                    sm:mx-auto
                    sm:h-full
                    sm:w-full
                    bg-white
                    border-2
                    border-transparent
                    rounded-2xl
                    shadow-xl
                    flex
                    flex-col
                    gap-x-3
                    content-center
                "
            >
                <h4
                    className="
                        text-lg
                        leading-6
                        font-semibold
                        text-emerald-700
                    "
                >
                    Информация пользователя</h4>
                    <h5
                        className="
                            text-md
                            leading-6
                            font-semibold
                            text-gray-900
                        "   
                    >{isName}</h5>
                    <h6
                        className="
                            text-md
                            leading-6
                            font-semibold
                            text-gray-500
                        "
                    >{isRole}</h6>
                    <p
                        className="
                            text-sm
                            leading-6
                            font-semibold
                          text-gray-400  
                        "
                    >{isPanel}</p>
            </section>
        </div>
    )
}