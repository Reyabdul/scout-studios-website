"use client"

// import { useQuery } from "@tanstack/react-query"
// import { sanity } from "@/sanity/lib/client"
import Image from "next/image"

export default function Mission() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["homepage"],
  //   queryFn: () =>
  //     sanity.fetch(`*[_type == "homepage"][0]{
  //       title
  //     }`)
  // })

  // if (isLoading) return <p>Loading...</p>

  return (
    <section id="mission" className="min-h-screen flex items-center justify-center bg-white text-black">
      {/* <h1 className="text-5xl font-bold">{data?.title}</h1> */}

    </section>
  )
}