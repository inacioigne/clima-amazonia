import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import LanguageSwitcher from './languageSwitcher';

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
    const navigation = [
        { name: messages.home, href: `/${lang}`, current: true },
        { name: messages.previous, href: '#', current: false },
        { name: messages.about, href: `/${lang}/about`, current: false },
        { name: messages.team, href: `/${lang}/team`, current: false },
    ]
    return (
        <Disclosure
            as="nav"
            className="relative border-b border-gray-200" >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">
                    <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                        {/* Mobile menu button*/}
                        <DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500' >
                            <span className="absolute -inset-0.5" />
                            <span className='sr-only'>{messages.openMenu}</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>

                    </div>
                    <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start '>
                        <Link href={`/${lang}`}>
                            <div className='flex shrink-0 items-center'>
                                <Image
                                    className="h-8 w-auto rounded-full"
                                    src="/logo.jpg"
                                    alt="logo"
                                    width={32}
                                    height={32}
                                />
                                <h3 className="ml-2 text-base font-semibold text-gray-900">{messages.brand}</h3>
                            </div>
                        </Link>

                        <div className='hidden sm:ml-auto sm:block '>
                            <div className='flex space-x-4'>
                                {/* Desktop menu items */}
                                {
                                    navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={
                                                (item.current
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-gray-100') +
                                                ' px-4 py-2 rounded-lg text-sm font-medium transition-colors'
                                            }
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <LanguageSwitcher lang={lang} label={messages.switchLanguage} />
                    </div>
            </div>
        </Disclosure>

    );
}
