"use client"

import Link from "next/link"
import useRoutes from "../hooks/useRoutes"
import HeaderNavItem from "./headerNavItem"
import AuthForm from "./authForm"

export
  default function Header(
) {
  const routes = useRoutes()

  const postURL = "http://localhost:5020/api/auth/all"

  async function onPostData( postData: BodyInit): Promise<number> {

    try {
      const response = await fetch(postURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

      const data = await response.json()

      return data;
    } catch (error) {
      console.error('Error fetching data:', error)
      throw Error;
    }
  }

// pl-10 pr-10 pb-2
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
        <AuthForm postAuth={onPostData}/>
        {/*<div>D/L</div>*/}
        {/*<Button variant={'default'}>войти в аккаунт</Button>*/}
      </div>
      </div>
    </div>
  )
}