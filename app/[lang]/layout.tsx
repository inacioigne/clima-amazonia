import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { getMessages, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const messages = await getMessages(lang);

  return (
    <div lang={lang} //className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
    >
      <NavBar lang={lang} messages={messages.nav} />
      {children}
      <Footer messages={messages.footer} />
    </div>
  );
}
