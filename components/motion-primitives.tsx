'use client'

import { type ReactNode, useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const EASE = [0.25, 0.1, 0.25, 1] as const

// 1. Reveal Component
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '150px 0px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}

// 2. TextReveal Component
export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : '100%', opacity: reduce ? 1 : 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '150px 0px' }}
            transition={{ duration: 0.5, ease: EASE, delay: delay + i * 0.04 }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// 3. ImageReveal Component (Optimized with Next.js <Image fill />)
export function ImageReveal({
  src,
  alt,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  imgClassName,
  reduce = false,
}: {
  src: string
  alt: string
  priority?: boolean
  sizes?: string
  className?: string
  imgClassName?: string
  reduce?: boolean
}) {
  return (
    <motion.div
      initial={{ scale: reduce ? 1 : 1.12 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: '150px 0px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`relative h-full w-full overflow-hidden ${className ?? ''} ${imgClassName ?? ''}`}
    >
      <Image
        src={src || '/placeholder.svg'}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </motion.div>
  )
}

// 4. Parallax Component
export function Parallax({
  children,
  className,
  distance = 50,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  )
}