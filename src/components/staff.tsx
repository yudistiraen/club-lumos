"use client"

import { useInView } from "@/hooks/use-in-view"

const TEAM = [
  { name: "Rizky Aditya", role: "General Manager", init: "R" },
  { name: "Sari Dewi", role: "Head Mixologist", init: "S" },
  { name: "Marco Chen", role: "Head of Security", init: "M" },
  { name: "Layla Putri", role: "Events Director", init: "L" },
  { name: "Dimas Hadi", role: "Lead Bartender", init: "D" },
  { name: "Nadia Kiara", role: "Guest Relations", init: "N" },
]

export default function Staff() {
  const [ref, inView] = useInView()

  return (
    <section
      id="staff"
      ref={ref}
      className="relative bg-bg py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
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
            &#10022; The Team
          </p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Our People
          </h2>
          <p className="text-sm font-light text-text-dim max-w-[460px] leading-[1.7]">
            The faces behind every extraordinary night
          </p>
        </div>

        {/* Staff grid */}
        <div
          className="
            grid grid-cols-6 gap-5
            max-[1024px]:grid-cols-3
            max-[768px]:grid-cols-2
          "
        >
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="group flex flex-col gap-[14px] animate-card-in"
              style={{ animationDelay: `${i * 0.09}s` }}
            >
              {/* Avatar */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border-base">
                <div className="staff-avatar-bg w-full h-full flex items-center justify-center font-display text-[56px] font-light text-text-muted transition-transform duration-[0.6s] ease-[--ease-out-expo] group-hover:scale-[1.06]">
                  {member.init}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-[40%] to-[rgba(6,6,10,0.65)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Info */}
              <div>
                <p className="text-[13px] font-medium text-text-main tracking-[0.02em]">
                  {member.name}
                </p>
                <span className="block text-[10px] tracking-[0.12em] uppercase text-text-muted">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
