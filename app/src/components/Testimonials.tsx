import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

const Testimonials = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-[#c1875c] font-medium tracking-widest uppercase text-sm">
              Depoimentos
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-display">
            A Voz dos Nossos Hóspedes
          </h2>
          <p className="text-lg text-muted-foreground">
            Histórias fictícias inspiradas em experiências memoráveis no Ouro do Cerrado
          </p>
        </div>

        <StaggerTestimonials />
      </div>
    </section>
  );
};

export default Testimonials;
