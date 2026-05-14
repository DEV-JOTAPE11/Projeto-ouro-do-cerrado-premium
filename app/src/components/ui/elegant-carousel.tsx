import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { Bed, ChevronLeft, ChevronRight, Maximize, Users } from "lucide-react";
import { formatPrice, getStartingPrice, type AccommodationSlide } from "../../lib/accommodations";

interface ElegantCarouselProps {
  slides: AccommodationSlide[];
  onReserve?: (roomName: string) => void;
}

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 700;
const ACCENT = "#b2875c";

export default function ElegantCarousel({ slides, onReserve }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex || !slides.length) return;

      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, TRANSITION_DURATION / 2);
    },
    [currentIndex, isTransitioning, slides.length],
  );

  const goNext = useCallback(() => {
    if (!slides.length) return;
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    if (!slides.length) return;
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused || !slides.length) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / (SLIDE_DURATION / 50), 100));
    }, 50);

    intervalRef.current = setInterval(goNext, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, goNext, isPaused, slides.length]);

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];
  const startingPrice = getStartingPrice(currentSlide);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0].clientX;
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) <= 60) return;
    if (diff > 0) goNext();
    else goPrev();
  };

  return (
    <div
      className="relative overflow-hidden rounded-md bg-white shadow-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 75% 45%, ${ACCENT}1f 0%, transparent 62%)`,
        }}
      />

      <div className="relative grid min-h-[620px] lg:grid-cols-[0.95fr_1.05fr] lg:min-h-[560px]">
        <div className="order-2 flex items-center px-5 py-7 sm:px-8 lg:order-1 lg:px-10 lg:py-12">
          <div className="w-full space-y-5">
            <div
              className={`flex items-center gap-3 text-sm font-medium transition-all duration-300 ${
                isTransitioning ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <span className="h-px w-10" style={{ backgroundColor: ACCENT }} />
              <span style={{ color: ACCENT }}>
                {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className={`space-y-3 transition-all duration-300 ${
                isTransitioning ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              <h3 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                {currentSlide.name}
              </h3>

              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" style={{ color: ACCENT }} />
                  <span>{currentSlide.guests}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4" style={{ color: ACCENT }} />
                  <span>{currentSlide.beds}</span>
                </div>
                {currentSlide.size && (
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4" style={{ color: ACCENT }} />
                    <span>{currentSlide.size}</span>
                  </div>
                )}
              </div>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {currentSlide.features.map((feature) => (
                <li key={feature} className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="rounded-md bg-gray-100 p-4">
              <h4 className="mb-2 text-lg font-semibold text-gray-900">Valores da Diaria</h4>
              <ul className="space-y-1 text-sm text-gray-800">
                {currentSlide.price.individual && (
                  <li className="flex justify-between gap-4">
                    <span>Individual:</span>
                    <strong>{formatPrice(currentSlide.price.individual)}</strong>
                  </li>
                )}
                {currentSlide.price.duplo && (
                  <li className="flex justify-between gap-4">
                    <span>Casal:</span>
                    <strong>{formatPrice(currentSlide.price.duplo)}</strong>
                  </li>
                )}
                {currentSlide.price.triplo && (
                  <li className="flex justify-between gap-4">
                    <span>Triplo:</span>
                    <strong>{formatPrice(currentSlide.price.triplo)}</strong>
                  </li>
                )}
                {currentSlide.price.quadruplo && (
                  <li className="flex justify-between gap-4">
                    <span>Quadruplo:</span>
                    <strong>{formatPrice(currentSlide.price.quadruplo)}</strong>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-foreground transition-colors hover:bg-muted"
                aria-label="Acomodacao anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-white text-foreground transition-colors hover:bg-muted"
                aria-label="Proxima acomodacao"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => onReserve?.(currentSlide.name)}
                className="ml-auto inline-flex h-10 flex-1 items-center justify-center rounded-md bg-[#904031] px-4 text-sm font-medium text-white transition-colors hover:bg-[#7a3528] sm:flex-none sm:px-8"
              >
                Reservar Esta Suite
              </button>
            </div>
          </div>
        </div>

        <div className="relative order-1 min-h-[340px] overflow-hidden sm:min-h-[430px] lg:order-2 lg:min-h-full">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isTransitioning ? "scale-[1.03] opacity-70" : "scale-100 opacity-100"
            }`}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {currentSlide.imageHover && (
              <img
                src={currentSlide.imageHover}
                alt={currentSlide.name}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 hover:scale-105 hover:opacity-100"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>

          {startingPrice && (
            <div className="absolute right-4 top-4 rounded-full bg-[#904031] px-4 py-2 text-sm font-semibold text-white shadow-md">
              A partir de {formatPrice(startingPrice)}
            </div>
          )}
        </div>
      </div>

      <div className="relative grid gap-3 border-t border-border bg-white/85 p-4 sm:grid-cols-3 lg:grid-cols-5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(index)}
            className="min-w-0 text-left"
            aria-label={`Ver ${slide.name}`}
          >
            <span className="mb-2 block h-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full transition-all duration-100"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? "100%" : "0%",
                  backgroundColor: index === currentIndex ? ACCENT : "#d8c3a2",
                }}
              />
            </span>
            <span
              className={`block truncate text-xs font-medium ${
                index === currentIndex ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {slide.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
