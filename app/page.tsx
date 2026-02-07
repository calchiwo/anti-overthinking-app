"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreathingExercise } from "@/components/breathing-exercise"
import { GroundingExercise } from "@/components/grounding-exercise"
import { ThoughtDump } from "@/components/thought-dump"
import { QuickActions } from "@/components/quick-actions"
import { BodyReset } from "@/components/body-reset"
import { Wind, Eye, FileText, Sparkles, Activity, X, ArrowLeft, ArrowRight, Star } from "lucide-react"

type Tool = "bodyreset" | "breathing" | "grounding" | "dump" | "prompts" | null

const tools = [
  {
    id: "breathing" as const,
    title: "Breathe",
    description: "4-4-4-2 breathing exercise to calm your nervous system",
    icon: Wind,
  },
  {
    id: "grounding" as const,
    title: "Ground",
    description: "5-4-3-2-1 sensory grounding technique",
    icon: Eye,
  },
  {
    id: "dump" as const,
    title: "Dump",
    description: "Write out your thoughts, then release or save them",
    icon: FileText,
  },
  {
    id: "prompts" as const,
    title: "Reframe",
    description: "Random prompts to shift your perspective",
    icon: Sparkles,
  },
  {
    id: "bodyreset" as const,
    title: "Body Reset",
    description: "90-second guided movement to settle your nervous system first",
    icon: Activity,
  },
]

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>(null)

  const handlePanic = () => {
    setActiveTool("breathing")
  }

  const handleClose = () => {
    setActiveTool(null)
  }

  const renderToolContent = () => {
    switch (activeTool) {
      case "bodyreset":
        return <BodyReset />
      case "breathing":
        return <BreathingExercise />
      case "grounding":
        return <GroundingExercise />
      case "dump":
        return <ThoughtDump />
      case "prompts":
        return <QuickActions />
      default:
        return null
    }
  }

  const currentIndex = tools.findIndex((t) => t.id === activeTool)

  const getToolTitle = () => {
    const tool = tools.find((t) => t.id === activeTool)
    return tool?.title || ""
  }

  const goToNext = () => {
    if (currentIndex < tools.length - 1) {
      setActiveTool(tools[currentIndex + 1].id)
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setActiveTool(tools[currentIndex - 1].id)
    }
  }

  if (activeTool) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">{getToolTitle()}</h1>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          {renderToolContent()}
        </div>

        <footer className="flex items-center justify-between p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={goToPrev}
            disabled={currentIndex <= 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Prev
          </Button>
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1} / {tools.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={goToNext}
            disabled={currentIndex >= tools.length - 1}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Anti-Overthinking App
          </h1>
          <p className="text-muted-foreground text-lg">
            Stop overthinking. Find your calm.
          </p>
        </header>

        <div className="mb-8">
          <Button
            onClick={handlePanic}
            size="lg"
            className="w-full h-16 text-lg font-semibold"
          >
            I'm overthinking
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Card
              key={tool.id}
              className="bg-card border-border cursor-pointer transition-all hover:border-primary/50 hover:bg-card/80"
              onClick={() => setActiveTool(tool.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="mt-16 flex flex-col items-center gap-4">
          <a
            href="https://github.com/calchiwo/anti-overthinking-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Star className="w-4 h-4" />
              Star on GitHub
            </Button>
          </a>
          <p className="text-sm text-muted-foreground">
            Remember: thoughts are not facts.
          </p>
        </footer>
      </div>
    </main>
  )
}
