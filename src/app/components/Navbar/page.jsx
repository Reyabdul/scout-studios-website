"use client";

import { useState } from "react";
import SlideMenu from "../SlideMenu/page";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full h-20.5 flex items-center justify-between px-8 bg-transparent z-40">

        {/* Left spacer */}
        <div className=" w-25 items-center" />

        {/* Center navigation */}
        <div className="flex flex-col items-center flex-1">
          <span className="w-16 font-bold text-lg mb-1">
            <a href="#home" className="block text-center border-b-2">
              SS
            </a>
          </span>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#works">Works</a>
            <a href="#mission">Mission</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Right button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-small leading-0.5"
        >
          <span className="text-lg">About Us</span>
        </button>
      </nav>
      {/* SLIDE MENU */}
      {/* Pass open and setOpen as props ONLY if SlideMenu uses them. */}
      <SlideMenu open={open} setOpen={setOpen} />
          </>
  );
}
