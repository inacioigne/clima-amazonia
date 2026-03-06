import { getBoletim, getMessages, isLocale, Locale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";


export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

function getData30days(yyyy: string, mmdd: string, lang: Locale) {

    const mesesPT = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
    ];
    const mesesEN = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];
    const mesesES = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ];

    const dd = parseInt(mmdd.substring(2))
    const mm = parseInt(mmdd.substring(0, 2)) - 1
    const date = new Date(parseInt(yyyy), mm, dd);
    date.setDate(date.getDate() - 29);
    if (lang === 'es') {
        return `${date.getDate()} de ${mesesES[date.getMonth()]} al`
    } if (lang == 'en') {
        return `${mesesEN[date.getMonth()]} ${date.getDate()} to`
    } else {
        return `${date.getDate()} de ${mesesPT[date.getMonth()]} a`
    }
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
    const period = parseInt(yyyy) - 1

    const days30 = getData30days(yyyy, mmdd, lang)

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                {messages.reference.title}

            </p>
            <div className="border border-gray-200 w-full my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="md:col-span-2 w-full order-1 md:order-2">
                    <Image
                        src={boletim.images.reference.reference_table}
                        alt={"multimodel_calibrado_seven_days"}
                        width={700}
                        height={500}
                        className="w-full h-auto"
                    />
                    <p className="mt-3 text-xs text-gray-500 text-center">
                        {messages.reference.legend_table.part1} ({days30} {boletim.meta[lang].date})<br />
                        {messages.reference.legend_table.part2} {period}{messages.reference.legend_table.part3}

                    </p>
                </div>
                <div className="order-2 md:order-1">
                    <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                        <p className="text-gray-700 leading-relaxed text-wrap">
                            {messages.reference.text_table.part1} {period}{messages.reference.text_table.part2}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}