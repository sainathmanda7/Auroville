import { ImageReveal, Reveal } from '@/components/motion-primitives'
import { SectionHeading } from '@/components/section-heading'
import { rooms } from '@/lib/site-data'
import { LightboxTrigger } from '@/components/lightbox-provider'

export function Rooms() {

  const lightboxImages = rooms.map((room) => ({
    src: room.image,
    alt: `${room.name} — ${room.description}`,
    category: 'Rooms' as const,
  }))

  return (
    <section id="rooms" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="The Rooms" title="Designed for relaxation." />
      </div>

      <div className="mt-14 grid gap-8 sm:mt-20 lg:grid-cols-3 lg:gap-10">
        {rooms.map((room, i) => (
          <Reveal key={room.id} delay={i * 0.1} className="group flex flex-col">
            <article className="flex h-full flex-col">
              {/* The LightboxTrigger has relative and aspect-[4/3] which properly constrains the Next.js <Image fill /> */}
              <LightboxTrigger
                index={i}
                images={lightboxImages}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-charcoal/5 text-left cursor-pointer group/img focus:outline-none focus:ring-2 focus:ring-forest shadow-sm hover:shadow-md transition-shadow duration-300"
                aria-label={`View full image of ${room.name}`}
              >
                <ImageReveal
                  src={room.image}
                  alt={room.name}
                  // Preload the first card's image to eliminate the LCP delay
                  priority={i === 0}
                  imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                
                {/* Overlay Icon */}
                <div className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/40 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
              </LightboxTrigger>
              
              <div className="mt-8 flex flex-col flex-grow">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl text-charcoal sm:text-[1.75rem]">{room.name}</h3>
                  <span className="eyebrow text-earth shrink-0">{room.label}</span>
                </div>
                
                <p className="mt-4 text-base leading-relaxed text-charcoal/70 mb-8">
                  {room.description}
                </p>
                
                {/* Details List */}
                <ul className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-charcoal/10">
                  {room.details.map((detail, index) => (
                    <li 
                      key={index}
                      className="inline-flex items-center rounded-full border border-charcoal/10 bg-soft px-3 py-1 text-xs text-charcoal/70"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}