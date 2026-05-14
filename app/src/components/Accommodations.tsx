import ElegantCarousel from "./ui/elegant-carousel";
import { accommodations } from "../lib/accommodations";

const Accommodations = () => {
  const handleQuickReserve = (roomName: string) => {
    window.dispatchEvent(
      new CustomEvent("quick-reserve-room", {
        detail: { roomName },
      }),
    );

    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="acomodacoes" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[#c1875c] font-semibold text-sm uppercase tracking-wider">
            Nossas Acomodações
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Conforto e Elegância em Cada Detalhe
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha a acomodação perfeita para sua estadia e agilize sua reserva direto pela Hero.
          </p>
        </div>

        <ElegantCarousel slides={accommodations} onReserve={handleQuickReserve} />
      </div>
    </section>
  );
};

export default Accommodations;
