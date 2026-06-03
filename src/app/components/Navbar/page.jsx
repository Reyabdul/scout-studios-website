"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SideBar from "../SideBar/page";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

import { container, item, divider } from "../../(site)/animiations/uiMotions";

function useInvertOnSections(sectionIds = ["mission", "collaborationmarquee", "contact"]) {
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    function onScroll() {
      let found = false;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          found = true;
          break;
        }
      }

      setInverted(found);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return inverted;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const invert = useInvertOnSections();

  const { data } = useQuery({
    queryKey: ["navbar"],
    queryFn: () => client.fetch(`*[_type == "navbar"][0]`),
  });

  const siteName = data?.siteName;
  const links = data?.links || ["Works", "Mission", "Contact"];
  const sideBarTitle = data?.sideBarTitle ?? "More Info";
  const textColor = invert ? "#FFF" : "#000";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-center px-8 z-50">
        
        {/* Center Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          
          {/* Site Name with Center-Out Divider */}
          <motion.div variants={item} className="mb-1">
            <a
              href="#home"
              className="relative inline-block text-lg font-bold"
              style={{ color: textColor }}
            >
              {siteName}

              <motion.span
                variants={divider}
                className="absolute left-1/2 border-b-2"
                style={{
                  bottom: "-2px",
                  width: "300%", // 🔥 3x width
                  transformOrigin: "center",
                  borderColor: textColor,
                }}
              />
            </a>
          </motion.div>

          {/* Links (no divider) */}
          <motion.div
            variants={container}
            className="flex gap-8 text-sm font-medium"
          >
            {links.map((link, i) => {
              const label = typeof link === "string" ? link : link.label;

              return (
                <motion.a
                  key={i}
                  variants={item}
                  href={`#${label.toLowerCase()}`}
                  style={{ color: textColor }}
                >
                  {label}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Button */}
        <div className="absolute right-8 flex flex-col items-center">
          <button
            onClick={() => setOpen(true)}
            className="text-sm"
            style={{ color: textColor }}
          >
            {sideBarTitle}
          </button>

          {/* Dots */}
          <div className="flex gap-1 mt-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: textColor,
                  border: `1px solid ${textColor}`,
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
}