"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

// Example: Add your supported icons here, matching Sanity's platform string to an icon component.
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const iconMap = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  // Add more mappings as necessary
};

export default function SideBar({ open, setOpen }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["more info page"],
    queryFn: () => client.fetch(`*[_type == "moreInfo"][0]`),
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-[420px] bg-[#f5f5f5] z-50 px-8 py-6 flex flex-col overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-xl font-bold uppercase tracking-tight">
                {data?.heading || "Scout Studios"}
              </h1>

              <button
                onClick={() => setOpen(false)}
                className="text-sm border border-black w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-black mb-6" />

            {/* Body */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error loading content</p>
            ) : (
              <>
                {/* Paragraph */}
                <div className="text-sm leading-relaxed space-y-4 mb-8">
                  {data?.body && <PortableText value={data.body} />}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-400 mb-6" />

                {/* Services */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold mb-4">Services</h2>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    {Array.isArray(data?.services) &&
                      data.services.map((service, idx) => (
                        <p key={idx}>{service}</p>
                      ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-400 mb-6" />

                {/* Contact */}
                <div className="mb-8">
                  <h2 className="text-sm font-semibold mb-2">Contact</h2>
                  <p className="text-sm">{data?.email}</p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-400 mb-6" />

                {/* Social Icons */}
                <div className="flex gap-6 text-xl">
                  {Array.isArray(data?.socialmedia) &&
                    data.socialmedia.map((item, idx) => {
                      const Icon = iconMap[item.platform?.toLowerCase?.() || ""];
                      if (!Icon || !item.url) return null;
                      return (
                        <a
                          key={idx}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={item.platform}
                          className="hover:opacity-60 transition"
                        >
                          <Icon />
                        </a>
                      );
                    })}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}