export
  default async function LkLayout({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <div className="h-full">
      { children }
    </div>
  )
}