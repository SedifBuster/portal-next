import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

export async function SideBar({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileFooter />
            <main className="lg:pl-60 h-full">
            {children}
            </main>
        </div>
    )
}