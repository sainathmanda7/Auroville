"use client"; // Critical: GSAP requires the client window

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger outside the component
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingHero() {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const buildingRef = useRef(null);

  useGSAP(() => {
    // This timeline binds to the scrollbar
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500", // The user must scroll 2500px to finish the zoom
        scrub: 1,      // 1 second smoothing on the scroll
        pin: true,     // Locks the section in place while animating
      }
    });

   // 1. Scale the arch massively to fly through it
    // Change it to fromTo to control the starting scale
    tl.fromTo(archRef.current, 
      { scale: 0.99 }, // Starting state: 0.85 zooms it out by 15%. 
      { 
        scale: 15,     // Ending state: Massively zoomed in
        opacity: 0, 
        ease: "power2.inOut" 
      }, 
    0);

    // 2. Remove 'opacity: 0' so the building is visible immediately through the hole
    tl.fromTo(buildingRef.current, 
      { scale: 1 }, // <--- Changed this line (removed opacity: 0)
      { scale: 1.1, ease: "power2.inOut" }, // <--- Changed this line (removed opacity: 1)
    0);

  }, { scope: containerRef }); // Scoping prevents GSAP from selecting elements outside this component

  return (
    // Tailwind classes used for layout. Adjust heights/widths as needed.
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Layer: Building */}
      <div 
        ref={buildingRef} 
        className="absolute inset-0 z-0 w-full h-full"
      >
        <Image 
          src="/images/Landing-Page.webp" 
          alt="Building view" 
          fill 
          className="object-cover"
          priority // Prioritizes loading for above-the-fold content
        />
      </div>

      {/* Foreground Layer: Arch */}
      {/* Note the origin-[50%_60%] - Adjust this to align the zoom center with your arch's hole */}
      <div 
        ref={archRef} 
        className="absolute inset-0 z-10 w-full h-full origin-[50%_60%] will-change-transform"
      >
        <Image 
          src="/images/Arch.webp" 
          alt="Garden Arch" 
          fill 
          className="object-cover"
          priority 
        />
      </div>
    </section>
  );
}