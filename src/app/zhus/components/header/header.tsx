"use client"

import Link from "next/link"
import useRoutes from "../hooks/useRoutes"
import HeaderNavItem from "./headerNavItem"
import AuthForm from "./authForm"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export
  default function Header(
) {
  const routes = useRoutes()
  const session = useSession()

  return (
    <div className="flex border-b shadow-[0_50px_60px_-15px_rgba(0,0,0,0.07)]">
      <div className="container mx-auto flex p-2">
        <div>
          <Link href={"/zhus"}><h1 className="text-2xl">Журнал учета нежелательных событий при осуществлении медицинской деятельности</h1></Link>
          <div
            className="
            mt-2
            grid
            gap-2
            text-center
            lg:mb-0
            lg:w-full
            lg:grid-cols-4
            lg:text-left
          "
        >
          {
            routes.map(route => {
              return <HeaderNavItem key={route.label} route={route} />
            })
          }
        </div>
      </div>
      {/*login in portal*/}
      <div className="flex gap-6 justify-end">
        {
          session?.status === 'authenticated'
          ?
          <div
            className="
              flex
              justify-end
              p-2
              gap-4
              font-semibold
            "
          >
            <p>{session.data?.user?.name}</p>
        <p>{/*session.data?.user?.role*/}</p>
        <Button onClick={async() => {
          await signOut({
           redirect: false,
           callbackUrl: `/`
          })
         //router.push('/')
          localStorage.clear()
         }}
       >
      выйти
    </Button>
  </div>
          :
          <AuthForm />
        }
        
        {/*<div>Dark/Light</div>*/}
      </div>
      </div>
    </div>
  )
}