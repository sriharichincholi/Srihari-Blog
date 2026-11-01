import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitMerge,
  GraduationCap,
  Sparkles,
  Calendar,
  MapPin,
  X
} from 'lucide-react';
import SkillsAdvancementTree from './Skills';

export interface SkillsSectionProps {
  onSelectProject?: (slug: string) => void;
  className?: string;
}

export type ModalType = 'skills' | 'education' | null;

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onSelectProject, className = '' }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [animatingCard, setAnimatingCard] = useState<ModalType>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setAnimatingCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardClick = (type: ModalType) => {
    setAnimatingCard(type);
    // Smooth 3D spin and zoom transition, then expand into fullscreen overlay
    setTimeout(() => {
      setActiveModal(type);
      setAnimatingCard(null);
    }, 450);
  };

  return (
    <div className={`relative w-full ${className}`}>

      {/* SECTION 02 ENTRY INTERFACE: Two Large Interactive Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

        {/* CARD 1: VIEW SKILLS TREE */}
        <motion.div
          animate={
            animatingCard === 'skills'
              ? { rotateY: 360, scale: 1.08, opacity: 0.9 }
              : { rotateY: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          onClick={() => handleCardClick('skills')}
          className="group relative cursor-pointer rounded-2xl border border-purple-500/30 bg-gradient-to-b from-[#13091f]/90 via-[#0a0512]/90 to-black/95 p-6 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-1"
        >
          {/* Subtle Cyber Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(168,85,247,0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Top Status */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-purple-950/70 border border-purple-500/40 text-purple-300">
              <Sparkles size={12} className="text-purple-400" />
              <span>ACTIVE_MATRIX</span>
            </span>
            <span className="text-[11px] font-mono text-gray-500">v2.4 // TELEMETRY</span>
          </div>

          {/* Central Glowing Diamond Icon on Hover */}
          <div className="flex justify-center my-6 py-2">
            <div className="relative">
              {/* Outer Glowing Diamond */}
              <div className="w-20 h-20 rotate-45 rounded-lg border-2 border-purple-500/40 bg-purple-950/40 flex items-center justify-center transition-all duration-300 group-hover:border-purple-400 group-hover:bg-purple-900/60 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] group-hover:scale-110">
                {/* Inner Counter-Rotated Core */}
                <div className="-rotate-45 flex items-center justify-center">
                  <GitMerge size={32} className="text-purple-300 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
            </div>
          </div>

          {/* Card Meta Content */}
          <div className="text-center mt-4">
            <h3 className="text-xl sm:text-2xl font-black font-mono text-white mb-2 tracking-tight group-hover:text-purple-200 transition-colors">
              VIEW SKILLS TREE
            </h3>
            <p className="font-tiny5 text-lg text-purple-300/90 leading-relaxed max-w-sm mx-auto">
              Open the interactive WWM Advancement Tree. Explore foundational syntaxes, side quests, and production engines.
            </p>
          </div>

          {/* Bottom Action Trigger */}
          <div className="mt-6 pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs font-mono text-purple-300 group-hover:text-purple-200">
            <span>ENTER FULLSCREEN TREE</span>
            <span className="font-bold tracking-wider group-hover:translate-x-1 transition-transform">
              LAUNCH [ SPACE / CLICK ] →
            </span>
          </div>
        </motion.div>

        {/* CARD 2: VIEW EDUCATION PATH */}
        <motion.div
          animate={
            animatingCard === 'education'
              ? { rotateY: 360, scale: 1.08, opacity: 0.9 }
              : { rotateY: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          onClick={() => handleCardClick('education')}
          className="group relative cursor-pointer rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1c1507]/90 via-[#0e0a03]/90 to-black/95 p-6 sm:p-8 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-1"
        >
          {/* Subtle Cyber Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(245,158,11,0.3) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Top Status */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-amber-950/70 border border-amber-500/40 text-amber-300">
              <Sparkles size={12} className="text-amber-400" />
              <span>ACADEMIC_TRAJECTORY</span>
            </span>
            <span className="text-[11px] font-mono text-gray-500">B.TECH // CS</span>
          </div>

          {/* Central Glowing Diamond Icon on Hover */}
          <div className="flex justify-center my-6 py-2">
            <div className="relative">
              {/* Outer Glowing Diamond */}
              <div className="w-20 h-20 rotate-45 rounded-lg border-2 border-amber-500/40 bg-amber-950/40 flex items-center justify-center transition-all duration-300 group-hover:border-amber-400 group-hover:bg-amber-900/60 group-hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] group-hover:scale-110">
                {/* Inner Counter-Rotated Core */}
                <div className="-rotate-45 flex items-center justify-center">
                  <GraduationCap size={32} className="text-amber-300 transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
            </div>
          </div>

          {/* Card Meta Content */}
          <div className="text-center mt-4">
            <h3 className="text-xl sm:text-2xl font-black font-mono text-white mb-2 tracking-tight group-hover:text-amber-200 transition-colors">
              VIEW EDUCATION PATH
            </h3>
            <p className="font-tiny5 text-lg text-amber-300/90 leading-relaxed max-w-sm mx-auto">
              Inspect formal degree milestones, algorithms, systems engineering courseworks, and academic roots.
            </p>
          </div>

          {/* Bottom Action Trigger */}
          <div className="mt-6 pt-4 border-t border-amber-900/40 flex items-center justify-between text-xs font-mono text-amber-300 group-hover:text-amber-200">
            <span>EXPAND ACADEMIC DOSSIER</span>
            <span className="font-bold tracking-wider group-hover:translate-x-1 transition-transform">
              EXPLORE MILESTONES →
            </span>
          </div>
        </motion.div>

      </div>

      {/* FULLSCREEN EXPANSIVE INTERACTIVE OVERLAY MODAL VIA PORTAL TO BODY */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col overflow-hidden"
            >
              {activeModal === 'skills' ? (
                <SkillsAdvancementTree
                  onSelectProject={onSelectProject}
                  onClose={() => setActiveModal(null)}
                />
              ) : (
                <EducationTrajectoryModal onClose={() => setActiveModal(null)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

// Education Path Modal Component
interface EducationTrajectoryModalProps {
  onClose: () => void;
}

const EducationTrajectoryModal: React.FC<EducationTrajectoryModalProps> = ({ onClose }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 select-none overflow-y-auto">
      {/* Background Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg border border-amber-500/40 bg-amber-950/20">
            <GraduationCap size={20} className="text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-gray-400 font-bold uppercase tracking-widest">
              ACADEMIC DOSSIER // MILESTONES
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-black text-amber-300">
              FORMAL EDUCATION & SYSTEMS FOUNDATION
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg border border-gray-800 bg-black/60 text-gray-400 hover:text-white hover:border-gray-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>

      {/* Trajectory Timeline Cards (Reverse-Chronological Order) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto py-8 space-y-6">

        {/* Milestone 1: CBIT, Hyderabad */}
        <div className="rounded-xl border border-amber-500/40 bg-black/75 p-6 backdrop-blur shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-4">
            <span className="px-3 py-1 rounded bg-amber-950/60 border border-amber-500/40 font-mono text-xs text-amber-300 font-bold">
              UNDERGRADUATE DEGREE // B.E. IN IT
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Calendar size={13} className="text-amber-400" />
                2026 — Present
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-amber-400" />
                Hyderabad, India
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold font-mono text-white mb-2">
            CBIT, Hyderabad
          </h3>
          <div className="text-sm font-mono text-amber-400/90 mb-3 font-semibold">
            B.E. in Information Technology
          </div>
          <p className="font-tiny5 text-lg text-emerald-300 mb-4 leading-relaxed">
            Undergraduate engineering degree in Information Technology, focusing on low-latency systems, software architecture, data structures, and computer science fundamentals.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Software Architecture', 'Low-Latency Systems', 'Data Structures & Algorithms', 'Operating Systems', 'Database Systems', 'Computer Networks'].map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded border border-gray-800 bg-gray-900/90 text-xs font-mono text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Milestone 2: Resonance Eduventures */}
        <div className="rounded-xl border border-gray-800 bg-black/70 p-6 backdrop-blur hover:border-amber-500/30 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-4">
            <span className="px-3 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 font-mono text-xs text-cyan-300 font-bold">
              SENIOR SECONDARY // STEM / PCM
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Calendar size={13} className="text-cyan-400" />
                2024 — 2026
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold font-mono text-gray-100 mb-2">
            Resonance Eduventures
          </h3>
          <div className="text-sm font-mono text-cyan-400/90 mb-3 font-semibold">
            Senior Secondary (STEM / PCM)
          </div>
          <p className="font-tiny5 text-base text-gray-300 leading-relaxed mb-4">
            Advanced mathematics, analytical calculus, linear algebra foundations, physics, chemistry, and competitive exam preparation (JEE Main / EAPCET).
          </p>
          <div className="flex flex-wrap gap-2">
            {['Analytical Calculus', 'Linear Algebra Foundations', 'Physics & Chemistry', 'Competitive Problem Solving (JEE/EAPCET)'].map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded border border-gray-800 bg-gray-900/70 text-xs font-mono text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Milestone 3: DAV Public School */}
        <div className="rounded-xl border border-gray-800 bg-black/70 p-6 backdrop-blur hover:border-purple-500/30 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-3 mb-4">
            <span className="px-3 py-1 rounded bg-purple-950/60 border border-purple-500/40 font-mono text-xs text-purple-300 font-bold">
              PRIMARY & SECONDARY SCHOOLING
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Calendar size={13} className="text-purple-400" />
                2012 — 2024
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold font-mono text-gray-100 mb-2">
            DAV Public School
          </h3>
          <div className="text-sm font-mono text-purple-400/90 mb-3 font-semibold">
            Primary & Secondary Schooling
          </div>
          <p className="font-tiny5 text-base text-gray-300 leading-relaxed mb-4">
            Foundational academic years, school-to-district level STEM Olympiad achievements, and early computer science exposure.
          </p>
          <div className="flex flex-wrap gap-2">
            {['STEM Olympiads', 'Foundational Mathematics', 'Early Computer Science Exposure'].map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded border border-gray-800 bg-gray-900/70 text-xs font-mono text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="relative z-10 w-full pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-400">
        <span>PRESS ESC OR CLICK CLOSE TO RETURN</span>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800 cursor-pointer"
        >
          BACK TO DASHBOARD
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
