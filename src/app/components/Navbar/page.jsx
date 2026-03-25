"use client";

import { useState, useEffect, useCallback } from "react";
import SideBar from "../SideBar/page";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

function useInvertOnSections(sectionIds = ["mission", "marquee", "contact"]) {
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    function onScroll() {
      let found = false;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        const rect = section.getBoundingClientRect();

        // Section is at least partially in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          found = true;
          break;
        }
      }

      setInverted(found);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Check on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds]);

  return inverted;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const invert = useInvertOnSections(["mission", "marquee", "contact"]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["navbar"],
    queryFn: () =>
      client.fetch(`*[_type == "navbar"][0]`),
  });

  // Utility classnames for inversion
  const textColor = invert ? "text-white" : "text-black";
  const dotBg = invert ? "bg-white" : "bg-black";
  const borderColor = invert ? "#FFF" : "#888";

  // Handler to close menu for accessibility (e.g. esc key, can be expanded)
  const closeMenu = useCallback(() => setOpen(false), []);

  // Fallbacks if fields are missing
  const siteName = data?.siteName;
  // Sanity: [{label: ...}], fallback: ["Works",...]
  const links =
    Array.isArray(data?.links) && data.links.length > 0
      ? data.links
      : ["Works", "Mission", "Contact"];
  const sideBarTitle = data?.sideBarTitle ?? "More Info";

  // Main navigation content to ensure center alignment
  const navContent = (
    <div className="flex flex-col items-center">
      <span className="w-16 font-bold text-lg mb-1">
        <a
          href="#home"
          className={`block text-center border-b-2 ${textColor}`}
          style={{
            borderColor: invert ? "#FFF" : "#000",
            borderBottomWidth: "2px",
            borderBottomStyle: "solid"
          }}>
          {siteName}
        </a>
      </span>
      <div className="flex gap-8 text-sm font-medium">
        {links.map((link, idx) => {
          // Support objects from Sanity and fallback to string
          const label = typeof link === "string" ? link : link.label;
          const labelStr = typeof label === "string" ? label : "";
          const href = `#${labelStr.toLowerCase()}`;
          return (
            <a
              key={labelStr + idx}
              href={href}
              className={textColor}
              style={{ color: invert ? "#FFF" : "#000" }}
            >
              {labelStr}
            </a>
          );
        })}
      </div>
    </div>
  );

  // Loading & error placeholders centered
  if (isLoading) {
    return (
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-center px-8 bg-transparent z-40 ${textColor}`}
      >
        <div className="flex flex-col items-center">
          <span className="w-16 font-bold text-lg mb-1 animate-pulse bg-gray-200 h-6 rounded"></span>
          <div className="flex gap-8 text-sm font-medium">
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
          </div>
        </div>
        <button type="button" className="font-small leading-0.5 ml-8" disabled>
          <span className="text-lg bg-gray-200 w-20 inline-block h-4 rounded animate-pulse"></span>
        </button>
      </nav>
    );
  }

  if (error) {
    return (
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-center px-8 bg-transparent z-40 ${textColor}`}
      >
        <div className="flex flex-col items-center">
          <span className="w-16 font-bold text-lg mb-1 text-red-500">Error</span>
          <div className="flex gap-8 text-sm font-medium">
            <span>Error loading navbar</span>
          </div>
        </div>
        <button type="button" className="font-small leading-0.5 ml-8" disabled>
          <span className="text-lg">...</span>
        </button>
      </nav>
    );
  }

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-center px-8 bg-transparent z-40 ${textColor}`}
      >
        <div className="absolute left-8 flex items-center h-full">
          {/* Empty left-aligned spacer. Hide from screen readers. */}
          <div className="w-25" aria-hidden="true" />
        </div>
        {/* Center nav -- content is centered using justify-center on parent flex */}
        {navContent}
        <div className="absolute right-8 flex items-center h-full">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`font-small leading-0.5 bg-transparent flex flex-col items-center ${textColor}`}
            aria-label="Open sidebar"
          >
            <span className={`text-sm ${textColor}`}>{sideBarTitle}</span>
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${dotBg}`}
                  style={{
                    backgroundColor: "transparent",
                    border: `2px solid ${borderColor}`
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </nav>
      {/* SLIDE MENU - open and close are controlled by open/setOpen */}
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
}