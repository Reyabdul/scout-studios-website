"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../sanity/lib/client";

export default function SlideMenu({ open, setOpen }) {
  const { data, isLoading } = useQuery({
    queryKey: ["about us page"],
    queryFn: () => client.fetch(`*[_type == "aboutUs"][0]`),
  });

  if (!open) return null;

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
            className="fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 bg-white z-50 p-8 flex flex-col gap-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button
              onClick={() => setOpen(false)}
              className="self-end text-sm"
              aria-label="Close menu"
            >
              Close ✕
            </button>

            {isLoading ? (
              <p>Loading...</p>
            ) : data ? (
              <>
                <h1>{data.title}</h1>
                {data.body && <PortableText value={data.body} />}
                {data.subheading1 && <h2>{data.subheading1}</h2>}
                {Array.isArray(data.services) &&
                  data.services.map((service, idx) => (
                    <p key={idx}>{service}</p>
                  ))}
                {data.subheading2 && <h2>{data.subheading2}</h2>}
                {data.email && <p>{data.email}</p>}
                {data.subheading3 && <h2>{data.subheading3}</h2>}
              </>
            ) : (
              <p>No data available.</p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}