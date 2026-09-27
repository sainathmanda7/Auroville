'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'

export function Property() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const shouldHide = latest > 0.01 && latest < 0.99
    // Dispatch custom event to Navbar instead of imperative DOM manipulation
    window.dispatchEvent(
      new CustomEvent('set-navbar-hidden', { detail: { hidden: shouldHide } })
    )
  })

  const dayOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.45, 1],
    [1, 1, 0, 0],
    { clamp: true }
  )

  const eveningOpacity = useTransform(
    scrollYProgress,
    [0, 0.55, 0.95, 1],
    [1, 1, 0, 0],
    { clamp: true }
  )

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.05],
    { clamp: true }
  )

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">

        {/* ================= NIGHT ================= */}
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{ scale: imageScale }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/Night-View-Mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/images/Night-View.webp" />
            <img
              src="/images/Night-View.webp"
              alt="Night view of Coorg with starry hills"
              className="absolute inset-0 h-full w-full object-contain md:object-cover"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* ================= EVENING ================= */}
        <motion.div
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            opacity: eveningOpacity,
            scale: imageScale,
          }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/Evening-View-Mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/images/Evening-View.webp" />
            <img
              src="/images/Evening-View.webp"
              alt="Evening view of Coorg in warm sunset light"
              className="absolute inset-0 h-full w-full object-contain md:object-cover"
              loading="lazy"
            />
          </picture>
        </motion.div>

        {/* ================= DAY ================= */}
        <motion.div
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            opacity: dayOpacity,
            scale: imageScale,
          }}
        >
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/Day-View-Mobile.webp" />
            <source media="(min-width: 768px)" srcSet="/images/Day-View.webp" />
            <img
              src="/images/Day-View.webp"
              alt="Day view of Coorg hills in lush sunlight"
              className="absolute inset-0 h-full w-full object-contain md:object-cover"
              loading="lazy"
            />
          </picture>
        </motion.div>

      </div>
    </section>
  )
}
