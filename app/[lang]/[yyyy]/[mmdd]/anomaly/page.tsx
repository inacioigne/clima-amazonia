import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";
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

    const [boletim, messages] = await Promise.all([
        getBoletim(yyyy, mmdd),
        getMessages(lang),
    ]);

    const cells = [
        { q: "5.0%", i: "-3.0", bg: "bg-red-900", text: "text-white", c: messages.categorization.table["extremely-dry"] },
        { q: "12.5%", i: "-2.5", bg: "bg-red-700", text: "text-white", c: messages.categorization.table["extremely-dry-tendency"] },
        { q: "20.0%", i: "-2.0", bg: "bg-orange-500", text: "text-black", c: messages.categorization.table["very-dry"] },
        { q: "27.5%", i: "-1.5", bg: "bg-amber-400", text: "text-black", c: messages.categorization.table["very-dry-tendency"] },
        { q: "35.0%", i: "-1.0", bg: "bg-yellow-400", text: "text-black", c: messages.categorization.table["dry"] },
        { q: "42.5%", i: "-0.5", bg: "bg-yellow-200", text: "text-black", c: messages.categorization.table["dry-tendency"] },
        { q: "", i: "0.0", bg: "bg-white", text: "text-black", c: messages.categorization.table["normal"] },
        { q: "57.5%", i: "0.5", bg: "bg-sky-100", text: "text-black", c: messages.categorization.table["rainy-tendency"] },
        { q: "65.0%", i: "1.0", bg: "bg-sky-200", text: "text-black", c: messages.categorization.table["rainy"] },
        { q: "72.5%", i: "1.5", bg: "bg-cyan-400", text: "text-black", c: messages.categorization.table["very-rainy-tendency"] },
        { q: "80.0%", i: "2.0", bg: "bg-cyan-500", text: "text-black", c: messages.categorization.table["very-rainy"] },
        { q: "87.5%", i: "2.5", bg: "bg-blue-500", text: "text-black", c: messages.categorization.table["extremely-rainy-tendency"] },
        { q: "95.0%", i: "3.0", bg: "bg-blue-900", text: "text-white", c: messages.categorization.table["extremely-rainy"] },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700 mt-4">
                {messages.anomaly.title}

            </p>
            <div className="border border-gray-200 w-full my-4" />
             <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                <p className="text-gray-700 leading-relaxed text-wrap">
                    {messages.anomaly.text}
                </p>
            </div>
          
        </div>
    )
}