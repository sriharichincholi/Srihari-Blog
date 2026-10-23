---
id: "napier-ai"
title: "NAPIER AI — National Airfare Price Index Engine"
category: "AI / Quantitative Systems"
date: "September 2026"
description: "NAPIER AI is a quantitative airfare price index and forecasting engine. Powered by Python AI/ML models and a Next.js / TypeScript frontend, it tracks real-time fare dynamics across 440+ flight sectors, delivering 95% confidence-bounded predictions, Jevons index metrics, and automated booking advisories."
tags: ["Next.js", "TypeScript", "Python", "AI/ML", "SIH 2026"]
repoUrl: "https://github.com/sriharichincholi/NAPIER"
demoUrl: "https://napier-frontend.vercel.app/"
previews: ["images/projects/NapierPreview1.png", "images/projects/NapierPreview2.png", "images/projects/NapierPreview3.png"]
---

# NAPIER AI — National Airfare Price Index Engine

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
- Persistent interactive side-drawer assistant capable of answering user queries about live sector feeds, festival surge predictions, ticket availability, and historical index trends in natural language.
