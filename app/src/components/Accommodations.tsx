import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Bed, Maximize } from "lucide-react";
import heroSuite from "@/assets/suiteluxuosa.webp";
import heroSuiteHover from "@/assets/Banheirahidro.webp";
import roomStandard from "@/assets/Suite-familia-com-ar.jpg";
import roomFamily from "@/assets/luxo-executivo.jpg";
import masterTriplo from "@/assets/master-triplo.jpg";
import masterExecu from "@/assets/master-executivo-ar-frigo.jpg";
import masterAR from "@/assets/master-ar.jpg";  
import masterexe from "@/assets/master-executivo.jpg";  
import standartventi from "@/assets/Standart_ventilador.jpg";  
import standartexecutivo from "@/assets/master-ar.jpg";  

const accommodations = [
  {
    id: 1,
    name: "Suíte Super Luxo",
    image: heroSuite,
    imageHover: heroSuiteHover,
    guests: "2 pessoas",
    beds: "1 cama king size",
    size: "48²",
    price: {
      individual: 480,
      duplo: 480,
    },
    features: ["Ar-Condicionado","Frigobar", "Banheira de hidromassagem"],
  },
  {
    id: 2,
    name: "Suite família com ar",
    image: roomStandard,
    guests: "4 pessoas",
    beds: "1 cama de casal e 2 camas de solteiro",
    price: {
      duplo: 260, // (Ex: O preço base é para casal)
      triplo: 360,
      quadruplo: 460,
    },
    features: ["Wi-Fi gratuito", "TV a cabo", "Ar-condicionado"],
  },
  {
    id: 3,
    name: "Luxo Executivo",
    image: roomFamily,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 200, // (Ex: O preço base é para casal)
      duplo: 260,
    },
    features: ["Frigobar", "Ar-condicionado", "Serviço de quarto"],
  },

  {
    id: 4,
    name: "Master Triplo",
    image: masterTriplo,
    guests: "3 pessoas",
    beds: "1 cama de casal e uma de solteiro",
    price: {
      individual: 180, // (Ex: O preço base é para casal)
      duplo: 230.00,
      triplo: 310.00,
    },
    features: ["Ideal para familia", "Tv a cabo", "Ar-condicionado"],
  },

  {
    id: 5,
    name: "Master Executivo com ar e frigobar",
    image: masterExecu,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 180, // (Ex: O preço base é para casal)
      duplo: 230.00,
    },
    features: ["Frigobar", "Ar-condicionado"],
  },

   {
    id: 6,
    name: "Master com ar",
    image: masterAR,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 160, // (Ex: O preço base é para casal)
      duplo: 210.00,
    },
    features: [ "Ar-condicionado", "serviço de quarto",],
  },

  {
    id: 7,
    name: "Master executivo",
    image: masterexe,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 180, // (Ex: O preço base é para casal)
      duplo: 230.00,
    },
    features: [ "Com acessibilidade", "Ar-condicionado", "Tv a cabo", "Frigobar"],
  },

   {
    id: 8,
    name: "Standart com ventilador",
    image: standartventi,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 140, // (Ex: O preço base é para casal)
      duplo: 190,
    },
    features: [ "Ventilador", "Tv a cabo"],
  },

  {
    id: 9,
    name: "Standart executivo com ventilador e frigobar",
    image: standartexecutivo,
    guests: "2 pessoas",
    beds: "1 cama de casal",
    price: {
      individual: 160, // (Ex: O preço base é para casal)
      duplo: 210,
    },
    features: [ "Ventilador", "Tv a cabo", "Frigobar"],
  },
];

const Accommodations = () => {
  return (
    <section id="acomodacoes" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Nossas Acomodações
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Conforto e Elegância em Cada Detalhe
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha a acomodação perfeita para sua estadia e desfrute de momentos únicos
          </p>
        </div>

        {/* Accommodation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {accommodations.map((room, index) => (
            <Card 
              key={room.id} 
              className="overflow-hidden hover-lift shadow-card border-none group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* IMAGEM HOVER (Fica por cima) */}
                    {/* (Só renderiza se 'room.imageHover' existir) */}
                    {room.imageHover && (
                      <img
                        src={room.imageHover}
                        alt={room.name}
                        // 👇 Começa invisível (opacity-0) e aparece no hover (group-hover:opacity-100)
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      />
                    )}
                    
                <div className="absolute top-4 right-4 bg-[#904031] text-white px-4 py-2 rounded-full font-semibold">
                  A partir de R$ {room.price.individual || room.price.duplo || '...'}
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold notranslate" translate="no">{room.name}</h3>

                {/* Info Icons */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{room.beds}</span>
                  </div>
                  {room.size && (
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-primary" />
                    <span>{room.size}</span>
                  </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                  {/* 👇 NOVO BLOCO DE PREÇOS DETALHADOS 👇 */}
                <div className="my-4 p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Valores da Diária</h4>
                  <ul className="space-y-1 text-sm text-gray-800">
                    
                    {/* O '&&' checa se o preço existe antes de mostrar a linha */}
                    {room.price.individual && (
                      <li className="flex justify-between">
                        <span>Individual:</span>
                        <strong>R$ {room.price.individual}</strong>
                      </li>
                    )}
                    {room.price.duplo && (
                      <li className="flex justify-between">
                        <span>Casal:</span>
                        <strong>R$ {room.price.duplo}</strong>
                      </li>
                    )}
                    {room.price.triplo && (
                      <li className="flex justify-between">
                        <span>Triplo:</span>
                        <strong>R$ {room.price.triplo}</strong>
                      </li>
                    )}
                    {room.price.quadruplo && (
                      <li className="flex justify-between">
                        <span>Quádruplo:</span>
                        <strong>R$ {room.price.quadruplo}</strong>
                      </li>
                    )}
                  </ul>
                </div>
                {/* 👆 FIM DO NOVO BLOCO 👆 */}

                {/* CTA Button */}
                <Button variant="secondary" className="w-full bg-[#904031] text-white" asChild>
                  <a href="#contato">Reservar Esta Suíte</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
