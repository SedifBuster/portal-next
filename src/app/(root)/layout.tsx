import { AppSidebar } from "./components/appSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarProvider>
    <AppSidebar />
    <main className="h-full">
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
}