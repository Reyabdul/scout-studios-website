"use client"

// import { useQuery } from "@tanstack/react-query"
// import { sanity } from "@/sanity/lib/client"
import Image from "next/image"

export default function Home() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["homepage"],
  //   queryFn: () =>
  //     sanity.fetch(`*[_type == "homepage"][0]{
  //       title
  //     }`)
  // })

  // if (isLoading) return <p>Loading...</p>

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      {/* <h1 className="text-5xl font-bold">{data?.title}</h1> */}
      <Image
        src="/images/logo.png"
        alt="Scout Studios logo"
        width={300}
        height={300}
        style={{ objectFit: "contain" }}
      />
      <br />
      <h1 className="text-4xl">COOL THINGS UNDER WAY.</h1>
    </section>
  )
}