import type ptBoletim from "@/data/boletim/current/pt.json";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
type Boletim = typeof ptBoletim;

// export type BoletimAnalysisItem = Omit<BoletimPt["analysis"][number], "text"> & {
//   text?: string;
//   content?: string;
//   climatologia?: string;
//   observados?: string;
//   anomalia?: string;
//   classification?: string;
//   prognostico?: string;
// };

// export type Boletim = Omit<BoletimPt, "analysis" | "multimodel"> & {
//   analysis: BoletimAnalysisItem[];
//   multimodel?: BoletimPt["multimodel"];
// };

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

export async function getBoletim(locale: Locale): Promise<Boletim> {
  switch (locale) {
    case "pt":
      return (await import("@/data/boletim/current/pt.json")).default;
    case "en":
      return (await import("@/data/boletim/current/en.json")).default;
    case "es":
      return (await import("@/data/boletim/current/es.json")).default;
    default:
      return (await import("@/data/boletim/current/pt.json")).default;
  }
}

export async function getMessages(locale: Locale) {
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
