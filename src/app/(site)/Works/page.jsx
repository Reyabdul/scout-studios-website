'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../sanity/lib/client';
import VideoLayer from '../../features/scrollVideo/VideoLayer';
import VideoInfo from '../../features/scrollVideo/VideoInfo';

const SNAP_DURATION   = 0.5;
const PAUSE_DURATION  = 500;
const EXPAND_DURATION = 0.5;
const LOCK_DURATION   = PAUSE_DURATION + EXPAND_DURATION * 1000 + 300;

const LOCAL_VIDEO_SOURCES = [
  '/videos/test1.mp4',
  '/videos/test2.mp4',
  '/videos/test3.mp4',
];

const worksQuery = `*[_type == "works"] | order(order asc) {
  _id,
  title,
  company,
  creator,
  service,
  year,
  order
}`;

function mergeWorksWithLocalVideos(works) {
  const sorted = works ?? [];
  return LOCAL_VIDEO_SOURCES.map((src, index) => {
    const work = sorted.find((w) => w.order === index + 1);
    if (!work) return null;
    return {
      id: work._id,
      src,
      title: work.title,
      director: work.creator ?? '',
      producer: work.company ?? '',
      year: work.year != null ? String(work.year) : '',
    };
  }).filter(Boolean);
}

function useWorks() {
  return useQuery({
    queryKey: ['works'],
    queryFn: () => client.fetch(worksQuery),
    staleTime: 1000 * 60 * 5,
  });
}

export default function Works() {
  const { data, isLoading, error } = useWorks();
  const videos = mergeWorksWithLocalVideos(data);

  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex]     = useState(null);
  const isAnimating  = useRef(false);
  const atEnd        = useRef(false);

  const snapToIndex = useCallback((index) => {
    if (isAnimating.current || videos.length === 0) return;
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
        setPrevIndex(null);

        setTimeout(() => {
          isAnimating.current = false;
          if (clamped === videos.length - 1) {
            atEnd.current = true;
          }
        }, LOCK_DURATION);
      },
    });
  }, [activeIndex, videos.length]);

  useEffect(() => {
    if (videos.length === 0) return;

    const onWheel = (e) => {
      const section   = sectionRef.current;
      const container = containerRef.current;
      if (!section || !container) return;

      const { top, bottom } = section.getBoundingClientRect();
      const inSection = top <= 0 && bottom > 0;
      if (!inSection) return;

      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;

      if (activeIndex === 0 && goingUp) return;

      if (activeIndex === videos.length - 1 && goingDown) {
        if (!atEnd.current) {
          e.preventDefault();
          return;
        }
        return;
      }

      e.preventDefault();
      const direction = goingDown ? 1 : -1;
      snapToIndex(activeIndex + direction);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex, snapToIndex, videos.length]);

  if (isLoading) {
    return (
      <section id="works" className="h-screen flex items-center justify-center bg-white">
        <p className="text-black/50">Loading works…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="works" className="h-screen flex items-center justify-center bg-white">
        <p className="text-black/50">Failed to load works. Please try again later.</p>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section id="works" className="h-screen flex items-center justify-center bg-white">
        <p className="text-black/50">No works published yet.</p>
      </section>
    );
  }

  const scrollHeight = `${videos.length * 100}vh`;
  const activeVideo = videos[activeIndex];

  return (
    <section ref={sectionRef} id="works">
      <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
        <div className="sticky top-0 h-screen bg-white overflow-hidden flex items-center justify-center">
          {videos.map((video, i) => (
            <VideoLayer
              key={video.id}
              video={video}
              index={i}
              total={videos.length}
              isActive={i === activeIndex}
              wasActive={i === prevIndex}
            />
          ))}
          <VideoInfo video={activeVideo} />
        </div>
      </div>
    </section>
  );
}
