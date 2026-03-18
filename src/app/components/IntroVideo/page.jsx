"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

export default function Intro({ onFinish }) {
  const [showTitle, setShowTitle] = useState(false);
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    const transitionTimer = setTimeout(() => {
      setTransition(true);
      setTimeout(onFinish, 1000);
    }, 10000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(transitionTimer);
    };
  }, [onFinish]);

  const { data, isLoading } = useQuery({
    queryKey: ["intro page"],
    queryFn: () =>
      client.fetch(`*[_type == "intro"][0]{
        title1,
        title2,
      }`),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      className="fixed inset-0 bg-black cursor-pointer"
      onClick={() => setTransition(true)}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/video/test1.mp4" type="video/mp4" />
      </video>

      <AnimatePresence>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-10 left-10 leading-none"
          >
            <h1 className="font-chillax font-bold text-[14rem] text-[#FFC800] mb-8">
              {data.title1}
            </h1>

            <h1 className="font-chillax font-bold text-[14rem] text-[#FFC800] -mt-20 ml-[20%]">
              {data.title2}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transition && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
