"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Download } from "lucide-react"

export function ThoughtDump() {
  const [thought, setThought] = useState("")
  const [isReleased, setIsReleased] = useState(false)

  const handleRelease = () => {
    if (thought.trim()) {
      setIsReleased(true)
      setTimeout(() => {
        setThought("")
        setIsReleased(false)
      }, 2000)
    }
  }

  const handleSave = () => {
    if (thought.trim()) {
      const blob = new Blob([thought], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `thought-${new Date().toISOString().split("T")[0]}.txt`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  if (isReleased) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/20 animate-ping absolute" />
          <div className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center relative">
            <Trash2 className="w-8 h-8 text-primary" />
          </div>
        </div>
        <p className="text-lg text-foreground">Released</p>
        <p className="text-sm text-muted-foreground">Let it go</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground text-center">
        Write down what is bothering you. Then release it or save it for later.
      </p>

      <Textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="What's on your mind? Let it all out..."
        className="min-h-[200px] bg-card border-border resize-none text-foreground placeholder:text-muted-foreground"
      />

      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={handleSave}
          disabled={!thought.trim()}
          className="gap-2 bg-transparent"
        >
          <Download className="w-4 h-4" />
          Save
        </Button>
        <Button
          onClick={handleRelease}
          disabled={!thought.trim()}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Release
        </Button>
      </div>
    </div>
  )
}
