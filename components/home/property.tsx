'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import Image from 'next/image'

export function Property() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const header = document.querySelector('header')

    if (header) {
      if (latest > 0.01 && latest < 0.99) {
        header.style.transform = 'translateY(-100%)'
        header.style.opacity = '0'
        header.style.pointerEvents = 'none'
      } else {
        header.style.transform = ''
        header.style.opacity = ''
        header.style.pointerEvents = ''
      }
    }
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
          {/* Desktop */}
          <Image
            src="/images/Night-View.webp"
            alt="Night view of Coorg with starry hills"
            fill
            sizes="100vw"
            className="hidden object-cover md:block"
            priority
          />

          {/* Mobile */}
          <Image
            src="/images/Night-View-Mobile.webp"
            alt="Night view of Coorg with starry hills"
            fill
            sizes="100vw"
            className="block object-contain md:hidden"
            priority
          />
        </motion.div>

        {/* ================= EVENING ================= */}
        <motion.div
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            opacity: eveningOpacity,
            scale: imageScale,
          }}
        >
          {/* Desktop */}
          <Image
            src="/images/Evening-View.webp"
            alt="Evening view of Coorg in warm sunset light"
            fill
            sizes="100vw"
            className="hidden object-cover md:block"
            priority
          />

          {/* Mobile */}
          <Image
            src="/images/Evening-View-Mobile.webp"
            alt="Evening view of Coorg in warm sunset light"
            fill
            sizes="100vw"
            className="block object-contain md:hidden"
            priority
          />
        </motion.div>

        {/* ================= DAY ================= */}
        <motion.div
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            opacity: dayOpacity,
            scale: imageScale,
          }}
        >
          {/* Desktop */}
          <Image
            src="/images/Day-View.webp"
            alt="Day view of Coorg hills in lush sunlight"
            fill
            sizes="100vw"
            className="hidden object-cover md:block"
            priority
          />

          {/* Mobile */}
          <Image
            src="/images/Day-View-Mobile.webp"
            alt="Day view of Coorg hills in lush sunlight"
            fill
            sizes="100vw"
            className="block object-contain md:hidden"
            priority
          />
        </motion.div>

      </div>
    </section>
  )
}
