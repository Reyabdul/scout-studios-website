'use client';

import { useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import {
  SNAP_DURATION,
  PAUSE_DURATION,
  EXPAND_DURATION,
  EASE,
  SHRINK_SCALE,
  SHRINK_RADIUS,
  SHRINK_MARGIN,
} from './animationTiming';

export default function VideoLayer({
  video,
  index,
  total,
  isActive,
  wasActive,
}) {
  // Motion values per layer — first slide starts full-size and visible
  const opacity      = useMotionValue(index === 0 ? 1 : 0);
  const scale        = useMotionValue(index === 0 ? 1 : SHRINK_SCALE);
  const borderRadius = useMotionValue(0);
  const marginX      = useMotionValue(0);

  useEffect(() => {
    if (wasActive) {
      // Phase 1 (outgoing): fade + shrink to card size over SNAP_DURATION
      animate(opacity, 0, { duration: SNAP_DURATION, ease: EASE });
      animate(scale, SHRINK_SCALE, { duration: SNAP_DURATION, ease: EASE });
      animate(borderRadius, SHRINK_RADIUS, { duration: SNAP_DURATION, ease: EASE });
      animate(marginX, SHRINK_MARGIN, { duration: SNAP_DURATION, ease: EASE });
    }

    if (isActive) {
      // Phase 2 (incoming): jump to shrunk card, hold PAUSE_DURATION, then expand
      opacity.set(1);
      scale.set(SHRINK_SCALE);
      borderRadius.set(SHRINK_RADIUS);
      marginX.set(SHRINK_MARGIN);

      const timeout = setTimeout(() => {
        animate(scale, 1, { duration: EXPAND_DURATION, ease: EASE });
        animate(borderRadius, 0, { duration: EXPAND_DURATION, ease: EASE });
        animate(marginX, 0, { duration: EXPAND_DURATION, ease: EASE });
      }, PAUSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isActive, wasActive, opacity, scale, borderRadius, marginX]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div
        className="w-full h-full overflow-hidden"
        style={{ scale, borderRadius, marginLeft: marginX, marginRight: marginX }}
      >
        <video
          className="w-full h-full object-cover"
          src={video.src}
          autoPlay
          muted
          loop
          playsInline
        />
      </motion.div>
    </motion.div>
  );
}
