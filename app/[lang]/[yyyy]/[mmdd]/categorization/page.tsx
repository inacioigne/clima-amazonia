import { getMessages, isLocale, locales, getBoletim } from "@/lib/i18n";
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
                {messages.categorization.title}

            </p>
            <div className="border border-gray-200 w-full my-4" />
            <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                <p className="text-gray-700 leading-relaxed text-wrap">
                    {messages.categorization.text1}
                </p>
            </div>
            <table className="w-full border-collapse border border-gray-500">
                <tbody>
                    <tr>
                        <th className="w-27.5 border border-gray-500 bg-white px-2 py-2 text-left text-xs font-bold uppercase">
                            {messages.categorization.table.quantile}
                        </th>
                        {cells.map((cell, idx) => (
                            <th
                                key={`q-${idx}`}
                                className="border border-gray-500 bg-white px-2 py-2 text-center text-xs font-bold"
                            >
                                {cell.q || "\u00A0"}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <th className="border border-gray-500 bg-white px-2 py-2 text-left text-xs font-bold uppercase">
                            {messages.categorization.table.index}
                        </th>
                        {cells.map((cell, idx) => (
                            <td
                                key={`i-${idx}`}
                                className={`border border-gray-500 px-2 py-2 text-center text-sm font-extrabold ${cell.bg} ${cell.text}`}
                            >
                                {cell.i}
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <th className="border border-gray-500 bg-white px-2 py-3 text-left text-xs font-bold uppercase">
                            {messages.categorization.table.category}
                        </th>
                        {cells.map((cell, idx) => (
                            <td
                                key={`c-${idx}`}
                                className="border border-gray-500 bg-white px-2 py-3 text-center text-[10px] uppercase leading-tight"
                            >
                                {cell.c.split("\n").map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div >
                    <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                        <p className="text-gray-700 leading-relaxed text-wrap">
                            {messages.categorization.text2}
                            <Link
                                href={"http://ftp.cptec.inpe.br/modelos/tempo/MERGE/GPM/DAILY/"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 cursor-pointer">MERGE/GPM/DAILY</span>
                            </Link>
                            {messages.categorization.text3}
                        </p>
                    </div>
                </div>
                <div className="md:col-span-2 w-full">
                    <Image
                        src={boletim.images.categorization.table}
                        alt={"anomaly_table"}
                        width={700}
                        height={500}
                        className="w-full h-auto"
                    />
                    <div className="flex justify-between">
                        <p className="mt-3 text-sm text-gray-500 text-center">
                            {messages.categorization.legend.part1} <br /> {messages.categorization.legend.part2}
                        </p>
                        <p className="mt-3 text-sm text-gray-500 text-center">
                            {messages.categorization.legend.part3} <br /> {messages.categorization.legend.part4}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}