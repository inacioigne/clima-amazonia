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
  variant?: "primary" | "soft";
};

const badges: Badge[] = [
  { id: "amazonas-br", label: "Amazonas (BR)", href: "/rios/amazonas", x: 660, y: 160, w: 170, h: 44, variant: "primary" },
  { id: "amazonas-pe", label: "Amazonas (PE)", href: "/rios/amazonas-pe", x: 170, y: 160, w: 170, h: 44, variant: "soft" },
  { id: "solimoes", label: "Solimões", href: "/rios/solimoes", x: 395, y: 160, w: 140, h: 44, variant: "soft" },

  { id: "ucayali", label: "Ucayali", href: "/rios/ucayali", x: 55, y: 260, w: 120, h: 44, variant: "soft" },
  { id: "maranon", label: "Marañon", href: "/rios/maranon", x: 55, y: 90, w: 140, h: 44, variant: "soft" },

  { id: "napo", label: "Napo", href: "/rios/napo", x: 150, y: 92, w: 110, h: 44, variant: "soft" },
  { id: "ica", label: "Içá", href: "/rios/ica", x: 255, y: 92, w: 90, h: 44, variant: "soft" },
  { id: "japura", label: "Japurá", href: "/rios/japura", x: 545, y: 92, w: 120, h: 44, variant: "soft" },

  { id: "negro", label: "Negro", href: "/rios/negro", x: 645, y: 52, w: 105, h: 44, variant: "soft" },
  { id: "branco", label: "Branco", href: "/rios/branco", x: 705, y: 96, w: 120, h: 44, variant: "soft" },

  { id: "marg-esq-am", label: "Marg Esq AM", href: "/rios/marg-esq-am", x: 820, y: 88, w: 170, h: 44, variant: "soft" },
  { id: "marg-esq-pa-nw", label: "Marg Esq PA NW", href: "/rios/marg-esq-pa-nw", x: 1000, y: 52, w: 190, h: 44, variant: "soft" },
  { id: "marg-esq-pa-ne", label: "Marg Esq PA NE", href: "/rios/marg-esq-pa-ne", x: 1160, y: 52, w: 190, h: 44, variant: "soft" },

  { id: "javari", label: "Javari", href: "/rios/javari", x: 205, y: 300, w: 120, h: 44, variant: "soft" },
  { id: "jutai", label: "Jutaí", href: "/rios/jutai", x: 305, y: 300, w: 110, h: 44, variant: "soft" },
  { id: "jurua", label: "Juruá", href: "/rios/jurua", x: 385, y: 300, w: 120, h: 44, variant: "soft" },
  { id: "tefe", label: "Tefé", href: "/rios/tefe", x: 470, y: 300, w: 95, h: 44, variant: "soft" },
  { id: "coari", label: "Coari", href: "/rios/coari", x: 545, y: 300, w: 110, h: 44, variant: "soft" },
  { id: "purus", label: "Purus", href: "/rios/purus", x: 625, y: 300, w: 110, h: 44, variant: "soft" },

  { id: "madeira", label: "Madeira", href: "/rios/madeira", x: 690, y: 360, w: 135, h: 44, variant: "soft" },
  { id: "aripuana", label: "Aripuanã", href: "/rios/aripuana", x: 750, y: 218, w: 140, h: 44, variant: "soft" },
  { id: "ji-parana", label: "Ji-Paraná", href: "/rios/ji-parana", x: 750, y: 253, w: 150, h: 44, variant: "soft" },
  { id: "guapore", label: "Guaporé", href: "/rios/guapore", x: 750, y: 288, w: 145, h: 44, variant: "soft" },
  { id: "mamore", label: "Mamoré", href: "/rios/mamore", x: 750, y: 323, w: 145, h: 44, variant: "soft" },
  { id: "beni", label: "Beni", href: "/rios/beni", x: 750, y: 358, w: 95, h: 44, variant: "soft" },

  { id: "abacaxis", label: "Abacaxis", href: "/rios/abacaxis", x: 885, y: 300, w: 140, h: 44, variant: "soft" },

  { id: "tapajos", label: "Tapajós", href: "/rios/tapajos", x: 980, y: 300, w: 130, h: 44, variant: "soft" },
  { id: "juruena", label: "Juruena", href: "/rios/juruena", x: 860, y: 258, w: 130, h: 44, variant: "soft" },
  { id: "teles-pires", label: "Teles Pires", href: "/rios/teles-pires", x: 1010, y: 278, w: 150, h: 44, variant: "soft" },

  { id: "curua-una", label: "Curuá Una", href: "/rios/curua-una", x: 1080, y: 300, w: 160, h: 44, variant: "soft" },

  { id: "xingu", label: "Xingu", href: "/rios/xingu", x: 1220, y: 310, w: 110, h: 44, variant: "soft" },
  { id: "iriri", label: "Iriri", href: "/rios/iriri", x: 1160, y: 292, w: 90, h: 44, variant: "soft" },
];

function BadgeLink({ b }: { b: Badge }) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm transition " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const styles =
    b.variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100";

  // foreignObject precisa de um container com xmlns
  return (
    <foreignObject x={b.x} y={b.y} width={b.w} height={b.h}>
      <div xmlns="http://www.w3.org/1999/xhtml" className="h-full w-full flex items-center">
        <Link href={b.href} className={base + " " + styles} title={b.label}>
          {b.label}
        </Link>
      </div>
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

    const [boletim, messages] = await Promise.all([
        getBoletim(lang),
        getMessages(lang),
    ]);

    return (
        <div className="px-5 lg:px-36 py-4">
            <p className="text-lg font-semibold uppercase tracking-wide text-green-700">
                Diagrama unifilar das bacias representadas
            </p>
            <div className="w-full overflow-x-auto bg-white p-4">
                <div className="min-w-275">
                    <svg viewBox="0 0 1400 420" className="h-80 w-full">
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 120 200 H 1280" />
                        {/* Ucayali / Marañon */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 120 110 V 290" />
                        {/* Ramos acima */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 160 200 V 120" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 260 200 V 120" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 470 200 V 120 H 530" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 560 200 V 120 H 620" />
                        {/* Negro/Branco */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 690 200 V 80" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 690 110 H 770" />
                        {/* Margens acima */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 830 200 V 90" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 1020 200 V 70" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 1180 200 V 70" />
                        {/* Ramos abaixo (esquerda) */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 220 200 V 300" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 320 200 V 300" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 400 200 V 300" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 480 200 V 300" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 560 200 V 300" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 640 200 V 300" />
                        {/* Madeira + sub-ramos */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 200 V 360" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 235 H 820" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 270 H 820" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 305 H 820" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 340 H 820" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 740 375 H 820" />
                        {/* Abacaxis */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 900 200 V 305" />

                        {/* Tapajós + Juruena + Teles Pires */}
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 1000 200 V 320" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 930 280 H 1000" />
                        <path className="stroke-blue-700 stroke-6 fill-none" d="M 1000 300 H 1085" />

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