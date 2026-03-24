// components/SectionTransition.jsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { scrollLock } from '../lib/scrollManager';

const SNAP_DURATION   = 0.5;
const PAUSE_DURATION  = 500;
const EXPAND_DURATION = 0.5;

export default function SectionTransition({
  children,
  bgColor    = '#F5C832',
  minScale   = 0.78,
  maxRadius  = 20,
  maxMargin  = 40,
}) {
  const sectionRef  = useRef(null);
  const isAnimating = useRef(false);
  const [isExiting, setIsExiting] = useState(false);

  const scale        = useMotionValue(1);
  const borderRadius = useMotionValue(0);
  const marginX      = useMotionValue(0);

  // Fix the error of animating window.scrollY directly since it's a read-only property
  // Instead, animate from current scroll position to target
  const shrinkOut = useCallback(() => {
    if (isAnimating.current || scrollLock.locked) return;
    isAnimating.current = true;
    scrollLock.lock();
    setIsExiting(true);

    // Shrink down
    animate(scale,        minScale,  { duration: SNAP_DURATION,   ease: [0.76, 0, 0.24, 1] });
    animate(borderRadius, maxRadius, { duration: SNAP_DURATION,   ease: [0.76, 0, 0.24, 1] });
    animate(marginX,      maxMargin, { duration: SNAP_DURATION,   ease: [0.76, 0, 0.24, 1] });

    setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;
      const targetY = section.offsetTop + section.offsetHeight;

      const startY = window.scrollY;
      animate(startY, targetY, {
        duration: EXPAND_DURATION,
        ease: [0.76, 0, 0.24, 1],
        onUpdate: (val) => window.scrollTo(0, val),
        onComplete: () => {
          scale.set(1);
          borderRadius.set(0);
          marginX.set(0);
          setIsExiting(false);
          isAnimating.current = false;
          scrollLock.unlock();
        },
      });
    }, PAUSE_DURATION);
  }, [borderRadius, marginX, maxMargin, maxRadius, minScale, scale]);

  const snapToTop = useCallback(() => {
    if (isAnimating.current || scrollLock.locked) return;
    isAnimating.current = true;
    scrollLock.lock();

    const targetY = sectionRef.current?.offsetTop ?? 0;
    const startY = window.scrollY;
    animate(startY, targetY, {
      duration: SNAP_DURATION,
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (val) => window.scrollTo(0, val),
      onComplete: () => {
        isAnimating.current = false;
        scrollLock.unlock();
      },
    });
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const { top, bottom } = section.getBoundingClientRect();
      const inSection = top <= 0 && bottom > 0;
      if (!inSection) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        shrinkOut();
      } else if (e.deltaY < 0 && top < 0) {
        e.preventDefault();
        snapToTop();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [isExiting, shrinkOut, snapToTop]);

  return (
    <div ref={sectionRef} className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: bgColor }}>
        <motion.div
          className="w-full h-full overflow-hidden"
          style={{ scale, borderRadius, marginLeft: marginX, marginRight: marginX }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}