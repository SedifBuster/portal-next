import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import { Toaster } from 'sonner'


const pfBeauSans = localFont({
  src: [
    {
      path: '../../public/fonts/PFBeauSansPro-Regular.woff',
      weight: '500',
      style: 'normal'
    }
  ],
  variable: '--font-pfBeauSans'
})

export const metadata: Metadata = {
  title: 'портал',
  description: 'все в одном месте',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={pfBeauSans.className}>
        <AuthContext>
        <ToasterContext />
        {children}
        <Toaster theme="light"/>
        </AuthContext>
      </body>
    </html>
  )
}