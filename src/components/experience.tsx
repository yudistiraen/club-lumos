"use client"

import { useInView } from "@/hooks/use-in-view"

const FEATURES = [
  "State-of-the-art Funktion-One sound system",
  "Custom architectural lighting design",
  "1,200 m² premium floor space",
  "Two distinct zones: Main Floor & Lounge",
  "Outdoor terrace with panoramic city views",
]

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section
      id="experience"
      ref={ref}
      className="relative bg-bg-2 py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          grid grid-cols-2 gap-[80px] items-center
          max-[1024px]:grid-cols-1 max-[1024px]:gap-12
          max-[768px]:grid-cols-1 max-[768px]:gap-10
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Text column ---- */}
        <div>
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; The Atmosphere
          </p>

          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Feel the
            <br />
            <em className="italic text-accent">Energy</em>
          </h2>

          <p className="text-[15px] font-light text-text-dim leading-[1.85] max-w-[480px] mb-5">
            Step into a world where sound, light, and architecture converge.
            Club Lumos is designed from the ground up to create an immersive
            multi-sensory experience unlike anything else in the city.
          </p>

          <div className="flex flex-col gap-[14px] mt-9">
            {FEATURES.map((text) => (
              <div
                key={text}
                className="flex items-start gap-[14px] text-[14px] font-light text-text-dim leading-[1.5]"
              >
                <span className="text-accent text-[7px] shrink-0 mt-1">
                  &#9670;
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Gallery column ---- */}
        <div
          className="
            grid grid-cols-2 gap-[6px]
            h-[540px]
            max-[1024px]:h-[400px]
            max-[768px]:h-[260px]
          "
        >
          {/* Main tall photo */}
          <div className="group relative overflow-hidden h-full">
            <div className="art-exp-1 w-full h-full transition-transform duration-[0.8s] ease-[--ease-out-expo] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.55)]" />
          </div>

          {/* Side column: 2 photos + stat card */}
          <div className="grid grid-rows-[1fr_1fr_0.8fr] gap-[6px]">
            {/* Photo 2 */}
            <div className="group relative overflow-hidden">
              <div className="art-exp-2 w-full h-full transition-transform duration-[0.8s] ease-[--ease-out-expo] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.55)]" />
            </div>

            {/* Photo 3 */}
            <div className="group relative overflow-hidden">
              <div className="art-exp-3 w-full h-full transition-transform duration-[0.8s] ease-[--ease-out-expo] group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[55%] to-[rgba(6,6,10,0.55)]" />
            </div>

            {/* Stat card */}
            <div className="flex flex-col items-center justify-center gap-1 bg-[rgba(0,200,212,0.05)] border border-border-accent p-4 text-center">
              <span className="font-display text-[44px] font-light text-accent leading-none tracking-[-0.02em]">
                1,200
              </span>
              <span className="font-display text-[20px] font-light text-accent opacity-70">
                m&sup2;
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-text-dim leading-[1.5]">
                of Pure Experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
