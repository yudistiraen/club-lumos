"use client"

import { useEffect, useState } from "react"
import { useEventStatus } from "@/hooks/use-event-live"

const COLORS = [
  "rgba(0,200,212,0.45)",
  "rgba(123,47,190,0.4)",
  "rgba(201,168,76,0.4)",
  "rgba(176,72,136,0.38)",
  "rgba(40,88,200,0.4)",
  "rgba(0,168,156,0.42)",
]

type Shape = "circle" | "triangle" | "rect"
const SHAPES: Shape[] = ["circle", "triangle", "rect"]

interface Piece {
  id: number
  x: number
  color: string
  shape: Shape
  size: number
  duration: number
  delay: number
  drift: number
  rotation: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand(0, 100),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: rand(5, 10),
    duration: rand(6, 14),
    delay: rand(0, 10),
    drift: rand(-40, 40),
    rotation: rand(0, 360),
  }))
}

function ShapeSvg({ shape, color, size }: { shape: Shape; color: string; size: number }) {
  if (shape === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="4.5" fill={color} />
      </svg>
    )
  }
  if (shape === "triangle") {
    return (
      <svg width={size} height={size} viewBox="0 0 10 10">
        <polygon points="5,0.5 9.5,9.5 0.5,9.5" fill={color} />
      </svg>
    )
  }
  return (
    <svg width={size * 0.5} height={size * 1.4} viewBox="0 0 5 14">
      <rect x="0" y="0" width="5" height="14" rx="1" fill={color} />
    </svg>
  )
}

export default function Confetti() {
  const isLive = useEventStatus() === "live"
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    if (isLive) setPieces(generatePieces(30))
  }, [isLive])

  if (!isLive || pieces.length === 0) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${p.x}%`,
            top: "-3%",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--confetti-drift" as string]: `${p.drift}px`,
            ["--confetti-rot" as string]: `${p.rotation}deg`,
          }}
        >
          <ShapeSvg shape={p.shape} color={p.color} size={p.size} />
        </div>
      ))}
    </div>
  )
}
