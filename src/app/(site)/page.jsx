"use client"

import { useState } from "react"
import Intro from "../components/IntroVideo/page"
import Home from "./Home/page"
import Navbar from "../components/Navbar/page"
import Footer from "../components/Footer/page"
import Work from "./Works/page"
import Works from "./Works/page"

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          <Navbar />
          <main className="min-h-screen pt-20.5 pb-16">
            <Home />
            <Works />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}