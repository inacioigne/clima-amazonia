import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { detectLocaleFromHeader } from "@/lib/i18n";

export default async function Page() {
  const headerStore = await headers();
  const locale = detectLocaleFromHeader(headerStore.get("accept-language"));
  const date = process.env.CURRENT_BOLETIM_DATE?.split("-") ?? [];
  const [yyyy, mm, dd] = date;
  redirect(`/${locale}/${yyyy}/${mm}${dd}`);
}
