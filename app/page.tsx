import { PageShell } from '@/components/page-shell'
import { Intro } from '@/components/home/intro'
import { Property } from '@/components/home/property'
import { RoomsPreview } from '@/components/home/rooms-preview'
import PlacesWorthDrive from '@/components/PlacesWorthDrive'
import { GalleryPreview } from '@/components/home/gallery-preview'
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
      <RoomsPreview />
      <PlacesWorthDrive />
      <GalleryPreview />  
      <Testimonials />
      <Location />
      <SendoffParallax />
    </PageShell>
  )
}
