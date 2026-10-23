---
title: "Unbound: Lessons & Obstacles from Building a 3D Low-Poly Web RPG"
date: "2026-10-23"
tags: ["GameDev", "Three.js", "Node.js", "Music", "Projects"]
readTime: "4 min read"
excerpt: "A deep dive into prototyping 'Unbound'—from tweaking low-poly retro shaders to composing original soundtracks on a MIDI keyboard."
---

# Unbound: Lessons & Obstacles from Building a 3D Low-Poly Web RPG

Every developer has that one project where they decide to push past standard web apps and step directly into game development. For me, that project was **Unbound**—a web-based, low-poly story RPG built on **Three.js**, **Node.js**, and a custom stack of WebGL tools.

My core objective was ambitious: bring atmospheric shaders, dynamic lighting, and AAA-style game feel into a lightweight, browser-based experience.

Here is the story of how *Unbound* came to be, the technical roadblocks I fought along the way, and why building it taught me more than any textbook ever could.

---

## 🎮 The Vision: An N64-Aesthetic Treasure Island

The gameplay and UI took heavy inspiration from *Elden Ring*—from sleek, minimalist action menus to atmospheric world exploration. However, instead of dark medieval castles and gothic ruins, *Unbound* is set on an uncharted Treasure Island.

*(Without giving away too many spoilers, the island hides an ancient, monumental structure at its core that completely flips the narrative as you explore.)*

```
┌──────────────────────────────────────────────────┐
│                  UNBOUND ENGINE                  │
├────────────────────────┬─────────────────────────┤
│     FRONTEND / 3D      │     BACKEND / AUDIO     │
├────────────────────────┼─────────────────────────┤
│ • Three.js (WebGL)     │ • Node.js Server        │
│ • Retro Shaders        │ • Procedural Audio Sync │
│ • Elden Ring-style UI  │ • Custom MIDI OSTs      │
└────────────────────────┴─────────────────────────┘
```

---

## 🛠️ The Obstacles: Shaders, Low-Poly Models & The N64 Vibe

Rendering a full world inside the browser comes with strict performance and aesthetic trade-offs.

### 1. The Shader & Pixelation Dilemma
When I first generated the environment—custom ocean shaders, mountain ranges, dense forests, and player sprites—everything felt slightly off. It looked jagged and harshly pixelated rather than intentionally styled. I wanted a soft, retro aesthetic reminiscent of classic **Nintendo 64** titles, not an unoptimized mess of raw polygons.

### 2. The 3D Modeling Bottleneck
To fix the visual style, I jumped down the 3D modeling rabbit hole:
* Opened up **Blockbench** to craft custom low-poly assets.
* Experimented with AI generation tools like **Meshi** alongside reference image pipelines to speed up asset creation.

It didn't take long to realize that learning asset modeling from scratch while simultaneously engineering game engine logic is a massive time sink. Balancing mesh topology, UV mapping, and web optimization was a steep learning curve, but it gave me a whole new level of respect for 3D technical artists.

---

## 🎹 Side-Quest: Composing Original Soundtracks

One of the highlights of developing *Unbound* was crafting the audio. I refused to use generic stock audio or AI-generated tracks, so I took on the music creation as a personal side-quest.

Using my MIDI keyboard and DAW setup, I composed original soundtracks (OSTs) specifically tailored to the island's atmosphere:
* **Exploration Themes:** Melodic key progressions matching the mystery of the terrain.
* **Combat & UI Cues:** Low-key, moody arrangements designed to mirror the tense *Elden Ring* feel.

Hooking up custom audio loops to trigger contextually inside the Three.js render loop made the entire world feel alive.

---

## 💡 What Unbound Taught Me

* **Scope Control:** Trying to learn 3D modeling, shader programming, game design, and music composition all at once is chaotic—but it's the fastest way to learn how game systems connect.
* **Web Performance Matters:** Pushing low-poly graphics inside browser-based WebGL requires aggressive asset optimization and clean code execution.
* **Tinkering > Theory:** You learn far more by trying to build something slightly out of your depth than by playing it safe.

*Unbound* remains one of my favorite experimental prototypes—a sandbox where game mechanics, math, systems engineering, and music all collided into one real-time browser experience.

---

— **Srihari**
