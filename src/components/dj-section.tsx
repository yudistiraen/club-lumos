"use client"

import { useState } from "react"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { useEventStatus } from "@/hooks/use-event-live"

const DJS = [
  {
    name: "DJ ZENITH",
    slot: "RESIDENT",
    genre: "Techno · House · Experimental",
    nights: "Every Friday",
    bio: "Internationally acclaimed, Zenith has headlined clubs from Berlin to Tokyo. His sets are a relentless journey through sound architecture and emotional intensity.",
    image: "/images/dj-booth.png",
  },
  {
    name: "NOIRE",
    slot: "RESIDENT",
    genre: "Afro · Deep House · Soul",
    nights: "Every Saturday",
    bio: "NOIRE brings the warmth of African rhythms fused with deep house grooves. Each set is a soul-stirring narrative that moves the floor as one.",
    image: "/images/yannick.jpg",
  },
  {
    name: "KIRA VOSS",
    slot: "FEATURED",
    genre: "Progressive · Melodic · Trance",
    nights: "Monthly Special",
    bio: "Award-winning producer and DJ, Kira's sets blend melodic progressions with emotional depth — a rare balance of cerebral and visceral.",
    image: "/images/yannick_2.png",
  },
]

export default function DjSection() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const dj = DJS[active]
  const isLive = useEventStatus() === "live"

  return (
    <section
      id="dj"
      ref={ref}
      className="relative bg-bg-2 py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Header ---- */}
        <div className="mb-[56px]">
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; Behind the Decks
          </p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Resident DJs
          </h2>
        </div>

        {/* ---- Layout ---- */}
        <div
          className="
            grid grid-cols-2 gap-[80px] items-start
            max-[1024px]:grid-cols-1 max-[1024px]:gap-12
            max-[768px]:grid-cols-1 max-[768px]:gap-10
          "
        >
          {/* ---- Visual column (keyed to active DJ) ---- */}
          <div className="relative" key={active}>
            <div className="relative aspect-[4/5] overflow-hidden animate-fade-shift">
              <Image
                src={dj.image}
                alt={dj.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.75)]" />
              <span className="absolute top-5 left-5 z-[5] bg-accent text-black font-label text-[11px] tracking-[0.18em] py-[5px] px-[14px]">
                {dj.slot}
              </span>

              {/* EQ bars — inside portrait */}
              <div className="absolute bottom-0 inset-x-0 z-[5] flex gap-[3px] items-end h-[32px]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-[1px] ${
                      isLive
                        ? "opacity-65 animate-eq-pulse-live"
                        : "bg-accent opacity-50 animate-eq-pulse"
                    }`}
                    style={{
                      animationDelay: isLive
                        ? `${i * 0.09}s, ${i * 0.23}s`
                        : `${i * 0.09}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ---- Detail column ---- */}
          <div>
            {/* Tabs */}
            <div className="flex border-b border-border-base mb-10">
              {DJS.map((d, i) => (
                <button
                  key={d.name}
                  className={`
                    py-[11px] px-[18px] text-[10.5px] font-medium tracking-[0.12em] uppercase
                    border-b-2 -mb-px cursor-pointer whitespace-nowrap
                    transition-[color,border-color] duration-200
                    hover:text-accent hover:border-accent
                    focus-visible:text-accent focus-visible:border-accent
                    active:text-accent active:border-accent
                    ${
                      i === active
                        ? "text-accent border-accent"
                        : "text-text-muted border-transparent"
                    }
                  `}
                  onClick={() => setActive(i)}
                >
                  {d.name}
                </button>
              ))}
            </div>

            {/* Detail (keyed for re-mount animation) */}
            <div key={active} className="animate-fade-shift">
              <h3 className="font-label text-[clamp(40px,5vw,58px)] tracking-[0.06em] text-text-main leading-[0.9] mb-[10px]">
                {dj.name}
              </h3>

              <p className="text-[11px] tracking-[0.18em] uppercase text-accent mb-7">
                {dj.genre}
              </p>

              {/* Schedule */}
              <div className="flex items-center gap-[14px] py-[18px] border-t border-b border-border-base mb-7">
                <span className="text-[9px] tracking-[0.22em] uppercase text-text-muted">
                  Plays
                </span>
                <span className="text-[14px] font-light text-text-main">
                  {dj.nights}
                </span>
              </div>

              <p className="text-[14.5px] font-light text-text-dim leading-[1.85] mb-8">
                {dj.bio}
              </p>

              <button
                className="
                  inline-flex items-center justify-center
                  py-[11px] px-7 bg-transparent text-accent
                  text-[10.5px] font-medium tracking-[0.2em] uppercase
                  border border-border-accent cursor-pointer
                  transition-[background,transform,box-shadow] duration-200
                  hover:bg-accent-glow hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(0,200,212,0.18)]
                  focus-visible:bg-accent-glow focus-visible:-translate-y-0.5 focus-visible:shadow-[0_0_18px_rgba(0,200,212,0.18)]
                  active:bg-accent-glow active:-translate-y-0.5
                "
              >
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
