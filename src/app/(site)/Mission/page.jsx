'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

const OFFSET_X = 20;
const OFFSET_Y = 20;

const missionQuery = `*[_type == "mission"][0]{
  body,
  heading,
  images[]{
    alt,
    asset
  }
}`;

function mapMissionImages(images) {
  if (!images?.length) return [];
  return images.map((img) => ({
    src: urlFor(img).width(440).height(600).url(),
    alt: img.alt ?? '',
  }));
}

function useMission() {
  return useQuery({
    queryKey: ['mission'],
    queryFn: () => client.fetch(missionQuery),
    staleTime: 1000 * 60 * 5,
  });
}

const sectionStyle = {
  position: 'relative',
  minHeight: '100vh',
  background: '#080c0a',
  display: 'flex',
  alignItems: 'center',
  padding: '0 6vw',
  overflow: 'hidden',
};

export default function Mission() {
  const { data, isLoading, error } = useMission();
  const images = mapMissionImages(data?.images);
  const statement = data?.body ?? '';

  const sectionRef = useRef(null);
  const [isInside, setIsInside] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef(null);

  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);

  const x = useSpring(rawX, { stiffness: 120, damping: 20, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20, mass: 0.8 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsInside(true);
  const handleMouseLeave = () => setIsInside(false);

  useEffect(() => {
    if (!isInside || images.length === 0) return;
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [isInside, images.length]);

  const activeImgIndex = images.length > 0 ? imgIndex % images.length : 0;

  if (isLoading) {
    return (
      <section id="mission" style={sectionStyle}>
        <p style={{ color: 'rgba(245, 200, 50, 0.5)' }}>Loading mission…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="mission" style={sectionStyle}>
        <p style={{ color: 'rgba(245, 200, 50, 0.5)' }}>
          Failed to load mission. Please try again later.
        </p>
      </section>
    );
  }

  if (!statement) {
    return (
      <section id="mission" style={sectionStyle}>
        <p style={{ color: 'rgba(245, 200, 50, 0.5)' }}>No mission published yet.</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="mission"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...sectionStyle,
        cursor: 'none',
      }}
    >
      <h2
        style={{
          fontFamily: '"Arial Black", "Arial Bold", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          lineHeight: 1.1,
          color: '#F5C832',
          maxWidth: '600px',
          position: 'relative',
          zIndex: 15,
          userSelect: 'none',
        }}
      >
        {statement}
      </h2>

      {images.length > 0 && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            x,
            y,
            translateX: `${OFFSET_X}px`,
            translateY: `${OFFSET_Y}px`,
            width: '220px',
            height: '300px',
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          animate={{
            opacity: isInside ? 1 : 0,
            scale: isInside ? 1 : 0.85,
          }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          {images.map((img, i) => (
            <motion.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              animate={{
                opacity: i === activeImgIndex ? 1 : 0,
                scale: i === activeImgIndex ? 1 : 1.04,
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#F5C832',
          pointerEvents: 'none',
          zIndex: 20,
        }}
        animate={{ opacity: isInside ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </section>
  );
}
