"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";
import Divider from "./Divider";

import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
};

/* ---------------- ANIMATION VARIANTS ---------------- */

const panelVariant = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
      when: "beforeChildren",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const dividerGroup = {
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6, // appears AFTER text
    },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function SideBar({ open, setOpen }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["more info page"],
    queryFn: () => client.fetch(`*[_type == "moreInfo"][0]`),
  });

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            variants={panelVariant}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 z-50 px-8 py-6 flex flex-col overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.76)",
              backdropFilter: "blur(9px) saturate(170%)",
              WebkitBackdropFilter: "blur(9px) saturate(170%)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.13)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <motion.div variants={container}>
              
              {/* Header */}
              <motion.div
                variants={item}
                className="flex items-start justify-between mb-1"
              >
                <h1 className="text-2xl font-semibold tracking-tight">
                  {data?.heading || "Scout Studios"}
                </h1>

                <button
                  onClick={() => setOpen(false)}
                  className="text-sm border border-black w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              </motion.div>

              {/* Divider Group */}
              <motion.div variants={dividerGroup}>
                <Divider className="mb-6 border-4" />
              </motion.div>

              {/* Content */}
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">Error loading content</p>
              ) : (
                <>
                  {/* Paragraph */}
                  <motion.div variants={item} className="mb-8 text-sm">
                    <PortableText value={data?.body} />
                  </motion.div>

                  <motion.div variants={dividerGroup}>
                    <Divider className="mb-6" />
                  </motion.div>

                  {/* Services */}
                  <motion.div variants={item} className="mb-8">
                    <h2 className="text-sm font-semibold mb-4">Services</h2>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      {data?.services?.map((s, i) => (
                        <p key={i}>{s}</p>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={dividerGroup}>
                    <Divider className="mb-6" />
                  </motion.div>

                  {/* Contact */}
                  <motion.div variants={item} className="mb-8">
                    <h2 className="text-sm font-semibold mb-2">Contact</h2>
                    <p>{data?.email}</p>
                  </motion.div>

                  <motion.div variants={dividerGroup}>
                    <Divider className="mb-6" />
                  </motion.div>

                  {/* Social */}
                  <motion.div variants={item} className="flex gap-6 text-xl">
                    {data?.socialmedia?.map((item, i) => {
                      const Icon =
                        iconMap[item.platform?.toLowerCase?.() || ""];
                      if (!Icon) return null;

                      return (
                        <a key={i} href={item.url} target="_blank">
                          <Icon />
                        </a>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}