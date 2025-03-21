"use client"

import useRoutes from "@/src/app/hooks/useRoutes"
import { AsideMain } from "./aside-main"
import { LinkMain } from "./link-main"

export
  function MainPage() {

  let routes = useRoutes()

  return <>
    <div className="flex flex-col w-full">
      <div
        className="
          rounded-md
          flex
          flex-wrap
          gap-4
        "
      >
        {
          routes.map((link) => {
            return link.group !== 'main' && <LinkMain href={link.href} key={link.href}
              target={link.target} text={link.label}/>
          })
        }
      </div>
      <AsideMain />
    </div>
  </>
}