// components/ScrollVideoFrame.jsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue, AnimatePresence } from 'framer-motion';

// ---- Timing config ----
const SNAP_DURATION   = 0.5;
const PAUSE_DURATION  = 500;
const EXPAND_DURATION = 0.5;
const TEXT_DELAY      = 0.5;
const LOCK_DURATION   = PAUSE_DURATION + EXPAND_DURATION * 1000 + 300;

const videos = [
  {
    src: '/videos/test1.mp4',
    title: 'Sweetness',
    director: 'Jane Smith',
    producer: 'John Doe',
    year: '2024',
  },
  {
    src: '/videos/test2.mp4',
    title: 'Neon Drift',
    director: 'Carlos Rivera',
    producer: 'Amy Chen',
    year: '2024',
  },
  {
    src: '/videos/test3.mp4',
    title: 'Golden Hour',
    director: 'Mia Tanaka',
    producer: 'Leo Park',
    year: '2025',
  },
];

function VideoLayer({ video, index, total, scrollYProgress, isActive, wasActive }) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [
      start,
      start + segmentSize * 0.15,
      end - segmentSize * 0.15,
      end,
    ],
    index === 0
      ? [1, 1, 1, 0]
      : [0, 1, 1, index === total - 1 ? 1 : 0]
  );

  const scale = useMotionValue(index === 0 ? 1 : 0.5);
  const borderRadius = useMotionValue(0);
  const marginX = useMotionValue(0);

  useEffect(() => {
    if (wasActive) {
      animate(scale, 0.5, { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(borderRadius, 20, { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
      animate(marginX, 40, { duration: SNAP_DURATION, ease: [0.76, 0, 0.24, 1] });
    }

    if (isActive) {
      scale.set(0.5);
      borderRadius.set(20);
      marginX.set(40);

      const timeout = setTimeout(() => {
        animate(scale, 1, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
        animate(borderRadius, 0, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
        animate(marginX, 0, { duration: EXPAND_DURATION, ease: [0.76, 0, 0.24, 1] });
      }, PAUSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [isActive, wasActive]);

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

// ↓↓↓ ONLY THIS FUNCTION CHANGED — replace your old VideoInfo with this ↓↓↓
function VideoInfo({ video }) {
  const variants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: TEXT_DELAY } },
    exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1], delay: 0 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={video.title}
        className="absolute bottom-10 left-10 text-white"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="text-4xl font-bold tracking-tight mb-2">
          {video.title}
        </h2>
        <div className="flex gap-6 text-sm text-white/70">
          <span>
            <span className="text-white/40 uppercase tracking-widest text-xs mr-1">Dir.</span>
            {video.director}
          </span>
          <span>
            <span className="text-white/40 uppercase tracking-widest text-xs mr-1">Prod.</span>
            {video.producer}
          </span>
          <span>{video.year}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
// ↑↑↑ END OF CHANGE ↑↑↑

export default function WorksSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const isAnimating = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const snapToIndex = (index) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(videos.length - 1, index));
    if (clamped === activeIndex) return;

    isAnimating.current = true;
    setPrevIndex(activeIndex);
    setActiveIndex(clamped);

    const container = containerRef.current;
    const sectionHeight = container.offsetHeight / videos.length;
    const targetY = container.offsetTop + sectionHeight * clamped;

    animate(window.scrollY, targetY, {
      duration: SNAP_DURATION,
      ease: [0.3, 0, 0.24, 1],
      onUpdate: (val) => window.scrollTo(0, val),
      onComplete: () => {
        setTimeout(() => {
          isAnimating.current = false;
          setPrevIndex(null);
        }, LOCK_DURATION);
      },
    });
  };

  useEffect(() => {
    const onWheel = (e) => {
      const section = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const { top, bottom } = section.getBoundingClientRect();
      const inSection = top <= 0 && bottom > 0;
      if (!inSection) return;

      const atStart = activeIndex === 0 && e.deltaY < 0;
      const atEnd = activeIndex === videos.length - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      snapToIndex(activeIndex + direction);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex]);

  const scrollHeight = `${videos.length * 100}vh`;

  return (
    <section ref={sectionRef} id="works">
      <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
        <div className="sticky top-0 h-screen bg-[#F5C832] overflow-hidden flex items-center justify-center">
          {videos.map((video, i) => (
            <VideoLayer
              key={video.src}
              video={video}
              index={i}
              total={videos.length}
              scrollYProgress={scrollYProgress}
              isActive={i === activeIndex}
              wasActive={i === prevIndex}
            />
          ))}
          <VideoInfo video={videos[activeIndex]} />
        </div>
      </div>
    </section>
  );
}