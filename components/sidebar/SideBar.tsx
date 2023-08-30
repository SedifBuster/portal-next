export async function SideBar({children}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            {children}
        </div>
    )
}