import { useMemo, useState } from "react";
import { usePathname } from "next/navigation"
import {
    HiOutlineArrowRightOnRectangle,
    HiOutlineDocumentText,
    HiOutlineQueueList,
    HiOutlineNewspaper,
    HiOutlineClipboardDocumentCheck
} from "react-icons/hi2"
import logoImage from "../../../public/logo.png"
import { routesType } from "../types/TRoute";



const useRoutes = () => {

  const pathname = usePathname()

  const [onRoutes] = useState<routesType[]>([
    {
      label: "главная",
      group: 'main',
      href: '/',
      active: pathname === '/',
      target: '_self',
      icon: logoImage,
    },
    {
      label: "войти",
      group: 'main',
      href: '/auth',
      active: pathname === '/auth',
      target: '_self',
      icon: HiOutlineArrowRightOnRectangle,
    },
    {
      label: "панель мон. прием. отд.",
      group: 'inner',
      href: '/priemnoe',
      active: pathname === '/priemnoe',
      target: '_self',
      icon: HiOutlineQueueList,
    },
    {
      label: "база знаний",
      group: 'inner',
      href: '/bdKnowledge',
      active: pathname === '/bdKnowledge',
      target: '_self',
      icon: HiOutlineNewspaper,
    },
    {
      label: "отдел кадров",
      group: 'inner',
      href: '/hrDepartment',
      active: pathname === '/hrDepartment',
      target: '_self',
      icon: HiOutlineNewspaper,
    },
    {
      label: "журнал неж. случаев",
      group: 'journals',
      href: '/journals/zhus/table',
      active: pathname === '/journals/zhus/table',
      target: '_self',
      icon: HiOutlineDocumentText,
    },
    {
      label: "журнал ЗНО",
      group: 'journals',
      href: '/journals/zno',
      active: pathname === '/journals/zno',
      target: '_self',
      icon: HiOutlineDocumentText,
    },
    {
      label: "журнал БРНС",
      group: 'journals',
      href: 'http://192.168.0.148:5010/',
      active: pathname === 'http://192.168.0.148:5010/',
      target: 'blank',
      icon: HiOutlineDocumentText,
    },
    {
      label: "система учета заявок",
      group: 'outer',
      href: 'http://192.168.0.148:5006/',
      active: pathname === 'http://192.168.0.148:5006/',
      target: 'blank',
      icon: HiOutlineClipboardDocumentCheck,
    },
  ])

  const routes = useMemo(() => onRoutes, [pathname])

  return routes
}

export default useRoutes