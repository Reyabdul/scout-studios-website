// components/SectionTransition.jsx
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { scrollLock } from '../lib/scrollManager';

// ─── Animation tuning (adjust these first) ───────────────────────────────────
// SNAP_DURATION: seconds for shrink-in-place and for scroll-up snap-to-top
const SNAP_DURATION   = 0.3;
// PAUSE_DURATION: ms to hold the shrunk frame before scrolling to next section
const PAUSE_DURATION  = 250;
// EXPAND_DURATION: seconds for the scroll-down handoff after the pause
const EXPAND_DURATION = 0.35;
// EASE: cubic-bezier for all motion; [0.76, 0, 0.24, 1] = quick start, soft land
const EASE = [0.76, 0, 0.24, 1];

export default function SectionTransition({
  children,
  bgColor    = '#F5C832', // visible frame around content when shrunk
  minScale   = 0.78,      // how small content gets during exit (0–1)
  maxRadius  = 20,        // corner radius at peak shrink (px)
  maxMargin  = 40,        // horizontal inset at peak shrink (px)
}) {
  const sectionRef  = useRef(null);
  const isAnimating = useRef(false); // blocks overlapping wheel-triggered runs
  const [isExiting, setIsExiting] = useState(false);

  // Framer motion values — animated in shrinkOut, reset on complete
  const scale        = useMotionValue(1);
  const borderRadius = useMotionValue(0);
  const marginX      = useMotionValue(0);

  // Scroll down: shrink sticky content, pause, then scroll past this section
  const shrinkOut = useCallback(() => {
    if (isAnimating.current || scrollLock.locked) return;
    isAnimating.current = true;
    scrollLock.lock();
    setIsExiting(true);

    // Phase 1 — shrink: scale down + round corners + side margins (all use SNAP_DURATION)
    animate(scale,        minScale,  { duration: SNAP_DURATION, ease: EASE });
    animate(borderRadius, maxRadius, { duration: SNAP_DURATION, ease: EASE });
    animate(marginX,      maxMargin, { duration: SNAP_DURATION, ease: EASE });

    // Phase 2 — after PAUSE_DURATION, scroll to end of this section (EXPAND_DURATION)
    setTimeout(() => {
      const section = sectionRef.current;
      if (!section) return;
      const targetY = section.offsetTop + section.offsetHeight;

      const startY = window.scrollY;
      animate(startY, targetY, {
        duration: EXPAND_DURATION,
        ease: EASE,
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

  // Scroll up: when section is stuck but scrolled past top, snap back to section start
  const snapToTop = useCallback(() => {
    if (isAnimating.current || scrollLock.locked) return;
    isAnimating.current = true;
    scrollLock.lock();

    const targetY = sectionRef.current?.offsetTop ?? 0;
    const startY = window.scrollY;
    animate(startY, targetY, {
      duration: SNAP_DURATION,
      ease: EASE,
      onUpdate: (val) => window.scrollTo(0, val),
      onComplete: () => {
        isAnimating.current = false;
        scrollLock.unlock();
      },
    });
  }, []);

  // Wheel handler: only active while this full-screen section is in view
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
    // Outer wrapper: one viewport tall; offsetTop/Height drive scroll targets
    <div ref={sectionRef} className="relative h-screen">
      {/* Sticky viewport: bg shows as a frame when inner content shrinks */}
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
