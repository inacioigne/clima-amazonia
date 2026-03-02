import { getBoletim, getBulletin, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";
import { GiRiver } from "react-icons/gi";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FcDataSheet } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FcTreeStructure } from "react-icons/fc";
import Link from "next/link";

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string, yyyy: string, mmdd: string }>;
}) {


    const { lang, yyyy, mmdd } = await params;

    if (!isLocale(lang)) {
        notFound();
    }
    const mm = mmdd.substring(0, 2)
    const dd = mmdd.substring(2, 4)

    const [boletim, messages] = await Promise.all([
        getBoletim(yyyy, mmdd),
        getMessages(lang),
    ]);

    const sections = [
        {
            title: messages.home["individual-analysis"],
            href: `/${yyyy}/${mmdd}/basins`,
            icon: GiRiver,
        },
        {
            title: messages.home["multi-model-sub-seasonal"],
            href: `/${yyyy}/${mmdd}/multimodel`,
            icon: MdOutlineAutoGraph,
        },
        {
            title: messages.home["reference-values"],
            href: "/reference",
            icon: FcDataSheet,
        },
        {
            title: messages.home["anomalies"],
            href: "/anomaly",
            icon: FcComboChart,
        },
        {
            title: messages.home["unifilar"],
            href: "/unifilar",
            icon: FcTreeStructure,
        },
    ];

    return (
        <div className="space-y-12">
            <section className="bg-linear-to-br from-green-50 to-blue-50 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8 ">
                        <div className="col-span-1 space-y-6">
                            <div className="space-y-2 ">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                    {messages.home.title}
                                </h1>
                                <p className="text-xl text-green-700 font-semibold">
                                    {messages.home.subtitle}
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-3">
                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                                        {messages.home.volume} {boletim.meta[`${lang}`].volume} - {messages.home.number} {boletim.meta.number}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <span className="font-medium">{messages.home.pubDate}:</span> {boletim.meta[`${lang}`].date}
                                    </p>
                                    <p>
                                        <span className="font-medium">{messages.home.periodicity}:</span> {messages.home.weekly}
                                    </p>
                                    <p className="font-mono text-xs">ISSN {boletim.meta[`${lang}`].issn} • DOI {boletim.meta[`${lang}`].doi}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 col-span-2">
                            <div className="w-full">
                                <Image
                                    src={`/boletim/${yyyy}/${mmdd}/current_conditions/map_current_conditions.png`}
                                    alt={messages.home.altMapCurrent}
                                    width={800}
                                    height={400}
                                />
                            </div>
                            <div className="w-full">
                                <Image
                                    src={`/boletim/${yyyy}/${mmdd}/current_conditions/table_current_conditions.png`}
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
                            {boletim.current_conditions[`${lang}`]}
                        </p>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-900 ">
                    {messages.home.sections}
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
    )
}