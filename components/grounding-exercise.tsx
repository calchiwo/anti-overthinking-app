"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const senses = [
  { count: 5, sense: "things you can see", icon: "eye" },
  { count: 4, sense: "things you can touch", icon: "hand" },
  { count: 3, sense: "things you can hear", icon: "ear" },
  { count: 2, sense: "things you can smell", icon: "nose" },
  { count: 1, sense: "thing you can taste", icon: "tongue" },
]

export function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)

  const handleComplete = () => {
    const newCompleted = [...completed, currentStep]
    setCompleted(newCompleted)

    if (currentStep < senses.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setCompleted([])
    setIsFinished(false)
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">You did it</h3>
          <p className="text-muted-foreground">
            Take a moment to notice how you feel now.
          </p>
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

      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Look around you and find {current.count} {current.sense}. Take your time.
      </p>

      <Button onClick={handleComplete} size="lg" className="px-8">
        Done
      </Button>
    </div>
  )
}
