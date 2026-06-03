'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

const collabMarQuery = `*[_type == "collabMar"][0]{
  items[]{
    type,
    label,
    logo{
      alt,
      asset
    }
  }
}`;

function mapMarqueeItems(items) {
  if (!items?.length) return [];
  return items
    .map((item, i) => {
      if (item.type === 'image' && item.logo?.asset) {
        return {
          key: `image-${i}`,
          type: 'image',
          src: urlFor(item.logo).height(48).url(),
          alt: item.logo.alt ?? 'Collaborator logo',
        };
      }
      if (item.type === 'text' && item.label) {
        return {
          key: `text-${i}`,
          type: 'text',
          label: item.label,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function useCollabMarquee() {
  return useQuery({
    queryKey: ['collabMar'],
    queryFn: () => client.fetch(collabMarQuery),
    staleTime: 1000 * 60 * 5,
  });
}

/** Two identical halves so translateX(-50%) loops seamlessly. Repeat segment if few items. */
function buildInfiniteMarqueeItems(items) {
  if (!items.length) return [];

  let segment = [...items];
  while (segment.length < 8) {
    segment = [...segment, ...items];
  }

  return [...segment, ...segment];
}

export default function CollaborationsMarquee() {
  const { data, isLoading, error } = useCollabMarquee();
  const marqueeItems = mapMarqueeItems(data?.items);
  const items = buildInfiniteMarqueeItems(marqueeItems);

  const sectionClassName =
    'relative bg-[#080c0a] py-24 overflow-hidden flex flex-col items-center gap-8';

  if (isLoading) {
    return (
      <section
        id="collaborationmarquee"
        className={sectionClassName}
        tabIndex={-1}
        aria-label="Collaborations Marquee"
      >
        <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
          Collaborations
        </p>
        <p className="text-white/50">Loading collaborations…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="collaborationmarquee"
        className={sectionClassName}
        tabIndex={-1}
        aria-label="Collaborations Marquee"
      >
        <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
          Collaborations
        </p>
        <p className="text-white/50">
          Failed to load collaborations. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section
      id="collaborationmarquee"
      className={sectionClassName}
      tabIndex={-1}
      aria-label="Collaborations Marquee"
    >
      <p className="text-xs tracking-[0.3em] text-white/40 uppercase mb-2">
        Collaborations
      </p>

      <div className="relative w-full overflow-hidden">
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

        {items.length > 0 ? (
          <div className="collab-marquee-track items-center whitespace-nowrap">
            {items.map((item, i) => (
              <span
                key={`${item.key}-${i}`}
                className="flex shrink-0 items-center mx-8 text-3xl font-black tracking-wider text-white/80 whitespace-nowrap"
                aria-label={
                  i === 0
                    ? item.type === 'text'
                      ? `Brand: ${item.label}`
                      : item.alt
                    : undefined
                }
              >
                {item.type === 'text' ? (
                  item.label
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-8 w-auto object-contain"
                  />
                )}
                <span
                  aria-hidden="true"
                  role="presentation"
                  className="mx-8 w-1.5 h-1.5 rounded-full bg-[#F5C832] inline-block"
                />
              </span>
            ))}
          </div>
        ) : (
          <p className="text-center text-white/50">
            No collaboration items yet. Add them in Sanity Studio.
          </p>
        )}
      </div>
    </section>
  );
}
