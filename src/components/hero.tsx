"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPinHouse } from "lucide-react"
import { useEventStatus } from "@/hooks/use-event-live"

export default function Hero() {
  const isLive = useEventStatus() === "live"
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative h-svh min-h-[680px] flex items-center justify-center overflow-hidden"
    >
      {/* ---- Background ---- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/club_1.png"
          alt=""
          fill
          priority
          className="object-cover grayscale-[50%] contrast-[1.08] brightness-[0.85] scale-[1.04]"
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(6,6,10,0.38) 0%, rgba(6,6,10,0.62) 50%, rgba(6,6,10,0.92) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(6,6,10,0.55) 100%)",
          }}
        />

        {/* Noise texture (class from globals.css) */}
        <div className="hero-noise" />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 text-center max-w-[920px] px-6 flex flex-col items-center">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.85s var(--ease-out-expo), transform 0.85s var(--ease-out-expo)",
            transitionDelay: "0.18s",
          }}
        >
          <span className="block w-9 h-px bg-accent opacity-50" />
          <span className="text-[10.5px] font-normal tracking-[0.28em] uppercase text-text-dim">
            Tonberry&apos;s Finest Night Venue
          </span>
          <span className="block w-9 h-px bg-accent opacity-50" />
        </div>

        {/* Title */}
        <h1
          className="font-display text-[clamp(68px,21vw,110px)] md:text-[clamp(88px,17vw,210px)] font-light leading-[0.84] tracking-[-0.025em] mb-7 flex flex-col items-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.85s var(--ease-out-expo), transform 0.85s var(--ease-out-expo)",
            transitionDelay: "0.36s",
          }}
        >
          <span className="block text-text-main">CLUB</span>
          <span className={`block italic ${isLive ? "animate-rgb-text" : "text-accent"}`}>LUMOS</span>
        </h1>

        {/* Tagline */}
        <p
          className="text-[clamp(14px,1.4vw,17px)] font-extralight leading-[1.9] text-text-dim tracking-[0.04em] mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.85s var(--ease-out-expo), transform 0.85s var(--ease-out-expo)",
            transitionDelay: "0.54s",
          }}
        >
          Where darkness becomes art.
          <br />
          Where night becomes legend.
        </p>
      </div>

      {/* ---- Scroll indicator ---- */}
      <button
        className="
          absolute bottom-10 left-1/2 -translate-x-1/2 z-10
          flex flex-col items-center gap-2.5
          cursor-pointer animate-fade-up
        "
        onClick={() => go("about")}
        aria-label="Scroll down"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-text-muted">
          Scroll
        </span>
        <span
          className="block w-px h-12 animate-scroll-pulse"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </button>

      {/* ---- Meta (location) ---- */}
      <div
        className="
          absolute bottom-10 right-[clamp(20px,5vw,80px)] z-10
          flex items-center gap-5
          animate-fade-up-delayed
          max-md:hidden
        "
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-[5px] items-center">
            <MapPinHouse size={13} strokeWidth={2} color="#00c8d4" />
            <span className="text-[9px] tracking-[0.22em] uppercase text-accent">
              Location
            </span>
          </div>
          <span className="text-xs font-light text-text-dim">
            Tonberry | Empyreum Plot 42, Ward 8
          </span>
        </div>
      </div>
    </section>
  )
}
