import Image from "next/image";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { FaGraduationCap, FaInstagram, FaOrcid } from "react-icons/fa";
import { PiReadCvLogoFill } from "react-icons/pi";

type TeamMember = {
  photo: string;
  name: string;
  role: string;
  education: string;
  lattes: string;
  orcid: string;
  instagram?: string;
};

const teamMembers: TeamMember[] = [
  {
    photo: "/team/renato.jpg",
    name: "Renato Cruz Senna",
    role: "Editor Chefe",
    education: "Pesquisador - CODAM, INPA",
    lattes: "http://lattes.cnpq.br/0000000000000001",
    orcid: "https://orcid.org/0000-0001-2345-6789",
    instagram: "https://www.instagram.com/renatocsenna/",
  },
  {
    photo: "/team/taina.jpg",
    name: "Tainá Sampaio Xavier Conchy Rocha",
    role: "Editoração",
    education: "Graduação em Meteorologia (UFAM)",
    lattes: "http://lattes.cnpq.br/8236360646545600",
    orcid: "https://orcid.org/0000-0003-4567-8901",
    instagram: "https://www.instagram.com/tainaconchy/",
  },
  {
    photo: "/team/adriano.jpg",
    name: "Adriano Nobre Arcos",
    role: "Editoração",
    education: "Doutor em Ecologia e Conservação (UFMS)",
    lattes: "http://lattes.cnpq.br/1808906364554368",
    orcid: "https://orcid.org/0000-0002-9509-3283"
  },
   {
    photo: "/team/inacio.jpg",
    name: "Inácio Oliveira",
    role: "Desenvolvedor",
    education: "Graduação em Biblioteconomia (UFAM)",
    lattes: "http://lattes.cnpq.br/1808906364554368",
    orcid: "https://orcid.org/0000-0002-9509-3283"
  }
];

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }


  return (
    <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Equipe do Boletim</h1>
        <p className="text-gray-600">
          Conheça a equipe responsável pela elaboração do boletim climático da Bacia Amazônica.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border border-gray-200">
              <Image
                src={member.photo}
                alt={`Foto de ${member.name}`}
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>

            <div className="mt-4 space-y-2 text-center">
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">{member.name}</h2>
              <p className="text-sm font-medium text-blue-700">{member.role}</p>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <FaGraduationCap className="size-4" aria-hidden="true" />
                {member.education}
              </p>
            </div>

            <div className="mt-5 grid gap-2 text-sm">
              <a
                href={member.lattes}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <PiReadCvLogoFill className="size-4" aria-hidden="true" />
                Lattes
              </a>
              <a
                href={member.orcid}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <FaOrcid className="size-4" aria-hidden="true" />
                ORCID
              </a>
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 transition hover:bg-gray-50"
              >
                <FaInstagram className="size-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
