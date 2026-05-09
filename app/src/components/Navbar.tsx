import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Acomodações", href: "#acomodacoes" },
    { name: "Serviços", href: "#servicos" },
    { name: "Galeria", href: "#galeria" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <>
      {/* Overlay escuro ao abrir o menu mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-50 flex flex-col items-center pointer-events-none">
        {/* Header principal (pill flutuante) */}
        <nav
          className={cn(
            "w-full max-w-7xl transition-all duration-300 pointer-events-auto relative z-10",
            isScrolled ? "py-2 px-4 md:px-8" : "py-3 px-4 md:px-8",
            isMobileMenuOpen ? "bg-white/95 backdrop-blur-xl rounded-t-[2rem] md:rounded-[100px]" : "glass-nav"
          )}
        >
          <div className="container-custom flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2">
              <img
                src="/Logo_ouro_cerrado.png"
                alt="Ouro do Cerrado Logo"
                className="h-12 md:h-20 w-auto"
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="relative text-sm font-medium text-foreground transition-colors hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="bg-[#904031] text-white px-6 py-2.5 rounded-full hover:bg-[#7a3528] transition-colors duration-300"
              >
                Reservar
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu – desce logo abaixo do header */}
        <div
          className={cn(
            "w-full max-w-7xl bg-white/95 backdrop-blur-xl rounded-b-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden transition-all duration-400 ease-out md:hidden",
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100 border-t border-gray-100"
              : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-1 px-6 pt-4 pb-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 px-4 text-base font-medium text-foreground hover:text-primary hover:bg-[#b2875c]/5 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mt-3 px-4">
              <a
                href="https://api.whatsapp.com/send?phone=5538999248203"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#904031] text-white w-full py-3 rounded-xl text-sm font-semibold hover:bg-[#7a3528] transition-colors inline-block text-center shadow-md"
              >
                Fazer Reserva
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
