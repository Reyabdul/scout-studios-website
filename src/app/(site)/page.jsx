// app/page.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTransition from "../components/SectionTransition";
import Home from "./Home/page";
import Works from "./Works/page";
import Mission from "./Mission/page";
import Contact from "./Contact/page";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import CollaborationsMarquee from "../components/CollaborationMarquee/page";
import Intro from "../components/IntroVideo/page";

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // After intro, fade in Navbar, Home, and Footer after 1s
  useEffect(() => {
    let timer;
    if (!showIntro) {
      timer = setTimeout(() => setShowContent(true), 1000);
    }
    return () => clearTimeout(timer);
  }, [showIntro]);

  // When the page loads (and while intro is shown), don't render main content.
  // Intro logic is commented out below for reference.
  // To re-enable, uncomment the rendering conditionals.

  // Remove unreachable/unused setShowContent(false) call,
  // as it was triggering state update on render (see lint warning).

  return (
    <>
      {/* 
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
      */}
        <AnimatePresence>
          {/* 
          {showContent && (
          */}
            <>
              {/* Navbar fades in */}
              <motion.div
                key="navbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="fixed w-full z-50"
                style={{ top: 0, left: 0 }}
              >
                <Navbar />
              </motion.div>

              {/* Home fades in */}
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              >
                <SectionTransition bgColor="white">
                  <Home />
                </SectionTransition>
              </motion.div>

              {/* Works — has its own internal snap, no SectionTransition wrapper */}
              <Works />

              {/* Mission → shrinks into Contact on scroll */}
              <SectionTransition bgColor="#080c0a"> 
                  <Mission />
              </SectionTransition>

              {/* Collaboration Marquee */}
              <section className='bg-[#080c0a] flex items-center justify-center"'>
                  <CollaborationsMarquee />
                </section>

              {/* Contact — last section, no transition needed */}
              <section id="contact" className="bg-[#080c0a] flex items-center justify-center">
                  <Contact />
                </section>

              {/* Footer fades in */}
              <motion.div
                key="footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full"
                style={{ position: "fixed", bottom: 0, left: 0, zIndex: 30 }}
              >
                <Footer />
              </motion.div>
            </>
          {/* )} */}
        </AnimatePresence>
      {/* )} */}
    </>
  );
}
