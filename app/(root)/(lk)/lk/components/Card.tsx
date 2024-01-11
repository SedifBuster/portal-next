import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Department, Profile } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function UserCard(
  {
    department,
    profile,
    name
  }: {
    department: Department
    profile: Profile
    name: string | null | undefined
  }
) {
  const router = useRouter()
  let [userGrade, setUserGrade] = React.useState<string>('')

  let onChangeGrade = ( grade: string ) => {
      switch(grade) {
        case 'HEADNURSE': 
          setUserGrade('Старшая медсестра')
          break
        case 'NURSE':
          setUserGrade('Медсестра')
          break
        case 'CHIEFNURSE':
          setUserGrade('Главная медсестра')
          break
        case 'DEPNURSTAFF':
          setUserGrade('Зам. по среднему мед. персоналу')
          break
        case 'TECHNICICAN':
          setUserGrade('Технический специалист')
          break
        case 'CMO':
          setUserGrade('Нач. мед.')
          break
        default: 
          setUserGrade('Не определено')
      }
  }

  React.useEffect(() => {
    onChangeGrade(profile.grade)
  }, [])

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Информация пользователя</CardTitle>
        <CardDescription><Label>Ф.И.О.: </Label>{name}</CardDescription>
        <CardDescription><Label>Отделение: </Label>{department.name}</CardDescription>
        <CardDescription><Label>Должность: </Label>{userGrade}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={async() => {
                   await signOut({
                        redirect: false,
                        callbackUrl: `/`
                    })
                    router.push('/')
                    localStorage.clear()
                }}>Выйти из аккаунта</Button>
      </CardFooter>
    </Card>
  )
}
