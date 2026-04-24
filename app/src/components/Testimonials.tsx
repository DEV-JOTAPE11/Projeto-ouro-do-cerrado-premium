import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment:
      "Experiência incrível! O hotel é maravilhoso, quartos limpos e confortáveis. O café da manhã é espetacular. Com certeza voltaremos!",
    date: "Janeiro 2025",
  },
  {
    id: 2,
    name: "João Santos",
    location: "Brasília, DF",
    rating: 5,
    comment:
      "Atendimento impecável e instalações de primeira. A hospitalidade da equipe faz toda a diferença. Recomendo muito!",
    date: "Dezembro 2024",
  },
  {
    id: 3,
    name: "Ana Costa",
    location: "São Paulo, SP",
    rating: 5,
    comment:
      "Hotel aconchegante e bem localizado. Perfeito para uma estadia relaxante. As acomodações são elegantes e muito confortáveis.",
    date: "Novembro 2024",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-background relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Depoimentos
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-display">
            A Voz dos Nossos Hóspedes
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card p-8 rounded-2xl shadow-card border border-border/50 relative animate-scale-in flex flex-col h-full hover:shadow-luxury transition-shadow duration-300"
              data-delay={index * 0.1}
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-muted-foreground leading-relaxed font-light italic mb-8 flex-grow">
                "{testimonial.comment}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-border/50 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg font-display">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
