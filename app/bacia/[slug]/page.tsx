import Image from "next/image";
import boletim from "@/data/current_boletim.json"

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function generateStaticParams() {
  return boletim.analysis.map((item) => ({

    slug: String(item.id)
  }))

}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = boletim.analysis.find(
    (it) => String(it.id) === slug
  )
  // console.log("Basica", item)


  return (
    <div className="lg:px-36 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          Análise individual por bacia hidrográfica
        </p>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-900">{item?.name}</h3>
          <p className="text-sm text-gray-500">Atualizado em {boletim.date}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr] pt-2">
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
                src={`/boletim/current/${item?.charts.acc}`}
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
                src={`/boletim/current/${item?.charts.ano}`}
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
          <div className="mt-4 text-base leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: item?.content || '' }} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">Climatologia</p>
              <p className="text-lg font-semibold text-emerald-900">{item?.climatologia}</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs text-blue-700">Observado 30 dias</p>
              <p className="text-lg font-semibold text-blue-900">{item?.observados}</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">Índice anomalia</p>
              <p className="text-lg align-text-bottom font-semibold text-amber-900">{item?.anomalia}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">Classificação da Bacia</p>
              <div className="h-full flex items-center justify-items-center">
                <p className="text-sm font-semibold text-emerald-900">{item?.classification}</p>

              </div>
              
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">Prognóstico</p>
              <p className="text-sm font-semibold text-amber-900">{item?.prognostico}</p>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}