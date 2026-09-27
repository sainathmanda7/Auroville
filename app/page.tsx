import { PageShell } from '@/components/page-shell'
import { Intro } from '@/components/home/intro'
import { Property } from '@/components/home/property'
import { Rooms } from '@/components/home/rooms'
import { Experience } from '@/components/home/experience'
import { Testimonials } from '@/components/home/testimonials'
import { Location } from '@/components/home/location'
import LandingHero from '@/components/home/LandingHero'
import { SendoffParallax } from '@/components/home/sendoff-parallax'

export default function HomePage() {
  return (
    <PageShell>
      <LandingHero />
      <Intro />
      <Property />
      <Rooms />
      <Experience />
      <Testimonials />
      <Location />
      <SendoffParallax />
    </PageShell>
  )
}
