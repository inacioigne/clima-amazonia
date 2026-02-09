import Image from "next/image";
import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: Array<{ lang: string; slug: string }> = [];
  for (const lang of locales) {
    const boletim = await getBoletim(lang);
    for (const item of boletim.analysis) {
      params.push({ lang, slug: String(item.id) });
    }
  }
  return params;
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const [boletim, messages] = await Promise.all([
    getBoletim(lang),
    getMessages(lang),
  ]);

  const item = boletim.analysis.find((it) => String(it.id) === slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="lg:px-36 py-4">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
          {messages.bacia.analysisLabel}
        </p>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-900">{item?.name}</h3>
          <p className="text-sm text-gray-500">
            {messages.bacia.updatedAt} {boletim.date}
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr] pt-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                {messages.bacia.accVsClimatology}
              </p>
              <span className="text-xs text-gray-400">{messages.bacia.days30}</span>
            </div>
            <div className="mt-4 h-auto rounded-lg bg-linear-to-br from-emerald-50 via-white to-blue-50">
              <Image
                src={`/boletim/current/${item?.charts.acc}`}
                alt="chart"
                width={600}
                height={300}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">{messages.bacia.accSummary}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                {messages.bacia.anomalyTrend}
              </p>
              <span className="text-xs text-gray-400">{messages.bacia.days14to28}</span>
            </div>
            <div className="mt-4 h-auto rounded-lg bg-linear-to-br from-slate-50 via-white to-rose-50">
              <Image
                src={`/boletim/current/${item?.charts.ano}`}
                alt="chart"
                width={600}
                height={300}
              />
            </div>
            <p className="mt-3 text-xs text-gray-500">{messages.bacia.anomalySummary}</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            {messages.bacia.highlights}
          </p>
          <div className="mt-4 text-base leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: item?.text || "" }} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">{messages.bacia.climatology}</p>
              <p className="text-lg font-semibold text-emerald-900">{item?.climatologia}</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs text-blue-700">{messages.bacia.observed30}</p>
              <p className="text-lg font-semibold text-blue-900">{item?.observados}</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">{messages.bacia.anomalyIndex}</p>
              <p className="text-lg align-text-bottom font-semibold text-amber-900">{item?.anomalia}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-xs text-emerald-700">{messages.bacia.classification}</p>
              <div className="h-full flex items-center justify-items-center">
                <p className="text-sm font-semibold text-emerald-900">{item?.classification}</p>
              </div>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
              <p className="text-xs text-amber-700">{messages.bacia.forecast}</p>
              <p className="text-sm font-semibold text-amber-900">{item?.prognostico}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
