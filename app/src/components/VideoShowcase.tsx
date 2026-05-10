import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy-load: só inicia o vídeo quando a seção estiver visível
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Autoplay bloqueado pelo navegador — falha silenciosa
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiencia-video"
      className="relative w-full min-h-[65vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        // Não mostra controles
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ pointerEvents: "none" }}
      >
        {/* 
          O vídeo está em public/0510.mp4.
          Se precisar trocar o nome do arquivo, altere o src abaixo.
        */}
        <source src="/0510.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay sutil para legibilidade ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50 z-[1]" />

      {/* ── Conteúdo por cima do vídeo ── */}
      <div className="relative z-10 container-custom flex flex-col items-center text-center py-20 md:py-28 lg:py-32">
        {/* Tag decorativa */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-8 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#E3C385] animate-pulse" />
          <span className="tracking-wide">Experiência Premium</span>
        </div>

        {/* Título */}
        <h2 className="animate-fade-in-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight tracking-tight max-w-4xl drop-shadow-md">
          Uma experiência que começa{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C385] to-[#C29B57]">
            antes da sua chegada
          </span>
        </h2>

        {/* Linha decorativa */}
        <div className="animate-fade-in-up w-16 h-[2px] bg-gradient-to-r from-[#C29B57] to-[#E3C385] my-8 rounded-full" />

        {/* Texto de apoio */}
        <p className="animate-fade-in-up text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-2xl drop-shadow-sm">
          Cada detalhe foi pensado para receber você com conforto, praticidade e
          a tranquilidade que sua estadia merece.
        </p>

        {/* CTA — mesmo estilo do Hero existente */}
        <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="https://api.whatsapp.com/send?phone=5538999248203&text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20Hotel%20Ouro%20do%20Cerrado%20e%20gostaria%20de%20saber%20sobre%20disponibilidade%20de%20hospedagem."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#2c2421] font-semibold rounded-full overflow-hidden hover:bg-gray-100 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">Reservar agora</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </a>

          <a
            href="#acomodacoes"
            className="inline-flex justify-center items-center px-8 py-4 bg-black/20 backdrop-blur-lg border border-white/30 text-white font-medium rounded-full hover:bg-black/40 hover:border-white/50 transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Conhecer acomodações
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
