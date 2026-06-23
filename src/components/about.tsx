"use client"

import { useInView } from "@/hooks/use-in-view"

const stats = [
  { num: "05+", label: "Years Active" },
  { num: "50+", label: "Signature Cocktails" },
  { num: "∞", label: "Unforgettable Nights" },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section
      id="about"
      className="relative bg-bg-2 py-[130px] px-[clamp(20px,8vw,120px)] overflow-hidden"
      ref={ref}
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          grid grid-cols-1 gap-10 items-center
          md:gap-12
          lg:grid-cols-2 lg:gap-[80px]
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Text column ---- */}
        <div>
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; About Us
          </p>

          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            A Universe
            <br />
            of Night
          </h2>

          <div className="w-[44px] h-px bg-accent opacity-55 my-7" />

          <p className="text-[15px] font-light text-text-dim leading-[1.85] max-w-[480px] mb-5">
            Club Lumos is not merely a venue — it is a sensory world unto
            itself. Born from a vision of luxury, darkness, and transcendence,
            we curate experiences that blur the line between reality and
            euphoria.
          </p>
          <p className="text-[15px] font-light text-text-dim leading-[1.85] max-w-[480px] mb-5">
            From hand-crafted cocktails to world-class resident DJs, every
            detail at Lumos is designed to immerse you in an atmosphere of
            refined exclusivity.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-5 md:gap-9 mt-12 pt-10 border-t border-border-base">
            {stats.map(({ num, label }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="font-display text-[50px] font-light text-accent leading-none tracking-[-0.02em]">
                  {num}
                </span>
                <span className="text-[10px] tracking-[0.14em] uppercase text-text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Visual column ---- */}
        <div className="relative">
          <div
            className="
              relative h-[300px]
              md:h-[380px]
              lg:h-[560px]
              max-[480px]:h-auto
            "
          >
            {/* Main image */}
            <div
              className="
                absolute top-0 left-0 w-[72%] h-[78%] overflow-hidden
                max-[480px]:relative max-[480px]:w-full max-[480px]:h-full max-[480px]:aspect-[4/3]
              "
            >
              <div className="art-club-1 w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.55)]" />
            </div>

            {/* Accent image */}
            <div
              className="
                absolute bottom-0 right-0 w-[52%] h-[54%] overflow-hidden border border-border-base
                max-[480px]:hidden
              "
            >
              <div className="art-club-2 w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.55)]" />
            </div>

            {/* Badge */}
            <div
              className="
                absolute bottom-[18%] left-1/2 -translate-x-1/2
                bg-[rgba(6,6,10,0.82)] backdrop-blur-[14px]
                border border-border-accent
                px-[22px] py-4 text-center z-[5] whitespace-nowrap
                max-[480px]:static max-[480px]:translate-x-0 max-[480px]:mt-6 max-[480px]:inline-block
              "
            >
              <span className="block text-[9px] tracking-[0.28em] uppercase text-text-dim mb-1">
                EST.
              </span>
              <span className="block font-display text-[40px] font-light text-accent leading-none">
                2019
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
