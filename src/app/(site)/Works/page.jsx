// features/scrollVideo/Works.jsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useScroll } from 'framer-motion';
import VideoLayer from '../../features/scrollVideo/VideoLayer';
import VideoInfo from '../../features/scrollVideo/VideoInfo';

const SNAP_DURATION   = 0.5;
const PAUSE_DURATION  = 500;
const EXPAND_DURATION = 0.5;
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

export default function Works() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex]     = useState(null);
  const isAnimating  = useRef(false);
  // Track whether we've fully settled on the last video
  const atEnd        = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const snapToIndex = useCallback((index) => {
    if (isAnimating.current) return;
    const clamped = Math.max(0, Math.min(videos.length - 1, index));
    if (clamped === activeIndex) return;

    isAnimating.current = true;
    atEnd.current = false;
    setPrevIndex(activeIndex);
    setActiveIndex(clamped);

    const container = containerRef.current;
    if (!container) return;

    const sectionHeight = container.offsetHeight / videos.length;
    const targetY = container.offsetTop + sectionHeight * clamped;

    animate(window.scrollY, targetY, {
      duration: SNAP_DURATION,
      ease: [0.3, 0, 0.24, 1],
      onUpdate: (val) => window.scrollTo(0, val),
      onComplete: () => {
        // Clear wasActive immediately so the expand animation fires cleanly
        setPrevIndex(null);

        setTimeout(() => {
          isAnimating.current = false;
          // Mark that we've fully settled on the last video
          if (clamped === videos.length - 1) {
            atEnd.current = true;
          }
        }, LOCK_DURATION);
      },
    });
  }, [activeIndex]);

  useEffect(() => {
    const onWheel = (e) => {
      const section   = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const { top, bottom } = section.getBoundingClientRect();
      const inSection = top <= 0 && bottom > 0;
      if (!inSection) return;

      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;

      // At first video going up — let page scroll naturally out the top
      if (activeIndex === 0 && goingUp) return;

      // At last video going down — only let scroll through AFTER
      // the expand animation has fully completed (atEnd.current = true)
      if (activeIndex === videos.length - 1 && goingDown) {
        if (!atEnd.current) {
          // Still animating in — block scroll
          e.preventDefault();
          return;
        }
        // Settled — let natural scroll take over into next section
        return;
      }

      e.preventDefault();
      const direction = goingDown ? 1 : -1;
      snapToIndex(activeIndex + direction);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex, snapToIndex]);

  const scrollHeight = `${videos.length * 100}vh`;

  return (
    <section ref={sectionRef} id="works">
      <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
        <div className="sticky top-0 h-screen bg-white overflow-hidden flex items-center justify-center">
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