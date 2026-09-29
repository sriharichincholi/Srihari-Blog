import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterOnScrollProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
  delay?: number;
  as?: React.ElementType;
}

export const TypewriterOnScroll: React.FC<TypewriterOnScrollProps> = ({
  text,
  speed = 30,
  className = '',
  cursor = true,
  delay = 0,
  as: Component = 'span',
}) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const timer = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, speed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted, text, speed, delay]);

  return (
    <Component ref={ref} className={className}>
      {displayedText}
      {cursor && (
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
