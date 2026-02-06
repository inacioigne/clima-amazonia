import Image from "next/image";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";

const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Edicoes Anteriores", href: "#" },
    { name: "Sobre", href: "#" },
    { name: "Equipe", href: "#" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div>
                                <Link href="/" className="flex items-center gap-2">
                                    <Image
                                        className="h-9 w-9 rounded-full"
                                        src="/logo.jpg"
                                        alt="Logo Clima Amazonia"
                                        width={36}
                                        height={36}
                                    />

                                </Link>
                            </div>

                            <div>
                                <div className="text-sm font-bold text-white">
                                    Clima Amazônia
                                </div>
                                <div className="text-xs text-gray-400">
                                    Bacia Amazônica
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">
                            Monitoramento climático semanal da Bacia Amazônica com dados científicos atualizados e análises especializadas. </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Contato
                        </h3>
                        <div className="space-y-3">
                            <a href="mailto:climaamazonia@inpa.gov.br" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                                <CiMail className="h-4 w-4" />
                                climaamazonia@inpa.gov.br
                            </a>
                            <div className="text-sm text-gray-400">
                                <p>Instituto Nacional de Pesquisas da Amazônia - INPA</p>
                                <p className="text-xs mt-1">Manaus, Amazonas, Brasil</p>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Links Úteis
                        </h3>
                        <div className="space-y-2">
                            <a
                                href="https://www.gov.br/inpa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                            >
                                INPA
                            </a>
                            <a
                                href="https://lba.inpa.gov.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex  gap-2 text-sm hover:text-white transition-colors"
                            >
                                Programa LBA
                            </a>
                            <Link href={'https://www.instagram.com/clima.amazonia/'}>
                                <div className="flex row items-center gap-1.5">
                                    <FaInstagram />
                                    <p className="text-sm hover:text-white transition-colors">Instagram</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>
                            © 2026 INPA Todos os direitos reservados.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs">
                               Licença
                            </span>
                            <span className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">CC BY-NC-SA 4.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
