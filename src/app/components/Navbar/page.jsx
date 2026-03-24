"use client";

import { useState } from "react";
import SlideMenu from "../SlideMenu/page";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ["navbar"],
    queryFn: () =>
      client.fetch(`*[_type == "navbar"][0]`),
  });

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40">
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
      <nav className="fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40">
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
  const links = Array.isArray(data?.links) && data.links.length > 0
    ? data.links
    : ["Works", "Mission", "Contact"];
  const sideBarTitle = data?.sideBarTitle ?? "More Info";
  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40">
        {/* Left spacer */}
        <div className="w-25 items-center" />

        {/* Center navigation */}
        <div className="flex flex-col items-center flex-1">
          <span className="w-16 font-bold text-lg mb-1">
            <a href="#home" className="block text-center border-b-2">
              {siteName}
            </a>
          </span>
          <div className="flex gap-8 text-sm font-medium">
            {links.map((link, idx) => {
              // All links have '#' plus lowercased link, no exceptions
              // e.g. 'Works' -> '#works', 'Contact' -> '#contact'
              const href = `#${link.toLowerCase()}`;
              return (
                <a key={link + idx} href={href}>
                  {link}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-small leading-0.5 bg-transparent flex flex-col items-center"
          style={{ backgroundColor: "transparent" }}
        >
          <span className="text-sm">{sideBarTitle}</span>
          <div className="flex gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-black" style={{ backgroundColor: "transparent", border: "2px solid #888" }}></span>
            <span className="w-2 h-2 rounded-full bg-black" style={{ backgroundColor: "transparent", border: "2px solid #888" }}></span>
            <span className="w-2 h-2 rounded-full bg-black" style={{ backgroundColor: "transparent", border: "2px solid #888" }}></span>
          </div>
        </button>
      </nav>
      {/* SLIDE MENU */}
      <SlideMenu open={open} setOpen={setOpen} />
    </>
  );
}
