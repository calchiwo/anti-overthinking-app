# Anti-Overthinking App

A web application designed to interrupt anxious thought loops and bring you back to your body and the present moment.

Built on the principle that **overthinking is physiological first**. Your nervous system needs to settle before your mind can follow.

## How It Works

When you're caught in a loop, hit **"I'm overthinking"**. The app launches you straight into a guided breathing exercise to calm your nervous system. From there, explore grounding, thought dumping, reframing, and a full body reset. No accounts, no tracking, no distractions. Just the tools you need, when you need them.

## Tools

### 1. Breathe
A 4-4-4-2 box breathing exercise with an animated breathing circle that expands and contracts with your breath. Includes a subtle duration toggle (1 min, 2 min default, 5 min), a progress ring, and remaining time counter. The circle itself is clickable: tap it to start, pause, or reset.

- **Inhale** (4s) - **Hold** (4s) - **Exhale** (4s) - **Rest** (2s)
- Smooth 2-second animation transitions
- High-precision 50ms timer for accurate pacing
- Confetti celebration on completion

### 2. Ground
The classic **5-4-3-2-1 sensory grounding technique**. Walks you step-by-step through noticing:
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

Each step includes a text input for quick typed answers (or press Enter to skip). The completion screen shows a summary of everything you noticed, plus confetti.

### 3. Dump
A thought externalization tool. Write out what's looping in your head, then choose to:
- **Save**: download as a text file for later reflection
- **Release**: delete it with a satisfying animation, confetti, and let it go

### 4. Reframe
Random cognitive reframing prompts to shift your perspective. Examples:
- "Will this matter in 5 years?"
- "What would you tell a friend in this situation?"
- "What is one thing you can control right now?"

### 5. Body Reset
A **90-second guided physical sequence** with six phases designed to discharge nervous system activation:

| Phase | Duration | Purpose |
|-------|----------|---------|
| Shake it out | 15s | Release tension from hands and arms |
| Roll shoulders | 15s | Loosen upper body knots |
| Belly breathing | 20s | Activate parasympathetic nervous system |
| Neck release | 15s | Release held tension |
| Full body stretch | 15s | Expand and decompress |
| Be still | 10s | Return to baseline |

Includes a progress ring, phase indicator dots, play/pause/reset controls, and confetti on completion.

### Confetti
A lightweight, zero-dependency canvas-based confetti animation fires on every meaningful completion. Finishing a breathing session, completing all grounding steps, releasing a thought, and finishing a body reset. 80 particles in the app's color palette fall with gravity, spin, and fade over 3 seconds.

## Design

- **Dark theme** with a calming green (#4ADE80) accent
- Minimal, distraction-free interface
- No signup, no data collection, no notifications
- Mobile-friendly responsive layout
- Designed to be used in the moment, not browsed

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Lucide** icons

No backend. No database. No external API calls. The app runs entirely in your browser.

## Getting Started
# Clone repository
```bash
git clone anti-overthinking-app
```

# Install dependencies
```bash
npm install
```

# Run development server
```bash
npm run dev
```

# Build for production
```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy

One-click deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

## Philosophy

Overthinking is not a thinking problem. It's a nervous system problem. The mind loops because the body is in a stress state. This app addresses that by:

1. **Body first**: The primary intervention targets physical tension before cognitive patterns
2. **Interrupt, don't suppress**: The tools redirect attention rather than fighting thoughts
3. **Minimal by design**: No gamification, no streaks, no social features. Just tools that work.
4. **No friction**: No accounts, no onboarding, no permissions. Open it and use it.

## License

[MIT](LICENSE)

## Authour
Caleb Wodi
* [Twitter](https://x.com/calchiwo)
* [Linkedin](http://linkedin.com/calchiwo)
* [GitHub](https://github.com/calchiwo)