import { useState, useEffect, useRef, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

export interface SelectorOption {
  title: string
  description: string
  image: string
  icon: ReactNode
}

export interface InteractiveSelectorProps {
  title?: string
  subtitle?: string
  badgeText?: string
  options: SelectorOption[]
  className?: string
}

export function InteractiveSelector({
  title = "Conheça Nossas Instalações",
  subtitle = "Uma prévia do que espera por você no Ouro do Cerrado Hotel",
  badgeText = "Galeria",
  options,
  className,
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null)
  const [swipeDelta, setSwipeDelta] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const scrollYRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const isLightboxOpen = lightboxIndex !== null

  // ───────────────────────────────────────────
  // Panel interaction — works on both iOS & Android
  // ───────────────────────────────────────────
  const handlePanelTap = useCallback(
    (index: number, e: React.MouseEvent | React.TouchEvent) => {
      // On touch devices, prevent the ghost click
      if ("touches" in e) {
        e.preventDefault()
      }

      const isMobile = window.innerWidth < 768
      if (isMobile) {
        if (activeIndex === index) {
          // Second tap on already-active panel → open lightbox
          setLightboxIndex(index)
        } else {
          setActiveIndex(index)
        }
      } else {
        // Desktop: just switch panel
        if (index !== activeIndex) {
          setActiveIndex(index)
        }
      }
    },
    [activeIndex]
  )

  // ───────────────────────────────────────────
  // Lightbox navigation
  // ───────────────────────────────────────────
  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev + 1) % options.length
    })
  }, [options.length])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return (prev - 1 + options.length) % options.length
    })
  }, [options.length])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setSwipeDelta(0)
    setSwipeStartX(null)
    setIsSwiping(false)
  }, [])

  // ───────────────────────────────────────────
  // Keyboard nav (desktop)
  // ───────────────────────────────────────────
  useEffect(() => {
    if (!isLightboxOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isLightboxOpen, closeLightbox, goToNext, goToPrev])

  // ───────────────────────────────────────────
  // iOS-safe body scroll lock
  // On iOS Safari, `overflow:hidden` on body does NOT prevent
  // scrolling. The only reliable method is:
  //   1. Save scroll position
  //   2. Set body to position:fixed + top:-scrollY
  //   3. Restore on close
  // Also block touchmove on the lightbox overlay itself.
  // ───────────────────────────────────────────
  useEffect(() => {
    if (isLightboxOpen) {
      scrollYRef.current = window.scrollY
      const body = document.body
      const html = document.documentElement

      body.style.position = "fixed"
      body.style.top = `-${scrollYRef.current}px`
      body.style.left = "0"
      body.style.right = "0"
      body.style.overflow = "hidden"
      html.style.overflow = "hidden"

      return () => {
        body.style.position = ""
        body.style.top = ""
        body.style.left = ""
        body.style.right = ""
        body.style.overflow = ""
        html.style.overflow = ""
        window.scrollTo(0, scrollYRef.current)
      }
    }
  }, [isLightboxOpen])

  // Block touchmove on the lightbox overlay to prevent
  // iOS elastic bounce / address bar toggling
  useEffect(() => {
    if (!isLightboxOpen) return

    const preventScroll = (e: TouchEvent) => {
      // Allow scrolling only inside the thumbnail strip
      const target = e.target as HTMLElement
      if (target.closest("[data-thumbstrip]")) return
      e.preventDefault()
    }

    document.addEventListener("touchmove", preventScroll, { passive: false })
    return () => document.removeEventListener("touchmove", preventScroll)
  }, [isLightboxOpen])

  // ───────────────────────────────────────────
  // Swipe handlers for lightbox image navigation
  // ───────────────────────────────────────────
  const onSwipeStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX)
    setIsSwiping(true)
  }

  const onSwipeMove = (e: React.TouchEvent) => {
    if (swipeStartX === null) return
    setSwipeDelta(e.touches[0].clientX - swipeStartX)
  }

  const onSwipeEnd = () => {
    if (swipeStartX === null) return
    const THRESHOLD = 50

    if (swipeDelta > THRESHOLD) {
      goToPrev()
    } else if (swipeDelta < -THRESHOLD) {
      goToNext()
    }

    setSwipeStartX(null)
    setSwipeDelta(0)
    setIsSwiping(false)
  }

  // ───────────────────────────────────────────
  // Stagger entrance animation
  // ───────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return
    const timers: ReturnType<typeof setTimeout>[] = []

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i])
      }, 200 * i)
      timers.push(timer)
    })

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [isInView, options.length])

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="galeria"
        className={`section-padding relative overflow-hidden bg-[#1a1713] ${className || ""}`}
      >
        {/* Subtle warm grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

        <div className="container-custom relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            {badgeText && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#b2875c]" />
                <span className="text-sm font-medium uppercase tracking-widest text-[#b2875c]">
                  {badgeText}
                </span>
                <div className="h-px w-8 bg-[#b2875c]" />
              </div>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight font-display">
              {title}
            </h2>
            <p className="text-lg text-[#a09080] font-light leading-relaxed">
              {subtitle}
            </p>
          </motion.div>

          {/* Interactive Selector */}
          <div className="flex w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] items-stretch overflow-hidden rounded-2xl">
            {options.map((option, index) => {
              const isActive = activeIndex === index
              const isVisible = animatedOptions.includes(index)

              return (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  // Use onTouchEnd for iOS + onClick for desktop
                  onTouchEnd={(e) => handlePanelTap(index, e)}
                  onClick={(e) => handlePanelTap(index, e)}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    flex: isActive ? "7 1 0%" : "1 1 0%",
                    minWidth: isActive ? "0" : "48px",
                    transition:
                      "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.5s ease",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateX(0)"
                      : "translateX(-40px)",
                    borderLeft: index > 0 ? "2px solid rgba(178,135,92,0.15)" : "none",
                    zIndex: isActive ? 10 : 1,
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                  }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-in-out"
                    style={{
                      backgroundImage: `url('${option.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transform: isActive ? "scale(1)" : "scale(1.15)",
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />

                  {/* Gold accent border on active */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#b2875c] to-transparent z-20" />
                  )}

                  {/* Mobile zoom hint on active panel */}
                  {isActive && (
                    <div className="absolute top-3 right-3 z-20 md:hidden">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/50 border border-white/10">
                        <ZoomIn size={14} className="text-[#d4b896]" />
                        <span className="text-[11px] text-[#d4b896] font-medium">
                          Toque para ampliar
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Label - Icon + Text */}
                  <div className="absolute left-0 right-0 bottom-4 sm:bottom-6 flex items-center px-3 sm:px-5 gap-3 z-10 pointer-events-none">
                    {/* Icon badge */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-500"
                      style={{
                        width: isActive ? "48px" : "40px",
                        height: isActive ? "48px" : "40px",
                        backgroundColor: isActive
                          ? "rgba(178, 135, 92, 0.25)"
                          : "rgba(26, 23, 19, 0.75)",
                        border: isActive
                          ? "2px solid rgba(178,135,92,0.6)"
                          : "2px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {option.icon}
                    </div>

                    {/* Text info */}
                    <div className="overflow-hidden whitespace-nowrap">
                      <div
                        className="font-bold text-base sm:text-lg text-white transition-all duration-700 ease-in-out font-display"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? "translateX(0)"
                            : "translateX(20px)",
                        }}
                      >
                        {option.title}
                      </div>
                      <div
                        className="text-sm sm:text-base text-[#d4b896] transition-all duration-700 ease-in-out"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive
                            ? "translateX(0)"
                            : "translateX(20px)",
                          transitionDelay: "0.05s",
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Fullscreen Lightbox Modal ─── */}
      <AnimatePresence>
        {isLightboxOpen && lightboxIndex !== null && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{
              backgroundColor: "rgba(0,0,0,0.96)",
              // iOS: avoid backdrop-filter which causes glitches
              WebkitTapHighlightColor: "transparent",
              touchAction: "none",
            }}
            // Close when tapping the dark overlay (not children)
            onTouchEnd={(e) => {
              if (e.target === lightboxRef.current) {
                e.preventDefault()
                closeLightbox()
              }
            }}
            onClick={(e) => {
              if (e.target === lightboxRef.current) {
                closeLightbox()
              }
            }}
          >
            {/* ── Top bar ── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 relative z-50 shrink-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#b2875c]/20 border border-[#b2875c]/40">
                  {options[lightboxIndex].icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base font-display leading-tight truncate">
                    {options[lightboxIndex].title}
                  </h3>
                  <p className="text-[#a09080] text-xs sm:text-sm truncate">
                    {options[lightboxIndex].description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Counter */}
                <div className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                  <span className="text-xs text-white/70 font-medium tabular-nums">
                    {lightboxIndex + 1} / {options.length}
                  </span>
                </div>

                {/* Close button — uses <button> for guaranteed iOS tap */}
                <button
                  type="button"
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    closeLightbox()
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    closeLightbox()
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 active:bg-white/25 border border-white/10 transition-colors duration-150 cursor-pointer"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Fechar galeria"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </motion.div>

            {/* ── Main image area with swipe ── */}
            <div
              className="flex-1 relative flex items-center justify-center px-2 sm:px-12 overflow-hidden"
              onTouchStart={onSwipeStart}
              onTouchMove={onSwipeMove}
              onTouchEnd={onSwipeEnd}
              style={{ touchAction: "pan-y" }}
            >
              {/* Desktop navigation arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-[#b2875c]/30 border border-white/10 hover:border-[#b2875c]/50 transition-all duration-300 cursor-pointer group"
                aria-label="Imagem anterior"
              >
                <ChevronLeft
                  size={24}
                  className="text-white group-hover:text-[#d4b896] transition-colors"
                />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-[#b2875c]/30 border border-white/10 hover:border-[#b2875c]/50 transition-all duration-300 cursor-pointer group"
                aria-label="Próxima imagem"
              >
                <ChevronRight
                  size={24}
                  className="text-white group-hover:text-[#d4b896] transition-colors"
                />
              </button>

              {/* Image with swipe offset */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.94, x: 50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: isSwiping ? swipeDelta * 0.4 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.94, x: -50 }}
                  transition={{
                    duration: isSwiping ? 0 : 0.3,
                    ease: "easeOut",
                  }}
                  className="relative w-full max-w-4xl"
                >
                  <img
                    src={options[lightboxIndex].image}
                    alt={options[lightboxIndex].title}
                    className="w-full max-h-[65vh] sm:max-h-[72vh] object-contain rounded-xl select-none"
                    draggable={false}
                    style={{
                      // iOS: prevent image selection / callout
                      WebkitTouchCallout: "none",
                      WebkitUserSelect: "none",
                      userSelect: "none",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Mobile swipe arrows (always visible, smaller) */}
              <div className="flex md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-1 pointer-events-none z-40">
                <button
                  type="button"
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    goToPrev()
                  }}
                  className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-black/40 active:bg-[#b2875c]/40 border border-white/10 transition-colors cursor-pointer"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} className="text-white/70" />
                </button>
                <button
                  type="button"
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-black/40 active:bg-[#b2875c]/40 border border-white/10 transition-colors cursor-pointer"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  aria-label="Próxima"
                >
                  <ChevronRight size={18} className="text-white/70" />
                </button>
              </div>
            </div>

            {/* ── Bottom thumbnail strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="px-3 py-3 sm:py-4 relative z-50 shrink-0"
              data-thumbstrip
            >
              <div
                className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto"
                data-thumbstrip
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onTouchEnd={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setLightboxIndex(i)
                    }}
                    onClick={() => setLightboxIndex(i)}
                    className={`
                      relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 cursor-pointer
                      ${
                        lightboxIndex === i
                          ? "w-14 h-14 sm:w-20 sm:h-20 ring-2 ring-[#b2875c] ring-offset-2 ring-offset-black opacity-100"
                          : "w-10 h-10 sm:w-14 sm:h-14 opacity-40 active:opacity-70"
                      }
                    `}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                    aria-label={`Ver ${opt.title}`}
                  >
                    <img
                      src={opt.image}
                      alt={opt.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {lightboxIndex === i && (
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#b2875c]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Swipe hint */}
              <p className="text-center text-[10px] text-white/25 mt-2 md:hidden select-none">
                Deslize para navegar • Toque fora para fechar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default InteractiveSelector
