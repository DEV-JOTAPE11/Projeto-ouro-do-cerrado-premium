import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, useInView, type Variants } from "framer-motion"

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
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  }

  // Stagger entrance when section scrolls into view
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
                onClick={() => handleOptionClick(index)}
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
                      backdropFilter: "blur(10px)",
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
  )
}

export default InteractiveSelector
