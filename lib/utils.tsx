"use client"

import moment from "moment"
import { useLocale } from "next-intl"
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}
export function toDisplayTimeDate(date: Date, type: "Date" | "Time"): string {
  const momentDate = moment(date)

  if (type === "Date") {
    return momentDate.format("MMM DD, YYYY")
  } else if (type === "Time") {
    return momentDate.format("HH:mm")
  }

  return momentDate.format("MMM DD, YYYY HH:mm")
}

export function getLanguage(): string {
  if (typeof window !== "undefined") {
    // Client-side: get from URL or localStorage
    const pathname = window.location.pathname
    const locale = pathname.split("/")[1]
    if (["en", "my", "zh"].includes(locale)) {
      return locale
    }
  }
  return "en" // default fallback
}

export function useCurrentLanguage(): string {
  const locale = useLocale()
  return locale || "en"
}

export function formatDateWithLocale(date: Date, locale = "en"): string {
  const momentDate = moment(date)

  switch (locale) {
    case "my":
      return momentDate.format("DD/MM/YYYY")
    case "zh":
      return momentDate.format("YYYY年MM月DD日")
    default:
      return momentDate.format("MMM DD, YYYY")
  }
}

export function formatTimeWithLocale(date: Date, locale = "en"): string {
  const momentDate = moment(date)

  switch (locale) {
    case "my":
    case "zh":
      return momentDate.format("HH:mm")
    default:
      return momentDate.format("h:mm A")
  }
}

export function getRelativeTime(date: Date, locale = "en"): string {
  moment.locale(locale === "my" ? "en" : locale) // fallback for Myanmar
  return moment(date).fromNow()
}

export function formatCurrency(amount: number, currency = "USD", locale = "en"): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    my: "en-US", // Myanmar uses USD commonly
    zh: "zh-CN",
  }

  const currencyMap: Record<string, string> = {
    en: "USD",
    my: "MMK",
    zh: "CNY",
  }

  return new Intl.NumberFormat(localeMap[locale] || "en-US", {
    style: "currency",
    currency: currency || currencyMap[locale] || "USD",
  }).format(amount)
}

export function formatNumber(num: number, locale = "en"): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    my: "en-US",
    zh: "zh-CN",
  }

  return new Intl.NumberFormat(localeMap[locale] || "en-US").format(num)
}

export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
