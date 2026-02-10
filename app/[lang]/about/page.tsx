import Link from "next/link";
import { notFound } from "next/navigation";
import { FaInstagram, FaGlobe, FaEnvelope } from "react-icons/fa6";
import { getMessages, isLocale } from "@/lib/i18n";

const socialLinks = [
  {
    key: "instagram",
    href: "https://www.instagram.com/clima.amazonia/",
    icon: FaInstagram,
  },
  {
    key: "website",
    href: "https://www.gov.br/inpa",
    icon: FaGlobe,
  },
  {
    key: "email",
    href: "mailto:climaamazonia@inpa.gov.br",
    icon: FaEnvelope,
  },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const messages = await getMessages(lang);

  return (
    <div className="bg-linear-to-br from-green-50/50 to-blue-50/40 py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="border border-gray-200 bg-white shadow-sm rounded-2xl p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-3">
            {messages.about.kicker}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {messages.about.title}
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed ">
            {messages.about.description}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {messages.about.socialTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {socialLinks.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{messages.about.socialLabel}</p>
                  <p className="text-base font-semibold text-gray-900">
                    {messages.about.socials[key]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
