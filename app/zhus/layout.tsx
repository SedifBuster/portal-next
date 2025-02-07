import Header from "./components/header/header"

export default function ZhusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <Header />
        {children}
      </>
  )
}