'use client';

import { useEffect } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

const SNAP_DURATION   = 0.5;
const PAUSE_DURATION  = 500;
const EXPAND_DURATION = 0.5;

export default function VideoLayer({
  video,
  index,
  total,
  isActive,
  wasActive,
}) {
  // All values are now motion values driven manually — no scrollYProgress
  const opacity      = useMotionValue(index === 0 ? 1 : 0);
  const scale        = useMotionValue(index === 0 ? 1 : 0.5);
  const borderRadius = useMotionValue(0);
  const marginX      = useMotionValue(0);

  useEffect(() => {
    if (wasActive) {
      // Outgoing video: fade out and shrink simultaneously
      animate(opacity, 0,        { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(scale, 0.5,        { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(borderRadius, 20,  { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(marginX, 40,       { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
    }

    if (isActive) {
      // Incoming video: start small and hidden, then pause, then expand to full
      opacity.set(1);
      scale.set(0.5);
      borderRadius.set(20);
      marginX.set(40);

      const timeout = setTimeout(() => {
        animate(scale, 1,        { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
        animate(borderRadius, 0, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
        animate(marginX, 0,      { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
      }, PAUSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isActive, wasActive, opacity, scale, borderRadius, marginX]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
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