
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/src/shared/ui/appSidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarProvider>
    <AppSidebar />
    <main className="h-full w-full p-[min(1em,8%)]">
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
}