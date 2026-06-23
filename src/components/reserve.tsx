"use client"

import { useState, type FormEvent } from "react"
import { useInView } from "@/hooks/use-in-view"

const TABLE_TYPES = [
  "Regular Table",
  "VIP Section",
  "Semi-Private",
  "Full Buyout",
]

interface FormData {
  name: string
  phone: string
  date: string
  guests: string
  type: string
  notes: string
}

export default function Reserve() {
  const [ref, inView] = useInView(0.08)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
    guests: "",
    type: "Regular Table",
    notes: "",
  })

  const set = (key: keyof FormData, val: string) =>
    setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="reserve"
      ref={ref}
      className="relative bg-bg py-[120px] px-[clamp(20px,6vw,100px)] overflow-hidden"
    >
      <div className="noise-layer" />

      <div
        className={`
          relative z-[2] max-w-[780px] mx-auto
          transition-[opacity,transform] duration-[0.9s] ease-[--ease-out-expo]
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[36px]"}
        `}
      >
        {/* ---- Heading ---- */}
        <div className="text-center mb-[60px]">
          <p className="inline-block text-[10.5px] font-medium tracking-[0.28em] uppercase text-accent mb-[18px]">
            &#10022; Book Your Night
          </p>

          <h2 className="font-display text-[clamp(44px,7vw,96px)] font-light leading-[0.92] tracking-[-0.025em] text-text-main mb-6">
            Reserve
            <br />
            <em className="italic text-accent">Your Table</em>
          </h2>

          <p className="text-[14px] font-light text-text-dim max-w-[460px] leading-[1.7] mx-auto">
            Secure your spot at one of Jakarta&apos;s most exclusive venues. Our
            team will confirm within 24 hours.
          </p>
        </div>

        {/* ---- Form / Success ---- */}
        {submitted ? (
          <div className="text-center py-[72px] px-10 border border-border-accent bg-accent-glow flex flex-col items-center gap-[14px]">
            <span className="text-[36px] text-accent inline-block animate-spin-slow [animation-duration:4s]">
              ✦
            </span>
            <h3 className="font-display text-[40px] font-light text-text-main">
              Reservation Received
            </h3>
            <p className="text-[14px] font-light text-text-dim">
              We&apos;ll confirm your booking via WhatsApp within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-2 gap-[18px] max-[768px]:grid-cols-1">
              <label className="flex flex-col gap-[9px]">
                <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                  Full Name
                </span>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="
                    bg-card border border-border-base text-text-main
                    py-[13px] px-4 text-[14px] font-light
                    outline-none resize-none appearance-none dark-scheme
                    transition-[border-color,background-color] duration-200
                    placeholder:text-text-muted
                    focus:border-accent focus:bg-[rgba(0,200,212,0.036)]
                  "
                />
              </label>

              <label className="flex flex-col gap-[9px]">
                <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                  WhatsApp Number
                </span>
                <input
                  type="tel"
                  placeholder="+62 8xx xxxx xxxx"
                  required
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="
                    bg-card border border-border-base text-text-main
                    py-[13px] px-4 text-[14px] font-light
                    outline-none resize-none appearance-none dark-scheme
                    transition-[border-color,background-color] duration-200
                    placeholder:text-text-muted
                    focus:border-accent focus:bg-[rgba(0,200,212,0.036)]
                  "
                />
              </label>
            </div>

            {/* Row 2: Date + Guests */}
            <div className="grid grid-cols-2 gap-[18px] max-[768px]:grid-cols-1">
              <label className="flex flex-col gap-[9px]">
                <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                  Preferred Date
                </span>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="
                    bg-card border border-border-base text-text-main
                    py-[13px] px-4 text-[14px] font-light
                    outline-none resize-none appearance-none dark-scheme
                    transition-[border-color,background-color] duration-200
                    placeholder:text-text-muted
                    focus:border-accent focus:bg-[rgba(0,200,212,0.036)]
                  "
                />
              </label>

              <label className="flex flex-col gap-[9px]">
                <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                  Number of Guests
                </span>
                <select
                  required
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                  className="
                    bg-card border border-border-base text-text-main
                    py-[13px] px-4 text-[14px] font-light
                    outline-none appearance-none dark-scheme
                    transition-[border-color,background-color] duration-200
                    focus:border-accent focus:bg-[rgba(0,200,212,0.036)]
                    [&>option]:bg-bg-2
                  "
                >
                  <option value="">Select</option>
                  {["2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
                    <option key={n} value={n}>
                      {n} guests
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Table type */}
            <div className="flex flex-col gap-[9px]">
              <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                Table Type
              </span>
              <div className="flex flex-wrap gap-2">
                {TABLE_TYPES.map((t) => {
                  const selected = form.type === t
                  return (
                    <label
                      key={t}
                      className={`
                        py-[9px] px-4 text-[11.5px] font-normal
                        border cursor-pointer
                        transition-[border-color,color,background-color] duration-200
                        ${
                          selected
                            ? "border-accent text-accent bg-accent-glow"
                            : "border-border-base text-text-dim hover:border-text-muted hover:text-text-main"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="table-type"
                        value={t}
                        checked={selected}
                        onChange={() => set("type", t)}
                        className="sr-only"
                      />
                      {t}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Notes */}
            <label className="flex flex-col gap-[9px]">
              <span className="text-[10.5px] font-medium tracking-[0.16em] uppercase text-text-muted">
                Special Requests
              </span>
              <textarea
                rows={3}
                placeholder="Birthday setup, bottle preferences, dietary requirements…"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="
                  bg-card border border-border-base text-text-main
                  py-[13px] px-4 text-[14px] font-light
                  outline-none resize-none appearance-none dark-scheme
                  transition-[border-color,background-color] duration-200
                  placeholder:text-text-muted
                  focus:border-accent focus:bg-[rgba(0,200,212,0.036)]
                "
              />
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="
                group relative w-full mt-2
                inline-flex items-center justify-center gap-2
                py-[18px] px-3 bg-accent text-black
                text-[11px] font-semibold tracking-[0.2em] uppercase
                overflow-hidden cursor-pointer
                transition-[background-color] duration-300
                hover:bg-[#00e0ed] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,200,212,0.38)]
                focus-visible:bg-[#00e0ed] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_8px_28px_rgba(0,200,212,0.38)]
                active:translate-y-0 active:shadow-none
              "
            >
              <span
                className="
                  absolute inset-0
                  bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)]
                  translate-x-[-100%]
                  transition-transform duration-500
                  group-hover:translate-x-[100%]
                "
              />
              <span className="relative z-[1]">Confirm Reservation</span>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
