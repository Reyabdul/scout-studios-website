// features/scrollVideo/VideoInfo.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

const TEXT_DELAY = 0.5;

export default function VideoInfo({ video }) {
  const variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: TEXT_DELAY },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={video.title}
        className="absolute bottom-20 left-20"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Title */}
        <h2 className="text-6xl font-bold tracking-tight mb-2 text-[#F5C832]/90">
          {video.title}
        </h2>

        {/* Metadata — switched from text-white/70 to text-black/50 for white bg */}
        <div className="flex gap-6 text-sm text-white/60">
          <span>
            <span className="text-black/70 uppercase tracking-widest text-xs mr-1">Dir.</span>
            {video.director}
          </span>
          <span>
            <span className="text-black/70 uppercase tracking-widest text-xs mr-1">Prod.</span>
            {video.producer}
          </span>
          <span>{video.year}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}