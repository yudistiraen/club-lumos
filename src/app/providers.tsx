"use client"

import { EventProvider } from "@/hooks/use-event-live"

export default function Providers({ children }: { children: React.ReactNode }) {
  return <EventProvider>{children}</EventProvider>
}
