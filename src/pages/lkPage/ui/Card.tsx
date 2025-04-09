import * as React from "react"


import { Department, Profile } from "@prisma/client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/shared/ui/card"
import { Label } from "@/src/shared/ui/label"
import { Button } from "@/src/shared/ui/button"
/*cool */
export
  function UserCard(
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

    let onTranslateGrade = ( grade: string ) => {
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
      onTranslateGrade(profile.grade)
    }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Информация пользователя</CardTitle>
        <CardDescription>
          <Label>
            Ф.И.О. : {name}
          </Label>
        </CardDescription>
        <CardDescription>
          <Label>
            Отделение: {department.name}
          </Label>
        </CardDescription>
        <CardDescription>
          <Label>
            Должность: {userGrade}
          </Label>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          onClick={
            async() => {
              await signOut({
                redirect: false,
                callbackUrl: `/`
              })
              router.push('/')
              localStorage.clear()
            }
          }
        >
          Выйти из аккаунта
        </Button>
      </CardFooter>
    </Card>
  )
}