"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

const iconMap = {
  instagram: require("react-icons/fa").FaInstagram,
  facebook: require("react-icons/fa").FaFacebook,
  youtube: require("react-icons/fa").FaYoutube,
  twitter: require("react-icons/fa").FaTwitter,
  linkedin: require("react-icons/fa").FaLinkedin,
};

export default function SideBar({ open, setOpen }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["more info page"],
    queryFn: () => client.fetch(`*[_type == "moreInfo"][0]`),
  });

  const renderDivider = (className = "border-t border-gray-400 mb-6") => (
    <div className={className} />
  );

  const renderServices = () => (
    Array.isArray(data?.services) && data.services.length > 0 && (
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4">Services</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          {data.services.map((service, idx) => (
            <p key={idx}>{service}</p>
          ))}
        </div>
      </div>
    )
  );

  const renderContact = () => (
    data?.email && (
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-2">Contact</h2>
        <p className="text-sm">{data.email}</p>
      </div>
    )
  );

  const renderSocialIcons = () => (
    Array.isArray(data?.socialmedia) && data.socialmedia.length > 0 && (
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4">Social Media</h2>
        <div className="flex gap-6 text-xl">
          {data.socialmedia.map((item, idx) => {
            const platformKey = (item.platform || "").toLowerCase();
            const Icon = iconMap[platformKey];
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
      </div>
    )
  );

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

          {/* Slide-in Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-105 bg-[#f5f5f5] z-50 px-8 py-6 flex flex-col overflow-y-auto"
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
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>

            {renderDivider("border-t border-black mb-6")}

            {/* Body */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">Error loading content</p>
            ) : (
              <>
                {/* Paragraph / Main text */}
                {data?.body && (
                  <div className="text-sm leading-relaxed space-y-4 mb-8">
                    <PortableText value={data.body} />
                  </div>
                )}

                {renderDivider()}

                {/* Services */}
                {renderServices()}

                {renderDivider()}

                {/* Contact */}
                {renderContact()}

                {renderDivider()}

                {/* Social Icons */}
                {renderSocialIcons()}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}