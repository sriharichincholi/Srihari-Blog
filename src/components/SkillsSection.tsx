import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Layers,
  Cpu,
  Flame,
  Radio,
  Boxes,
  Sparkles,
  Palette,
  Terminal,
  Compass
} from 'lucide-react';

export type SkillTheme = 'neon-purple' | 'wwm-gold';

export interface SkillNode {
  id: number;
  label: string;
  category: string;
  description: string;
  patchNotes?: string[];
  highlightedSkills?: string[];
  projectLink?: {
    url: string;
    label: string;
  };
  hasBlueGlow?: boolean;
}

export const SKILL_NODES: SkillNode[] = [
  {
    id: 0,
    label: 'Rookie Programmer',
    category: 'ROOT GENESIS',
    description: 'Initial commit. The genesis of computer science, curiosity, and terminal experiments.',
  },
  {
    id: 1,
    label: 'Basic C Lang, Python, HTML CSS, Elementary Node.js and Three.js',
    category: 'FOUNDATION PHASE',
    description: 'Learnt Different types of Coding Syntaxes, Experimented and Played Around with different types of loops and sorts.',
    highlightedSkills: ['C', 'Python', 'HTML', 'CSS', 'Node.js', 'Three.js'],
  },
  {
    id: 2,
    label: 'NAPIER ENGINE v1',
    category: 'AI / QUANT PROTO',
    description: 'First Prototype of Napier Engine',
    hasBlueGlow: false,
  },
  {
    id: 3,
    label: 'Napier Engine v2',
    category: 'AI / FLIGHT CORRIDOR',
    description: 'National Airfare Price Index & Surge Telemetry Engine',
    patchNotes: [
      'Added 440+ Airway Routes',
      'Enhanced Ai Chatbot',
      'Added Price Surge Prediction System'
    ],
    projectLink: {
      url: '/blog/napier',
      label: 'Open Napier Project Telemetry'
    },
    hasBlueGlow: true,
  },
  {
    id: 4,
    label: 'Game Architecture',
    category: 'SYSTEM DESIGN',
    description: 'Stepping into core game systems. Designing structured real-time game loops, socket pipelines, and state synchronization.',
  },
  {
    id: 5,
    label: 'MANASHOT-io',
    category: 'MULTIPLAYER 3D FPS',
    description: 'High-performance 3D multiplayer browser FPS built with Three.js, Node.js, and WebSockets.',
    projectLink: {
      url: '/blog/manashot',
      label: 'Open ManaShot Repository & Engine'
    },
    hasBlueGlow: true,
  },
  {
    id: 6,
    label: '3d Shaders, Web gamedev',
    category: 'GRAPHICS PIPELINE',
    description: 'Mastering retro WebGL shaders, low-poly environmental design, and spatial browser immersion.',
  },
  {
    id: 7,
    label: 'Unbound: The Isle of Veyra',
    category: 'RETRO 3D RPG',
    description: '3D low-poly story RPG prototype blending N64 visual styling, Elden Ring-inspired UI, and self-composed MIDI OSTs.',
    projectLink: {
      url: '/blog/unbound',
      label: 'Open Unbound Devlog & World'
    },
    hasBlueGlow: true,
  },
];

// Minor sub-skills displayed in bottom control bar
export const MINOR_SUB_SKILLS = [
  { name: 'Git Pipelines', icon: GitBranch, detail: 'Version control & branch staging' },
  { name: 'WebGL Shaders', icon: Layers, detail: 'Fragment & vertex manipulation' },
  { name: 'WebSockets', icon: Radio, detail: 'Real-time binary telemetry packets' },
  { name: 'Game Loops', icon: Cpu, detail: 'Fixed-timestep tick simulation' },
  { name: 'Low-Poly 3D', icon: Boxes, detail: 'Optimized vertex topology' },
  { name: 'Audio Synthesis', icon: Flame, detail: 'MIDI compositions & Web Audio API' },
];

export interface SkillsSectionProps {
  onSelectProject?: (slug: string) => void;
  className?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject, className = '' }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number>(0);
  const [theme, setTheme] = useState<SkillTheme>('neon-purple');
  const [hoveredSubSkill, setHoveredSubSkill] = useState<string | null>(null);

  const selectedNode = SKILL_NODES.find(n => n.id === selectedNodeId) || SKILL_NODES[0];

  const handleNext = () => {
    setSelectedNodeId((prev) => (prev + 1) % SKILL_NODES.length);
  };

  const handlePrev = () => {
    setSelectedNodeId((prev) => (prev - 1 + SKILL_NODES.length) % SKILL_NODES.length);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'neon-purple' ? 'wwm-gold' : 'neon-purple');
  };

  const isPurple = theme === 'neon-purple';

  // Theme-specific styling tokens
  const themeStyles = isPurple
    ? {
        accent: 'text-fuchsia-400',
        accentBg: 'bg-fuchsia-500/10',
        accentBorder: 'border-fuchsia-500/40',
        glow: 'shadow-[0_0_15px_rgba(217,70,239,0.35)]',
        activeDiamondBorder: 'border-fuchsia-400',
        activeDiamondBg: 'bg-fuchsia-950/80',
        lineStroke: 'rgba(217, 70, 239, 0.45)',
        badgeBg: 'bg-fuchsia-950/60 border-fuchsia-500/40 text-fuchsia-300',
        themeLabel: 'NEON PURPLE',
      }
    : {
        accent: 'text-amber-400',
        accentBg: 'bg-amber-500/10',
        accentBorder: 'border-amber-500/40',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.35)]',
        activeDiamondBorder: 'border-amber-400',
        activeDiamondBg: 'bg-amber-950/80',
        lineStroke: 'rgba(245, 158, 11, 0.45)',
        badgeBg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
        themeLabel: 'WWM GOLD',
      };

  const handleProjectClick = (url: string) => {
    if (onSelectProject) {
      onSelectProject(url);
    } else {
      // Internal navigation fallback
      window.location.hash = url;
    }
  };

  return (
    <div className={`relative w-full rounded-xl border border-gray-800 bg-[#070907]/90 p-4 sm:p-6 md:p-8 overflow-hidden backdrop-blur ${className}`}>
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Header Bar: Status & Aesthetic Theme Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800/80 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Terminal size={16} className={themeStyles.accent} />
          <span className="font-mono text-xs text-gray-300 font-semibold tracking-wider uppercase">
            ARCADE_SKILL_TREE // TELEMETRY MATRIX
          </span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs cursor-pointer transition-all duration-300 ${
            isPurple
              ? 'border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300 hover:border-fuchsia-400'
              : 'border-amber-500/40 bg-amber-950/30 text-amber-300 hover:border-amber-400'
          }`}
          title="Switch tree aesthetic theme"
        >
          <Palette size={13} className={themeStyles.accent} />
          <span>THEME: {themeStyles.themeLabel}</span>
          <span className="w-2 h-2 rounded-full animate-none" style={{ backgroundColor: isPurple ? '#d946ef' : '#f59e0b' }} />
        </button>
      </div>

      {/* Main Interactive Diagram Viewport */}
      <div className="relative z-10 w-full mb-6">

        {/* Responsive Skill Tree Flow */}
        <div className="relative w-full rounded-lg border border-gray-800/70 bg-black/40 p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[620px] max-w-4xl mx-auto flex flex-col items-center py-2">

            {/* LEVEL 0: ROOT NODE */}
            <div className="flex flex-col items-center">
              <DiamondCard
                node={SKILL_NODES[0]}
                isSelected={selectedNodeId === 0}
                onSelect={() => setSelectedNodeId(0)}
                themeStyles={themeStyles}
              />
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-[2px] h-8 bg-gradient-to-b from-gray-700 to-gray-500 my-1" />

            {/* LEVEL 1: FOUNDATION PHASE */}
            <div className="flex flex-col items-center w-full max-w-md">
              <DiamondCard
                node={SKILL_NODES[1]}
                isSelected={selectedNodeId === 1}
                onSelect={() => setSelectedNodeId(1)}
                themeStyles={themeStyles}
                customLabel="Node 1: Foundation Polymath"
              />
            </div>

            {/* SVG Branch Splitter to 3 Tracks */}
            <div className="w-full max-w-2xl h-10 relative my-1">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 40">
                {/* Center Drop to 3 Branch Destinations: x=100, x=300, x=500 */}
                <path
                  d="M 300 0 L 300 12 L 100 12 L 100 40"
                  fill="none"
                  stroke={themeStyles.lineStroke}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <path
                  d="M 300 0 L 300 40"
                  fill="none"
                  stroke={themeStyles.lineStroke}
                  strokeWidth="2"
                />
                <path
                  d="M 300 0 L 300 12 L 500 12 L 500 40"
                  fill="none"
                  stroke={themeStyles.lineStroke}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              </svg>
            </div>

            {/* LEVEL 2 & 3: 3 BRANCH TRACKS */}
            <div className="w-full max-w-3xl grid grid-cols-3 gap-4 sm:gap-6 pt-1">

              {/* TRACK A: QUANT / NAPIER */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  Track I: Quant & AI
                </span>

                {/* Node 2: Napier v1 */}
                <DiamondCard
                  node={SKILL_NODES[2]}
                  isSelected={selectedNodeId === 2}
                  onSelect={() => setSelectedNodeId(2)}
                  themeStyles={themeStyles}
                  compact
                />

                {/* Connecting Line */}
                <div className="w-[2px] h-6 bg-gradient-to-b from-gray-700 to-gray-500" />

                {/* Node 3: Napier v2 (Vibrant Blue Glow) */}
                <DiamondCard
                  node={SKILL_NODES[3]}
                  isSelected={selectedNodeId === 3}
                  onSelect={() => setSelectedNodeId(3)}
                  themeStyles={themeStyles}
                  compact
                />
              </div>

              {/* TRACK B: MULTIPLAYER GAME SYSTEMS */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  Track II: Game Engine
                </span>

                {/* Node 4: Game Architecture */}
                <DiamondCard
                  node={SKILL_NODES[4]}
                  isSelected={selectedNodeId === 4}
                  onSelect={() => setSelectedNodeId(4)}
                  themeStyles={themeStyles}
                  compact
                />

                {/* Connecting Line */}
                <div className="w-[2px] h-6 bg-gradient-to-b from-gray-700 to-gray-500" />

                {/* Node 5: MANASHOT-io (Vibrant Blue Glow) */}
                <DiamondCard
                  node={SKILL_NODES[5]}
                  isSelected={selectedNodeId === 5}
                  onSelect={() => setSelectedNodeId(5)}
                  themeStyles={themeStyles}
                  compact
                />
              </div>

              {/* TRACK C: 3D SHADERS & IMMERSION */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500">
                  Track III: 3D Shaders
                </span>

                {/* Node 6: 3d Shaders, Web gamedev */}
                <DiamondCard
                  node={SKILL_NODES[6]}
                  isSelected={selectedNodeId === 6}
                  onSelect={() => setSelectedNodeId(6)}
                  themeStyles={themeStyles}
                  compact
                />

                {/* Connecting Line */}
                <div className="w-[2px] h-6 bg-gradient-to-b from-gray-700 to-gray-500" />

                {/* Node 7: Unbound: The Isle of Veyra (Vibrant Blue Glow) */}
                <DiamondCard
                  node={SKILL_NODES[7]}
                  isSelected={selectedNodeId === 7}
                  onSelect={() => setSelectedNodeId(7)}
                  themeStyles={themeStyles}
                  compact
                />
              </div>

            </div>
          </div>
        </div>

        {/* Selected Diamond Detail Popup Card */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`rounded-xl border p-5 md:p-6 transition-colors duration-300 relative overflow-hidden ${
                selectedNode.hasBlueGlow
                  ? 'border-cyan-500/50 bg-[#061018]/90 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : `${themeStyles.accentBorder} bg-black/60 ${themeStyles.glow}`
              }`}
            >
              {/* Card Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-gray-900 border border-gray-800 text-gray-400">
                    NODE_0{selectedNode.id}
                  </span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    {selectedNode.category}
                  </span>
                </div>

                {/* Blue Glowing Project Indicator if active */}
                {selectedNode.hasBlueGlow && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    <Sparkles size={12} className="text-cyan-400 animate-none" />
                    <span>VERIFIED PRODUCTION SHIP</span>
                  </span>
                )}
              </div>

              {/* Node Title */}
              <h4 className="text-lg md:text-xl font-bold font-mono text-gray-100 mb-3 tracking-tight">
                {selectedNode.label}
              </h4>

              {/* Active Description in Google Font Tiny5 */}
              <div className="p-4 rounded-lg bg-black/50 border border-gray-800/80 mb-4">
                <p className="font-tiny5 text-lg md:text-xl text-emerald-300 leading-relaxed tracking-wide">
                  {selectedNode.description}
                </p>
              </div>

              {/* Node 1 Highlighted Skills in Golden Yellow */}
              {selectedNode.highlightedSkills && (
                <div className="mb-4">
                  <div className="text-xs font-mono text-amber-300/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>Syntaxes & Core Runtimes:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.highlightedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wide border border-amber-400/60 bg-amber-950/40 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.25)] hover:shadow-[0_0_14px_rgba(251,191,36,0.6)] hover:border-amber-300 hover:text-amber-200 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Node 3 Patch Notes */}
              {selectedNode.patchNotes && (
                <div className="mb-4">
                  <div className="text-xs font-mono text-cyan-300/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass size={13} className="text-cyan-400" />
                    <span>Engine Patch Notes:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-mono text-gray-300 pl-1">
                    {selectedNode.patchNotes.map((note, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                        <span className="font-tiny5 text-base text-gray-200">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vibrant Blue Glowing Project Icon & Direct Link */}
              {selectedNode.projectLink && (
                <div className="pt-2 flex items-center justify-between border-t border-gray-800/80">
                  <button
                    onClick={() => handleProjectClick(selectedNode.projectLink!.url)}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all duration-300 border border-cyan-400 bg-cyan-950/80 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.6)] hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_22px_rgba(6,182,212,0.9)]"
                  >
                    <ExternalLink size={14} className="text-cyan-300" />
                    <span>{selectedNode.projectLink.label}</span>
                    <span className="text-[10px] opacity-75 font-normal">[{selectedNode.projectLink.url}]</span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Bottom Control Bar */}
      <div className="relative z-10 w-full pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Navigation Arrow: Previous (<-) */}
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-800 bg-gray-950/60 text-gray-300 hover:text-white hover:border-gray-600 font-mono text-xs transition-colors cursor-pointer shrink-0"
          aria-label="Previous Diamond"
        >
          <ChevronLeft size={16} />
          <span>PREV</span>
        </button>

        {/* Middle: Circular Secondary Minor Sub-Skill Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {MINOR_SUB_SKILLS.map((sub) => {
            const Icon = sub.icon;
            const isHovered = hoveredSubSkill === sub.name;
            return (
              <div
                key={sub.name}
                className="relative group"
                onMouseEnter={() => setHoveredSubSkill(sub.name)}
                onMouseLeave={() => setHoveredSubSkill(null)}
              >
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-help ${
                    isHovered
                      ? `${themeStyles.accentBorder} ${themeStyles.accentBg} ${themeStyles.accent}`
                      : 'border-gray-800 bg-black/40 text-gray-400 hover:text-gray-200'
                  }`}
                  title={`${sub.name}: ${sub.detail}`}
                >
                  <Icon size={14} />
                </div>

                {/* Sub-skill Mini Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-black/95 border border-gray-800 text-[11px] font-mono text-gray-200 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                    <span className="font-semibold text-emerald-400">{sub.name}</span>: {sub.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrow: Next (->) */}
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-800 bg-gray-950/60 text-gray-300 hover:text-white hover:border-gray-600 font-mono text-xs transition-colors cursor-pointer shrink-0"
          aria-label="Next Diamond"
        >
          <span>NEXT</span>
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
};

// Diamond Node Card Component
interface DiamondCardProps {
  node: SkillNode;
  isSelected: boolean;
  onSelect: () => void;
  themeStyles: {
    accent: string;
    accentBg: string;
    accentBorder: string;
    glow: string;
    activeDiamondBorder: string;
    activeDiamondBg: string;
  };
  customLabel?: string;
  compact?: boolean;
}

const DiamondCard: React.FC<DiamondCardProps> = ({
  node,
  isSelected,
  onSelect,
  themeStyles,
  customLabel,
  compact = false,
}) => {
  const isBlueProject = node.hasBlueGlow;

  return (
    <button
      onClick={onSelect}
      className={`group flex flex-col items-center cursor-pointer transition-all focus:outline-none ${
        compact ? 'max-w-[140px]' : 'max-w-[180px]'
      }`}
    >
      {/* 45-degree Rotated Diamond Container */}
      <div className="relative p-2.5 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`w-9 h-9 sm:w-11 sm:h-11 rotate-45 rounded-sm transition-all duration-200 flex items-center justify-center border-2 ${
            isSelected
              ? isBlueProject
                ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_16px_rgba(6,182,212,0.8)] scale-110'
                : `${themeStyles.activeDiamondBorder} ${themeStyles.activeDiamondBg} ${themeStyles.glow} scale-110`
              : isBlueProject
                ? 'border-cyan-500/60 bg-[#06141d] hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                : 'border-gray-700 bg-black/60 hover:border-gray-400'
          }`}
        >
          {/* Inner Counter-Rotated Core */}
          <div className="-rotate-45 flex items-center justify-center">
            <span
              className={`text-[11px] sm:text-xs font-mono font-bold ${
                isSelected
                  ? isBlueProject ? 'text-cyan-200' : 'text-white'
                  : isBlueProject ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              {node.id}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Readable Node Label below Diamond */}
      <span
        className={`mt-1.5 text-center font-mono leading-tight transition-colors line-clamp-2 px-1 ${
          compact ? 'text-[11px]' : 'text-xs'
        } ${
          isSelected
            ? isBlueProject ? 'text-cyan-300 font-bold' : `${themeStyles.accent} font-bold`
            : 'text-gray-400 group-hover:text-gray-200'
        }`}
      >
        {customLabel || node.label}
      </span>
    </button>
  );
};
