"use client";

import { useEffect, useState, type FC } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);
const ACCENT = "#000000";

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Foi uma das estadias mais tranquilas que ja tivemos em Buritis. Quarto impecavel, cama excelente e atendimento muito acolhedor.",
    by: "Mariana Alves, Belo Horizonte, MG",
    imgSrc: "https://i.pravatar.cc/150?img=1",
  },
  {
    tempId: 1,
    testimonial:
      "O cafe da manha estava delicioso e a equipe cuidou de cada detalhe. O Ouro do Cerrado virou nossa primeira opcao na cidade.",
    by: "Ricardo Menezes, Brasilia, DF",
    imgSrc: "https://i.pravatar.cc/150?img=12",
  },
  {
    tempId: 2,
    testimonial:
      "Cheguei cansada de viagem e encontrei um ambiente elegante, limpo e silencioso. A experiencia foi realmente acima do esperado.",
    by: "Patricia Rocha, Goiania, GO",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 3,
    testimonial:
      "A localizacao facilitou tudo, mas o que mais marcou foi a hospitalidade. A equipe faz a gente se sentir em casa.",
    by: "Eduardo Lima, Unaí, MG",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    tempId: 4,
    testimonial:
      "A suite estava muito bem preparada, com detalhes de conforto que fizeram diferenca. Voltaria sem pensar duas vezes.",
    by: "Camila Torres, Sao Paulo, SP",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    tempId: 5,
    testimonial:
      "Precisavamos de descanso e encontramos exatamente isso. Banho otimo, quarto aconchegante e atendimento gentil do inicio ao fim.",
    by: "Fernando Castro, Paracatu, MG",
    imgSrc: "https://i.pravatar.cc/150?img=18",
  },
  {
    tempId: 6,
    testimonial:
      "O hotel tem uma atmosfera sofisticada sem perder o calor humano. Foi uma experiencia incrivel no coracao do Cerrado.",
    by: "Juliana Martins, Uberlandia, MG",
    imgSrc: "https://i.pravatar.cc/150?img=23",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;
  const isNear = Math.abs(position) <= 2;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-6 transition-all duration-500 ease-in-out sm:p-8",
        isCenter
          ? "z-20 border-[#b2875c] bg-white text-foreground"
          : "z-10 border-border/70 bg-white/95 text-card-foreground hover:border-[#b2875c]/70",
        !isNear && "pointer-events-none opacity-0",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          "polygon(42px 0%, calc(100% - 42px) 0%, 100% 42px, 100% 100%, calc(100% - 42px) 100%, 42px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -34 : position % 2 ? 18 : -12}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.92})
        `,
        boxShadow: isCenter
          ? "0 20px 50px -18px rgba(0,0,0,0.35), 0 8px 0 0 rgba(178,135,92,0.24)"
          : "0 14px 35px -26px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 40,
          width: SQRT_5000,
          height: 1,
        }}
      />

      <Quote className="absolute right-6 top-6 h-9 w-9 text-[#b2875c]/15" />

      <div className="mb-5 flex items-center gap-4">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          className="h-14 w-14 rounded-md bg-muted object-cover object-top"
          style={{ boxShadow: "4px 4px 0 rgba(178,135,92,0.28)" }}
        />
        <div>
          <div className="mb-1 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-[#b2875c] text-[#b2875c]" />
            ))}
          </div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: ACCENT }}>
            Hospede verificado
          </p>
        </div>
      </div>

      <h3 className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
        "{testimonial.testimonial}"
      </h3>

      <p className="absolute bottom-6 left-6 right-6 text-sm italic text-muted-foreground sm:bottom-8 sm:left-8 sm:right-8">
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    if (steps === 0) return;

    const newList = [...testimonialsList];

    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }

    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 286);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-muted/30" style={{ height: cardSize < 300 ? 520 : 600 }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 45%, ${ACCENT}1c 0%, transparent 64%)`,
        }}
      />

      {testimonialsList.map((testimonial, index) => {
        const position = index - Math.floor(testimonialsList.length / 2);

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-white text-foreground shadow-card transition-colors hover:bg-[#904031] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:w-14"
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-white text-foreground shadow-card transition-colors hover:bg-[#904031] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:w-14"
          aria-label="Proximo depoimento"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
