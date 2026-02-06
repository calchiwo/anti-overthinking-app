"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

type Phase = "inhale" | "hold" | "exhale" | "rest"

const phases: { name: Phase; duration: number; label: string }[] = [
  { name: "inhale", duration: 4, label: "Breathe in" },
  { name: "hold", duration: 4, label: "Hold" },
  { name: "exhale", duration: 4, label: "Breathe out" },
  { name: "rest", duration: 2, label: "Rest" },
]

const CYCLE_DURATION = phases.reduce((sum, p) => sum + p.duration, 0)

const durationOptions = [
  { label: "1 min", seconds: 60 },
  { label: "2 min", seconds: 120 },
  { label: "5 min", seconds: 300 },
]

export function BreathingExercise() {
  const [selectedDuration, setSelectedDuration] = useState(120)
  const [isActive, setIsActive] = useState(false)
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(phases[0].duration)
  const [cycles, setCycles] = useState(0)
  const [totalElapsed, setTotalElapsed] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const currentPhase = phases[currentPhaseIndex]

  const reset = useCallback(() => {
    setIsActive(false)
    setCurrentPhaseIndex(0)
    setTimeLeft(phases[0].duration)
    setCycles(0)
    setTotalElapsed(0)
    setIsComplete(false)
  }, [])

  useEffect(() => {
    if (!isActive) return

    let elapsed = 0
    const phaseMs = currentPhase.duration * 1000
    const tick = 50

    const interval = setInterval(() => {
      elapsed += tick
      setTotalElapsed((prev) => {
        const next = prev + tick / 1000
        if (next >= selectedDuration) {
          setIsActive(false)
          setIsComplete(true)
          clearInterval(interval)
          return selectedDuration
        }
        return next
      })

      const remaining = Math.ceil((phaseMs - elapsed) / 1000)
      setTimeLeft(Math.max(remaining, 0))

      if (elapsed >= phaseMs) {
        const nextIndex = (currentPhaseIndex + 1) % phases.length
        setCurrentPhaseIndex(nextIndex)
        if (nextIndex === 0) {
          setCycles((c) => c + 1)
        }
        setTimeLeft(phases[nextIndex].duration)
      }
    }, tick)

    return () => clearInterval(interval)
  }, [isActive, currentPhaseIndex, selectedDuration])

  const progress =
    ((phases[currentPhaseIndex].duration - timeLeft) /
      phases[currentPhaseIndex].duration) *
    100

  const totalProgress = Math.min((totalElapsed / selectedDuration) * 100, 100)

  const getCircleScale = () => {
    if (!isActive && !isComplete) return 1
    if (currentPhase.name === "inhale") return 1 + (progress / 100) * 0.3
    if (currentPhase.name === "exhale") return 1.3 - (progress / 100) * 0.3
    if (currentPhase.name === "hold") return 1.3
    return 1
  }

  const remainingTotal = Math.max(
    Math.ceil(selectedDuration - totalElapsed),
    0
  )
  const remainingMin = Math.floor(remainingTotal / 60)
  const remainingSec = remainingTotal % 60

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Duration toggle */}
      <div className="flex items-center gap-1 rounded-full border border-border p-1">
        {durationOptions.map((opt) => (
          <button
            key={opt.seconds}
            onClick={() => {
              if (!isActive) {
                setSelectedDuration(opt.seconds)
                reset()
              }
            }}
            disabled={isActive}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              selectedDuration === opt.seconds
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            } ${isActive ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Total progress ring */}
        <svg
          className="absolute w-64 h-64 -rotate-90"
          viewBox="0 0 256 256"
        >
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 120}
            strokeDashoffset={
              2 * Math.PI * 120 * (1 - totalProgress / 100)
            }
            className="transition-all duration-200 ease-linear"
          />
        </svg>

        <div
          className="absolute w-48 h-48 rounded-full bg-primary/20 transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `scale(${getCircleScale()})` }}
        />
        <div
          className="absolute w-36 h-36 rounded-full bg-primary/40 transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `scale(${getCircleScale()})` }}
        />
        <div className="relative z-10 flex flex-col items-center gap-1">
          {isComplete ? (
            <>
              <span className="text-2xl font-semibold text-foreground">
                Done
              </span>
              <span className="text-sm text-muted-foreground">
                {cycles} cycle{cycles !== 1 ? "s" : ""}
              </span>
            </>
          ) : (
            <>
              <span className="text-3xl font-semibold text-foreground">
                {timeLeft}
              </span>
              <span className="text-lg text-muted-foreground">
                {isActive ? currentPhase.label : "Ready"}
              </span>
              {(isActive || totalElapsed > 0) && (
                <span className="text-xs text-muted-foreground mt-1">
                  {remainingMin}:{remainingSec.toString().padStart(2, "0")} left
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {isComplete ? (
          <Button
            variant="outline"
            onClick={reset}
            className="rounded-full px-6 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Again
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsActive(!isActive)}
              className="w-12 h-12 rounded-full"
            >
              {isActive ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            {totalElapsed > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={reset}
                className="w-12 h-12 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
