import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Terminal, Code2, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ProjectItem } from '../projectsData';

interface ProjectDetailsDrawerProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPreview?: (project: ProjectItem) => void;
}

export const ProjectDetailsDrawer: React.FC<ProjectDetailsDrawerProps> = ({
  project,
  isOpen,
  onClose,
  onOpenPreview
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            className="w-screen max-w-2xl bg-[#0a0d0a] border-l border-emerald-500/30 text-gray-200 shadow-2xl flex flex-col justify-between"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-emerald-500/20 bg-emerald-950/30 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <Terminal size={16} />
                <span className="font-semibold uppercase tracking-wider">[ Specifications ]</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>{project.date}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                    [{project.category}]
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-sans text-gray-100 mb-3">
                  {project.title}
                </h2>
                <p className="text-sm font-sans text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags / Tech Stack */}
              <div>
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  Technologies & Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Previews Quick Trigger */}
              {project.previews && project.previews.length > 0 && onOpenPreview && (
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 rounded overflow-hidden border border-emerald-500/30 bg-black">
                      <img
                        src={project.previews[0]}
                        alt="Preview thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-mono text-xs">
                      <div className="text-gray-200 font-semibold">Screenshot Gallery</div>
                      <div className="text-gray-400">{project.previews.length} image(s) available</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenPreview(project);
                    }}
                    className="px-3 py-1.5 rounded-md text-xs font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
                  >
                    View Screenshots ↗
                  </button>
                </div>
              )}

              {/* Readme / Technical Specification Markdown */}
              <div className="prose prose-invert max-w-none text-sm leading-relaxed border-t border-emerald-500/20 pt-6">
                <ReactMarkdown>{project.readme}</ReactMarkdown>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="p-6 border-t border-emerald-500/20 bg-[#050705] flex flex-wrap items-center gap-3 justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <Code2 size={14} />
                  <span>GitHub Repository</span>
                  <ExternalLink size={12} />
                </a>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <Globe size={14} />
                  <span>Live Deployment</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
