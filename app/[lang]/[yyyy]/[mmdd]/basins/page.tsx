import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FcAreaChart } from "react-icons/fc";

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

    const [boletim, messages] = await Promise.all([
        getBoletim(yyyy, mmdd),
        getMessages(lang),
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                Análise individual por bacia hidrográfica
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {boletim.analysis.map((bacia, index) => (
                    <Link key={index} href={`/${lang}/${yyyy}/${mmdd}/basins/${bacia.id}`}>
                        <div className="cursor-pointer border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl flex gap-3 items-center p-4">
                            <div className="p-1 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                <FcAreaChart aria-hidden="true" className="size-8 text-blue-600" />
                            </div>
                            <h3 className="text-base">
                                {messages.bacia.name[bacia.id as keyof typeof messages.bacia.name]}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}