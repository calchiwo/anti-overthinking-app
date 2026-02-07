"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: "rect" | "circle"
}

interface ConfettiProps {
  active: boolean
  duration?: number
}

const COLORS = [
  "hsl(152, 58%, 52%)",
  "hsl(152, 58%, 70%)",
  "hsl(200, 80%, 60%)",
  "hsl(45, 90%, 65%)",
  "hsl(0, 0%, 98%)",
  "hsl(280, 60%, 65%)",
]

export function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      })
    }

    const startTime = Date.now()
    let animationId: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const fadeStart = duration * 0.6

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08
        p.vx *= 0.99
        p.rotation += p.rotationSpeed

        if (elapsed > fadeStart) {
          p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / (duration - fadeStart))
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      if (elapsed < duration) {
        animationId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  )
}
