import type { Metadata } from 'next'
import { VT323, Press_Start_2P, Anton } from 'next/font/google'
import './globals.css'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '// TAPE 01 — PERSONAL SITE',
  description: 'A VHS / CRT personal portfolio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${vt323.variable} ${pressStart.variable} ${anton.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
