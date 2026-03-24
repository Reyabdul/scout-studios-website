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

  if (isLoading) {
    return (
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40 ${textColor}`}
      >
        <div className="w-25 items-center" />
        <div className="flex flex-col items-center flex-1">
          <span className="w-16 font-bold text-lg mb-1 animate-pulse bg-gray-200 h-6 rounded"></span>
          <div className="flex gap-8 text-sm font-medium">
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
            <span className="block h-4 w-12 bg-gray-200 rounded animate-pulse"></span>
          </div>
        </div>
        <button type="button" className="font-small leading-0.5" disabled>
          <span className="text-lg bg-gray-200 w-20 inline-block h-4 rounded animate-pulse"></span>
        </button>
      </nav>
    );
  }

  if (error) {
    return (
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40 ${textColor}`}
      >
        <div className="w-25 items-center" />
        <div className="flex flex-col items-center flex-1">
          <span className="w-16 font-bold text-lg mb-1 text-red-500">Error</span>
          <div className="flex gap-8 text-sm font-medium">
            <span>Error loading navbar</span>
          </div>
        </div>
        <button type="button" className="font-small leading-0.5" disabled>
          <span className="text-lg">...</span>
        </button>
      </nav>
    );
  }

  // Fallbacks if fields are missing
  const siteName = data?.siteName;
  // If links from Sanity, structure is [{label: "Works"}, ...]. For fallback, just use string array.
  const links =
    Array.isArray(data?.links) && data.links.length > 0
      ? data.links
      : ["Works", "Mission", "Contact"];
  const sideBarTitle = data?.sideBarTitle ?? "More Info";

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40 ${textColor}`}
      >
        {/* Left spacer */}
        <div className="w-25 items-center" />

        {/* Center navigation */}
        <div className="flex flex-col items-center flex-1">
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
              // Handle both string (fallback) and object with .label (Sanity)
              const label = typeof link === "string" ? link : link.label;
              // Ensure label is defined and string before using
              const labelStr = typeof label === "string" ? label : "";
              // All links have '#' plus lowercased label, no exceptions
              // e.g. 'Works' -> '#works', 'Contact' -> '#contact'
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

        {/* Right button */}
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
      </nav>
      {/* SLIDE MENU - open and close are controlled by open/setOpen.
          SlideMenu handles closing on overlay click or X button internally using setOpen(false). */}
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
}