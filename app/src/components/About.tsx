import { useEffect, useRef, useState } from "react";
import hotelExterior from "@/assets/Fachacerrado.webp";

const AnimatedNumber = ({
  end,
  suffix = "",
  decimals = 0,
}: {
  end: number;
  suffix?: string;
  decimals?: number;
}) => {
  const [value, setValue] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Só inicia animação quando entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const duration = 1400;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setValue(end * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end]);

  return (
    <div ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
};

const About = () => {
  return (
    <section id="sobre" className="section-padding bg-background relative overflow-hidden">
      
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="animate-slide-in relative">
            <div className="relative overflow-hidden rounded-tr-[48px] rounded-bl-[48px] sm:rounded-tr-[80px] sm:rounded-bl-[80px] shadow-luxury group">
              <img
                src={hotelExterior}
                alt="Fachada do Ouro do Cerrado Hotel"
                className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 text-white">
                <p className="font-display text-2xl sm:text-3xl font-bold">Buritis, MG</p>
                <p className="text-white/80 font-light">O coração do Cerrado</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-slide-in-right">
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-medium tracking-widest uppercase text-sm">
                  A Experiência
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Bem-vindo ao{" "}
                <span className="text-gradient-gold block mt-2">
                  Ouro do Cerrado
                </span>
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
              <p>
                Situado no vibrante centro de Buritis-MG, o Ouro do Cerrado Hotel redefine a arte de hospedar. Convidamos você a desfrutar de uma experiência única, onde o conforto contemporâneo, a elegância em cada detalhe e uma hospitalidade calorosa se fundem perfeitamente.
              </p>
              <p>
                Nossa missão é criar estadias memoráveis. Com acomodações modernas, projetadas para o seu máximo descanso, e uma gama de serviços de excelência, nossa equipe se dedica a um atendimento personalizado que realmente faz a diferença.
              </p>
            </div>

            {/* Números animados */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              
              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#b2875c] font-display">
                  <AnimatedNumber end={4} suffix="+" />
                </div>
                <div className="text-sm font-medium text-foreground uppercase tracking-wider">
                  Anos de<br />Experiência
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#b2875c] font-display">
                  <AnimatedNumber end={500} suffix="+" />
                </div>
                <div className="text-sm font-medium text-foreground uppercase tracking-wider">
                  Hóspedes<br />Satisfeitos
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl font-bold text-[#b2875c] font-display">
                  <AnimatedNumber end={4.8} decimals={1} />
                </div>
                <div className="text-sm font-medium text-foreground uppercase tracking-wider">
                  Avaliação<br />Média
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
