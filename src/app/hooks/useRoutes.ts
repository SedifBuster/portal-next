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
import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

type routesType = {
  label: string,
  group: 'main' | 'journals' | 'inner' | 'outer',
  href: string,
  active: boolean,
  target: 'blank' | '_self',
  icon: StaticImageData | IconType
}

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
      label: "журнал неж. случаев",
      group: 'journals',
      href: '/zhus/table',
      active: pathname === 'http://192.168.0.148:3000/table',
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