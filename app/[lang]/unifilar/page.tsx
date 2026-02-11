import Image from "next/image";
import Link from "next/link";
import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

type Badge = {
  id: string;
  label: string;
  href: string;
  x: number; // posição no SVG (mesma unidade do viewBox)
  y: number;
  w: number; // largura do foreignObject
  h: number; // altura do foreignObject
  transform?: string;
};



function BadgeLink({ b }: { b: Badge }) {

  return (
    <foreignObject x={b.x} y={b.y} width={b.w} height={b.h} transform={b.transform}>
      <span {...({ xmlns: "http://www.w3.org/1999/xhtml" } as any)}
        className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium tracking-wider text-green-700 inset-ring inset-ring-green-600/20"
      >
        <Link href={b.href}
          title={b.label}>
          {b.label}
        </Link>
      </span>
    </foreignObject>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const badges: Badge[] = [
    { id: "amazonas-br", label: "Amazonas (BR)", href: `/${lang}/bacia/curso-principal-do-rio-amazonas-brasil`, x: 630, y: 160, w: 170, h: 44 },
    { id: "amazonas-pe", label: "Amazonas (PE)", href: `/${lang}/bacia/curso-principal-do-rio-amazonas-peru`, x: 130, y: 210, w: 170, h: 44 },
    { id: "solimoes", label: "Solimões", href: `/${lang}/bacia/curso-principal-do-rio-solimoes`, x: 300, y: 160, w: 140, h: 44 },

    { id: "ucayali", label: "Ucayali", href: `/${lang}/bacia/bacia-do-rio-ucayali`, x: 92, y: 280, w: 120, h: 44, transform: "rotate(-90 92 290)" },
    { id: "maranon", label: "Marañon", href: `/${lang}/bacia/bacia-do-rio-maranon`, x: 10, y: 90, w: 140, h: 44, transform: "rotate(-90 92 100)" },

    { id: "napo", label: "Napo", href: `/${lang}/bacia/bacia-do-rio-napo`, x: 120, y: 92, w: 110, h: 44, transform: "rotate(-90 185 112)" },
    { id: "ica", label: "Içá", href: `/${lang}/bacia/bacia-do-rio-ica`, x: 190, y: 92, w: 90, h: 44, transform: "rotate(-90 255 112)" },
    { id: "japura", label: "Japurá", href: `/${lang}/bacia/bacia-do-rio-japura`, x: 190, y: 290, w: 90, h: 44, transform: "rotate(-90 255 112)" },

    { id: "negro", label: "Negro", href: `/${lang}/bacia/bacia-do-rio-negro`, x: 230, y: 420, w: 105, h: 44, transform: "rotate(-90 255 112)" },
    { id: "branco", label: "Branco", href: `/${lang}/bacia/bacia-do-rio-branco`, x: 610, y: 100, w: 120, h: 44, },

    { id: "marg-esq-am", label: "Marg Esq AM", href: `/${lang}/bacia/bacias-da-margem-esquerda-do-rio-amazonas-amazonas`, x: 720, y: 60, w: 170, h: 44, transform: "rotate(-90 820 88)" },
    { id: "marg-esq-pa-nw", label: "Marg Esq PA NW", href: `/${lang}/bacia/bacias-da-margem-esquerda-do-rio-amazonas-nordeste-do-pa`, x: 720, y: 230, w: 190, h: 44, transform: "rotate(-90 820 88)" },
    { id: "marg-esq-pa-ne", label: "Marg Esq PA NE", href: `/${lang}/bacia/bacias-da-margem-esquerda-do-rio-amazonas-nordeste-do-pa`, x: 720, y: 380, w: 190, h: 44, transform: "rotate(-90 820 88)" },

    { id: "javari", label: "Javari", href: `/${lang}/bacia/bacia-do-rio-javari`, x: 80, y: 420, w: 120, h: 44, transform: "rotate(-90 92 290)" },
    { id: "jutai", label: "Jutaí", href: `/${lang}/bacia/bacia-do-rio-jutai`, x: 80, y: 480, w: 110, h: 44, transform: "rotate(-90 92 290)" },
    { id: "jurua", label: "Juruá", href: `/${lang}/bacia/bacia-do-rio-jurua`, x: 80, y: 540, w: 120, h: 44, transform: "rotate(-90 92 290)" },
    { id: "tefe", label: "Tefé", href: `/${lang}/bacia/bacia-do-rio-tefe`, x: 80, y: 600, w: 95, h: 44, transform: "rotate(-90 92 290)" },
    { id: "coari", label: "Coari", href: `/${lang}/bacia/bacia-do-rio-coari`, x: 80, y: 660, w: 110, h: 44, transform: "rotate(-90 92 290)" },
    { id: "purus", label: "Purus", href: `/${lang}/bacia/bacia-do-rio-purus`, x: 80, y: 715, w: 115, h: 45, transform: "rotate(-90 92 290)" },
    { id: "madeira", label: "Madeira", href: `/${lang}/bacia/bacia-do-rio-madeira`, x: 20, y: 800, w: 115, h: 45, transform: "rotate(-90 92 290)" },
    { id: "aripuana", label: "Rio Aripuanã", href: `/${lang}/bacia/bacia-do-rio-aripuana`, x: 650, y: 210, w: 150, h: 44 },
    { id: "ji-parana", label: "Ji-Paraná", href: `/${lang}/bacia/bacia-do-rio-jiparana`, x: 650, y: 265, w: 150, h: 44 },
    { id: "guapore", label: "Guaporé", href: `/${lang}/bacia/bacia-do-rio-guapore`, x: 650, y: 310, w: 150, h: 44 },
    { id: "mamore", label: "Mamoré", href: `/${lang}/bacia/bacia-do-rio-mamore`, x: 650, y: 360, w: 145, h: 44, },
    { id: "beni", label: "Beni", href: `/${lang}/bacia/bacia-dos-rios-beni-e-madre-de-dios`, x: 650, y: 410, w: 95, h: 44 },

    { id: "abacaxis", label: "Abacaxis", href: `/${lang}/bacia/bacia-do-rio-abacaxis`, x: 80, y: 1030, w: 140, h: 44, transform: "rotate(-90 92 290)" },

    { id: "tapajos", label: "Tapajós", href: `/${lang}/bacia/bacia-do-rio-tapajos`, x: 100, y: 1130, w: 140, h: 50, transform: "rotate(-90 92 290)" },
    { id: "juruena", label: "Juruena", href: `/${lang}/bacia/bacia-do-rio-juruena`, x: 890, y: 290, w: 90, h: 44 },
    { id: "teles-pires", label: "Teles Pires", href: `/${lang}/bacia/bacia-do-rio-teles-pires`, x: 980, y: 290, w: 150, h: 44 },

    { id: "curua-una", label: "Curuá Una", href: `/${lang}/bacia/bacia-do-rio-curua-una`, x: 85, y: 1265, w: 160, h: 44, transform: "rotate(-90 92 290)" },

    { id: "xingu", label: "Xingu", href: `/${lang}/bacia/bacia-do-rio-xingu`, x: 120, y: 1400, w: 110, h: 44, transform: "rotate(-90 92 290)" },
    { id: "iriri", label: "Iriri", href: `/${lang}/bacia/bacia-do-rio-iriri`, x: 1170, y: 275, w: 90, h: 44 },
  ];

  const [boletim, messages] = await Promise.all([
    getBoletim(lang),
    getMessages(lang),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-5">
      <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
        Diagrama unifilar das bacias representadas
      </p>
      <div className="w-full overflow-x-auto bg-white p-4">
        <div className="min-w-275">
          <svg viewBox="0 0 1400 520"
          >
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 120 200 H 1280" />
            {/* Ucayali / Marañon */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 120 110 V 290" />
            {/* Ramos acima */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 200 200 V 120" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 270 200 V 120" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 470 200 V 120" />

            {/* Negro/Branco */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 600 200 V 80" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 600 140 H 700" />
            {/* Margens acima */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 830 200 V 90" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 1000 200 V 70" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 1150 200 V 70" />
            {/* Ramos abaixo (esquerda) */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 260 200 V 300" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 320 200 V 300" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 380 200 V 300" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 440 200 V 300" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 500 200 V 300" />
            {/* Purus */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 550 200 V 300" />
            {/* Madeira + sub-ramos */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 200 V 450" />
            {/* Aripuanã */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 250 H 750" />
            {/* Ji-parana */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 300 H 750" />
            {/* Guaraporé */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 350 H 750" />
            {/* Mamore */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 400 H 750" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 450 H 750" />
            {/* Abacaxis */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 870 200 V 305" />

            {/* Tapajós + Juruena + Teles Pires */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 970 200 V 330" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 890 330 H 1070" />

            {/* Curuá Una */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 1105 200 V 320" />

            {/* Xingu + Iriri */}
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 1240 200 V 340" />
            <path className="stroke-blue-700 stroke-6 fill-none" d="M 1175 310 H 1240" />
            {badges.map((b) => (
              <BadgeLink key={b.id} b={b} />
            ))}
          </svg>


        </div>

      </div>

    </div>
  )
}