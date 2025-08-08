"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import logoImage from "../../../public/logo.png"

import Link from "next/link";
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import useRoutes from "../hooks/useRoutes";
import usePrivateRoutes from "../hooks/usePrivateRoutes";
import { routesType } from "../types/TRoute";

export
  function AppSidebar() {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const session = useSession()
  const routes = useRoutes()
  const privateRoutes = usePrivateRoutes()

  useEffect(() => {
    if(session && session.status ===  "authenticated") setIsOpen(true) 
    else setIsOpen(false)
  }, [session, session.status, session.update])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild>
        <Link href={'/'} className="flex items-center">
          <Image src={logoImage} alt="logo image" width={42}/>
          <p className="font-bold">Портал ВКБ №4</p>
        </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SideBarContent routes={isOpen? privateRoutes : routes}/>
    </Sidebar>
  )
}

function SideBarContent (
  {
    routes
  }: {
    routes: routesType[]
  }
) {
  return <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'main')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="select-none">
              Журналы
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'journals')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel className="select-none">
              Внутренние ссылки
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'inner')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="select-none">
              Внешние ссылки
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                if(item.group === 'outer')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
}

/*
 * <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
        <SidebarMenuButton asChild>
        <Link href={'/'} className="flex items-center">
          <Image src={logoImage} alt="logo image" width={42}/>
          <p className="font-bold">Войти</p>
        </Link>
        </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <a href={item.href}>
                        <span>{item.label}</span>
                      </a>

                       <SidebarGroup >
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />




        {
        isOpen
        ?
        privateRoutes.map((item) => {
            return <Link href={item.href} className="flex items-center">
              <p className="font-bold">{item.label}</p>
            </Link>
          })
        :
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'main')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel className="select-none">
              Журналы
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'journals')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup >
            <SidebarGroupLabel className="select-none">
              Внутренние ссылки
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                  if(item.group === 'inner')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="select-none">
              Внешние ссылки
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => {
                if(item.group === 'outer')
                  return <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <span className="cursor-pointer">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                })
                }
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      }

{
  "department":"Therapeutic",
  "name":"Афанасьева Людмила Александровна, 14.09.1974г.р.",
  "date":"2025-08-07T02:40:28.134Z",
  "place":"Терапевтическое отделение, палата 320",
  "event":"Hematomas",
  "circs":"Афанасьева Людмила Александровна, 14.09.1974г.р. поступила в отделение терапии с гематомами на левой голени.",
  "gauge":"Оповещение лечащего доктора, внесение записи ЖУС.",
  "note":"","liable":"Абрамова Е.В.",
  "cause":"Афанасьева Людмила Александровна, 14.09.1974г.р. поступила в отделение терапии с гематомами.",
  "comment":null,
  "id":1163
}
*/