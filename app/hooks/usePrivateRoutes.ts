import {useMemo, useState } from "react";
import { usePathname } from "next/navigation"
import {
    HiClipboardDocumentList,
    HiUserGroup,
    HiTableCells,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowRightOnRectangle
} from "react-icons/hi2"


const usePrivateRoutes = () => {
    const pathname = usePathname()


    //переделать основные роуты на основной стек + сигнаутовские
    const [onRoutes, setOnRoutes] = useState([
        {
            label: 'личный кабинет',// session.status ===  "authenticated"? "войти" : 'личный кабинет',
            href: '/auth',
            active: pathname === '/auth',
            icon: HiOutlineArrowRightOnRectangle,
        }
    ])

    const routes = useMemo(() => onRoutes, [pathname])

    return routes
}

export default usePrivateRoutes

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