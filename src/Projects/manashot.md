---
id: "manashot-io"
title: "Manashot.io"
category: "Systems & Game Development"
date: "September 2026"
description: "Manashot.io is a high-performance 3D multiplayer browser FPS. Built with Three.js, Node.js, and WebSockets, it combines low-latency spatial synchronization and raycast weapon physics with milestone-based boss encounters and dynamic aerial mob battles."
tags: ["Three.js", "Node.js", "WebSockets", "GameDev", "WebGL"]
repoUrl: "https://github.com/sriharichincholi/manashot-io"
demoUrl: "https://manashot-io.vercel.app"
previews: ["images/projects/ManaShotPreview1.png", "images/projects/ManashotPreview2.png"]
---

# Manashot.io — 3D Browser FPS & Multiplayer Networking

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

### 3. Boss Encounters & Dynamic Aerial Mob Battles (Work In Progress)
- **Milestone Boss Spawns:** Event-driven server triggers spawn high-HP boss targets with custom AI attack patterns.
- **Aerial Mob Wave AI:** Dynamic pathfinding for flying enemy units using vector steering behaviors.

### 4. Progression & Arena Physics
- **Stat-Buff System:** Dynamic player power-ups including movement speed boosts, fire-rate multipliers, and health regeneration.
- **Custom Movement Engine:** Friction vectors, bunny-hopping momentum, and vertical velocity handling built without heavy external physics engines.
