import { useMemo } from "react";
import { usePathname } from "next/navigation"
import {
    HiClipboardDocumentList,
    HiUserGroup,
    HiTableCells,
    HiOutlineArrowLeftOnRectangle
} from "react-icons/hi2"

const useRoutes = () => {
    const pathname = usePathname()

    const routes = useMemo(() => [
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
        {
            label: "войти",
            href: '/auth',
            active: pathname === '/auth',
            icon: HiOutlineArrowLeftOnRectangle,
        }
    ], [pathname])

    return routes
}

export default useRoutes