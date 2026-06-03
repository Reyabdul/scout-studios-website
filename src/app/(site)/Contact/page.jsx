'use client';

import { motion } from 'framer-motion';

const EMAIL = 'you@yourdomain.com';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#080c0a] py-32 flex flex-col items-center gap-10 text-center"
    >
      {/* Top divider */}
      <motion.div
        className="w-full max-w-4xl h-px bg-white/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Supporting text FIRST */}
      <motion.p
        className="text-white/50 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Let’s build something meaningful together.
      </motion.p>

      {/* Main CTA */}
      <motion.a
        href={`mailto:${EMAIL}`}
        className="group relative inline-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="text-5xl md:text-6xl font-black tracking-tight text-white transition-all duration-300 group-hover:text-[#F5C832] group-hover:scale-95">
          GET IN TOUCH
        </span>

        {/* underline animation */}
        <span className="absolute left-1/2 -bottom-3 h-0.5 w-0 bg-[#F5C832] transition-all duration-300 group-hover:w-full group-hover:left-0" />
      </motion.a>

      {/* Bottom divider */}
      <motion.div
        className="w-full max-w-4xl h-px bg-white/20 mt-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </section>
  );
}