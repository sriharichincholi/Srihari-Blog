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
  X,
  Zap
} from 'lucide-react';

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

export const MINOR_SUB_SKILLS = [
  { name: 'Git Pipelines', icon: GitBranch, detail: 'Version control & branch staging' },
  { name: 'WebGL Shaders', icon: Layers, detail: 'Fragment & vertex manipulation' },
  { name: 'WebSockets', icon: Radio, detail: 'Real-time binary telemetry packets' },
  { name: 'Game Loops', icon: Cpu, detail: 'Fixed-timestep tick simulation' },
  { name: 'Low-Poly 3D', icon: Boxes, detail: 'Optimized vertex topology' },
  { name: 'Audio Synthesis', icon: Flame, detail: 'MIDI compositions & Web Audio API' },
];

export interface SkillsAdvancementTreeProps {
  onSelectProject?: (url: string) => void;
  onClose?: () => void;
}

export const SkillsAdvancementTree: React.FC<SkillsAdvancementTreeProps> = ({
  onSelectProject,
  onClose,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('0');
  const [theme, setTheme] = useState<SkillTheme>('neon-purple');
  const [hoveredSubSkill, setHoveredSubSkill] = useState<string | null>(null);

  const selectedIndex = SKILL_NODES.findIndex(n => n.id === selectedNodeId);
  const selectedNode = SKILL_NODES[selectedIndex >= 0 ? selectedIndex : 0];

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % SKILL_NODES.length;
    setSelectedNodeId(SKILL_NODES[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + SKILL_NODES.length) % SKILL_NODES.length;
    setSelectedNodeId(SKILL_NODES[prevIdx].id);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'neon-purple' ? 'wwm-gold' : 'neon-purple');
  };

  const isPurple = theme === 'neon-purple';

  // Distinct Theme Aesthetics
  const themeStyles = isPurple
    ? {
        accent: 'text-purple-400',
        accentBg: 'bg-purple-500/10',
        accentBorder: 'border-purple-500/40',
        glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        activeDiamondBorder: 'border-purple-400',
        activeDiamondBg: 'bg-purple-950/80',
        lineStroke: '#A855F7',
        badgeBg: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
        themeLabel: 'NIGHTLIGHT PURPLE',
        themeColor: '#A855F7',
        titleGradient: 'from-purple-400 via-fuchsia-300 to-indigo-300',
      }
    : {
        accent: 'text-amber-400',
        accentBg: 'bg-amber-500/10',
        accentBorder: 'border-amber-500/40',
        glow: 'shadow-[0_0_20px_rgba(250,204,21,0.4)]',
        activeDiamondBorder: 'border-yellow-400',
        activeDiamondBg: 'bg-yellow-950/80',
        lineStroke: '#FACC15',
        badgeBg: 'bg-yellow-950/60 border-yellow-500/40 text-yellow-300',
        themeLabel: 'SUNSHINE GOLD',
        themeColor: '#FACC15',
        titleGradient: 'from-yellow-400 via-amber-300 to-orange-400',
      };

  const handleProjectClick = (url: string) => {
    if (onSelectProject) {
      onSelectProject(url);
    } else {
      window.location.hash = url;
    }
  };

  // Node helper
  const getNode = (id: string) => SKILL_NODES.find(n => n.id === id)!;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none overflow-y-auto">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${themeStyles.themeColor} 1px, transparent 0)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg border ${themeStyles.accentBorder} ${themeStyles.accentBg}`}>
            <Terminal size={18} className={themeStyles.accent} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-400 font-bold tracking-widest uppercase">
                ADVANCEMENT TREE // MATRIX_VIEW
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-700 bg-gray-900 text-gray-300 font-mono">
                NON-LOOPING ENGAGED
              </span>
            </div>
            <h2 className={`font-mono text-lg sm:text-xl font-black tracking-tight bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>
              SKILLS & SIDE-QUEST TOPOLOGY
            </h2>
          </div>
        </div>

        {/* Right side controls: Theme Toggle + Exit */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold cursor-pointer transition-all duration-300 ${
              isPurple
                ? 'border-purple-500/50 bg-purple-950/40 text-purple-200 hover:border-purple-400 hover:bg-purple-900/50'
                : 'border-yellow-500/50 bg-yellow-950/40 text-yellow-200 hover:border-yellow-400 hover:bg-yellow-900/50'
            }`}
            title="Switch aesthetic theme"
          >
            <Palette size={14} className={themeStyles.accent} />
            <span>THEME: {themeStyles.themeLabel}</span>
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: themeStyles.themeColor, boxShadow: `0 0 8px ${themeStyles.themeColor}` }}
            />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-800 bg-black/60 text-gray-400 hover:text-white hover:border-gray-600 transition-colors cursor-pointer"
              aria-label="Close overlay"
              title="Close Fullscreen (Esc)"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Center Interactive Tree Area: Horizontal Scrollable Canvas */}
      <div className="relative z-10 w-full my-auto py-6 overflow-x-auto flex flex-col items-center">
        
        {/* Exact Layout matching image.png */}
        <div className="min-w-[880px] max-w-5xl mx-auto flex items-start justify-center gap-8 px-4">
          
          {/* ROOT NODE: Pill shaped "Rookie Programmer" */}
          <div className="flex flex-col items-center pt-8">
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedNodeId('0')}
              className={`px-5 py-4 rounded-3xl border-2 transition-all cursor-pointer font-mono font-bold text-sm tracking-wide text-center min-w-[130px] ${
                selectedNodeId === '0'
                  ? `${themeStyles.activeDiamondBorder} ${themeStyles.activeDiamondBg} ${themeStyles.glow} text-white`
                  : 'border-gray-700 bg-black/60 text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
            >
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">[ ROOT ]</div>
              Rookie<br />Programmer
            </motion.button>
          </div>

          {/* Horizontal Arrow to Node 1 */}
          <div className="flex items-center pt-14 text-gray-500">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M 0 12 L 28 12 M 22 6 L 28 12 L 22 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* COLUMN 1: Node 1 -> Arrow Down -> SQ 1 -> Arrow Down -> SQ 1.5 */}
          <div className="flex flex-col items-center w-[210px]">
            {/* Node 1 Diamond */}
            <DiamondNodeView
              node={getNode('1')}
              isSelected={selectedNodeId === '1'}
              onSelect={() => setSelectedNodeId('1')}
              themeStyles={themeStyles}
              badge="NODE 1"
            />

            {/* Vertical Arrow Down to SQ 1 */}
            <div className="py-2 text-gray-500">
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M 12 0 L 12 24 M 6 18 L 12 24 L 18 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* SQ 1 Diamond: NAPIER ENGINE v1 */}
            <DiamondNodeView
              node={getNode('sq-1')}
              isSelected={selectedNodeId === 'sq-1'}
              onSelect={() => setSelectedNodeId('sq-1')}
              themeStyles={themeStyles}
              badge="SQ 1"
            />

            {/* Vertical Arrow Down to SQ 1.5 */}
            <div className="py-2 text-gray-500">
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M 12 0 L 12 24 M 6 18 L 12 24 L 18 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* SQ 1.5 Hexagon: Napier Engine v2 */}
            <HexagonNodeView
              node={getNode('sq-1.5')}
              isSelected={selectedNodeId === 'sq-1.5'}
              onSelect={() => setSelectedNodeId('sq-1.5')}
              badge="SQ 1.5"
            />
          </div>

          {/* Horizontal Arrow from Node 1 to Node 2 */}
          <div className="flex items-center pt-14 text-gray-500">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M 0 12 L 28 12 M 22 6 L 28 12 L 22 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* COLUMN 2: Node 2 -> Arrow Down -> SQ 2 */}
          <div className="flex flex-col items-center w-[190px]">
            {/* Node 2 Diamond: Game Architecture */}
            <DiamondNodeView
              node={getNode('2')}
              isSelected={selectedNodeId === '2'}
              onSelect={() => setSelectedNodeId('2')}
              themeStyles={themeStyles}
              badge="NODE 2"
            />

            {/* Vertical Arrow Down to SQ 2 */}
            <div className="py-2 text-gray-500">
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M 12 0 L 12 24 M 6 18 L 12 24 L 18 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* SQ 2 Diamond: MANASHOT-io */}
            <DiamondNodeView
              node={getNode('sq-2')}
              isSelected={selectedNodeId === 'sq-2'}
              onSelect={() => setSelectedNodeId('sq-2')}
              themeStyles={themeStyles}
              badge="SQ 2"
            />
          </div>

          {/* Horizontal Arrow from Node 2 to Node 3 */}
          <div className="flex items-center pt-14 text-gray-500">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M 0 12 L 28 12 M 22 6 L 28 12 L 22 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* COLUMN 3: Node 3 -> Arrow Down -> SQ 3 */}
          <div className="flex flex-col items-center w-[190px]">
            {/* Node 3 Diamond: 3d Shaders, Web gamedev */}
            <DiamondNodeView
              node={getNode('3')}
              isSelected={selectedNodeId === '3'}
              onSelect={() => setSelectedNodeId('3')}
              themeStyles={themeStyles}
              badge="NODE 3"
            />

            {/* Vertical Arrow Down to SQ 3 */}
            <div className="py-2 text-gray-500">
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                <path d="M 12 0 L 12 24 M 6 18 L 12 24 L 18 18" stroke={themeStyles.lineStroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* SQ 3 Diamond: Unbound: The Isle of Veyra */}
            <DiamondNodeView
              node={getNode('sq-3')}
              isSelected={selectedNodeId === 'sq-3'}
              onSelect={() => setSelectedNodeId('sq-3')}
              themeStyles={themeStyles}
              badge="SQ 3"
            />
          </div>

        </div>

      </div>

      {/* Selected Node Details Popup Modal/Drawer inside Fullscreen */}
      <div className="relative z-20 w-full max-w-4xl mx-auto my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`rounded-xl border p-4 sm:p-5 backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
              selectedNode.hasBlueGlow
                ? 'border-cyan-500/60 bg-[#06121a]/95 shadow-[0_0_24px_rgba(6,182,212,0.3)]'
                : `${themeStyles.accentBorder} bg-black/80 ${themeStyles.glow}`
            }`}
          >
            {/* Card Header Tag & Category */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800/80 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-gray-900 border border-gray-800 text-gray-300">
                  {selectedNode.id.startsWith('sq') ? selectedNode.id.toUpperCase() : `NODE_${selectedNode.id}`}
                </span>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                  {selectedNode.category}
                </span>
              </div>

              {selectedNode.hasBlueGlow && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                  <Sparkles size={12} className="text-cyan-400 animate-none" />
                  <span>PRODUCTION SHIP</span>
                </span>
              )}
            </div>

            {/* Node Title */}
            <h3 className="text-base sm:text-lg font-bold font-mono text-gray-100 mb-2 tracking-tight">
              {selectedNode.label}
            </h3>

            {/* Active Description in Tiny5 Font */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-gray-800/80 mb-3">
              <p className="font-tiny5 text-lg sm:text-xl text-emerald-300 leading-snug tracking-wide">
                {selectedNode.description}
              </p>
            </div>

            {/* Node 1 Highlighted Skills in Golden Yellow */}
            {selectedNode.highlightedSkills && (
              <div className="mb-3">
                <div className="text-xs font-mono text-amber-300/90 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Highlighted Syntaxes & Tooling:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.highlightedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wide border border-amber-400/60 bg-amber-950/50 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] hover:shadow-[0_0_16px_rgba(251,191,36,0.8)] hover:border-amber-300 hover:text-amber-200 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SQ 1.5 Patch Notes */}
            {selectedNode.patchNotes && (
              <div className="mb-3">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap size={13} className="text-cyan-400" />
                  <span>Napier v2 Engine Patch Notes:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedNode.patchNotes.map((note, idx) => (
                    <div key={idx} className="p-2 rounded bg-black/50 border border-cyan-900/60 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                      <span className="font-tiny5 text-base text-cyan-100">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Link with Vibrant Blue Glow */}
            {selectedNode.projectLink && (
              <div className="pt-2 flex items-center justify-between border-t border-gray-800/80">
                <button
                  onClick={() => handleProjectClick(selectedNode.projectLink!.url)}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all duration-300 border border-cyan-400 bg-cyan-950/90 text-cyan-200 shadow-[0_0_18px_rgba(6,182,212,0.6)] hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_26px_rgba(6,182,212,0.95)]"
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

      {/* Bottom Control Bar */}
      <div className="relative z-20 w-full pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Navigation Arrow: Previous (<-) */}
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-gray-950/80 text-gray-300 hover:text-white hover:border-gray-500 font-mono text-xs transition-colors cursor-pointer shrink-0"
          aria-label="Previous Diamond"
        >
          <ChevronLeft size={16} />
          <span>PREV NODE</span>
        </button>

        {/* Middle: Small circular secondary icons showing minor sub-skills */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
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
                      : 'border-gray-800 bg-black/60 text-gray-400 hover:text-gray-200 hover:border-gray-600'
                  }`}
                  title={`${sub.name}: ${sub.detail}`}
                >
                  <Icon size={14} />
                </div>

                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-black/95 border border-gray-700 text-[11px] font-mono text-gray-200 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                    <span className="font-bold text-emerald-400">{sub.name}</span>: {sub.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrow: Next (->) */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-800 bg-gray-950/80 text-gray-300 hover:text-white hover:border-gray-500 font-mono text-xs transition-colors cursor-pointer shrink-0"
          aria-label="Next Diamond"
        >
          <span>NEXT NODE</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Diamond Node View Component
interface DiamondNodeViewProps {
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
  badge: string;
}

const DiamondNodeView: React.FC<DiamondNodeViewProps> = ({
  node,
  isSelected,
  onSelect,
  themeStyles,
  badge,
}) => {
  const isBlueProject = node.hasBlueGlow;

  return (
    <button
      onClick={onSelect}
      className="group flex flex-col items-center cursor-pointer transition-all focus:outline-none w-full max-w-[170px]"
    >
      <div className="relative p-2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`w-12 h-12 rotate-45 rounded-sm transition-all duration-200 flex items-center justify-center border-2 ${
            isSelected
              ? isBlueProject
                ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_20px_rgba(6,182,212,0.85)] scale-110'
                : `${themeStyles.activeDiamondBorder} ${themeStyles.activeDiamondBg} ${themeStyles.glow} scale-110`
              : isBlueProject
                ? 'border-cyan-500/70 bg-[#06151f] hover:border-cyan-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.55)]'
                : 'border-gray-700 bg-black/70 hover:border-gray-400'
          }`}
        >
          {/* Inner Counter-Rotated Core */}
          <div className="-rotate-45 flex items-center justify-center">
            <span
              className={`text-[10px] font-mono font-bold ${
                isSelected
                  ? isBlueProject ? 'text-cyan-200' : 'text-white'
                  : isBlueProject ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-200'
              }`}
            >
              {badge}
            </span>
          </div>
        </motion.div>
      </div>

      <span
        className={`mt-1 text-center font-mono text-[11px] leading-tight transition-colors line-clamp-2 px-1 ${
          isSelected
            ? isBlueProject ? 'text-cyan-300 font-bold' : `${themeStyles.accent} font-bold`
            : 'text-gray-400 group-hover:text-gray-200'
        }`}
      >
        {node.label}
      </span>
    </button>
  );
};

// Hexagon Node View for SQ 1.5 (Napier Engine v2)
interface HexagonNodeViewProps {
  node: SkillNode;
  isSelected: boolean;
  onSelect: () => void;
  badge: string;
}

const HexagonNodeView: React.FC<HexagonNodeViewProps> = ({
  node,
  isSelected,
  onSelect,
  badge,
}) => {
  return (
    <button
      onClick={onSelect}
      className="group flex flex-col items-center cursor-pointer transition-all focus:outline-none w-full max-w-[170px]"
    >
      <div className="relative p-2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
          }}
          className={`w-16 h-12 transition-all duration-200 flex flex-col items-center justify-center border-2 ${
            isSelected
              ? 'border-cyan-400 bg-cyan-950/90 shadow-[0_0_22px_rgba(6,182,212,0.9)] scale-110'
              : 'border-cyan-500/70 bg-[#06151f] hover:border-cyan-300 hover:shadow-[0_0_14px_rgba(6,182,212,0.6)]'
          }`}
        >
          <span className="text-[10px] font-mono font-bold text-cyan-300">
            {badge}
          </span>
          <span className="text-[9px] font-mono text-cyan-400">
            HEXAGON
          </span>
        </motion.div>
      </div>

      <span
        className={`mt-1 text-center font-mono text-[11px] leading-tight transition-colors line-clamp-2 px-1 ${
          isSelected ? 'text-cyan-300 font-bold' : 'text-cyan-400/80 group-hover:text-cyan-200'
        }`}
      >
        {node.label}
      </span>
    </button>
  );
};

export { SkillsSection } from './SkillsSection';
export default SkillsAdvancementTree;
