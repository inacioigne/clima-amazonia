import type boletim from "@/data/boletim/2026/0225.json";
import type messages from "@/data/i18n/pt.json"

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
type Boletim = typeof boletim;
type Messages = typeof messages



export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function detectLocaleFromHeader(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLanguages = acceptLanguage
    .split(",")
    .map((item) => item.split(";")[0]?.trim().toLowerCase())
    .filter(Boolean) as string[];

  for (const preferredLanguage of preferredLanguages) {
    const baseLanguage = preferredLanguage.split("-")[0];

    if (baseLanguage && isLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return defaultLocale;
}

export async function getBoletim(yyyy: string, mmdd: string): Promise<Boletim> {
 return (await import(`@/data/boletim/${yyyy}/${mmdd}.json`)).default;
}

export async function getPreviousBoletim(locale: Locale, v: string, n: string): Promise<Boletim> {
  switch (locale) {
    case "pt":
      return (await import(`@/data/boletim/previous/${v}/${n}/pt.json`)).default;
    case "en":
      return (await import(`@/data/boletim/previous/${v}/${n}/en.json`)).default;
    case "es":
      return (await import(`@/data/boletim/previous/${v}/${n}/es.json`)).default;
    default:
      return (await import(`@/data/boletim/previous/${v}/${n}/es.json`)).default;
  }
}

export async function getBulletin(locale: Locale, yyyy: string, mm: string, dd: string): Promise<Boletim> {
  switch (locale) {
    case "pt":
      return (await import(`@/data/boletim/${yyyy}/${mm}/${dd}/pt.json`)).default;
    case "en":
      return (await import(`@/data/boletim/${yyyy}/${mm}/${dd}/en.json`)).default;
    case "es":
      return (await import(`@/data/boletim/${yyyy}/${mm}/${dd}/es.json`)).default;
    default:
      return (await import(`@/data/boletim/${yyyy}/${mm}/${dd}/es.json`)).default;
  }
}


export async function getMessages(locale: Locale): Promise<Messages> {
  switch (locale) {
    case "pt":
      return (await import("@/data/i18n/pt.json")).default;
    case "en":
      return (await import("@/data/i18n/en.json")).default;
    case "es":
      return (await import("@/data/i18n/es.json")).default;
    default:
      return (await import("@/data/i18n/pt.json")).default;
  }
}
