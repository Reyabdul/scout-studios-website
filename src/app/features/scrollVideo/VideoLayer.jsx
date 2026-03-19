'use client';

import { useEffect } from 'react';
import { motion, useTransform, animate, useMotionValue } from 'framer-motion';

const SNAP_DURATION = 0.5;
const PAUSE_DURATION = 500;
const EXPAND_DURATION = 0.5;

export default function VideoLayer({
  video,
  index,
  total,
  scrollYProgress,
  isActive,
  wasActive,
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.15, end - segmentSize * 0.15, end],
    index === 0 ? [1, 1, 1, 0] : [0, 1, 1, index === total - 1 ? 1 : 0]
  );

  const scale = useMotionValue(index === 0 ? 1 : 0.5);
  const borderRadius = useMotionValue(0);
  const marginX = useMotionValue(0);

  useEffect(() => {
    if (wasActive) {
      animate(scale, 0.5, { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(borderRadius, 20, {
        duration: SNAP_DURATION,
        ease: [0.76, 0, 0.24, 1],
      });
      animate(marginX, 40, { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
    }

    if (isActive) {
      scale.set(0.5);
      borderRadius.set(20);
      marginX.set(40);

      const timeout = setTimeout(() => {
        animate(scale, 1, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
        animate(borderRadius, 0, {
          duration: EXPAND_DURATION,
          ease: [0.76, 0, 0.24, 1],
        });
        animate(marginX, 0, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
      }, PAUSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isActive, wasActive, borderRadius, marginX, scale]);

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

