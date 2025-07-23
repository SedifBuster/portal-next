"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminTab } from "./adminTabs/AdminTab"
import { AccountTab } from "./adminTabs/account/AccountTab"
import { NewsTab } from "./adminTabs/news/NewsTab"
import { FilesTab } from "./adminTabs/files/FilesTab"
import { DepartmentsTab } from "./adminTabs/departments/DepartmentsTab"
//cool
export
  function Admin(
) {

  const tabs = [
    {
      value: "accounts",
      title: "Пользователи/номера",
      description: "Список пользователей приложения. Добавляйте, изменяйте и удаляйте аккаунты здесь.",
      tabContent: <AccountTab />
    },
    {
      value: "departments",
      title: "Отделения",
      description: "Change your password here. After saving, you'll be logged out.",
      tabContent: <DepartmentsTab />
    },
    {
      value: "news",
      title: "Новости",
      description: "Управляйте новостной лентой здесь.",
      tabContent: <NewsTab />
    },
    {
      value: "files",
      title: "Файлы",
      description: "Управление файлами базы знаний",
      tabContent: <FilesTab />
    },
    {
      value: "settings",
      title: "Настройки",
      description: " ",
      tabContent: <div>еще не реализовано</div>
    },
  ]

  return <section
    className="
      bg-white
      p-2
    "
  >
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        {
          tabs.map((tab) => {
            return <TabsTrigger key={tab.title} value={tab.value}>{tab.title}</TabsTrigger>
          })
        }
      </TabsList>
      {
        tabs.map(tab => {
          return <AdminTab key={tab.title} value={tab.value} title={tab.title} description={tab.description} tabContent={tab.tabContent}/>
        })
      }
    </Tabs>
  </section>
}