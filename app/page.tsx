import Image from "next/image";
import { ChartBarSquareIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import boletim from "@/data/current_boletim.json"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="bg-linear-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 ">
            <div className="col-span-1 space-y-6">
              <div className="space-y-2 ">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {boletim.title}
                </h1>
                <p className="text-xl text-green-700 font-semibold">Bacia Amazônica</p>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    Volume {boletim.volume} - Número {boletim.number}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Data de publicação:</span> {boletim.date}</p>
                  <p><span className="font-medium">Periodicidade:</span> Semanal</p>
                  <p className="font-mono text-xs">ISSN {boletim.issn} • DOI {boletim.doi}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <div className="w-full">
                <Image
                  src={`/boletim/current/${boletim.current_conditions.map_current_conditions}`}
                  alt="Anomalia de precipitação na Bacia Amazônica"
                  width={800}
                  height={400}
                />
              </div>
              <div className="w-full">
                <Image
                  src={`/boletim/current/${boletim.current_conditions.table_current_conditions}`}
                  alt="legendas"
                  width={800}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Condições atuais
          </h2>
          < div className="border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl  p-6" >
            <p className="text-gray-700 leading-relaxed text-wrap">
              {boletim.current_conditions.text}
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Análise individual por bacia hidrográfica
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {
              boletim.analysis.map((bacia, index) =>
              (
                <Link key={index} href={`/bacia/${bacia.id}`}>
                  < div className="cursor-pointer border border-gray-200 bg-white shadow-sm transition hover:shadow-md rounded-2xl flex gap-3 items-center p-4" >
                    <div className="p-1 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <ChartBarSquareIcon aria-hidden="true" className="size-8 text-blue-600" />
                    </div>
                    <h3 className="text-base">{bacia.name}</h3>
                  </div>
                </Link>
              )
              )
            }
          </div>


        </div>
      </section >
    </div >
  );
}
