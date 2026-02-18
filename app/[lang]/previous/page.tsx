import { previousEditions } from "@/data/boletim/previous/issues";
import { getMessages, isLocale, locales } from '@/lib/i18n';
import Link from "next/link";

import { notFound } from 'next/navigation';
import { FiBookOpen, FiChevronRight } from 'react-icons/fi';
import  issues from "@/data/boletim/previous/issues.json";
import  type Issues from "@/data/boletim/previous/issues.json";

export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

export default async function Previous({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    if (!isLocale(lang)) {
        notFound();
    }

    const messages = await getMessages(lang);
    return (
        <main className="max-w-7xl py-4 mx-auto px-4">
            <section className="mx-auto max-w-7xl px-4 space-y-8">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                        Edições anteriores
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">Volumes</h1>
                </header>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
                    {
                        issues.map((issue) => (
                            <Link
                                key={issue.volume}
                                href={`/${lang}/previous/${issue.volume}`}
                                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-blue-700">Volume {issue.volume}</p>
                                        <h2 className="mt-1 text-xl font-semibold text-gray-900">Ano {issue.year}</h2>
                                    </div>
                                    <span className="inline-flex rounded-xl bg-blue-50 p-2 text-blue-700">
                                        <FiBookOpen className="size-5" aria-hidden="true" />
                                    </span>
                                </div>
                                {/* <Image
                                    src={issue.img}
                                    alt={`Capa do volume ${issue.volume}`}
                                    width={200} height={200}
                                    className="mt-4 h-auto w-full rounded-lg object-cover" /> */}
                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                                        Ver números
                                        <FiChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>

                        ))
                    }
                </div>
            </section>
        </main>
    );
}