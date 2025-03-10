import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import logoImage from "../../../../public/logo.png"
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
        <SidebarMenuItem>
        <SidebarMenuButton asChild>
        <Link href={'/'} className="flex items-center">
          <Image src={logoImage} alt="logo image" width={42}/>
          <p className="font-bold">Портал ВКБ №4</p>
        </Link>
        </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
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
    </Sidebar>
  )
}

/**
 * 
 главная
 войти
 панель мониторинга приемного отделения
 база знаний
 система учета заявок
 журнал нежелательных случаев
 журнал брнс
 */