import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.92 1.18A4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] text-background pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Filter invert used to make logo visible on dark background if it's black text, or just use it directly if it has transparency */}
              <img
                src="/Logo_ouro_cerrado.png"
                alt="Ouro do Cerrado Logo"
                className="h-26 w-auto bg-white/10 rounded-lg p-2"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              Redefinindo a arte de hospedar no coração do Cerrado. Conforto contemporâneo, elegância e hospitalidade calorosa.
            </p>
            <div className="flex gap-4">
              <a href="https://wa.me/5538999248203" aria-label="WhatsApp" className="group w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a href="https://www.instagram.com/ourodocerradohotel/" aria-label="Instagram" className="group w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display text-white">Links Rápidos</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#inicio" className="hover:text-primary transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="#acomodacoes" className="hover:text-primary transition-colors">Acomodações</a></li>
              <li><a href="#servicos" className="hover:text-primary transition-colors">Serviços e Comodidades</a></li>
              <li><a href="#galeria" className="hover:text-primary transition-colors">Galeria</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display text-white">Contato</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>R. Juscelino Kubitscheck, 1060 - Planalto<br/>Buritis - MG, 38660-000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(38) 99924-8203</span>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-display text-white">Atendimento</h4>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-sm font-medium text-white">Disponível no WhatsApp</span>
              </div>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Check-in: 13h00</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Check-out: 12h00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Ouro do Cerrado Hotel. Todos os direitos reservados.</p>
          <p>Desenvolvido com padrão premium.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
