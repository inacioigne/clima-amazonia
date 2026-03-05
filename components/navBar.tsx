"use client";

import { useMemo, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import LanguageSwitcher from "./languageSwitcher";

type NavMessages = {
  home: string;
  previous: string;
  about: string;
  team: string;
  openMenu: string;
  brand: string;
  switchLanguage: string;
};

export default function NavBar({
  lang,
  messages,
}: {
  lang: Locale;
  messages: NavMessages;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = useMemo(
    () => [
      { name: messages.home, href: `/${lang}` },
      { name: messages.previous, href: `/${lang}/previous` },
      { name: messages.about, href: `/${lang}/about` },
      { name: messages.team, href: `/${lang}/team` },
    ],
    [lang, messages.home, messages.previous, messages.about, messages.team]
  );

  const isCurrent = (href: string) => {
    if (!pathname) return false;

    if (href === `/${lang}`) {
      return pathname === `/${lang}`;
    }

    return pathname.startsWith(`${href}/`) || pathname === href;
  };

  return (
    <nav className="relative border-b border-gray-200">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6 lg:px-8">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            aria-label={messages.openMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <XMarkIcon aria-hidden="true" className="size-6" />
            ) : (
              <Bars3Icon aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <Link href={`/${lang}`} className="flex shrink-0 items-center">
            <Image
              className="h-8 w-auto rounded-full"
              src="/logo.jpg"
              alt="logo"
              width={32}
              height={32}
            />
            <h3 className="ml-2 text-base font-semibold text-gray-900">
              {messages.brand}
            </h3>
          </Link>

          <div className="hidden sm:ml-auto sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => {
                const current = isCurrent(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${
                      current
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    } rounded-lg px-4 py-2 text-sm font-medium transition-colors`}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <LanguageSwitcher lang={lang} label={messages.switchLanguage} />
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="space-y-1 px-2 pb-3 pt-2 sm:hidden">
          {navigation.map((item) => {
            const current = isCurrent(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  current
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } block rounded-md px-3 py-2 text-base font-medium`}
                aria-current={current ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}
