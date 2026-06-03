// animations/uiMotion.js

export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const divider = {
  hidden: {
    scaleX: 0,
    x: "-50%", // center align
  },
  show: {
    scaleX: 1,
    x: "-50%",
    transition: {
      duration: 0.6,
      ease: [0.83, 0, 0.17, 1], // smoother, premium feel
    },
  },
};