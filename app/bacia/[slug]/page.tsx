import { Card, CardContent } from "@mui/material"
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className="lg:px-36 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          Análise individual por bacia hidrográfica
        </p>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-900">Bacia do Rio Branco</h3>
          <p className="text-sm text-gray-500">Atualizado em 02/02/2026</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Precipitação acumulada x climatologia
              </p>
              <span className="text-xs text-gray-400">30 dias</span>
            </div>
            <div className="mt-4 h-auto rounded-lg bg-linear-to-br from-emerald-50 via-white to-blue-50">
              <Image
                src={"/chart_bar.png"}
                alt={"chart"}
                width={600}
                height={300}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Comparativo entre quantis climatológicos e acumulado observado.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                Anomalia e tendência
              </p>
              <span className="text-xs text-gray-400">14 a 28 dias</span>
            </div>
            <div className="mt-4 h-auto rounded-lg bg-linear-to-br from-slate-50 via-white to-rose-50">
              <Image
                src={"/char_anomalia.png"}
                alt={"chart"}
                width={600}
                height={300}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Indicadores de anomalia, previsão e observado.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Destaques da bacia
          </p>
          <p className="mt-4 text-base leading-relaxed">
            A climatologia do período em análise indica chuvas com registros variando entre 39 e 51 mm sendo considerados normais (referência quantis 42.5% e 57.5%). Em 28 dejaneiro de 2026, foram observados 29 mm de precipitação média acumulada sobre a bacia em 30 dias, o cálculo da média do índice de anomalia categorizada na área da bacia o valor de -0.9, classifica a bacia em condição de tendência a seco. Nas próximas semanas o comportamento climático indica manutenção dos volumes de chuva, o modelo de prognóstico subsazonal sugere um comportamento próximo da normalidade outendência a chuvoso.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">Climatologia</p>
              <p className="text-lg font-semibold text-emerald-900">39-51 mm</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs text-blue-700">Observado 30 dias</p>
              <p className="text-lg font-semibold text-blue-900">29 mm</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">Índice anomalia</p>
              <p className="text-lg font-semibold text-amber-900">-0.9</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}