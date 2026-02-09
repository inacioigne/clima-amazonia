import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function Page({
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
        <div className="px-5 lg:px-36 py-4">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                Comportamento das anomalias 07 e 30 dias observado nas semanas anteriores
            </p>
            <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                <p className="text-gray-700 leading-relaxed text-wrap">
                    Os gráficos a seguir ilustram o comportamento do índice das anomalias de precipitação nas últimas semanas, linhas vermelhas mostram o comportamento de períodos de 30 dias e linhas em azul o comportamento em relação a períodos de 7 dias, atualizados semanalmente.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {
                    boletim.anomaly_behavior.map((bacia, index) => (
                        <div key={index} className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-3">
                        <Image
                            src={`/boletim/current/anomaly_behavior/${bacia}`}
                            alt={bacia}
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