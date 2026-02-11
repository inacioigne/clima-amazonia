"use client";
import type { Locale } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoLanguage } from "react-icons/io5";

const orderedLocales: Locale[] = ["pt", "en", "es"];

export default function LanguageSwitcher({
    lang,
    label,
}: {
    lang: Locale;
    label: string;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleSwitchLanguage = (nextLocale: Locale) => {
        if (!pathname) {
            router.push(`/${nextLocale}`);
            return;
        }

        const segments = pathname.split("/");

        if (segments.length > 1) {
            segments[1] = nextLocale;
            const nextPath = segments.join("/") || `/${nextLocale}`;
            router.push(nextPath);
            return;
        }

        router.push(`/${nextLocale}`);
    };

    return (
        <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                <IoLanguage aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >

                {orderedLocales.map((localeOption) => (
                    <div className="py-1" key={localeOption}>
                        <MenuItem as="button" onClick={() => handleSwitchLanguage(localeOption)}>
                            <span
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                {localeOption.toUpperCase()}
                            </span>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    );
}
