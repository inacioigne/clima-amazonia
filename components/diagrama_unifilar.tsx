import Image from "next/image";
import Link from "next/link";
import { getBoletim, getMessages, isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function DiagramaUnifilar({
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
                Diagrama unifilar 
            </p>
        </div>
    )
}