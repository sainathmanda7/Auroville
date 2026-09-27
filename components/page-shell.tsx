import type { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppFab } from '@/components/whatsapp-fab'
import { LightboxProvider } from '@/components/lightbox-provider'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <LightboxProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
    </LightboxProvider>
  )
}
