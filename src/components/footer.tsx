"use client"

const SOCIALS = [
  { code: "IG", label: "Instagram" },
  { code: "TT", label: "TikTok" },
  { code: "SC", label: "SoundCloud" },
  { code: "WA", label: "WhatsApp" },
]

const NAV_EXPLORE = [
  { label: "About Us", target: "about" },
  { label: "Services", target: "services" },
  { label: "Our DJs", target: "dj" },
  { label: "The Bar", target: "drinks" },
]

const NAV_VISIT = [
  { label: "Experience", target: "experience" },
  { label: "Team", target: "staff" },
  { label: "Dress Code", target: "rules" },
  { label: "Reservations", target: "reserve" },
]

const HOURS = [
  { day: "Mon – Tue", time: "Closed" },
  { day: "Wed – Thu", time: "21:00 – 03:00" },
  { day: "Fri – Sat", time: "21:00 – 04:00" },
  { day: "Sunday", time: "20:00 – 02:00" },
]

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative bg-bg-2 border-t border-border-base overflow-hidden">
      <div className="noise-layer" />

      <div className="relative z-[2] pt-[76px] px-[clamp(20px,6vw,100px)] pb-10">
        {/* ---- Top: Logo + Nav ---- */}
        <div
          className="
            grid grid-cols-[1fr_2fr] gap-[80px]
            mb-14 pb-14 border-b border-border-base
            max-[1024px]:grid-cols-1 max-[1024px]:gap-10
          "
        >
          {/* Left — brand */}
          <div>
            {/* Logo */}
            <button
              className="flex items-center gap-[9px] mb-4 cursor-pointer"
              onClick={() => scrollTo("hero")}
            >
              <span className="text-accent text-[13px] inline-block animate-spin-slow">
                ✦
              </span>
              <span className="font-label text-[19px] tracking-[0.14em] text-text-main">
                CLUB LUMOS
              </span>
            </button>

            <p className="text-[13px] font-light text-text-muted tracking-[0.04em] mb-7">
              Where darkness becomes art.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(({ code, label }) => (
                <button
                  key={code}
                  aria-label={label}
                  className="
                    w-[38px] h-[38px]
                    border border-border-base
                    inline-flex items-center justify-center
                    text-[10px] font-semibold tracking-[0.04em] text-text-muted
                    cursor-pointer
                    transition-[border-color,color,background-color] duration-200
                    hover:border-accent hover:text-accent hover:bg-accent-glow
                    focus-visible:border-accent focus-visible:text-accent focus-visible:bg-accent-glow
                    active:border-accent active:text-accent active:bg-accent-glow
                  "
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Right — nav columns */}
          <nav
            className="
              grid grid-cols-3 gap-9
              max-[768px]:grid-cols-2 max-[768px]:gap-7
              max-[480px]:grid-cols-1
            "
          >
            {/* Explore */}
            <div>
              <h4 className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-text-dim mb-[18px]">
                Explore
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_EXPLORE.map(({ label, target }) => (
                  <li key={target}>
                    <button
                      onClick={() => scrollTo(target)}
                      className="
                        text-[13px] font-light text-text-muted cursor-pointer
                        transition-colors duration-200
                        hover:text-accent
                        focus-visible:text-accent
                      "
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit */}
            <div>
              <h4 className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-text-dim mb-[18px]">
                Visit
              </h4>
              <ul className="flex flex-col gap-3">
                {NAV_VISIT.map(({ label, target }) => (
                  <li key={target}>
                    <button
                      onClick={() => scrollTo(target)}
                      className="
                        text-[13px] font-light text-text-muted cursor-pointer
                        transition-colors duration-200
                        hover:text-accent
                        focus-visible:text-accent
                      "
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-[10.5px] font-semibold tracking-[0.2em] uppercase text-text-dim mb-[18px]">
                Hours
              </h4>
              <ul className="flex flex-col gap-3">
                {HOURS.map(({ day, time }) => (
                  <li
                    key={day}
                    className="flex justify-between gap-3 text-[13px] font-light text-text-muted"
                  >
                    <span>{day}</span>
                    <span>{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* ---- Bottom ---- */}
        <div
          className="
            flex justify-between items-center gap-4 flex-wrap
            max-[768px]:flex-col max-[768px]:text-center
          "
        >
          <span className="text-[11.5px] font-light text-text-muted tracking-[0.04em]">
            Jl. Kemang Raya No. 12, Jakarta Selatan &middot; +62 21 xxxx xxxx
          </span>
          <span className="text-[11.5px] font-light text-text-muted tracking-[0.04em]">
            &copy; 2025 Club Lumos. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
