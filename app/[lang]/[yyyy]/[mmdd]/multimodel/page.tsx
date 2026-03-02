import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FcAreaChart } from "react-icons/fc";
import Image from "next/image";


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
    const day = parseInt(mmdd.substring(2)) - 1
    const month = mmdd.substring(0, 2)

    return (
        <div className="max-w-7xl mx-auto px-4 py-5">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                {messages.multimodel.title.part1}
                {lang === 'en' ? `${month}/${day}/${yyyy}` : `${day}/${month}/${yyyy}`}
                {messages.multimodel.title.part2}
            </p>
            <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                <p className="text-gray-700 leading-relaxed text-wrap">
                    {messages.multimodel.text}
                </p>
            </div>
            <p className="text-lg font-semibold  tracking-wide text-green-700">
                {messages.multimodel.sevenDays}
            </p>
            <div className="border border-gray-200 w-full my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="md:col-span-2 w-full order-1 md:order-2">
                    <Image
                        src={`/boletim/current/seven_days.png`}
                        alt={"multimodel_calibrado_seven_days"}
                        width={700}
                        height={500}
                        className="w-full h-auto"
                    />
                </div>
                <div className="order-2 md:order-1">
                    <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                        <p className="text-gray-700 leading-relaxed text-wrap">
                            {boletim.multimodel[lang].seven_days}
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-lg font-semibold  tracking-wide text-green-700">
                {messages.multimodel.fourteenDays}
            </p>
            <div className="border border-gray-200 w-full my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="md:col-span-2 w-full order-1 md:order-2">
                    <Image
                        src={"/boletim/current/fourteen_days.png"}
                        alt={"multimodel_calibrado"}
                        width={700}
                        height={500}
                        className="w-full h-auto"
                    />
                </div>
                <div className="order-2 md:order-1">
                    <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                        <p className="text-gray-700 leading-relaxed text-wrap">
                            {boletim.multimodel[lang].fourteen_days}
                        </p>
                    </div>
                </div>


            </div>



        </div>
    )
}