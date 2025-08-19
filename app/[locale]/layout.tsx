import type React from "react"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
params: Promise<{ locale: string }>;
  }) {
  const { locale } = await(params);
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return (
    <>
      <head>
        <meta name="application-name" content="Modern Landing Page" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ModernLP" />
        <meta name="description" content="A modern, professional landing page with international support" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#06b6d4" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#06b6d4" />

        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-192x192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icon-192x192.png" color="#06b6d4" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      {children}
    </>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
