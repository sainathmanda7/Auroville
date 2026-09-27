'use client'

import { useState } from 'react'
import { site } from '@/lib/site-data'

const field =
  'w-full border-b border-charcoal/20 bg-transparent py-3 text-base text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal/35 focus:border-forest'

export function EnquiryForm() {
  const [form, setForm] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: '',
  })

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [
      'Hello Auroville Farmstay! I would like to enquire about a stay.',
      form.name ? `Name: ${form.name}` : '',
      form.checkIn ? `Check-in: ${form.checkIn}` : '',
      form.checkOut ? `Check-out: ${form.checkOut}` : '',
      form.guests ? `Guests: ${form.guests}` : '',
      form.message ? `Message: ${form.message}` : '',
    ].filter(Boolean)
    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="eyebrow text-earth">
          Your name
        </label>
        <input id="name" name="name" value={form.name} onChange={update('name')} placeholder="Full name" className={field} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="checkIn" className="eyebrow text-earth">
            Check-in
          </label>
          <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={update('checkIn')} className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="checkOut" className="eyebrow text-earth">
            Check-out
          </label>
          <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={update('checkOut')} className={field} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="guests" className="eyebrow text-earth">
          Guests
        </label>
        <input id="guests" name="guests" type="number" min={1} value={form.guests} onChange={update('guests')} className={field} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="eyebrow text-earth">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={update('message')}
          rows={3}
          placeholder="Anything you would like us to know?"
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-2 inline-flex items-center justify-center gap-2.5 bg-charcoal px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft transition-colors duration-500 hover:bg-forest"
      >
        Send via WhatsApp
        <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
          ↗
        </span>
      </button>
      <p className="-mt-3 text-xs leading-relaxed text-charcoal/50">
        This opens WhatsApp with your details pre-filled. No booking is confirmed until we reply.
      </p>
    </form>
  )
}
