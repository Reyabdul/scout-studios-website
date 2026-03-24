'use client';

import { useRef } from 'react';

const collaborations = [
  { type: 'text',  text: 'SALOMON' },
  { type: 'text',  text: 'MAKER' },
  { type: 'text',  text: 'Foot Locker' },
  { type: 'text',  text: 'adidas' },
  { type: 'text',  text: 'Nike' },
  { type: 'text',  text: 'New Balance' },
  { type: 'text',  text: 'Puma' },
];

// Separator between items
function Dot() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#F5C832',
        margin: '0 2rem',
        flexShrink: 0,
        verticalAlign: 'middle',
      }}
    />
  );
}

function MarqueeItem({ item }) {
  if (item.type === 'label') {
    return (
      <span
        style={{
          fontFamily: 'serif',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.05em',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {item.text}:
      </span>
    );
  }

  return (
    <span
      style={{
        fontFamily: '"Arial Black", "Arial Bold", sans-serif',
        fontWeight: 900,
        fontSize: '2rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#ffffff',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {item.text}
    </span>
  );
}

export default function CollaborationsMarquee() {
  return (
    <section
      style={{
        background: '#080c0a',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 className='text-white flex items-center justify-center pb-8' style={{textAlign: 'center'}}>Collaborations:</h2>
      </div>
      {/* Keyframe injection */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Left fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, #080c0a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Right fade */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to left, #080c0a, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Scrolling track */}
      <div
        className="marquee-wrapper"
        style={{
          width: '100%',
          display: 'flex', 
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div 
          className="marquee-track" 
          style={{
            display: 'flex',
            alignItems: 'center',
            animation: 'marquee-scroll 10s linear infinite', // Made 2x faster by halving the duration
            willChange: 'transform',
            justifyContent: 'center',
            width: '100%',
          }}>
          {[...collaborations, ...collaborations, ...collaborations, ...collaborations].map((item, i) => (
            <span 
              key={i} 
              style={{ display: 'flex', alignItems: 'center', flexShrink: 0, justifyContent: 'center' }}
            >
              <MarqueeItem item={item} />
              <Dot />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}