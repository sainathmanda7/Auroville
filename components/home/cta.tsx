import { ImageReveal, Parallax } from '@/components/motion-primitives'
import { Reveal } from '@/components/motion-primitives'
import { site, whatsappUrl } from '@/lib/site-data'

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <Parallax distance={50} className="absolute inset-0 h-[120%]">
        <ImageReveal
          src="/images/night-terrace.webp"
          alt="Warmly lit terrace of Auroville Farmstay at dusk with string lights"
          className="h-full w-full"
          imgClassName="opacity-45"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-36 lg:py-44">
        <Reveal>
          <span className="eyebrow text-soft/60">Your Stay Awaits</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] text-soft sm:text-6xl lg:text-7xl text-balance">
            Come stay a while at Auroville Farmstay.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-soft/75 sm:text-lg">
            Message us on WhatsApp or give us a call — we will help you find the right dates and answer
            anything about the stay.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-soft px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-500 hover:bg-forest hover:text-soft"
          >
            Book on WhatsApp
            <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
              ↗
            </span>
          </a>
          <a
            href={site.phoneHref}
            className="group inline-flex items-center justify-center gap-2.5 border border-soft/40 px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft transition-colors duration-500 hover:bg-soft hover:text-charcoal"
          >
            Call {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
