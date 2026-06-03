'use client';

import React from 'react';

const collaborations = [
  'SALOMON',
  'MAKER',
  'FOOT LOCKER',
  'ADIDAS',
  'NIKE',
  'NEW BALANCE',
  'PUMA',
];

export default function CollaborationsMarquee() {
  // For a seamless marquee (no gaps as it wraps), ensure items are duplicated more than once
  // and the track is wide enough. We'll ensure a minimum double duplication.
  const items = [...collaborations, ...collaborations];

  return (
    <section
      id="collaborationmarquee"
      className="relative bg-[#080c0a] py-24 overflow-hidden flex flex-col items-center gap-8"
      tabIndex={-1}
      aria-label="Collaborations Marquee"
    >
      {/* Label */}
      <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
        Collaborations
      </p>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: 'linear-gradient(to right, #080c0a, transparent)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: 'linear-gradient(to left, #080c0a, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Track */}
        <div className="marquee-track flex whitespace-nowrap">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center mx-8 text-3xl font-black tracking-wider text-white/80 whitespace-nowrap"
              aria-label={i === 0 ? `Brand: ${item}` : undefined}
            >
              {item}
              {/* Show the dot separator except after the last item for semantics */}
              <span
                aria-hidden="true"
                role="presentation"
                className="mx-8 w-1.5 h-1.5 rounded-full bg-[#F5C832] inline-block"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        .marquee-track {
          will-change: transform;
          min-width: 200%;
          animation: marquee 20s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}