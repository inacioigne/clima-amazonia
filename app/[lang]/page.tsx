import { isLocale, locales } from "@/lib/i18n";
import { notFound, redirect } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  const date = process.env.CURRENT_BOLETIM_DATE?.split("-") ?? [];
  const [yyyy, mm, dd] = date;
  redirect(`/${lang}/${yyyy}/${mm}${dd}`);

}