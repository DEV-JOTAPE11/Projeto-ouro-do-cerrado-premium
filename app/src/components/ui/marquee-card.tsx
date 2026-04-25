import { Star } from "lucide-react";
import { LiquidCard, CardContent } from "./liquid-glass-card";
import { Marquee } from "./marquee";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Belo Horizonte, MG",
    content:
      "Experiência incrível no Ouro do Cerrado. O quarto estava impecável, a cama era muito confortável e o café da manhã foi um dos melhores da viagem.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Brasília, DF",
    content:
      "Atendimento impecável do início ao fim. A equipe foi muito acolhedora e ajudou em todos os detalhes da nossa reserva.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "São Paulo, SP",
    content:
      "Hotel aconchegante, elegante e muito bem localizado em Buritis. Perfeito para descansar depois de um dia cheio.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
  },
  {
    name: "Ricardo Menezes",
    role: "Goiânia, GO",
    content:
      "Fiquei surpreso com o cuidado nos detalhes. Tudo limpo, silencioso e com aquele atendimento que faz a gente querer voltar.",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
  },
  {
    name: "Camila Torres",
    role: "Paracatu, MG",
    content:
      "A suíte era linda e muito confortável. O Ouro do Cerrado entregou exatamente a experiência tranquila que eu procurava.",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
  },
  {
    name: "Fernando Castro",
    role: "Unaí, MG",
    content:
      "Ótima localização, check-in simples e quarto muito bem preparado. Recomendo para quem busca conforto em Buritis.",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: 5,
  },
];

export const Component = () => {
  return (
    <div className="relative overflow-hidden rounded-md border border-white/45 bg-[linear-gradient(120deg,rgba(178,135,92,0.18),rgba(255,255,255,0.18),rgba(82,94,70,0.14))] py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f3eb] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#eef1ea] to-transparent md:w-28" />

      <Marquee pauseOnHover speed="slow" repeat={4}>
        {testimonials.map((testimonial) => (
          <LiquidCard
            key={testimonial.name}
            className="mx-1 h-full w-[280px] rounded-lg border-white/60 bg-white/20 hover:-translate-y-1 hover:bg-white/28 sm:w-80"
          >
            <CardContent className="px-5 py-0 sm:px-6">
              <div className="mb-5 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-11 w-11 rounded-full border border-white/70 object-cover shadow-[0_8px_20px_-12px_rgba(0,0,0,0.55)]"
                />
                <div>
                  <h4 className="font-semibold text-[#2d241c]">{testimonial.name}</h4>
                  <p className="text-sm text-[#735f4a]">{testimonial.role}</p>
                </div>
              </div>

              <p className="mb-5 min-h-[112px] text-sm leading-relaxed text-[#4e443b] sm:text-base">
                "{testimonial.content}"
              </p>

              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-[#b2875c] text-[#b2875c]" />
                ))}
              </div>
            </CardContent>
          </LiquidCard>
        ))}
      </Marquee>
    </div>
  );
};
