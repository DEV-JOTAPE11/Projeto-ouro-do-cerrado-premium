import { AnimatedTestimonials } from "./ui/animated-testimonials";

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Viajante",
    company: "Belo Horizonte, MG",
    content:
      "Experiência incrível no Ouro do Cerrado. O quarto estava impecável, a cama era muito confortável e o café da manhã foi um dos melhores da viagem. Com certeza voltarei!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "João Santos",
    role: "Empresário",
    company: "Brasília, DF",
    content:
      "Atendimento impecável do início ao fim. A equipe foi muito acolhedora e ajudou em todos os detalhes da nossa reserva. Ambiente silencioso e perfeito para descansar.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Turista",
    company: "São Paulo, SP",
    content:
      "Hotel aconchegante, elegante e muito bem localizado em Buritis. Perfeito para descansar depois de um dia cheio. A suíte era linda e superou todas as expectativas.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    name: "Ricardo Menezes",
    role: "Executivo",
    company: "Goiânia, GO",
    content:
      "Fiquei surpreso com o cuidado nos detalhes. Tudo limpo, silencioso e com aquele atendimento que faz a gente querer voltar. Recomendo para qualquer viajante exigente.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 5,
    name: "Camila Torres",
    role: "Turista",
    company: "Paracatu, MG",
    content:
      "A suíte era linda e muito confortável. O Ouro do Cerrado entregou exatamente a experiência tranquila e sofisticada que eu procurava. Nota 10!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 6,
    name: "Fernando Castro",
    role: "Representante Comercial",
    company: "Unaí, MG",
    content:
      "Ótima localização, check-in simples e quarto muito bem preparado. Recomendo para quem busca conforto e praticidade em Buritis.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=18",
  },
];

const Testimonials = () => {
  return (
    <AnimatedTestimonials
      title="A Voz dos Nossos Hóspedes"
      subtitle="Avaliações inspiradas em experiências memoráveis no Ouro do Cerrado. Cada depoimento reflete nosso compromisso com a excelência."
      badgeText="Depoimentos"
      testimonials={testimonials}
      autoRotateInterval={6000}
      trustedCompanies={[
        "Belo Horizonte",
        "Brasília",
        "Goiânia",
        "São Paulo",
        "Unaí",
        "Paracatu",
      ]}
      trustedCompaniesTitle="Hóspedes de diversas cidades confiam no Ouro do Cerrado"
    />
  );
};

export default Testimonials;
