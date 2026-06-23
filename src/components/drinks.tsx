"use client"

import { useInView } from "@/hooks/use-in-view"

const DRINKS = [
  {
    name: "Lumos Noir",
    type: "Signature",
    desc: "Aged rum, activated charcoal, black currant, smoked rosemary",
    price: "IDR 185k",
    hue: "purple",
  },
  {
    name: "Midnight Veil",
    type: "Signature",
    desc: "Gin, elderflower, butterfly pea, citrus foam, edible silver",
    hue: "blue",
    price: "IDR 195k",
  },
  {
    name: "Neon Haze",
    type: "Signature",
    desc: "Vodka, blue curaçao, lime, tonic, UV reactive garnish",
    hue: "cyan",
    price: "IDR 165k",
  },
  {
    name: "Eclipse",
    type: "Premium",
    desc: "Japanese whisky, black sugar, smoked ice, charred citrus",
    hue: "amber",
    price: "IDR 245k",
  },
  {
    name: "Velvet Dusk",
    type: "Premium",
    desc: "Mezcal, hibiscus, tamarind, black salt rim, dehydrated rose",
    hue: "rose",
    price: "IDR 215k",
  },
  {
    name: "The Void",
    type: "Reserve",
    desc: "Cognac, aged port, walnut bitters, gold leaf, house-smoked oak",
    hue: "dark",
    price: "IDR 325k",
  },
]

export default function Drinks() {
  const [ref, inView] = useInView()

  return (
    <section
      id="drinks"
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
        {/* ---- Header ---- */}
        <div className="mb-[60px]">
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; The Bar
          </p>
          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Signature Drinks
          </h2>
          <p className="text-sm font-light text-text-dim max-w-[460px] leading-[1.7]">
            Crafted for the extraordinary palate
          </p>
        </div>

        {/* ---- Grid (1px border trick via gap + bg) ---- */}
        <div
          className="
            grid grid-cols-3 bg-border-base gap-px mb-11
            max-[1024px]:grid-cols-2
            max-[768px]:grid-cols-1
          "
        >
          {DRINKS.map((drink, i) => (
            <div
              key={drink.name}
              className="
                group relative p-9 px-8 bg-bg flex flex-col gap-[18px] overflow-hidden
                transition-[background-color] duration-300
                hover:bg-card-hover
                animate-card-in
              "
              style={{ animationDelay: `${i * 0.065}s` }}
            >
              {/* Glass art */}
              <div className="h-[100px] flex items-center justify-center">
                <div className={`glass-art relative w-[52px] h-[78px] ${`glass-${drink.hue}`}`}>
                  <div className="glass-body" />
                  <div className="glass-liquid" />
                  <div className="glass-shine" />
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.26em] uppercase text-accent">
                  {drink.type}
                </span>
                <h3 className="font-display text-[28px] font-normal tracking-[-0.01em] text-text-main leading-[1.05]">
                  {drink.name}
                </h3>
                <p className="text-[13px] font-light text-text-dim leading-[1.65]">
                  {drink.desc}
                </p>
                <span className="text-[13px] font-medium text-accent-warm tracking-[0.04em] mt-0.5">
                  {drink.price}
                </span>
              </div>

              {/* Accent line on hover */}
              <span className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* ---- Footer ---- */}
        <div className="flex justify-center">
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
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  )
}
