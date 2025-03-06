import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation"
import {
    HiClipboardDocumentList,
    HiUserGroup,
    HiTableCells,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowRightOnRectangle,
    HiOutlineHome,
    HiOutlineDocumentText,
    HiOutlineQueueList,
    HiOutlineNewspaper,
    HiOutlineClipboardDocumentCheck
} from "react-icons/hi2"
import { useSession } from "next-auth/react";


const useRoutes = () => {
    const pathname = usePathname()

    let session = useSession()

    //переделать основные роуты на основной стек + сигнаутовские
    const [onRoutes, setOnRoutes] = useState([
        {
            label: "главная",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/',
            active: pathname === '/',
            icon: HiOutlineHome,
        },
        {
            label: "войти",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/auth',
            active: pathname === '/auth',
            icon: HiOutlineArrowRightOnRectangle,
        },
        {
            label: "панель мон. прием. отд.",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/priemnoe',
            active: pathname === '/priemnoe',
            icon: HiOutlineQueueList,
        },
        {
            label: "база знаний",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/bdKnowledge',
            active: pathname === '/bdKnowledge',
            icon: HiOutlineNewspaper,
        },
        {
            label: "система учета заявок",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: 'http://192.168.0.148:5006/',
            active: pathname === 'http://192.168.0.148:5006/',
            icon: HiOutlineClipboardDocumentCheck,
        },
        {
            label: "журнал неж. случаев",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/zhus/table',
            active: pathname === '/zhus/table',
            icon: HiOutlineDocumentText,
        },
        {
            label: "журнал БРНС",// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: 'http://192.168.0.148:5010/',
            active: pathname === 'http://192.168.0.148:5010/',
            icon: HiOutlineDocumentText,
        },
        

    ])

    const routes = useMemo(() => onRoutes, [pathname])

    return routes
}

export default useRoutes

        /*{
            label: "главная",
            href: '/',
            icon: HiUserGroup,
            active: pathname === '/'
        },
        {
            label: "система учета заявок",
            href: '/helper',
            icon: HiClipboardDocumentList,
            active: pathname === '/helper'
        },
        {
            label: "журналы",
            href: '/journals',
            icon: HiTableCells,
            active: pathname === '/journals'
        },*/