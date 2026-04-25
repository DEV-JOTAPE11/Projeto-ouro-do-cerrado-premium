import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-3",
        isMobileMenuOpen ? "bg-white" : "glass-nav"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 z-50">
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
            className="bg-[#904031] text-white px-6 py-2.5 rounded-md hover:bg-[#7a3528]"
          >
            Reservar
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed top-0 right-0 bottom-0 w-[60vw] transform-gpu bg-white shadow-xl flex flex-col items-center justify-start pt-24 pb-8 transition-transform duration-300 ease-out will-change-transform md:hidden z-40",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <ul className="flex flex-col items-center gap-6 w-full px-4">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full text-center">
                <a
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mt-4 w-full px-4">
              <a
                href="https://api.whatsapp.com/send?phone=5538999248203"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#904031] text-white w-full py-2.5 rounded-md text-sm font-medium hover:bg-[#7a3528] transition-colors inline-block text-center shadow-md"
              >
                Fazer Reserva
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
