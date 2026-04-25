import { Coffee, Wifi, Car, UtensilsCrossed, Tv, Wind } from "lucide-react";
import breakfastImage from "../assets/cafemanha.jpg";

const services = [
  {
    icon: Coffee,
    title: "Café da Manhã Completo",
    description: "Buffet com produtos frescos e regionais todas as manhãs",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Gratuito",
    description: "Internet de alta velocidade em todas as áreas do hotel",
  },
  {
    icon: Car,
    title: "Estacionamento",
    description: "Vagas gratuitas e seguras para todos os hóspedes",
  },
  {
    icon: UtensilsCrossed,
    title: "Serviço de Quarto",
    description: "Disponível para seu conforto e comodidade",
  },
  {
    icon: Tv,
    title: "TV a Cabo",
    description: "Canais nacionais e internacionais em todos os quartos",
  },
  {
    icon: Wind,
    title: "Ar-Condicionado",
    description: "Climatização individual para seu conforto total",
  },
];

const Services = () => {
  return (
    <section id="servicos" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-32 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl z-0 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Content */}
          <div className="lg:col-span-7 space-y-10 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-[#c1875c] font-medium tracking-widest uppercase text-sm">
                  Comodidades & Serviços
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 font-display">
                Tudo para Seu <span className="text-gradient-gold">Conforto</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-xl">
                Oferecemos uma ampla gama de serviços projetados para tornar sua estadia ainda mais agradável, relaxante e memorável.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="flex gap-4 group animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[#c1875c]/10 flex items-center justify-center group-hover:bg-[#c1875c]/10 group-hover:scale-110 transition-all duration-300">
                      <service.icon className="h-6 w-6 text-[#c1875c] group-hover:text-[#c1875c]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-5 relative animate-slide-in-right h-full">
            <div className="relative overflow-hidden rounded-[2rem] shadow-luxury h-full min-h-[500px] group">
              <img
                src={breakfastImage}
                alt="Café da manhã do hotel"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
