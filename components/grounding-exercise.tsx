"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, RotateCcw, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Confetti } from "@/components/confetti"

const senses = [
  { count: 5, sense: "things you can see", placeholder: "desk, window, lamp..." },
  { count: 4, sense: "things you can touch", placeholder: "keyboard, mug, fabric..." },
  { count: 3, sense: "things you can hear", placeholder: "fan, birds, typing..." },
  { count: 2, sense: "things you can smell", placeholder: "coffee, air, soap..." },
  { count: 1, sense: "thing you can taste", placeholder: "water, mint, nothing..." },
]

export function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isFinished && inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentStep, isFinished])

  const handleNext = () => {
    const newCompleted = [...completed, currentStep]
    setCompleted(newCompleted)

    if (currentStep < senses.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNext()
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setCompleted([])
    setIsFinished(false)
    setAnswers(Array(5).fill(""))
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <Confetti active={isFinished} />
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">You did it</h3>
          <p className="text-muted-foreground">
            Take a moment to notice how you feel now.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-2 text-left">
          {senses.map((s, i) => (
            <div key={i} className="text-sm">
              <span className="text-muted-foreground">{s.count} {s.sense}:</span>{" "}
              <span className="text-foreground">{answers[i] || "---"}</span>
            </div>
          ))}
        </div>

        <Button variant="outline" onClick={reset} className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Start again
        </Button>
      </div>
    )
  }

  const current = senses[currentStep]

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-2">
        {senses.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              completed.includes(index)
                ? "bg-primary"
                : index === currentStep
                  ? "bg-primary/50"
                  : "bg-muted"
            )}
          />
        ))}
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-primary mb-4">{current.count}</div>
        <p className="text-xl text-foreground">{current.sense}</p>
      </div>

      <div className="w-full max-w-xs">
        <input
          ref={inputRef}
          type="text"
          value={answers[currentStep]}
          onChange={(e) => {
            const newAnswers = [...answers]
            newAnswers[currentStep] = e.target.value
            setAnswers(newAnswers)
          }}
          onKeyDown={handleKeyDown}
          placeholder={current.placeholder}
          className="w-full bg-transparent border-b border-border text-foreground placeholder:text-muted-foreground/50 text-center py-2 text-sm focus:outline-none focus:border-primary transition-colors"
          aria-label={`Name ${current.count} ${current.sense}`}
        />
        <p className="text-xs text-muted-foreground text-center mt-2">
          Type a quick answer or just press Enter to skip
        </p>
      </div>

      <Button onClick={handleNext} size="lg" className="px-8 gap-2">
        Next
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
