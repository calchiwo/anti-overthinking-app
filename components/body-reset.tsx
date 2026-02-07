"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Confetti } from "@/components/confetti"

interface Phase {
  label: string
  instruction: string
  duration: number
}

const phases: Phase[] = [
  {
    label: "Shake it out",
    instruction: "Shake your hands and arms loosely. Let the tension leave your body.",
    duration: 15,
  },
  {
    label: "Roll your shoulders",
    instruction: "Slow, big circles. Forward, then backward. Feel the knots release.",
    duration: 15,
  },
  {
    label: "Belly breathing",
    instruction: "Hand on your stomach. Breathe deep into your belly. Slow exhale through your mouth.",
    duration: 20,
  },
  {
    label: "Release your neck",
    instruction: "Gently tilt your head side to side. No rushing. Let gravity do the work.",
    duration: 15,
  },
  {
    label: "Full body stretch",
    instruction: "Reach your arms overhead. Stretch tall. Then slowly fold forward and hang.",
    duration: 15,
  },
  {
    label: "Be still",
    instruction: "Close your eyes. Stand or sit. Just exist for a moment. You are safe.",
    duration: 10,
  },
]

const TOTAL_DURATION = phases.reduce((sum, p) => sum + p.duration, 0)

function getPhaseAtTime(elapsed: number): { phaseIndex: number; phaseElapsed: number } {
  let cumulative = 0
  for (let i = 0; i < phases.length; i++) {
    if (elapsed < cumulative + phases[i].duration) {
      return { phaseIndex: i, phaseElapsed: elapsed - cumulative }
    }
    cumulative += phases[i].duration
  }
  return { phaseIndex: phases.length - 1, phaseElapsed: phases[phases.length - 1].duration }
}

export function BodyReset() {
  const [isActive, setIsActive] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const reset = useCallback(() => {
    setIsActive(false)
    setElapsed(0)
    setIsComplete(false)
  }, [])

  useEffect(() => {
    if (!isActive || isComplete) return

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.05
        if (next >= TOTAL_DURATION) {
          setIsActive(false)
          setIsComplete(true)
          return TOTAL_DURATION
        }
        return next
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isActive, isComplete])

  const { phaseIndex, phaseElapsed } = getPhaseAtTime(elapsed)
  const currentPhase = phases[phaseIndex]
  const phaseProgress = (phaseElapsed / currentPhase.duration) * 100
  const totalProgress = (elapsed / TOTAL_DURATION) * 100
  const totalRemaining = Math.ceil(TOTAL_DURATION - elapsed)

  if (isComplete) {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-md">
        <Confetti active={isComplete} />
      <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-primary/40 flex items-center justify-center">
            <span className="text-3xl font-semibold text-primary">Done</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Body reset complete
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Your nervous system got a chance to settle. The thinking will be clearer now.
          </p>
        </div>

        <Button variant="outline" onClick={reset} className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Do it again
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Overall progress ring */}
      <div className="relative flex items-center justify-center w-56 h-56">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 224 224">
          <circle
            cx="112"
            cy="112"
            r="100"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <circle
            cx="112"
            cy="112"
            r="100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 100}`}
            strokeDashoffset={`${2 * Math.PI * 100 * (1 - totalProgress / 100)}`}
            className="transition-[stroke-dashoffset] duration-100 ease-linear"
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span className="text-4xl font-semibold tabular-nums text-foreground">
            {totalRemaining}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            seconds left
          </span>
        </div>
      </div>

      {/* Phase info */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          {currentPhase.label}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto text-balance">
          {currentPhase.instruction}
        </p>
      </div>

      {/* Phase progress dots */}
      <div className="flex items-center gap-2">
        {phases.map((phase, i) => (
          <div
            key={phase.label}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < phaseIndex
                ? "w-8 bg-primary"
                : i === phaseIndex
                  ? "w-8 bg-primary/60"
                  : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsActive(!isActive)}
          className="w-12 h-12 rounded-full bg-transparent"
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={reset}
          className="w-12 h-12 rounded-full"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
