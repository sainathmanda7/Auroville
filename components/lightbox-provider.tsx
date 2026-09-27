'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Lightbox } from './lightbox'
import type { GalleryImage } from '@/lib/site-data'

type LightboxContextType = {
  openLightbox: (index: number, images: GalleryImage[]) => void
}

const LightboxContext = createContext<LightboxContextType | null>(null)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])

  const openLightbox = (i: number, imgs: GalleryImage[]) => {
    setImages(imgs)
    setIndex(i)
  }

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </LightboxContext.Provider>
  )
}

export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

export function LightboxTrigger({
  children,
  index,
  images,
  className,
  'aria-label': ariaLabel,
}: {
  children: ReactNode
  index: number
  images: GalleryImage[]
  className?: string
  'aria-label'?: string
}) {
  const { openLightbox } = useLightbox()
  
  return (
    <button
      type="button"
      onClick={() => openLightbox(index, images)}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
