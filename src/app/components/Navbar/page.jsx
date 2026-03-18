"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <a href="#home" className="block text-center border-b-2">SS</a>
          </span>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#works">Works</a>
            <a href="#mission">Mission</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        {/* Right button */}
        <button
          onClick={() => setOpen(true)}
          className="font-small leading-0.5"
        >
          <p className="text-lg">About Us</p>
          {/* <br /> */}
          {/* <p className="text-xs">○ ○ ○</p> */}
        </button>
      </nav>

      {/* SLIDE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Right panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[320px] bg-white z-50 p-8 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="self-end text-sm"
              >
                Close ✕
              </button>

              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Instagram</a>
              <a href="#">Email</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
