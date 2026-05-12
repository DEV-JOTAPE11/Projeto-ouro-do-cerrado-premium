import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Sync React state with actual video state
  // This ensures our UI always reflects the real playback state,
  // even when the browser pauses/plays the video on its own (e.g. iOS Safari)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Lazy-load: start video playback when section is visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => {
            setHasStarted(true);
          }).catch(() => {
            // Autoplay blocked — user will use the play button
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

  // Toggle play/pause — single handler for both touch and click
  // We use onPointerDown + stopPropagation to avoid the iOS Safari
  // event bubbling issue where touch events fire click handlers
  // on parent elements, causing multiple toggle cycles.
  const togglePlayPause = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setHasStarted(true);
      }).catch(() => {
        // Play failed
      });
    } else {
      video.pause();
    }
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
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        // Let the overlay handle all interactions — video element ignores pointer
        style={{ pointerEvents: "none" }}
      >
        <source src="/0510.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay for legibility + click target for play/pause ── */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50 z-[1] cursor-pointer"
        onClick={togglePlayPause}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            togglePlayPause(e as unknown as React.MouseEvent);
          }
        }}
      />

      {/* ── Play/Pause Button ── */}
      <button
        onClick={togglePlayPause}
        className={`
          absolute z-20 flex items-center justify-center
          w-14 h-14 sm:w-16 sm:h-16 rounded-full
          bg-white/15 backdrop-blur-md border border-white/25
          text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          transition-all duration-500 ease-out
          hover:bg-white/25 hover:scale-110
          active:scale-95
          ${hasStarted && isPlaying
            ? "bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-0 hover:opacity-100 focus:opacity-100"
            : "bottom-6 right-6 sm:bottom-8 sm:right-8 opacity-100"
          }
        `}
        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        // Touch-specific: use touchEnd to avoid ghost clicks on iOS Safari
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          togglePlayPause(e as unknown as React.MouseEvent);
        }}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 sm:h-6 sm:w-6 fill-white" />
        ) : (
          <Play className="h-5 w-5 sm:h-6 sm:w-6 fill-white ml-0.5" />
        )}
      </button>

      {/* ── Content over the video ── */}
      <div className="relative z-10 container-custom flex flex-col items-center text-center py-20 md:py-28 lg:py-32 pointer-events-none">
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

        {/* CTA — pointer-events re-enabled for buttons */}
        <div className="animate-fade-in-up mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto">
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

      {/* ── Mobile: persistent play/pause indicator ── */}
      {/* On mobile, show a subtle visual cue so users know they can tap to control */}
      {!hasStarted && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse">
            <Play className="h-8 w-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoShowcase;
