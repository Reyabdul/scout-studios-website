// Shared Works / VideoLayer timing — change here to keep scroll + video in sync

// SNAP_DURATION: seconds for outgoing shrink and scroll snap between slides
export const SNAP_DURATION = 0.3;

// PAUSE_DURATION: ms to hold incoming video in shrunk state before expand
export const PAUSE_DURATION = 250;

// EXPAND_DURATION: seconds for incoming video to grow to full size
export const EXPAND_DURATION = 0.35;

// EASE: cubic-bezier for all Works transitions
export const EASE = [0.76, 0, 0.24, 1];

// Visual state while a slide is "small" (incoming start / outgoing end)
export const SHRINK_SCALE  = 0.5;
export const SHRINK_RADIUS = 20;
export const SHRINK_MARGIN = 40;

// Extra ms after scroll snap before accepting another wheel event
export const LOCK_BUFFER_MS = 200;

// Must cover PAUSE + EXPAND so wheel doesn't fire mid-animation
export const LOCK_DURATION =
  PAUSE_DURATION + EXPAND_DURATION * 1000 + LOCK_BUFFER_MS;
