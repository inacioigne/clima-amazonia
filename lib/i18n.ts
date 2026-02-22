import type ptBoletim from "@/data/boletim/current/pt.json";
import { getCurrentBoletimDataDir } from "@/lib/env";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
type Boletim = typeof ptBoletim;

async function readBoletimFile(filePath: string): Promise<Boletim> {
  const fileContent = await readFile(filePath, "utf-8");
  return JSON.parse(fileContent) as Boletim;
}

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
  const currentBoletimDir = getCurrentBoletimDataDir();
  const currentBoletimFile = path.join(process.cwd(), currentBoletimDir, `${locale}.json`);

  try {
    return await readBoletimFile(currentBoletimFile);
  } catch {
    if (currentBoletimDir === "data/boletim/current") {
      throw new Error(`Boletim file not found: ${currentBoletimFile}`);
    }

    const fallbackFile = path.join(process.cwd(), "data/boletim/current", `${locale}.json`);
    return readBoletimFile(fallbackFile);
  }
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
