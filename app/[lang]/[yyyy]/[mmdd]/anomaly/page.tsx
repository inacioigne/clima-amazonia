import { getMessages, isLocale, locales, getBoletim } from "@/lib/i18n";
import { notFound } from "next/navigation";
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

    const bacias = Object.entries(boletim.images.anomaly);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {
                    bacias.map(([bacias, url]) => (
                        <div key={bacias} className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-3">
                            <Image
                                src={url}
                                alt={bacias}
                                width={600}
                                height={300}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}