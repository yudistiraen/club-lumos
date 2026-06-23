"use client"

import { useInView } from "@/hooks/use-in-view"

interface Service {
  icon: string
  title: string
  desc: string
  tag: string
}

const SERVICES: Service[] = [
  {
    icon: "◈",
    title: "Premium Bar",
    desc: "Curated spirits, rare vintages, and bespoke cocktails crafted by master mixologists.",
    tag: "Full bar · Bottle service · Private selection",
  },
  {
    icon: "◉",
    title: "VIP Tables",
    desc: "Exclusive sections with dedicated service, premium bottle packages, and priority entry.",
    tag: "VIP · Semi-private · Floor access",
  },
  {
    icon: "◬",
    title: "Live DJs",
    desc: "World-class resident and international guest DJs spinning across genres from midnight to dawn.",
    tag: "House · Techno · Deep · Afro",
  },
  {
    icon: "◫",
    title: "Private Events",
    desc: "Transform Lumos into your exclusive venue for corporate, birthday, or product launch events.",
    tag: "Buyout · Semi-private · Packages",
  },
  {
    icon: "◭",
    title: "Luxury Lounge",
    desc: "A dedicated lounge for premium guests featuring rare cigars, premium shisha, and curated service.",
    tag: "Cigar · Shisha · Private area",
  },
  {
    icon: "◮",
    title: "Bottle Service",
    desc: "Our concierge arranges arrival, seating, and a personalized bottle parade for your group.",
    tag: "Arrival · Parade · Premium bottles",
  },
]

export default function Services() {
  const [ref, inView] = useInView()

  return (
    <section
      id="services"
      className="relative bg-bg py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
      ref={ref}
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; What We Offer
          </p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Our Services
          </h2>
          <p className="text-sm font-light text-text-dim max-w-[460px] leading-[1.7]">
            Tailored experiences for the discerning guest
          </p>
        </div>

        {/* Services grid — bg-border-base + gap-px gives the 1px border between cards */}
        <div
          className="
            grid grid-cols-1 bg-border-base gap-px
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="
                group relative
                px-10 py-12 bg-bg overflow-hidden
                transition-[background-color] duration-300
                hover:bg-card-hover
                animate-card-in
              "
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="block text-[22px] text-accent mb-[22px]">
                {s.icon}
              </span>

              <h3 className="font-label text-[21px] tracking-[0.09em] text-text-main mb-3.5">
                {s.title}
              </h3>

              <p className="text-sm font-light text-text-dim leading-[1.75] mb-5">
                {s.desc}
              </p>

              <span className="block text-[10px] tracking-[0.15em] uppercase text-text-muted pt-[18px] border-t border-border-base">
                {s.tag}
              </span>

              {/* Accent line on hover */}
              <span
                className="
                  absolute bottom-0 left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-accent to-transparent
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
