"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site, whatsappUrl } from "@/lib/site-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function setNavHidden(hide: boolean) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("set-navbar-hidden", { detail: { hidden: hide } }));
  }
}

export function SendoffParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const sendoffRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hide navbar smoothly as SendoffParallax approaches so it doesn't interrupt the initial frame
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 120px",
      end: "top top",
      onEnter: () => setNavHidden(true),
      onLeaveBack: () => setNavHidden(false),
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2600", // Scroll to finish the zoom and hold
        scrub: 1,      // 1 second smoothing
        pin: true,     // Pin the section
        onEnter: () => setNavHidden(true),
        onLeave: () => setNavHidden(false),
        onEnterBack: (self) => {
          if (self.progress < 0.65) {
            setNavHidden(true);
          } else {
            setNavHidden(false);
          }
        },
        onLeaveBack: () => setNavHidden(false),
        onUpdate: (self) => {
          // Keep navbar hidden during the hole zoom parallax effect
          // Open navbar again only after the parallax zoom effect is done (self.progress >= 0.65)
          if (self.progress < 0.65) {
            setNavHidden(true);
          } else {
            setNavHidden(false);
          }
        },
      }
    });

    // 1. Zoom into the hole
    tl.fromTo(holeRef.current,
      { scale: 1, opacity: 1 },
      { 
        scale: 25, // Massively zoom in to pass through the hole
        opacity: 0,
        ease: "power2.inOut",
        duration: 1
      },
      0
    );

    // 2. Parallax the sendoff background behind the hole
    tl.fromTo(sendoffRef.current,
      { scale: 1 },
      { scale: 1.15, ease: "power2.inOut", duration: 1.6 },
      0
    );

    // 3. Fade in dark vignette overlay for text legibility
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 0.75, ease: "power2.out", duration: 0.6 },
      0.35
    );

    // 4. Fade in CTA message and action buttons
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 40, autoAlpha: 0, pointerEvents: "none" },
      { opacity: 1, y: 0, autoAlpha: 1, pointerEvents: "auto", ease: "power2.out", duration: 0.6 },
      0.35
    );

    // 5. Hold revealed state so user can comfortably read and interact
    tl.to({}, { duration: 0.6 });

    return () => {
      setNavHidden(false);
    };

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="booking"
      className="relative w-full h-screen overflow-hidden bg-charcoal"
    >
      {/* Background Layer: Sendoff */}
      <div 
        ref={sendoffRef} 
        className="absolute inset-0 z-0 w-full h-full"
      >
        <Image 
          src="/images/sendoff.webp" 
          alt="Sendoff view" 
          fill 
          priority
          className="object-cover"
        />
        {/* Soft atmospheric overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/60 to-charcoal/30 pointer-events-none"
        />
      </div>

      {/* Content Layer: Ending message with WhatsApp & Call Icons */}
      <div 
        ref={contentRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-5 sm:px-8"
      >
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center pointer-events-auto">
          <span className="eyebrow text-soft/80 uppercase tracking-[0.2em] text-xs font-semibold drop-shadow-sm">
            Your Stay Awaits
          </span>
          <h2 className="mt-5 font-display text-4xl leading-[1.05] text-soft sm:text-6xl lg:text-7xl text-balance drop-shadow-md">
            Come stay a while at Auroville Farmstay.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-soft/85 sm:text-lg drop-shadow-sm">
            Message us on WhatsApp or give us a call — we will help you find the right dates and answer
            anything about the stay.
          </p>

          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
            {/* WhatsApp CTA with WhatsApp Icon */}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-soft px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-charcoal shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 fill-current transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Book on WhatsApp</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                ↗
              </span>
            </a>

            {/* Call CTA with Phone Icon */}
            <a
              href={site.phoneHref}
              className="group inline-flex items-center justify-center gap-3 border border-soft/50 bg-charcoal/40 backdrop-blur-md px-8 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft shadow-lg transition-all duration-300 hover:bg-soft hover:text-charcoal hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:rotate-12"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call {site.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Foreground Layer: Hole */}
      <div 
        ref={holeRef} 
        className="absolute inset-0 z-20 w-full h-full origin-[50%_50%] will-change-transform pointer-events-none"
      >
        <Image 
          src="/images/Hole.webp" 
          alt="Hole view" 
          fill 
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
