import { useMemo, useState } from "react";
import { usePathname } from "next/navigation"

const useRoutes = () => {
  const pathname = usePathname()

  const [onRoutes] = useState([
    {
      label: "Форма записи",
      href: '/zhus/form',
      active: pathname === '/zhus/form',
    },
    {
      label: "Журнал учета событий",
      href: '/zhus/table',
      active: pathname === '/zhus/table'
    }
    ])

    const routes = useMemo(() => onRoutes, [pathname])

    return routes
}

export default useRoutes