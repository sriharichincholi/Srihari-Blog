import { GitBranch, Layers, Radio, Cpu, Boxes, Flame, type LucideIcon } from 'lucide-react';

export type SkillTheme = 'neon-purple' | 'wwm-gold';

export interface SkillNode {
  id: string; // '0', '1', '2', '3', 'sq-1', 'sq-1.5', 'sq-2', 'sq-3'
  indexNum: number;
  label: string;
  category: string;
  type: 'root' | 'diamond' | 'hexagon';
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
    id: '0',
    indexNum: 0,
    label: 'Rookie Programmer',
    category: 'ROOT GENESIS',
    type: 'root',
    description: 'Initial commit. The genesis of computer science, curiosity, and terminal experiments.',
  },
  {
    id: '1',
    indexNum: 1,
    label: 'Basic C Lang, Python, HTML CSS, Elementary Node.js and three.js',
    category: 'FOUNDATION PHASE',
    type: 'diamond',
    description: 'Learnt Different types of Coding Syntaxes, Experimented and Played Around with different types of loops and sorts.',
    highlightedSkills: ['C', 'Python', 'HTML', 'CSS', 'Node.js', 'Three.js'],
  },
  {
    id: 'sq-1',
    indexNum: 2,
    label: 'NAPIER ENGINE v1',
    category: 'SIDE QUEST 1',
    type: 'diamond',
    description: 'First Prototype of Napier Engine',
    hasBlueGlow: false,
  },
  {
    id: 'sq-1.5',
    indexNum: 3,
    label: 'Napier Engine v2',
    category: 'SIDE QUEST 1.5 // PRODUCTION FLIGHT ENGINE',
    type: 'hexagon',
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
    id: '2',
    indexNum: 4,
    label: 'game Architecture',
    category: 'CORE ADVANCEMENT',
    type: 'diamond',
    description: 'Stepping into core game systems. Designing structured real-time game loops, socket pipelines, and state synchronization.',
  },
  {
    id: 'sq-2',
    indexNum: 5,
    label: 'MANASHOT-io',
    category: 'SIDE QUEST 2 // 3D MULTIPLAYER ENGINE',
    type: 'diamond',
    description: 'High-performance 3D multiplayer browser FPS built with Three.js, Node.js, and WebSockets.',
    projectLink: {
      url: '/blog/manashot',
      label: 'Open ManaShot Repository & Engine'
    },
    hasBlueGlow: true,
  },
  {
    id: '3',
    indexNum: 6,
    label: '3d Shaders, Web gamedev',
    category: 'GRAPHICS ADVANCEMENT',
    type: 'diamond',
    description: 'Mastering retro WebGL shaders, low-poly environmental design, and spatial browser immersion.',
  },
  {
    id: 'sq-3',
    indexNum: 7,
    label: 'Unbound: The Isle of Veyra',
    category: 'SIDE QUEST 3 // RETRO 3D RPG',
    type: 'diamond',
    description: '3D low-poly story RPG prototype blending N64 visual styling, Elden Ring-inspired UI, and self-composed MIDI OSTs.',
    projectLink: {
      url: '/blog/unbound',
      label: 'Open Unbound Devlog & World'
    },
    hasBlueGlow: true,
  },
];

export interface MinorSubSkill {
  name: string;
  icon: LucideIcon;
  detail: string;
}

export const MINOR_SUB_SKILLS: MinorSubSkill[] = [
  { name: 'Git Pipelines', icon: GitBranch, detail: 'Version control & branch staging' },
  { name: 'WebGL Shaders', icon: Layers, detail: 'Fragment & vertex manipulation' },
  { name: 'WebSockets', icon: Radio, detail: 'Real-time binary telemetry packets' },
  { name: 'Game Loops', icon: Cpu, detail: 'Fixed-timestep tick simulation' },
  { name: 'Low-Poly 3D', icon: Boxes, detail: 'Optimized vertex topology' },
  { name: 'Audio Synthesis', icon: Flame, detail: 'MIDI compositions & Web Audio API' },
];
