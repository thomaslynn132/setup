import type React from "react"
import { Geist, Manrope } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export default async function RootLayout({
  children,
   params,
}: {
  children: React.ReactNode
params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages()
   const { locale } = await params;
  return (
    <html lang={locale} className={`${geist.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <body>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
