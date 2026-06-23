"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

export type EventStatus = "live" | "waiting" | "idle"

const EVENT_DURATION_MS = 7 * 60 * 60 * 1000

interface EventContextValue {
  enabled: boolean
  startDate: Date
  status: EventStatus
  title: string
  sub: string
  setEnabled: (v: boolean) => void
  setStartDate: (d: Date) => void
}

const EventContext = createContext<EventContextValue | null>(null)

const LS_KEY = "club-lumos-dev-event"

function readStorage(): { enabled: boolean; startDate: Date } | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return { enabled: parsed.enabled, startDate: new Date(parsed.startDate) }
  } catch {
    return null
  }
}

function writeStorage(enabled: boolean, startDate: Date) {
  try {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ enabled, startDate: startDate.toISOString() })
    )
  } catch {}
}

function calcStatus(enabled: boolean, startDate: Date): EventStatus {
  if (!enabled) return "idle"
  const now = Date.now()
  const start = startDate.getTime()
  if (now < start) return "waiting"
  if (now < start + EVENT_DURATION_MS) return "live"
  return "idle"
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledRaw] = useState(true)
  const [startDate, setStartDateRaw] = useState(() => new Date())
  const [status, setStatus] = useState<EventStatus>("idle")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStorage()
    if (stored) {
      setEnabledRaw(stored.enabled)
      setStartDateRaw(stored.startDate)
    }
    setHydrated(true)
  }, [])

  const setEnabled = useCallback((v: boolean) => {
    setEnabledRaw(v)
  }, [])

  const setStartDate = useCallback((d: Date) => {
    setStartDateRaw(d)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeStorage(enabled, startDate)
  }, [enabled, startDate, hydrated])

  useEffect(() => {
    if (!hydrated) return
    const update = () => setStatus(calcStatus(enabled, startDate))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [enabled, startDate, hydrated])

  return (
    <EventContext.Provider
      value={{
        enabled,
        startDate,
        status,
        title: "ECLIPSE NOIR",
        sub: "A Night of Shadows & Sound",
        setEnabled,
        setStartDate,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

function useEvent() {
  const ctx = useContext(EventContext)
  if (!ctx) throw new Error("EventProvider missing")
  return ctx
}

export function useEventStatus(): EventStatus {
  return useEvent().status
}

export function useEventConfig() {
  return useEvent()
}
