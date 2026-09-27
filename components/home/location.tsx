import { Reveal } from '@/components/motion-primitives'
import { ArrowLink } from '@/components/arrow-link'
import { site, whatsappUrl } from '@/lib/site-data'

export function Location() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <Reveal>
            <span className="eyebrow text-earth">Finding Us</span>
          </Reveal>
          <h2 className="font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl lg:text-6xl">
            Moinabad, near Hyderabad.
          </h2>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-charcoal/70 sm:text-lg">
              Auroville Farmstay sits in the peaceful countryside of Moinabad, an easy escape from Hyderabad.
              Reach out to us via call or WhatsApp, and we will gladly help you with bookings and route directions.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4">
            <ArrowLink href={site.mapsDirectionsUrl} variant="solid" external>
              Get directions
            </ArrowLink>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-charcoal/20 px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
            >
              WhatsApp ↗
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-charcoal/20 px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-soft"
            >
              Call {site.phone}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-charcoal/10 shadow-sm lg:aspect-auto">
          <iframe
            title="Map showing Auroville FarmStay, Moinabad"
            src={site.mapsEmbedUrl}
            className="h-full min-h-[360px] w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Reveal>
      </div>
    </section>
  )
}
