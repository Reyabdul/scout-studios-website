"use client"

// import { useQuery } from "@tanstack/react-query"
// import { sanity } from "@/sanity/lib/client"
import Image from "next/image"

export default function Works() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["homepage"],
  //   queryFn: () =>
  //     sanity.fetch(`*[_type == "homepage"][0]{
  //       title
  //     }`)
  // })

  // if (isLoading) return <p>Loading...</p>

  return (
    <div id="works" className="min-h-screen flex items-center justify-center bg-orange text-black">
      {/* <h1 className="text-5xl font-bold">{data?.title}</h1> */}
      Works
    </div>
  )
}