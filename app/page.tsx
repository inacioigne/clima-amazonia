import { Card, CardContent } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="bg-line-to-br from-green-50 to-blue-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 ">
            <div className="col-span-1 space-y-6">
              <div className="space-y-2 ">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">Boletim de monitoramento climático de grandes bacias hidrográficas
                </h1>
                <p className="text-xl text-green-700 font-semibold">Bacia Amazônica</p>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10">
                    Volume 1 - Número 1
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Data de publicação:</span> 29 de janeiro de 2026</p>
                  <p><span className="font-medium">Periodicidade:</span> Semanal</p>
                  <p className="font-mono text-xs">ISSN 2764-8273 • DOI 10.51189/bcmgh/2026.3.5</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <div className="flex gap-4 justify-between">
                <div className="w-1/2 h-auto">
                  <Image
                    src="/anomalia.png"
                    alt="Anomalia de precipitação na Bacia Amazônica"
                    width={500}
                    height={400}
                  />
                </div>
                <div className="w-1/2 h-auto flex flex-col gap-4">
                  <Image
                    src="/acumulado.png"
                    alt="Anomalia de precipitação na Bacia Amazônica"
                    width={300}
                    height={150}
                  />
                  <Image
                    src="/mediana.png"
                    alt="Anomalia de precipitação na Bacia Amazônica"
                    width={300}
                    height={150}
                  />
                </div>
              </div>
              <div className="w-full">
                <Image
                  src="/legendas.png"
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

          <Card>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-wrap">
                Mapas das condições observadas de precipitação e gráficos individuais por bacias são produzidos a partir dos dados MERGE/GPM gerados pelo INPE/CPTEC, considerando como climatologia para período de 2000 a 2025. Entre os dias 30 de dezembro e 28 dejaneiro de 2026, chuvas abaixo da climatologia caracterizaram com déficit de precipitação o curso principal do Rio Amazonas em territórios brasileiro e peruano, bacias hidrográficas dos rios Abacaxis, Aripuanã, Branco, Coari, Curuá Una, Guaporé, Içá, Iriri, Javari, Juruena, Jutaí, Mamoré, bacias da margem esquerda do Rio Amazonas no nordeste e no noroeste do Estado do Pará, Tapajós, Tefé, Teles Pires, Xingu e o curso principal do Rio Solimões; chuvas acima da climatologia registradas sobre as bacias dos rios Marañon, Negro e Ucayali; chuvas próximas da normalidade registradas sobre as bacias hidrográficas dos Beni, Japurá, Ji-Paraná, Juruá, Madeira, bacias da margem esquerda do Rio Amazonas no nordeste do Estado do Amazonas, Napo e Purus. O multimodelo indica para as próximas semanas previsão de chuvas abaixo da climatologia no leste, sudeste e sul da região monitorada, sobre o curso principal do Rio Amazonas em território brasileiro, bacias dos rios Abacaxis, Aripuanã, Beni, Curuá Una, Guaporé, Iriri, Ji-Paraná, Juruena, Mamoré, bacias da margem esquerda do Rio Amazonas no nordeste do Estado do Amazonas e no nordeste e no noroeste do Estado do Pará, Tapajós, Teles Pires e Xingu; previsão de chuvas acima da climatologia no noroeste da região monitorada, sobre o curso principal do Rio Amazonas em território peruano, bacias dos rios Içá, Japurá, Marañon, Napo e Negro.
              </p>

            </CardContent>

          </Card>


        </div>

      </section>

    </div>
  );
}
