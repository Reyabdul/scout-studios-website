"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";
import { useEffect, useState } from "react";

import { container, item } from "../../(site)/animiations/uiMotions";

// ✅ Restore invert logic
function useFooterTextColor(sectionIds = ["mission", "collaborationmarquee", "contact"]) {
  const [isWhite, setIsWhite] = useState(false);

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

      setIsWhite(found);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return isWhite;
}

export default function Footer() {
  const year = new Date().getFullYear();

  const { data } = useQuery({
    queryKey: ["footer"],
    queryFn: () =>
      client.fetch(`*[_type == "footer"][0]{ footerText }`),
  });

  const isWhite = useFooterTextColor();
  const textColor = isWhite ? "#FFF" : "#000";

  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 flex justify-center text-xs z-30">
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.span variants={item} style={{ color: textColor }}>
          © {data?.footerText ?? ""} {year}
        </motion.span>
      </motion.div>
    </footer>
  );
}