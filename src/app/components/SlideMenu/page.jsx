"use client"

import { motion, AnimatePresence } from "framer-motion"
import {PortableText} from '@portabletext/react'
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client"
import { p } from "framer-motion/client";

export default function SlideMenu({ open, setOpen }) {

  //pulling data
  const { data, isLoading } = useQuery({
    queryKey: ["about us page"],
    queryFn: () =>
      client.fetch(`*[_type == "aboutUs"][0]`),
  }) ;

  console.log(data)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-1/3 bg-white z-50 p-8 flex flex-col gap-6"
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
            
            <h2>{data.title}</h2>
            <PortableText value={data.body} />
            <h2>{data.subheading1}</h2>
            {Array.isArray(data?.services) && data.services.map((service, idx) => (
              <p key={idx}>{service}</p>
            ))}
            <h2>{data.subheading2}</h2>
            <p>{data.email}</p>
            <h2>{data.subheading3}</h2>
            

            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}