'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const EMAIL = 'you@yourdomain.com'; // ← replace with your email

export default function Contact() {
  const [hovered, setHovered] = useState(false);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const intervalRef = useRef(null);
  const widthRef = useRef(0);

  const handleMouseEnter = () => {
    setHovered(true);
    // Grow underline gradually the longer you hover
    intervalRef.current = setInterval(() => {
      widthRef.current = Math.min(widthRef.current + 1.2, 100);
      setUnderlineWidth(widthRef.current);
    }, 16); // ~60fps
  };

  const handleMouseLeave = () => {
    setHovered(false);
    clearInterval(intervalRef.current);
    // Snap back quickly
    const start = widthRef.current;
    const startTime = performance.now();
    const duration = 400;

    const shrink = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease out cubic
      widthRef.current = start * (1 - eased);
      setUnderlineWidth(widthRef.current);
      if (t < 1) requestAnimationFrame(shrink);
    };
    requestAnimationFrame(shrink);
  };

  return (
    <section
      id="contact"
      className="relative w-full h-[50vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#080c0a' }}
    >

      {/* Top rule */}
      <motion.div
        className="absolute w-4/5"
        style={{ top: '12%', height: '1px', background: 'white' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />

      {/* Bottom rule */}
      <motion.div
        className="absolute w-4/5"
        style={{ bottom: '12%', height: '1px', background: 'white' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
      />

      {/* CTA */}
      <motion.a
        href={`mailto:${EMAIL}`}
        className="relative z-10 select-none cursor-pointer no-underline"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
        style={{ textDecoration: 'none' }}
      >
        <motion.span
          style={{
            display: 'block',
            fontFamily: '"Arial Black", "Arial Bold", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: hovered ? '#F5C832' : '#F5C832',
            scale: hovered ? 0.96 : 1,
            transition: 'color 0.4s ease, scale 0.4s ease',
          }}
          animate={{
            scale: hovered ? 0.96 : 1,
            color: hovered ? 'gray' : '#e8f5ee',
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          Get In Touch
        </motion.span>

        {/* Underline — grows the longer you hover */}
        <div
          style={{
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            height: '3px',
            width: `${underlineWidth}%`,
            background: hovered
              ? 'linear-gradient(#F5C832)'
              : 'transparent',
            borderRadius: '2px',
            transition: 'background 0.3s ease',
          }}
        />
      </motion.a>
    </section>
  );
}