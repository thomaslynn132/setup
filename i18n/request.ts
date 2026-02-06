import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // If locale is missing or invalid, fall back to default
  const safeLocale = routing.locales.includes(locale as any)
    ? (locale as string)
    : routing.defaultLocale; // e.g. "en"
// abcd
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});
