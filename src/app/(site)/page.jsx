"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Intro from "../components/IntroVideo/page";
import Home from "./Home/page";
import Mission from "./Mission/page";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";
import Works from "./Works/page";

export default function Page() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : ( */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2, ease: "easeOut" }}
      >
        <Navbar />
        <main className="min-h-screen pt-20.5 pb-16">
          <section id="home" className="snap-start h-screen">
            <Home />
          </section>
          <section id="works">
            <Works />
          </section>

          <section id="mission" className="snap-start h-screen">
            <Mission />
          </section>
          {/* 
      <section id="contact" className="snap-start h-screen">
        <ContactSection />
      </section> */}
        </main>
        <Footer />
      </motion.div>
      {/* )} */}
    </>
  );
}
