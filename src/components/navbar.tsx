"use client"

import { useState, useEffect } from "react"

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "dj", label: "DJs" },
  { id: "drinks", label: "Drinks" },
  { id: "experience", label: "Experience" },
  { id: "staff", label: "Team" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 z-[900]
        px-[clamp(20px,5vw,80px)]
        transition-[background,padding] duration-400 ease-[--ease-out-expo]
        ${
          scrolled
            ? "bg-[rgba(6,6,10,0.86)] backdrop-blur-[22px] py-3.5 border-b border-border-base"
            : "py-[22px]"
        }
      `}
    >
      <div className="flex items-center gap-9">
        {/* ---- Logo ---- */}
        <button
          className="flex items-center gap-[9px] me-auto cursor-pointer"
          onClick={() => go("hero")}
        >
          <span className="text-accent text-[13px] inline-block animate-spin-slow">
            ✦
          </span>
          <span className="font-label text-[19px] tracking-[0.14em] text-text-main">
            CLUB LUMOS
          </span>
        </button>

        {/* ---- Desktop nav links ---- */}
        <ul
          className={`
            items-center gap-7
            ${menuOpen ? "nav-links-open" : "hidden md:flex"}
          `}
          style={
            menuOpen
              ? {
                  display: "flex",
                  flexDirection: "column",
                  position: "fixed",
                  inset: 0,
                  background: "rgba(6,6,10,0.97)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "28px",
                  zIndex: 800,
                }
              : undefined
          }
        >
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`
                  cursor-pointer relative pb-[3px]
                  transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:h-px after:bg-accent
                  after:transition-[width] after:duration-300 after:ease-[--ease-out-expo]
                  after:w-0 hover:after:w-full
                  ${
                    menuOpen
                      ? "font-display text-[28px] font-light tracking-[0.08em] text-text-main pb-0 after:hidden"
                      : "text-[10.5px] font-medium tracking-[0.14em] uppercase text-text-dim hover:text-text-main"
                  }
                `}
                onClick={() => go(id)}
              >
                {label}
              </button>
            </li>
          ))}

          {/* Mobile CTA inside menu */}
          <li className={menuOpen ? "block" : "hidden"}>
            <button
              className="
                px-5 py-2 bg-transparent text-accent
                text-[10.5px] font-medium tracking-[0.18em] uppercase
                border border-border-accent cursor-pointer
                transition-[background,box-shadow] duration-250
                hover:bg-accent-glow hover:shadow-[0_0_18px_rgba(0,200,212,0.18)]
                focus-visible:bg-accent-glow focus-visible:shadow-[0_0_18px_rgba(0,200,212,0.18)]
                active:bg-accent-glow
              "
              onClick={() => go("reserve")}
            >
              Reserve
            </button>
          </li>
        </ul>

        {/* ---- Desktop CTA ---- */}
        <button
          className="
            hidden md:inline-flex
            px-5 py-2 bg-transparent text-accent
            text-[10.5px] font-medium tracking-[0.18em] uppercase
            border border-border-accent cursor-pointer
            transition-[background,box-shadow] duration-250
            hover:bg-accent-glow hover:shadow-[0_0_18px_rgba(0,200,212,0.18)]
            focus-visible:bg-accent-glow focus-visible:shadow-[0_0_18px_rgba(0,200,212,0.18)]
            active:bg-accent-glow
          "
          onClick={() => go("reserve")}
        >
          Reserve
        </button>

        {/* ---- Hamburger ---- */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 z-[900]"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Menu"
        >
          <span
            className={`
              block w-[22px] h-px bg-text-main
              transition-transform duration-300 ease-[--ease-out-expo]
              ${menuOpen ? "translate-y-[6px] rotate-45" : ""}
            `}
          />
          <span
            className={`
              block w-[22px] h-px bg-text-main
              transition-opacity duration-300
              ${menuOpen ? "opacity-0" : ""}
            `}
          />
          <span
            className={`
              block w-[22px] h-px bg-text-main
              transition-transform duration-300 ease-[--ease-out-expo]
              ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}
            `}
          />
        </button>
      </div>
    </nav>
  )
}
