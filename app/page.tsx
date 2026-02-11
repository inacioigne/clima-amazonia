import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";
import { headers } from "next/headers";
import { detectLocaleFromHeader } from "@/lib/i18n";

export default async function Page() {
  const headerStore = await headers();
  const locale = detectLocaleFromHeader(headerStore.get("accept-language"));
  redirect(`/${locale}`);
}
