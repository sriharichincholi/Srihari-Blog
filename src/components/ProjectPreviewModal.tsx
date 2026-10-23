import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  initialIndex?: number;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  images,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images]);

  const handleNext = useCallback(() => {
    if (!images || images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-5xl w-full bg-[#0a0d0a] border border-emerald-500/40 rounded-xl overflow-hidden shadow-2xl shadow-emerald-950/80 flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-500/20 bg-emerald-950/30 font-mono text-xs text-emerald-400">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-emerald-400 animate-pulse" />
              <span className="font-semibold tracking-wider uppercase">[ Preview ] {title}</span>
            </div>

            <div className="flex items-center gap-4">
              {images.length > 1 && (
                <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-500/30 text-emerald-300">
                  [ {currentIndex + 1} / {images.length} ]
                </span>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                aria-label="Close Preview"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Image Viewport */}
          <div className="relative flex items-center justify-center min-h-[300px] max-h-[75vh] bg-black/60 p-2 overflow-hidden select-none group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${title} preview ${currentIndex + 1}`}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded border border-emerald-500/10 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {/* Navigation Overlay Controls for Multi-Image */}
            {images.length > 1 && (
              <>
                {/* Left Side Zone & Arrow Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all shadow-lg cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Right Side Zone & Arrow Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all shadow-lg cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Bottom Thumbnail Dots / Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-emerald-500/30 backdrop-blur-sm">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === currentIndex
                          ? 'bg-emerald-400 w-6'
                          : 'bg-emerald-900 hover:bg-emerald-600'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-[#050705] border-t border-emerald-500/20 font-mono text-[11px] text-gray-400">
            <span>Use Left/Right Arrow keys to navigate • Esc to close</span>
            <span className="text-emerald-500/80">Terminal dark theme active</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
