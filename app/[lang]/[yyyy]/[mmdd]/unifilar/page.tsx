// import Link from "next/link";
import { getBoletim, getMessages, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";

function subtrairQuatroSemanas(dataInput: string | number | Date) {
    const data = new Date(dataInput);
    const copia = new Date(data); // evita alterar a original

    copia.setDate(copia.getDate() - 28);

    const dd = String(copia.getDate()).padStart(2);
    const mm = String(copia.getMonth() + 1).padStart(2, '0'); // meses começam em 0

    return { dd, mm };
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

    // const messages = await getMessages(lang)
    const [boletim, messages] = await Promise.all([
        getBoletim(yyyy, mmdd),
        getMessages(lang),
    ]);
    const current_date = process.env.CURRENT_BOLETIM_DATE ?? '2026-06-03';
    const { dd, mm } = subtrairQuatroSemanas(current_date)
    const meses = Object.values(messages.months);
    const mesExtenso = meses[parseInt(mm) - 1] || mm;
    const databefore = lang === 'en' ? `${mesExtenso} ${dd}` : `${dd} de ${mesExtenso.toLowerCase()}`



    return (
        <div className="mx-auto max-w-7xl px-4 py-5">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                {messages.unifilar.title}
            </p>
            <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                <p className="text-gray-700 leading-relaxed text-wrap">
                    {messages.unifilar.text} {databefore} {messages.unifilar.text2} {boletim.meta[`${lang}`].date}
                </p>
            </div>

            <div className="flex items-center justify-center">
                <Image
                    src={boletim.images.unifilar.diagrama}
                    alt={messages.home.altMapCurrent}
                    width={800}
                    height={400}
                    unoptimized
                />
            </div>
             <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                {messages.unifilar.titleAnalisis}
            </p>
            <p className="text-gray-700 leading-relaxed text-wrap mt-3">
                   {boletim.unifilar[`${lang}`]}
                </p>
        </div >
    )
}