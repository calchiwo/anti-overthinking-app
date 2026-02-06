"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shuffle } from "lucide-react"

const prompts = [
  "Name 3 things that went well today",
  "What would you tell a friend in this situation?",
  "Will this matter in 5 years?",
  "What is one thing you can control right now?",
  "Take a glass of water",
  "Step outside for 2 minutes",
  "Text someone you appreciate",
  "Stretch your shoulders and neck",
  "What are you grateful for right now?",
  "Close your eyes and count to 10",
  "Name 3 things you are good at",
  "What is the kindest thing you can do for yourself?",
]

export function QuickActions() {
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [isRevealed, setIsRevealed] = useState(false)

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length)
    setCurrentPrompt(prompts[randomIndex])
    setIsRevealed(true)
  }

  useEffect(() => {
    getRandomPrompt()
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center min-h-[120px] flex items-center justify-center">
        {isRevealed && (
          <p className="text-xl text-foreground font-medium max-w-sm text-balance">
            {currentPrompt}
          </p>
        )}
      </div>

      <Button
        variant="outline"
        onClick={getRandomPrompt}
        className="gap-2 bg-transparent"
      >
        <Shuffle className="w-4 h-4" />
        New prompt
      </Button>
    </div>
  )
}
