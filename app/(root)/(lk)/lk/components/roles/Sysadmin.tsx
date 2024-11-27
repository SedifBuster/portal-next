"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
//wtf
export
  function Sysadmin() {

  const session = useSession()

  const [isName, setIsName] = useState<string | null | undefined>('')
  const [isRole, setIsRole] = useState<string | null | undefined>('')
  const [isPanel, setIsPanel] = useState<string>()

  useEffect(() => {
    if(session.status === "authenticated" && typeof session.data.user !== 'undefined') {
      setIsName(session.data?.user.name)
      setIsRole(localStorage.getItem('role'))
      setMiniInstruction(isRole)
    }
  }, [session, isRole])

  let setMiniInstruction = (role: string | null | undefined) => {
    if(typeof role === 'string')
      switch(role) {
        case 'admin':
          setIsPanel(
            ''
          )
          break
        case 'technicican':
          setIsPanel(
            ''
          )
          break
        case 'sysadmin':
          setIsPanel(
            ''
          )
          break
        case 'user':
          setIsPanel(
            ''
          )
          break
        default:
          setIsPanel(
            ''
          )
          break
      }
  }

  return (
    <div 
      className="
      "
    >
      <section
        className="
          p-3
          sm:mx-auto
          sm:h-full
          sm:w-full
          bg-white
          border-2
          border-transparent
          rounded-2xl
          shadow-xl
          flex
          flex-col
          gap-x-3
          content-center
        "
      >
        <h4
          className="
            text-lg
            leading-6
            font-semibold
             text-emerald-700
          "
        >
          Информация пользователя
        </h4>
        <h5
          className="
            text-md
            leading-6
            font-semibold
            text-gray-900
          "
        >
          {isName}
        </h5>
        <h6
          className="
            text-md
            leading-6
            font-semibold
            text-gray-500
          "
        >
          {isRole}
        </h6>
        <p
          className="
            text-sm
            leading-6
            font-semibold
            text-gray-400  
          "
        >
          {isPanel}
        </p>
      </section>
    </div>
  )
}