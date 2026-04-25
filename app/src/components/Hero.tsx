import { ArrowRight} from "lucide-react";
import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import backgroundImage from "../assets/Melhore_a_qualidade_202604240012.jpeg";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_VIDEO_SRC = "/hero-video-intra-mobile.mp4";
const ANDROID_VIDEO_SRC = "/hero-video-intra-android.mp4";
const DESKTOP_VIDEO_SRC = "/hero-video-intra-desktop-scrub.mp4";
const LEGACY_DESKTOP_VIDEO_SRC = "/hero-video-intra.mp4";
const DESKTOP_SCRUB_FPS = 24;
const DESKTOP_SCRUB_STEP = 1 / DESKTOP_SCRUB_FPS;
const ANDROID_SCRUB_FPS = 12;
const ANDROID_SCRUB_STEP = 1 / ANDROID_SCRUB_FPS;

const isAndroidDevice = () =>
  typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoDurationRef = useRef(8);
  const mobileDesiredTimeRef = useRef(0);
  const mobileSeekRafRef = useRef<number | null>(null);
  const mobileLastAppliedTimeRef = useRef(-1);
  const isAndroidScrubModeRef = useRef(false);
  const desktopDesiredTimeRef = useRef(0);
  const desktopSeekRafRef = useRef<number | null>(null);
  const desktopLastAppliedTimeRef = useRef(-1);

  const isMobileViewport = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const applyDesktopVideoTime = useCallback((time: number) => {
    const video = desktopVideoRef.current;
    if (!video || video.readyState < 1) return;

    const duration = video.duration || 8;
    let safeTime = Math.min(Math.max(time, 0), duration);

    if (!Number.isFinite(safeTime)) return;

    safeTime = Math.min(
      duration,
      Math.round(safeTime * DESKTOP_SCRUB_FPS) / DESKTOP_SCRUB_FPS
    );

    if (Math.abs(safeTime - desktopLastAppliedTimeRef.current) < DESKTOP_SCRUB_STEP * 0.5) {
      return;
    }

    if (video.seeking) return;

    if (typeof video.fastSeek === "function") {
      video.fastSeek(safeTime);
    } else {
      video.currentTime = safeTime;
    }

    desktopLastAppliedTimeRef.current = safeTime;
  }, []);

  const syncDesktopVideoTime = useCallback((time: number) => {
    desktopDesiredTimeRef.current = time;

    if (desktopSeekRafRef.current !== null) return;

    desktopSeekRafRef.current = window.requestAnimationFrame(() => {
      desktopSeekRafRef.current = null;
      applyDesktopVideoTime(desktopDesiredTimeRef.current);
    });
  }, [applyDesktopVideoTime]);

  const applyMobileVideoTime = useCallback((time: number) => {
    const video = mobileVideoRef.current;
    if (!video || video.readyState < 1) return;

    const duration = video.duration || mobileVideoDurationRef.current;
    let safeTime = Math.min(Math.max(time, 0), duration);

    if (!Number.isFinite(safeTime)) return;

    if (isAndroidScrubModeRef.current) {
      safeTime = Math.min(
        duration,
        Math.round(safeTime * ANDROID_SCRUB_FPS) / ANDROID_SCRUB_FPS
      );

      if (Math.abs(safeTime - mobileLastAppliedTimeRef.current) < ANDROID_SCRUB_STEP * 0.5) {
        return;
      }

      if (video.seeking) return;

      if (typeof video.fastSeek === "function") {
        video.fastSeek(safeTime);
      } else {
        video.currentTime = safeTime;
      }

      mobileLastAppliedTimeRef.current = safeTime;
      return;
    }

    video.currentTime = safeTime;
  }, []);

  const syncMobileVideoTime = useCallback((time: number) => {
    mobileDesiredTimeRef.current = time;

    if (isAndroidScrubModeRef.current) {
      if (mobileSeekRafRef.current !== null) return;

      mobileSeekRafRef.current = window.requestAnimationFrame(() => {
        mobileSeekRafRef.current = null;
        applyMobileVideoTime(mobileDesiredTimeRef.current);
      });

      return;
    }

    applyMobileVideoTime(time);
  }, [applyMobileVideoTime]);

  useLayoutEffect(() => {
    isAndroidScrubModeRef.current = isAndroidDevice();

    const mobileVideo = mobileVideoRef.current;
    const desktopVideo = desktopVideoRef.current;
    const handleMobileSeeked = () => {
      if (isAndroidScrubModeRef.current) {
        syncMobileVideoTime(mobileDesiredTimeRef.current);
      }
    };
    const handleDesktopSeeked = () => {
      syncDesktopVideoTime(desktopDesiredTimeRef.current);
    };

    if (mobileVideo) {
      mobileVideo.muted = true;

      mobileVideo.playsInline = true;
      mobileVideo.setAttribute("playsinline", "true");
      mobileVideo.setAttribute("webkit-playsinline", "true");
      mobileVideo.addEventListener("seeked", handleMobileSeeked);
      mobileVideo.load();
    }

    if (desktopVideo) {
      desktopVideo.muted = true;
      desktopVideo.playsInline = true;
      desktopVideo.addEventListener("seeked", handleDesktopSeeked);
    }

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
          
            // Força o vídeo a ir para o tempo exato (isso garante que o vídeo VOLTE quando rolar pra cima)
          const nextTime = self.progress * videoDuration;

          if (isMobileViewport()) {
            syncMobileVideoTime(nextTime);
          } else {
            syncDesktopVideoTime(nextTime);
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

    return () => {
      if (mobileSeekRafRef.current !== null) {
        window.cancelAnimationFrame(mobileSeekRafRef.current);
        mobileSeekRafRef.current = null;
      }

      if (desktopSeekRafRef.current !== null) {
        window.cancelAnimationFrame(desktopSeekRafRef.current);
        desktopSeekRafRef.current = null;
      }

      if (mobileVideo) {
        mobileVideo.removeEventListener("seeked", handleMobileSeeked);
      }

      if (desktopVideo) {
        desktopVideo.removeEventListener("seeked", handleDesktopSeeked);
      }

      ctx.revert();
    };
  }, [syncDesktopVideoTime, syncMobileVideoTime]);

  const isMobile = isMobileViewport();
  const isAndroid = isAndroidDevice();
  const mobileVideoSrc = isAndroid ? ANDROID_VIDEO_SRC : MOBILE_VIDEO_SRC;
  const desktopVideoSrc = isMobile ? LEGACY_DESKTOP_VIDEO_SRC : DESKTOP_VIDEO_SRC;
  const mobilePreload = isMobile ? "auto" : "none";
  const desktopPreload = isAndroid && isMobile ? "none" : "auto";

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
              Sua estadia inesquecível começa aqui
              <br />
              Uma experiência única em hospedagem no coração de Buritis-MG
            </p>
            
            <div className="hero-element pt-4 flex flex-col sm:flex-row gap-4">
  
                {/* Botão principal */}
                <a 
                  href="#acomodacoes" 
                  className="group relative inline-flex justify-center px-8 py-4 bg-[#b2875c] text-white font-medium rounded-full overflow-hidden hover:bg-[#9a744d] transition-all duration-300 items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Confira Nossas Acomodações</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </a>

                {/* Botão secundário */}
                <a 
                  href="#contato" 
                  className="inline-flex justify-center px-8 py-4 
                    bg-[#b2875c]/10 backdrop-blur-lg 
                    border border-white/20 text-[#2c2421] 
                    font-medium rounded-full 
                    hover:bg-[#904031] hover:text-white 
                    transition-all duration-300 
                    items-center shadow-sm hover:shadow-lg"
                >
                  Fazer Reserva
                </a>

            </div>
            
          </div>

          {/* Coluna da Direita: Vídeo Menor e Arredondado (No mobile fica em cima por causa do flex-col-reverse) */}
          <div className="hero-element relative w-full aspect-video lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] bg-black/5 border border-border/50">
            <video
              ref={mobileVideoRef}
              src={mobileVideoSrc}
              poster={backgroundImage}
              className="absolute inset-0 w-full h-full object-cover bg-black/5 md:hidden"
              muted
              playsInline
              preload={mobilePreload}
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                mobileVideoDurationRef.current = video.duration || 8;
                syncMobileVideoTime(mobileDesiredTimeRef.current);
              }}
            />
            <video
              ref={desktopVideoRef}
              src={desktopVideoSrc}
              className="absolute inset-0 hidden w-full h-full object-cover md:block"
              muted
              playsInline
              preload={desktopPreload}
              onLoadedMetadata={() => {
                syncDesktopVideoTime(desktopDesiredTimeRef.current);
              }}
            />
          </div>

        </div>     
      </div>
    </section>
    
  );
};

export default Hero;
