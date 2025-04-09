"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { User } from "./roles/User"
import { Admin } from "./roles/Admin"
import { Technicican } from "./roles/Technicican"
import { Sysadmin } from "./roles/Sysadmin"
import LkHeader from "@/src/widgets/headers/lkHeader"


export
  function Department(
) {
  const session = useSession()

  const [isRole, setIsRole] = useState<string | null | undefined>('')
  const [isPanel, setIsPanel] = useState<React.ReactElement>()

  useEffect(() => {
    if(session.status === "authenticated" && typeof session.data.user !== 'undefined') {
      setIsRole(session.data.user.role)
    }
  }, [session])

  useEffect(() => {
    if(isRole) {
      setDash(isRole)
    }
  }, [isRole])

  let setDash = (role: string) => {
    if(typeof role === 'string')
      switch(role) {
        case 'ADMIN':
          setIsPanel(<Admin />)
          break
        case 'TECHNICIAN':
          setIsPanel(<Technicican />)
          break
        case 'SYSADMIN':
          setIsPanel(<Sysadmin />)
          break
        case 'USER':
          setIsPanel(<User />)
          break
        default:
          setIsPanel(<User />)
          break
      }
  }

  return (
    <main
      className="
        w-full
        h-[100vh]
      "
    >
      <LkHeader userData={session.data?.user}/>
      {isPanel}
    </main>
  )
}