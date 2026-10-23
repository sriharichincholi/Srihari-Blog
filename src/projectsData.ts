export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  tags: string[];
  readme: string;
  category: string;
  repoUrl: string;
  demoUrl: string;
  previews: string[];
  // Backwards compatibility properties if referenced elsewhere
  repositoryUrl?: string;
  deploymentUrl?: string;
}

const getImagePath = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "manashot-io",
    title: "Manashot.io",
    category: "Systems & Game Development",
    date: "2026",
    description: "Manashot.io is a high-performance 3D multiplayer browser FPS. Built with Three.js, Node.js, and WebSockets, it combines low-latency spatial synchronization and raycast weapon physics with milestone-based boss encounters and dynamic aerial mob battles.",
    technologies: ["Three.js", "Node.js", "WebSockets", "GameDev", "WebGL"],
    tags: ["Three.js", "Node.js", "WebSockets", "GameDev", "WebGL"],
    repoUrl: "https://github.com/sriharichincholi/manashot",
    demoUrl: "https://manashot-io.onrender.com/",
    repositoryUrl: "https://github.com/sriharichincholi/manashot",
    deploymentUrl: "https://manashot-io.onrender.com/",
    previews: [getImagePath("images/projects/ManashotPreview.jpg")],
    readme: `# Manashot.io — 3D Browser FPS & Multiplayer Networking

Manashot.io is a fast-paced, 3D browser-based multiplayer first-person shooter built from scratch using WebGL technologies and real-time networking. Set in a dark, neon-accented arena, the game combines custom movement physics, raycast shooting mechanics, dynamic stat-buff progression, and cooperative boss fight encounters.

## Technical Specifications
- **Category:** Systems & Game Development
- **Domain:** Real-Time Multiplayer Networking, 3D WebGL Physics & Game Architecture
- **Tech Stack:** Three.js, Node.js, WebSockets, JavaScript (ES6+), HTML5 Canvas / WebGL

## Key System Features

### 1. High-Performance Spatial Synchronization
- **Tick-Rate Optimization:** Employs binary-packed WebSocket frames running at an aggressive tick rate to stream player coordinates, pitch/yaw angles, and shooting events.
- **Client-Side Prediction & Interpolation:** Smooths out network jitter by extrapolating opponent movements and immediately predicting local player transformation updates.

### 2. Raycast Weapon Physics & Combat Mechanics
- **Instantaneous Hitscan Physics:** Computes raycast intersections against player bounding boxes and hitboxes in real-time.
- **Weapon Spread & Recoil Algorithms:** Dynamic recoil vectors and bloom calculations based on player velocity (standing vs. jumping vs. sprinting).

### 3. Boss Encounters & Dynamic Aerial Mob Battles
- **Milestone Boss Spawns:** Event-driven server triggers spawn high-HP boss targets with custom AI attack patterns.
- **Aerial Mob Wave AI:** Dynamic pathfinding for flying enemy units using vector steering behaviors.

### 4. Progression & Arena Physics
- **Stat-Buff System:** Dynamic player power-ups including movement speed boosts, fire-rate multipliers, and health regeneration.
- **Custom Movement Engine:** Friction vectors, bunny-hopping momentum, and vertical velocity handling built without heavy external physics engines.`
  },
  {
    id: "napier-ai",
    title: "NAPIER AI — National Airfare Price Index Engine",
    category: "AI / Quantitative Systems",
    date: "September 2026",
    description: "NAPIER AI is a quantitative airfare price index and forecasting engine. Powered by Python AI/ML models and a Next.js / TypeScript frontend, it tracks real-time fare dynamics across 440+ flight sectors, delivering 95% confidence-bounded predictions, Jevons index metrics, and automated booking advisories.",
    technologies: ["Next.js", "TypeScript", "Python", "AI/ML", "SIH 2026"],
    tags: ["Next.js", "TypeScript", "Python", "AI/ML", "SIH 2026"],
    repoUrl: "https://github.com/sriharichincholi/NAPIER",
    demoUrl: "https://napier-frontend.vercel.app/",
    repositoryUrl: "https://github.com/sriharichincholi/NAPIER",
    deploymentUrl: "https://napier-frontend.vercel.app/",
    previews: [getImagePath("images/projects/NapierPreview.png")],
    readme: `# NAPIER AI — National Airfare Price Index Engine

NAPIER AI is a quantitative AI platform engineered to monitor, analyze, and predict airfare fluctuations across India's aviation market in real time. Built to handle high-frequency fare changes and holiday demand spikes, the system leverages machine learning to deliver probabilistic price forecasts, geometric index tracking, and automated booking recommendations across hundreds of flight corridors.

## Technical Specifications
- **Category:** AI / Quantitative Systems
- **Domain:** Predictive Financial Modeling & Aviation Data Analytics
- **Tech Stack:** Next.js, TypeScript, Python, AI/ML, Tailwind CSS
- **Event / Entry:** CBIT Internal Hackathon — Smart India Hackathon 2026

## Key System Features

### 1. Dual-Panel Telemetry System
- **Live Analytics & Mapping:** Displays active route feeds, immediate price projections, and volatility warnings.
- **Historic Trends & Archival Analytics:** Provides time-series database records (including 30-day and all-time views) to analyze long-term seasonal and sectoral price trends.

### 2. Sector Coverage & Live Route Engine
- Tracks dynamic telemetry across 440+ domestic flight sectors (e.g., Delhi → Mumbai DEL-BOM).
- Features an instant query bar to switch live data feeds and update analytics across both panels seamlessly.

### 3. Multi-Horizon Predictive AI Modeling
- **Intra-Day Shifts (T+1h):** Real-time tracking of rapid hourly price adjustments.
- **Short-Term Horizon (T+24h):** Next-day fare estimations.
- **Long-Term Projection (T+7d):** Multi-day forecasting calibrated against upcoming festival surge windows and demand spikes.
- **Statistical Confidence Banding:** Computes 95% confidence intervals (Min-Max bounds) for every projected timeframe to quantify model uncertainty.

### 4. Interactive Fare & Jevons Index Matrix
- **Dual Visualization Engine:** Toggle between raw ticket prices (₹) and the Jevons Index (a geometric mean price index used to track true macroeconomic inflation across aviation sectors).
- **Time-Series Telemetry Chart:** Smooth SVG visual curves mapping historical momentum against projected trajectory.

### 5. Quantitative Market Insights & Surge Alerts
- **Volatility Analysis:** Automated diagnostic engine detecting demand momentum (e.g., Diwali or holiday proximity spikes).
- **Smart Recommendation Engine:** Generates real-time buy/hold advice based on surge threshold probabilities.

### 6. Embedded Conversational AI Assistant
- Persistent interactive side-drawer assistant capable of answering user queries about live sector feeds, festival surge predictions, ticket availability, and historical index trends in natural language.`
  },
  {
    id: "unbound-veyra",
    title: "Unbound: The Island of Veyra",
    category: "Systems & Game Development",
    date: "2026",
    description: "Unbound is an experimental browser-based 3D low-poly RPG combining Three.js rendering, custom retro shaders, and a Node.js backend. It features an atmospheric island exploration title inspired by classic N64 titles and Elden Ring, complemented entirely by original MIDI-composed soundtracks.",
    technologies: ["Three.js", "WebGL", "Node.js", "Retro Shaders", "Audio API"],
    tags: ["Three.js", "WebGL", "Node.js", "Retro Shaders", "Audio API"],
    repoUrl: "https://github.com/sriharichincholi/Unbound",
    demoUrl: "https://unbound-teal.vercel.app/",
    repositoryUrl: "https://github.com/sriharichincholi/Unbound",
    deploymentUrl: "https://unbound-teal.vercel.app/",
    previews: [getImagePath("images/projects/Unbound-preview1.png"), getImagePath("images/projects/Unbound-preview2.jpg")],
    readme: `# Unbound: The Island of Veyra

Unbound is an atmospheric, story-driven 3D low-poly web RPG built from scratch on Three.js, Node.js, and a custom WebGL technology stack. Set on an uncharted treasure island housing a monumental narrative-altering structure at its core, the project merges retro Nintendo 64-style visuals and moody, Elden Ring-inspired minimalist UI styling into a lightweight, high-performance browser-based experience.

## Technical Overview & Stack
- **Category:** Systems & Game Development
- **Domain:** 3D WebGL Rendering, Retro Shader Pipelines & Procedural Game Audio
- **Frontend / 3D:** Three.js (WebGL), Retro Shaders, Custom UI/UX
- **Backend / Audio:** Node.js Server, Web Audio API, Custom MIDI OSTs

## Key Features & Highlights

### 1. Retro Low-Poly Aesthetics & Custom Shaders
- **N64 Visual Styling:** Engineered custom retro shaders and low-poly environments (including ocean water shaders, dynamic lighting, forests, and mountain ranges) to achieve a stylized, nostalgic Nintendo 64 aesthetic.
- **Asset Pipeline & Optimization:** Overcame strict browser performance limitations and mesh topology hurdles by hand-crafting low-poly assets using tools like Blockbench and AI asset pipelines (Meshi).

### 2. Event-Driven & Modular Architecture
- **Frontend-Backend Synchronization:** Powered by a clean decoupled structure utilizing Three.js for real-time 3D rendering and a Node.js backend layer.
- **Web Performance Optimization:** Implemented aggressive asset management and clean execution to maintain high frame rates across browser-based WebGL viewports.

### 3. Original Composed Soundtracks (MIDI OSTs)
- **Custom Audio Integration:** Avoided generic stock loops by composing original soundtracks from scratch using a physical MIDI keyboard and DAW setup.
- **Contextual Audio Loops:** Integrated atmospheric exploration themes and tense combat cues directly into the Three.js render loop to dynamically react to gameplay states.`
  }
];
