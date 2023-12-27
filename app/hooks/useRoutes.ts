import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation"
import {
    HiClipboardDocumentList,
    HiUserGroup,
    HiTableCells,
    HiOutlineArrowLeftOnRectangle,
    HiOutlineArrowRightOnRectangle
} from "react-icons/hi2"
import { signOut, useSession } from "next-auth/react";
import router from "next/router";

const useRoutes = () => {
    const pathname = usePathname()

    let session = useSession()

    //переделать основные роуты на основной стек + сигнаутовские
    const [onRoutes, setOnRoutes] = useState([
        {
            label: "войти",
            href: '/auth',
            active: pathname === '/auth',
            icon: HiOutlineArrowRightOnRectangle,
        }
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