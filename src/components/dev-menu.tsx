"use client"

import { useState } from "react"
import { Settings2 } from "lucide-react"
import { useEventConfig, type EventStatus } from "@/hooks/use-event-live"

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function toTimeStr(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const STATUS_LABEL: Record<EventStatus, { text: string; color: string }> = {
  live: { text: "LIVE", color: "bg-green-500" },
  waiting: { text: "WAITING", color: "bg-accent" },
  idle: { text: "IDLE", color: "bg-text-muted" },
}

export default function DevMenu() {
  const [open, setOpen] = useState(false)
  const { enabled, startDate, status, setEnabled, setStartDate } =
    useEventConfig()

  if (process.env.NODE_ENV !== "development") return null

  const badge = STATUS_LABEL[status]

  function handleDate(val: string) {
    const [y, m, d] = val.split("-").map(Number)
    const next = new Date(startDate)
    next.setFullYear(y, m - 1, d)
    setStartDate(next)
  }

  function handleTime(val: string) {
    const [h, m] = val.split(":").map(Number)
    const next = new Date(startDate)
    next.setHours(h, m, 0, 0)
    setStartDate(next)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-[18px] right-[clamp(14px,2vw,70px)] z-[950]
          w-9 h-9 flex items-center justify-center
          rounded-full border border-border-base bg-[rgba(6,6,10,0.7)] backdrop-blur-md
          text-text-dim cursor-pointer
          transition-[color,border-color,background] duration-200
          hover:text-accent hover:border-border-accent hover:bg-[rgba(0,200,212,0.06)]
          focus-visible:text-accent focus-visible:border-border-accent
          active:text-accent
        "
        aria-label="Open dev menu"
      >
        <Settings2 size={15} strokeWidth={1.8} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[990] bg-[rgba(0,0,0,0.5)]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`
          fixed top-0 right-0 z-[1000] h-full w-[320px] max-w-[85vw]
          bg-bg-2 border-l border-border-base
          transition-transform duration-300 ease-[--ease-out-expo]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Settings2 size={14} className="text-accent" />
              <span className="font-label text-[18px] tracking-[0.1em] text-text-main">
                DEV MENU
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="
                text-text-muted text-[20px] leading-none cursor-pointer
                transition-colors duration-200
                hover:text-text-main focus-visible:text-text-main active:text-text-main
              "
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="text-[9px] tracking-[0.22em] uppercase text-text-muted">
              Status
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className={`block w-[7px] h-[7px] rounded-full ${badge.color}`}
              />
              <span className="font-label text-[13px] tracking-[0.14em] text-text-main">
                {badge.text}
              </span>
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border-base mb-6" />

          {/* Event toggle */}
          <div className="flex items-center justify-between mb-7">
            <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-dim">
              Event Active
            </span>
            <button
              role="switch"
              aria-checked={enabled}
              onClick={() => setEnabled(!enabled)}
              className={`
                relative w-[44px] h-[24px] rounded-full cursor-pointer
                transition-colors duration-200
                ${enabled ? "bg-accent" : "bg-[rgba(255,255,255,0.08)]"}
              `}
            >
              <span
                className={`
                  absolute top-[3px] left-[3px]
                  w-[18px] h-[18px] rounded-full bg-bg
                  transition-transform duration-200 ease-[--ease-out-expo]
                  ${enabled ? "translate-x-[20px]" : "translate-x-0"}
                `}
              />
            </button>
          </div>

          {/* Date */}
          <label className="flex flex-col gap-2 mb-5">
            <span
              className={`text-[11px] font-medium tracking-[0.1em] uppercase ${
                enabled ? "text-text-dim" : "text-text-muted"
              }`}
            >
              Event Date
            </span>
            <input
              type="date"
              disabled={!enabled}
              value={toDateStr(startDate)}
              onChange={(e) => handleDate(e.target.value)}
              className={`
                dark-scheme
                w-full px-3 py-2.5 rounded
                bg-[rgba(255,255,255,0.04)] border border-border-base
                text-[13px] font-light text-text-main
                transition-[border-color,opacity] duration-200
                focus:outline-none focus:border-border-accent
                disabled:opacity-30 disabled:cursor-not-allowed
              `}
            />
          </label>

          {/* Time */}
          <label className="flex flex-col gap-2 mb-8">
            <span
              className={`text-[11px] font-medium tracking-[0.1em] uppercase ${
                enabled ? "text-text-dim" : "text-text-muted"
              }`}
            >
              Event Time
            </span>
            <input
              type="time"
              disabled={!enabled}
              value={toTimeStr(startDate)}
              onChange={(e) => handleTime(e.target.value)}
              className={`
                dark-scheme
                w-full px-3 py-2.5 rounded
                bg-[rgba(255,255,255,0.04)] border border-border-base
                text-[13px] font-light text-text-main
                transition-[border-color,opacity] duration-200
                focus:outline-none focus:border-border-accent
                disabled:opacity-30 disabled:cursor-not-allowed
              `}
            />
          </label>

          {/* Divider */}
          <div className="h-px bg-border-base mb-6" />

          {/* Info */}
          <p className="text-[10px] tracking-[0.04em] text-text-muted leading-[1.7]">
            Event duration is 7 hours from start time. Status updates in
            real&#8209;time. Settings are saved in localStorage.
          </p>
        </div>
      </div>
    </>
  )
}
