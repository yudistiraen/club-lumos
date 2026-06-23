"use client"

import { useState, useEffect } from "react"
import { useEventConfig } from "@/hooks/use-event-live"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
]

export default function Countdown() {
  const { enabled, startDate, status, title, sub } = useEventConfig()
  const [time, setTime] = useState<TimeLeft | null>(null)

  useEffect(() => {
    function calc(): TimeLeft {
      const diff = startDate.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTime(calc())
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [startDate])

  const isLive = status === "live"

  return (
    <section className="relative bg-bg py-16 md:py-20 px-[clamp(20px,6vw,100px)] overflow-hidden">
      <div className="noise-layer" />

      {/* Top accent line */}
      <div className={`absolute top-0 inset-x-0 h-px ${isLive ? "animate-rgb-slide" : "bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"}`} />

      <div className="relative z-[2] flex flex-col items-center text-center">
        {enabled ? (
          <>
            {/* Eyebrow */}
            <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-4">
              {isLive ? "✦ Now Playing" : "✦ Next Event"}
            </p>

            <h2 className="font-label text-[clamp(36px,6vw,64px)] tracking-[0.08em] text-text-main leading-none mb-2">
              {title}
            </h2>
            <p className="text-[13px] font-light tracking-[0.06em] text-text-dim mb-10 md:mb-12">
              {sub}
            </p>

            {/* Countdown / Live */}
            {time === null ? (
              <div className="h-[100px]" />
            ) : isLive ? (
              <p className="font-label text-[28px] tracking-[0.12em] text-accent">
                EVENT IS LIVE
              </p>
            ) : status === "waiting" ? (
              <div className="flex items-center gap-3 md:gap-5">
                {UNITS.map(({ key, label }, i) => (
                  <div key={key} className="flex items-center gap-3 md:gap-5">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-label text-[clamp(48px,10vw,88px)] leading-none tracking-[0.04em] text-text-main tabular-nums">
                        {String(time[key]).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-medium tracking-[0.22em] uppercase text-text-muted">
                        {label}
                      </span>
                    </div>

                    {i < UNITS.length - 1 && (
                      <span className="text-accent text-[clamp(20px,4vw,36px)] leading-none -mt-5 opacity-40 select-none">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <>
            <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-4">
              ✦ Stay Tuned
            </p>
            <h2 className="font-display text-[clamp(28px,5vw,48px)] font-light tracking-[-0.015em] text-text-dim leading-[1.1] italic">
              Please wait for next event
            </h2>
          </>
        )}
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 inset-x-0 h-px ${isLive ? "animate-rgb-slide" : "bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"}`} />
    </section>
  )
}
