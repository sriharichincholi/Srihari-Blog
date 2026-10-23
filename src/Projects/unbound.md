---
id: "unbound-veyra"
title: "Unbound: The Island of Veyra"
category: "Systems & Game Development"
date: "October 2026"
description: "Unbound is an experimental browser-based 3D low-poly RPG combining Three.js rendering, custom retro shaders, and a Node.js backend. It features an atmospheric island exploration title inspired by classic N64 titles and Elden Ring, complemented entirely by original MIDI-composed soundtracks."
tags: ["Three.js", "WebGL", "Node.js", "Retro Shaders", "Audio API"]
repoUrl: "https://github.com/sriharichincholi/Unbound"
demoUrl: "https://unbound-teal.vercel.app/"
previews: ["images/projects/Unbound-preview1.png", "images/projects/Unbound-preview2.jpg"]
---

# Unbound: The Island of Veyra

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



### 3. Original Composed Soundtracks (MIDI OSTs) **[Integration Pending]**
- **Custom Audio Integration:** Avoided generic stock loops by composing original soundtracks from scratch using a physical MIDI keyboard and DAW setup.
- **Contextual Audio Loops:** Integrated atmospheric exploration themes and tense combat cues directly into the Three.js render loop to dynamically react to gameplay states.
