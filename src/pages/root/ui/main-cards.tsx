"use client"

import useRoutes from "@/src/shared/hooks/useRoutes"
import { MainLink } from "./main-link"


export
  function MainCards() {

  let routes = useRoutes()

  return <div
    className="
      rounded-md
      flex
      flex-wrap
      gap-4
    "
  >
    {
      routes.map((link) => {
        return link.group !== 'main' && <MainLink href={link.href} key={link.href}
          target={link.target} text={link.label}/>
      })
    }
  </div>
}