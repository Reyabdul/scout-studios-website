import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-white sm:items-start">
        <Image
          // className="dark:invert"
          src="/image/logo.png"
          alt="Scout Studios logo"
          width={1000}
          height={1000}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">

        </div>
      </main>
    </div>
  );
}
