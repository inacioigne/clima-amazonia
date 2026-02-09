import Image from "next/image";
import Link from "next/link";
import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

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
        <div className="px-5 lg:px-36 py-4">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                Valores de Referência para a precipitação acumulada em 30 dias na data da análise
            </p>
            <div className="border border-gray-200 w-full my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="md:col-span-2 w-full order-1 md:order-2">
                    <Image
                        src={`/boletim/current/reference.png`}
                        alt={"multimodel_calibrado_seven_days"}
                        width={700}
                        height={500}
                        className="w-full h-auto"
                    />
                    <p className="mt-3 text-xs text-gray-500 text-center">
                        {boletim?.reference?.legend_table}<br />
                        {boletim?.reference?.legend_climatology}
                    </p>
                </div>
                <div className="order-2 md:order-1">
                    <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                        <p className="text-gray-700 leading-relaxed text-wrap">
                            {boletim?.reference?.text}
                        </p>
                    </div>
                </div>
            </div>
            <section id="anomaly" className="mt-12">
                <p className="text-lg font-semibold uppercase tracking-wide text-green-700 mt-4">
                    Categorização das anomalias de precipitação
                </p>
                <div className="border border-gray-200 w-full my-4" />
                <div className="border-l-blue-600 border-l-4 rounded-2xl p-4 my-3 ">
                    <p className="text-gray-700 leading-relaxed text-wrap">
                        Utilizando os valores constantes na tabela anterior é possível categorizar a precipitação observada no ano corrente em relação aos valores observados nos registros anteriores desde o início da série disponível, assim os valores observados inferiores ao quantil de 5% caracterizam a bacia em condição de extremamente seco, entre 5 e 12.5% em condição de tendência a extremamente seco, entre 12.5 e 20% condição de muito seco, entre 20 e 27.5% tendência a muito seco, entre 27.5 e 35% condição de seco, entre 35 e 42.5 condição de tendência a seco, valores entre 42.5 e 57.5 definem a condição de normalidade, valores entre 57.5 e 65% condição de tendência a chuvoso, entre 65 e 72.5% condição de chuvoso, entre 72.5 e 80% tendência a muito chuvoso, entre 80 e 87.5 condição de muito chuvoso, entre 87.5 e 95% indicam tendência a extremamente chuvoso e finalmente valores superiores a 95% definem a bacia em condição de extremamente chuvoso, conforme legenda abaixo.
                    </p>
                </div>
                <Image
                    src={`/boletim/current/anomaly_legend.png`}
                    alt={"anomaly_legend"}
                    width={600}
                    height={200}
                    className="w-full h-auto mt-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div >
                        <div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl p-6 h-auto">
                            <p className="text-gray-700 leading-relaxed text-wrap">
                                As tabelas a seguir apresentam (Tabela 2A) a precipitação média observada (mm) em cada bacia tomando como referência as estimativas de precipitação por satélite utilizando a técnica MERGE, acumuladas em 30 dias nas datas indicadas, disponibilizadas em http://ftp.cptec.inpe.br/modelos/tempo/MERGE/GPM/DAILY/ os valores médios das anomalias categorizadas (Tabela 2B) foram estimados com base no valor de anomalia de cada pixel na área da bacia monitorada, calculados conforme metodologia descrita no item anterior, nas mesmas datas do monitoramento da precipitação, a escala de cores das anomalias segue a legenda descrita.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-2 w-full">
                        <Image
                            src={`/boletim/current/anomaly_table.png`}
                            alt={"anomaly_table"}
                            width={700}
                            height={500}
                            className="w-full h-auto"
                        />
                        <div className="flex justify-between">
                            <p className="mt-3 text-xs text-gray-500 text-center">
                                Tabela 2A. Precipitação acumulada em 30 dias (mm), de dados MERGE/GPM – INPE/CPTEC.
                            </p>
                            <p className="mt-3 text-xs text-gray-500 text-center">
                                Tabela 2B. Anomalia Categorizada Precipitação por quantis.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}