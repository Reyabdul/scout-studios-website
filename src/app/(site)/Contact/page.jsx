'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { client } from '../../../sanity/lib/client';

const contactQuery = `*[_type == "contact"][0]{
  cta,
  tagline,
  email
}`;

function useContact() {
  return useQuery({
    queryKey: ['contact'],
    queryFn: () => client.fetch(contactQuery),
    staleTime: 1000 * 60 * 5,
  });
}

export default function Contact() {
  const { data, isLoading, error } = useContact();

  const sectionClassName =
    'relative bg-[#080c0a] py-32 flex flex-col items-center gap-10 text-center';

  if (isLoading) {
    return (
      <section id="contact" className={sectionClassName}>
        <p className="text-white/50">Loading contact…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className={sectionClassName}>
        <p className="text-white/50">
          Failed to load contact. Please try again later.
        </p>
      </section>
    );
  }

  const { cta, tagline, email } = data ?? {};

  if (!cta || !tagline || !email) {
    return (
      <section id="contact" className={sectionClassName}>
        <p className="text-white/50">No contact section published yet.</p>
      </section>
    );
  }

  return (
    <section id="contact" className={sectionClassName}>
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
        {tagline}
      </motion.p>

      {/* Main CTA */}
      <motion.a
        href={`mailto:${email}`}
        className="group relative inline-block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="text-5xl md:text-6xl font-black tracking-tight text-white transition-all duration-300 group-hover:text-[#F5C832] group-hover:scale-95">
          {cta}
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
