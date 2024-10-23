"use client"

import { signOut } from "next-auth/react"
import { Button } from "../button"
import { useRouter } from "next/navigation"


export
  default function LkHeader(
    {
      userData
    }: {
      userData: any
    }
) {
  const router = useRouter()

  return <div
    className="
      flex
      justify-end
      p-2
      gap-4
      font-semibold
      
    "
  >
    <p>{userData?.name}</p>
    <p>{userData?.role}</p>
    <Button onClick={async() => {
      await signOut({
        redirect: false,
        callbackUrl: `/`
      })
      router.push('/')
      localStorage.clear()
      }}
    >
      выйти
    </Button>
  </div>
}