import Image from 'next/image'
import { Reveal, TextReveal } from '@/components/motion-primitives'
import { experiences } from '@/lib/site-data'
import { LightboxTrigger } from '@/components/lightbox-provider'
import { Sparkles, Maximize2 } from 'lucide-react'

export function Experience() {

  const lightboxImages = experiences.map((exp) => ({
    src: exp.image,
    alt: `${exp.title} — ${exp.tagline}`,
    category: 'Experience' as const,
  }))

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#faf8f4] py-24 sm:py-32 lg:py-40 border-t border-charcoal/10"
    >
      {/* Background Subtle Accent Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-earth/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-forest/5 blur-3xl"
      />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section Header with Geraldine & Hiragenda fonts */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs tracking-wider uppercase text-forest font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Stays & Memories</span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-4">
            <span className="font-geraldine text-4xl sm:text-5xl lg:text-6xl text-earth block">
              Moments to Cherish
            </span>
          </Reveal>

          <h2 className="mt-3 font-hiragenda text-3xl sm:text-4xl lg:text-5xl text-charcoal tracking-tight leading-[1.12]">
            <TextReveal text="Crafted for peaceful days & enchanting nights." />
          </h2>

          <Reveal delay={0.16} className="mt-5">
            <p className="text-base sm:text-lg leading-relaxed text-charcoal/70">
              Beyond quiet rest, immerse yourself in our signature on-site experiences. Every corner
              is thoughtfully created to slow down time, awaken your senses, and connect you with nature.
            </p>
          </Reveal>
        </div>

        {/* Alternating Editorial Showcase */}
        <div className="mt-16 sm:mt-24 space-y-20 sm:space-y-28 lg:space-y-36">
          {experiences.map((exp, i) => {
            const isEven = i % 2 === 1

            return (
              <div
                key={exp.id}
                className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16"
              >
                {/* Media Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Reveal delay={0.1}>
                    {/* The LightboxTrigger acts as the Next.js <Image /> boundary because of `relative` and `aspect-[16/10]` */}
                    <LightboxTrigger
                      index={i}
                      images={lightboxImages}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-charcoal/5 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-forest shadow-md hover:shadow-xl transition-all duration-500 aspect-[16/10]"
                      aria-label={`View full image of ${exp.title}`}
                    >
                      <Image
                        src={exp.image}
                        alt={exp.title}
                        fill
                        unoptimized={true}
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />

                      {/* Subtle Vignette & Frame */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />

                      {/* Expand Button Icon */}
                      <div className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-md">
                        <Maximize2 className="h-5 w-5" />
                      </div>

                      {/* Image Bottom Hint */}
                      <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-white/90 text-xs sm:text-sm drop-shadow-sm">
                        <span className="font-geraldine text-xl sm:text-2xl text-soft tracking-wide">
                          {exp.tagline}
                        </span>
                        <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur-xs font-mono text-[11px] uppercase tracking-wider">
                          View Photo
                        </span>
                      </div>
                    </LightboxTrigger>
                  </Reveal>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Reveal delay={0.15}>
                    {/* Top Row: Number & Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-hiragenda text-4xl sm:text-5xl font-light text-earth/40 select-none">
                        {exp.number}
                      </span>
                      <span className="rounded-full border border-earth/30 bg-earth/10 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-earth">
                        {exp.badge}
                      </span>
                    </div>

                    {/* Geraldine Script Accent */}
                    <span className="mt-3 block font-geraldine text-3xl sm:text-4xl text-earth">
                      {exp.tagline}
                    </span>

                    {/* Title in Hiragenda */}
                    <h3 className="mt-1 font-hiragenda text-2xl sm:text-3xl lg:text-4xl text-charcoal tracking-tight leading-tight">
                      {exp.title}
                    </h3>

                    {/* Narrative Description */}
                    <p className="mt-4 text-base sm:text-lg leading-relaxed text-charcoal/75">
                      {exp.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-charcoal/10">
                      {exp.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/10 bg-soft px-3.5 py-1.5 text-xs font-medium text-charcoal/80 shadow-2xs"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* CTA link to open modal */}
                    <div className="mt-6">
                      <LightboxTrigger
                        index={i}
                        images={lightboxImages}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-charcoal transition-colors duration-200 group/btn"
                      >
                        <span>Explore full view</span>
                        <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                          →
                        </span>
                      </LightboxTrigger>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}