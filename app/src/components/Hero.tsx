import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../assets/Melhore_a_qualidade_202604240012.jpeg";
import mobileBackgroundImage from "../assets/imagem-mobile.jpeg";
import facadeImage from "../assets/fachadaprincipal.webp";
import BookingCard from "./BookingCard";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="inicio" className="relative w-full min-h-[140dvh] md:min-h-[100dvh] flex flex-col justify-between pt-32 pb-[30rem] md:pt-40 md:pb-32 mb-64 md:mb-52 lg:mb-64 overflow-visible">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 bg-[#2c2421]">
        <img
          src={mobileBackgroundImage}
          alt="Hotel Ouro do Cerrado"
          className="block md:hidden w-full h-full object-cover object-center"
        />
        <img
          src={backgroundImage}
          alt="Hotel Background"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        {/* Subtle Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
      </div>

      <div className="container-custom flex-1 flex flex-col justify-center relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna da Esquerda: Textos */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left w-full pt-8 md:pt-0">
            <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm w-fit shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#E3C385] animate-pulse" />
              <span className="tracking-wide">Hotel Ouro do Cerrado</span>
            </div>
            
            <h1 className="hero-element text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1.05] text-white font-display tracking-tight drop-shadow-sm">
              Viva uma estadia com <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C385] to-[#C29B57]">conforto</span> e tranquilidade.
            </h1>
            
            <p className="hero-element text-base md:text-lg lg:text-xl font-light text-gray-200 max-w-xl leading-relaxed drop-shadow-sm">
              No Hotel Ouro do Cerrado, você encontra acomodações confortáveis, atendimento acolhedor e a praticidade que precisa para sua viagem. Seja para descanso, trabalho ou passagem pela região, oferecemos uma experiência agradável em um ambiente pensado para o seu bem-estar.
            </p>
            
            <div className="hero-element pt-6 flex flex-col sm:flex-row gap-4">
                {/* Botão principal */}
                <a 
                  href="#acomodacoes" 
                  className="group relative inline-flex justify-center px-8 py-4 bg-white text-[#2c2421] font-semibold rounded-full overflow-hidden hover:bg-gray-100 transition-all duration-300 items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                >
                  <span className="relative z-10">Conhecer Acomodações</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>

                {/* Botão secundário */}
                <a 
                  href="https://api.whatsapp.com/send?phone=5538999248203" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-8 py-4 
                    bg-black/20 backdrop-blur-lg 
                    border border-white/30 text-white 
                    font-medium rounded-full 
                    hover:bg-black/40 hover:border-white/50
                    transition-all duration-300 
                    items-center shadow-sm hover:shadow-lg"
                >
                  Falar no WhatsApp
                </a>
            </div>
          </div>

          {/* Coluna da Direita: Imagem da Fachada */}
          <div className="hidden md:flex lg:col-span-5 w-full justify-end items-center mt-12 lg:mt-0 relative hero-element">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-white/20 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <img
                src={facadeImage}
                alt="Fachada do Hotel Ouro do Cerrado"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Glass overlay text or gradient on the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent flex flex-col justify-end p-6">
                 <p className="text-white font-medium text-lg drop-shadow-md">Bem-vindo ao seu refúgio.</p>
                 <p className="text-gray-300 text-sm font-light mt-1">Buritis - MG</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Container para o BookingCard (flutuando na parte inferior) */}
      <div className="w-full absolute -bottom-36 md:-bottom-24 lg:-bottom-32 left-0 right-0 translate-y-1/2 px-4 md:px-0 z-20 hero-element">
         <div className="container-custom">
            <BookingCard />
         </div>
      </div>

    </section>
  );
};

export default Hero;
