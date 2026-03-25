import { motion } from "framer-motion";

const dividerVariant = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function Divider({ className = "", style = {} }) {
  return (
    <motion.div
      variants={dividerVariant}
      className={`border-t border-black ${className}`}
      style={{ transformOrigin: "left", ...style }}
    />
  );
}