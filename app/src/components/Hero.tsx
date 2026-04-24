import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundImage from "@/assets/Melhore_a_qualidade_202604240012.jpeg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Duração exata do vídeo re-encodado para o scrub perfeito
      const videoDuration = 8;

      // Usando trigger no container (250vh) sem pin, porque a div interna é sticky!
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom", 
        scrub: true, // Sem delay (true) para resposta imediata
        once: false, // EXTREMAMENTE IMPORTANTE: sobrescreve o ScrollTrigger.defaults({ once: true }) do App.tsx
        onUpdate: (self) => {
          // self.progress vai de 0 a 1 conforme você desce, e 1 a 0 conforme você sobe!
          if (videoRef.current) {
            // Força o vídeo a ir para o tempo exato (isso garante que o vídeo VOLTE quando rolar pra cima)
            videoRef.current.currentTime = self.progress * videoDuration;
          }
        }
      });

      // Animações de entrada
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Container externo define quanto tempo a tela vai rolar (250vh)
    <section ref={containerRef} id="inicio" className="relative h-[250vh] bg-background">
      
      {/* Container interno pegajoso (Sticky) - Ajustado para mobile com min-h-screen e flex-col */}
      <div className="sticky top-0 min-h-[100dvh] w-full flex flex-col justify-center pt-28 pb-16 lg:pt-20 lg:pb-0 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
          />
        </div>

        <div className="container-custom flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          {/* Coluna da Esquerda: Textos (No mobile fica em baixo por causa do flex-col-reverse) */}
          <div className="space-y-6 lg:space-y-8 text-left z-10 w-full">
            <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b2875c]/10 text-[#b2875c] font-medium text-sm w-fit">
              <div className="w-2 h-2 rounded-full bg-[#b2875c] animate-pulse" />
              <span>Experiência Cinematográfica</span>
            </div>
            
            <h1 className="hero-element text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] text-foreground font-display tracking-tight">
              A nova <br />
              assinatura do <br />
              <span className="text-muted-foreground">seu descanso.</span>
            </h1>
            
            <p className="hero-element text-base md:text-lg lg:text-xl font-light text-muted-foreground max-w-lg">
              Role a página para baixo e veja o vídeo avançar perfeitamente. Um sistema de animação idêntico à sua referência de alto padrão.
            </p>
            
            <div className="hero-element pt-4 flex flex-col sm:flex-row gap-4">
  
                {/* Botão principal */}
                <a 
                  href="#acomodacoes" 
                  className="group relative inline-flex justify-center px-8 py-4 bg-[#b2875c] text-white font-medium rounded-full overflow-hidden hover:bg-[#9a744d] transition-all duration-300 items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Iniciar Projeto</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>

                {/* Botão secundário */}
                <a 
                  href="#contato" 
                  className="inline-flex justify-center px-8 py-4 bg-transparent border border-[#2c2421] text-[#2c2421] font-medium rounded-full hover:bg-[#904031] hover:text-white transition-all duration-300 items-center shadow-sm hover:shadow-lg"
                >
                  Fazer Reserva
                </a>

            </div>
            
          </div>

          {/* Coluna da Direita: Vídeo Menor e Arredondado (No mobile fica em cima por causa do flex-col-reverse) */}
          <div className="hero-element relative w-full aspect-video lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-black/5 border border-border/50">
            <video
              ref={videoRef}
              src="/hero-video-intra.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              preload="auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
