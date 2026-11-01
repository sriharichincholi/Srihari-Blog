import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterOnScrollProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  delay?: number;
  as?: React.ElementType;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TypewriterOnScroll: React.FC<TypewriterOnScrollProps> = ({
  text,
  speed = 30,
  className = '',
  cursor = true,
  delay = 0,
  as: Component = 'span',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasStarted = useRef(false);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [displayedText, setDisplayedText] = useState(() =>
    reducedMotion ? text : ''
  );

  useEffect(() => {
    if (!isInView || reducedMotion || hasStarted.current) return;
    hasStarted.current = true;

    let interval: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      let currentIndex = 0;
      interval = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
        if (currentIndex >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [isInView, reducedMotion, text, speed, delay]);

  return (
    <Component ref={ref} className={className}>
      {displayedText}
      {cursor && !reducedMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block ml-0.5 text-emerald-400 font-bold"
        >
          _
        </motion.span>
      )}
    </Component>
  );
};
