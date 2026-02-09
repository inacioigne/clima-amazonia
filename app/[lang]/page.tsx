import Image from "next/image";
import Link from "next/link";
import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { GiRiver } from "react-icons/gi";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FcDataSheet } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FcTreeStructure } from "react-icons/fc";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const sections = [
  {
    title: "Análise por Bacia Hidrográfica",
    href: "/bacia",
    icon: GiRiver,
  },
  {
    title: "Previsão Multimodelo Sub-sazonal",
    href: "/multimodel",
    icon: MdOutlineAutoGraph,
  },
  {
    title: "Valores de Referência",
    href: "/reference",
    icon: FcDataSheet,
  },
  {
    title: "Comportamento das anomalias",
    href: "/anomaly",
    icon: FcComboChart,
  },
   {
    title: "Diagrama unifilar das bacias",
    href: "/unifilar",
    icon: FcTreeStructure,
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const [boletim, messages] = await Promise.all([
    getBoletim(lang),
    getMessages(lang),
  ]);

  return (
    <div className="space-y-12">
      <section className="bg-linear-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 ">
            <div className="col-span-1 space-y-6">
              <div className="space-y-2 ">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {boletim.title}
                </h1>
                <p className="text-xl text-green-700 font-semibold">
                  {messages.home.basin}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    {messages.home.volume} {boletim.volume} - {messages.home.number} {boletim.number}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">{messages.home.pubDate}:</span> {boletim.date}
                  </p>
                  <p>
                    <span className="font-medium">{messages.home.periodicity}:</span> {messages.home.weekly}
                  </p>
                  <p className="font-mono text-xs">ISSN {boletim.issn} • DOI {boletim.doi}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <div className="w-full">
                <Image
                  src={`/boletim/current/${boletim.current_conditions.map_current_conditions}`}
                  alt={messages.home.altMapCurrent}
                  width={800}
                  height={400}
                />
              </div>
              <div className="w-full">
                <Image
                  src={`/boletim/current/${boletim.current_conditions.table_current_conditions}`}
                  alt={messages.home.altLegend}
                  width={800}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {messages.home.currentConditions}
          </h2>
          <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed text-wrap">
              {boletim.current_conditions.text}
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 ">
          Seções
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          {sections.map(({ title, href, icon: Icon }) => (
            <Link key={href} href={`/${lang}${href}`}>
              <div className="cursor-pointer border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl flex gap-3 items-center p-4">
                <div className="p-1 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Icon aria-hidden="true" className="size-8 text-blue-600" />
                </div>
                <h3 className="text-base">{title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
