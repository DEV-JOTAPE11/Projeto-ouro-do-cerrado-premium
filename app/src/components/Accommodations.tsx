import { Users, Bed, CheckCircle2 } from "lucide-react";
import heroSuite from "@/assets/suiteluxuosa.webp";
import heroSuiteHover from "@/assets/Banheirahidro.webp";
import roomStandard from "@/assets/Suite-familia-com-ar.jpg";
import roomFamily from "@/assets/luxo-executivo.jpg";
import masterTriplo from "@/assets/master-triplo.jpg";
import masterExecu from "@/assets/master-executivo-ar-frigo.jpg";
import masterAR from "@/assets/master-ar.jpg";  
import masterexe from "@/assets/master-executivo.jpg";  
import standartventi from "@/assets/Standart_ventilador.jpg";  

const accommodations = [
  {
    id: 1,
    name: "Suíte Super Luxo",
    image: heroSuite,
    imageHover: heroSuiteHover,
    guests: "2 pessoas",
    beds: "1 cama king size",
    price: { individual: 480, duplo: 480 },
    features: ["Ar-Condicionado", "Frigobar", "Banheira de hidromassagem"],
    highlight: "Experiência Premium",
  },
  {
    id: 2,
    name: "Suite Família",
    image: roomStandard,
    guests: "4 pessoas",
    beds: "1 casal, 2 solteiro",
    price: { duplo: 260, triplo: 360, quadruplo: 460 },
    features: ["Wi-Fi gratuito", "TV a cabo", "Ar-condicionado"],
  },
  {
    id: 3,
    name: "Luxo Executivo",
    image: roomFamily,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: { individual: 200, duplo: 260 },
    features: ["Frigobar", "Ar-condicionado", "Serviço de quarto"],
  },
  {
    id: 4,
    name: "Master Triplo",
    image: masterTriplo,
    guests: "3 pessoas",
    beds: "1 casal, 1 solteiro",
    price: { individual: 180, duplo: 230, triplo: 310 },
    features: ["Ideal para familia", "TV a cabo", "Ar-condicionado"],
  },
  {
    id: 5,
    name: "Master Executivo",
    image: masterExecu,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: { individual: 180, duplo: 230 },
    features: ["Frigobar", "Ar-condicionado"],
  },
  {
    id: 6,
    name: "Master",
    image: masterAR,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: { individual: 160, duplo: 210 },
    features: ["Ar-condicionado", "Serviço de quarto"],
  },
  {
    id: 7,
    name: "Master Executivo PCD",
    image: masterexe,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: { individual: 180, duplo: 230 },
    features: ["Acessibilidade", "Ar-condicionado", "TV a cabo", "Frigobar"],
  },
  {
    id: 8,
    name: "Standart Ventilador",
    image: standartventi,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: { individual: 140, duplo: 190 },
    features: ["Ventilador", "TV a cabo"],
  },
];

const Accommodations = () => {
  return (
    <section id="acomodacoes" className="section-padding bg-muted/20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Nossas Acomodações
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Conforto e Elegância em Cada Detalhe
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Escolha a acomodação perfeita para sua estadia e desfrute de momentos únicos com o máximo de conforto e sofisticação.
          </p>
        </div>

        {/* Grid de Quartos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((room, index) => (
            <div 
              key={room.id} 
              className="group animate-scale-in flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
              data-delay={index * 0.1}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {room.imageHover && (
                  <img
                    src={room.imageHover}
                    alt={room.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                
                {room.highlight && (
                  <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {room.highlight}
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-white font-display leading-tight">{room.name}</h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                
                {/* Basic Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium mb-6 pb-6 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{room.beds}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <ul className="space-y-3">
                    {room.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prices & CTA */}
                <div className="mt-auto pt-6 border-t border-border/50">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">A partir de</p>
                      <p className="text-3xl font-bold text-foreground">
                        <span className="text-lg text-muted-foreground mr-1">R$</span>
                        {room.price.individual || room.price.duplo}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/dia</span>
                      </p>
                    </div>
                  </div>
                  
                  <a 
                    href="#contato"
                    className="flex justify-center items-center w-full py-3.5 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    Reservar Suíte
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
