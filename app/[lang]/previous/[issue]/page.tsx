import { getMessages, isLocale } from '@/lib/i18n';
import { notFound } from "next/navigation";
import issues from "@/data/issues.json";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiBookOpen, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// type Issue = (typeof issues)[number];
function getNumbers(issue: string) {
    return issues.find((item) => item.volume === parseInt(issue, 10)) || null;
}

function toDisplayLocale(lang: string) {
    if (lang === "en") return "en-US";
    if (lang === "es") return "es-ES";
    return "pt-BR";
}

const MONTH_INDEX: Record<string, number> = {
    january: 0,
    february: 1,
    march: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
};

function normalizeText(value: string) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// function capitalize(value: string) {
//     return value.charAt(0).toUpperCase() + value.slice(1);
// }

export default async function Page({
    params,
}: {
    params: Promise<{ lang: string; issue: string }>;
}) {

    const { lang, issue } = await params;
    if (!isLocale(lang)) {
        notFound();
    }
    const messages = await getMessages(lang);
    const issueData = getNumbers(issue) as ReturnType<typeof getNumbers>;
    // console.log("DM:", issueData?.numbers)

    if (!issueData) {
        notFound();
    }

    // const months = Object.entries(issueData.numbers ?? {}).sort(([a], [b]) => {
    //     const monthA = MONTH_INDEX[normalizeText(a)];
    //     const monthB = MONTH_INDEX[normalizeText(b)];
    //     if (monthA === undefined || monthB === undefined) return a.localeCompare(b);
    //     return monthA - monthB;
    // });

    // const locale = toDisplayLocale(lang);
    // const currentMonth = normalizeText(
    //     new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date())
    // );
    // const currentMonthIndex = months.findIndex(([month]) => normalizeText(month) === currentMonth);
    // const defaultOpenIndex = currentMonthIndex >= 0 ? currentMonthIndex : 0;

    return (
        <main className="mx-auto max-w-7xl px-4 py-6">
            <section className="mx-auto space-y-8">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                        {messages.nav.previous}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {messages.previous.year} {issueData.year} - {messages.previous.volume}  {issueData.volume}
                    </h1>

                </header>
                <ul className="flex flex-wrap gap-2">
                    {
                        issueData?.numbers.map((number, index) => (
                            <Link
                                key={index}
                                href={`#${number.month}`}
                            >
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10">
                                    {messages.months[number.month as keyof typeof messages.months]}
                                </span>
                            </Link>
                        ))
                    }
                </ul>
                <div className="space-y-3">
                    {
                        issueData?.numbers.map((number, index) => (
                            <details
                                id={number.month}
                                key={index}
                                open={true}
                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex rounded-lg bg-green-50 p-2 text-green-700">
                                            <FiCalendar className="size-4" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {messages.months[number.month as keyof typeof messages.months]}
                                            </h2>
                                        </div>
                                        <FiChevronDown
                                            className="size-5 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </summary>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4 p-5">
                                    {number.issues.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={`/${lang}/${item.url}`}
                                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-blue-700">{messages.previous.volume}  {issue} - {messages.previous.number} {item.number}</p>
                                                </div>
                                                <span className="inline-flex rounded-xl bg-blue-50 p-2 text-blue-700">
                                                    <FiBookOpen className="size-5" aria-hidden="true" />
                                                </span>
                                            </div>
                                            <Image
                                                src={item.img}
                                                alt={`Capa do volume ${item.number}`}
                                                width={200} height={300}
                                                className="mt-4 h-auto w-full rounded-lg object-cover" />
                                            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                                                    {messages.previous.edition}
                                                    <FiChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </details>
                            // 
                        ))
                    }

                    {/* {months.map(([month, monthIssues], index) => (
                        <details
                            key={month}
                            open={index === defaultOpenIndex}
                            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex rounded-lg bg-green-50 p-2 text-green-700">
                                        <FiCalendar className="size-4" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {messages.months[month as keyof typeof messages.months]}
                                        </h2>
                                    </div>
                                </div>
                                <FiChevronDown
                                    className="size-5 text-gray-500 transition-transform duration-200 group-open:rotate-180"
                                    aria-hidden="true"
                                />
                            </summary>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4 p-5">
                                {monthIssues.map((
                                    item: {
                                        number: number; url: any; img: string | StaticImport;
                                    }
                                ) => (
                                    <Link
                                        key={item.number}
                                        href={`/${lang}/${item.url}`}
                                        className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-blue-700">{messages.previous.volume}  {issue} - {messages.previous.number} {item.number}</p>
                                            </div>
                                            <span className="inline-flex rounded-xl bg-blue-50 p-2 text-blue-700">
                                                <FiBookOpen className="size-5" aria-hidden="true" />
                                            </span>
                                        </div>
                                        <Image
                                            src={item.img}
                                            alt={`Capa do volume ${item.number}`}
                                            width={200} height={300}
                                            className="mt-4 h-auto w-full rounded-lg object-cover" />
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                                                {messages.previous.edition}
                                                <FiChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                            </span>
                                        </div>
                                    </Link>

                                ))}
                            </div>
                        </details>
                    ))} */}
                </div>
            </section>
        </main>
    );
}
