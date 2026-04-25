import { Component as MarqueeTestimonials } from "./ui/marquee-card";

const Testimonials = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-[linear-gradient(135deg,#fbfaf7_0%,#f3eadc_42%,#eef3e8_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-white/80" />

      <div className="container-custom relative z-10">
        <div className="mx-auto mb-12 max-w-3xl text-center animate-fade-in-up">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-widest text-[#b2875c]">
              Depoimentos
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="mt-4 mb-6 text-4xl font-bold font-display md:text-5xl">
            A Voz dos Nossos Hóspedes
          </h2>
          <p className="text-lg text-muted-foreground">
            Avaliações fictícias inspiradas em experiências memoráveis no Ouro do Cerrado.
          </p>
        </div>

        <MarqueeTestimonials />
      </div>
    </section>
  );
};

export default Testimonials;
