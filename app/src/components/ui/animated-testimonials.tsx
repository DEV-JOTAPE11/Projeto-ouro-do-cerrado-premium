"use client"


import { Separator } from "./separator"
import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "A Voz dos Nossos Hóspedes",
  subtitle = "Avaliações inspiradas em experiências memoráveis no Ouro do Cerrado.",
  badgeText = "Depoimentos",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Confiança de hóspedes de todo o Brasil",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className={`section-padding relative overflow-hidden bg-[linear-gradient(135deg,#fbfaf7_0%,#f3eadc_42%,#eef3e8_100%)] ${className || ""}`}
    >
      {/* Decorative top line */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/80" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 w-full lg:grid-cols-2 lg:gap-20"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-[#b2875c]" />
                  <span className="text-sm font-medium uppercase tracking-widest text-[#b2875c]">
                    {badgeText}
                  </span>
                  <div className="h-px w-8 bg-[#b2875c]" />
                </div>
              )}

              <h2 className="text-3xl font-bold font-display tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
                {title}
              </h2>

              <p className="max-w-[540px] text-muted-foreground text-lg font-light leading-relaxed">
                {subtitle}
              </p>

              {/* Navigation dots */}
              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                      activeIndex === index
                        ? "w-10 bg-[#b2875c]"
                        : "w-2.5 bg-[#b2875c]/25 hover:bg-[#b2875c]/50"
                    }`}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div
            variants={itemVariants}
            className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[400px]"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 80 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 80,
                  scale: activeIndex === index ? 1 : 0.92,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  zIndex: activeIndex === index ? 10 : 0,
                  pointerEvents: (activeIndex === index ? "auto" : "none") as any,
                }}
              >
                <div className="bg-white/70 backdrop-blur-sm border border-white/60 shadow-card rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                  {/* Stars */}
                  <div className="mb-5 flex gap-1.5">
                    {Array(Math.floor(testimonial.rating || 0))
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 sm:h-5 sm:w-5 fill-[#b2875c] text-[#b2875c]"
                        />
                      ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6 flex-1">
                    <Quote className="absolute -top-1 -left-1 h-7 w-7 sm:h-8 sm:w-8 text-[#b2875c]/15 rotate-180" />
                    <p className="relative z-10 text-base sm:text-lg font-medium leading-relaxed text-[#2d241c] pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <Separator className="my-4 bg-[#b2875c]/15" />

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-[#2d241c]">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-[#735f4a]">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-[#b2875c]/5" />
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 h-20 w-20 sm:h-24 sm:w-24 rounded-xl bg-[#525e46]/5" />
          </motion.div>
        </motion.div>

        {/* Trusted companies cloud */}
        {trustedCompanies.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="mt-16 sm:mt-20 text-center"
          >
            <h3 className="text-sm font-medium text-[#735f4a] mb-6 sm:mb-8 uppercase tracking-widest">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8">
              {trustedCompanies.map((company, i) => (
                <div
                  key={`${company}-${i}`}
                  className="text-xl sm:text-2xl font-semibold text-[#735f4a]/40"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
