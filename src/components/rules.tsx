"use client"

import { useInView } from "@/hooks/use-in-view"

const RULES = [
  {
    cat: "Age Policy",
    items: [
      "Minimum age: 21 years",
      "Valid government-issued ID required",
      "No exceptions to this policy",
    ],
  },
  {
    cat: "Dress Code",
    items: [
      "Smart casual to formal attire",
      "No sportswear, sandals, or torn clothing",
      "Fashion-forward looks strongly encouraged",
    ],
  },
  {
    cat: "Entry Policy",
    items: [
      "Management reserves right of entry",
      "Reservation holders receive priority",
      "No re-entry after 01:00 WIB",
    ],
  },
  {
    cat: "Conduct",
    items: [
      "Respect all guests and staff",
      "No photography on the main floor",
      "All substance policies strictly enforced",
    ],
  },
]

export default function Rules() {
  const [ref, inView] = useInView()

  return (
    <section
      id="rules"
      ref={ref}
      className="relative bg-bg-2 py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2]
          grid grid-cols-[1fr_2fr] gap-[80px] items-start
          max-[1024px]:grid-cols-1 max-[1024px]:gap-12
          max-[768px]:grid-cols-1 max-[768px]:gap-10
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Left: lead text ---- */}
        <div>
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; Entry Standards
          </p>

          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-5">
            Dress Code
            <br />
            &amp; Rules
          </h2>

          <p className="text-[15px] font-light text-text-dim leading-[1.85] max-w-[480px]">
            To preserve the atmosphere of exclusivity and respect that defines
            Club Lumos, we ask all guests to adhere to our standards.
          </p>
        </div>

        {/* ---- Right: rules grid ---- */}
        <div
          className="
            grid grid-cols-2 bg-border-base gap-px
            max-[768px]:grid-cols-1
          "
        >
          {RULES.map((rule, i) => (
            <div
              key={rule.cat}
              className="py-10 px-8 bg-bg-2 animate-card-in"
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              <h3 className="font-label text-[15px] tracking-[0.1em] text-accent mb-5 pb-[14px] border-b border-border-base">
                {rule.cat}
              </h3>

              <div className="flex flex-col gap-3">
                {rule.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-[14px] font-light text-text-dim leading-[1.5]"
                  >
                    <span className="text-text-muted shrink-0">&mdash;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
