import Header from "./components/header/header"


export default function ZhusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}

      </body>
    </html>
  )
}