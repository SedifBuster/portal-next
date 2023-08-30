import { SideBar } from "@/components/sidebar/SideBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full">
      <SideBar>
      {children}
      </SideBar>
    </div>
  )
}
