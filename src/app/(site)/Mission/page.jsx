'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const images = [
  '/images/logo.png',
  '/images/filler1.jpg',
  '/images/filler2.jpg',
  '/images/filler3.jpg',
];

const OFFSET_X = 20;
const OFFSET_Y = 20;

export default function Mission() {
  const sectionRef  = useRef(null);
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

  const handleMouseEnter = () => {
    setIsInside(true);
    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const handleMouseLeave = () => {
    setIsInside(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#080c0a',
        display: 'flex',
        alignItems: 'center',
        padding: '0 6vw',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* ── Headline text ─────────────────────────────────────── */}
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
        A Toronto based creative studio help folks cook up cool things.
      </h2>

      {/* ── Cursor-following image — floats above everything ───── */}
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
          zIndex: 10,          // ← above text and everything else
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        animate={{
          opacity: isInside ? 1 : 0,
          scale: isInside ? 1 : 0.85,
        }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
      >
        {images.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            animate={{
              opacity: i === imgIndex ? 1 : 0,
              scale:   i === imgIndex ? 1 : 1.04,
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        ))}
      </motion.div>

      {/* ── Custom cursor dot — always on top ─────────────────── */}
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