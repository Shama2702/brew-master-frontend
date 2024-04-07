import Link from "next/link";

export default function Home() {
  return (
    <main className="h-[calc(100vh-60px)] lg:h-[calc(100vh-90px)] relative flex items-center justify-center">
      <img src="/hero-bg.jpeg" alt="" className="h-full w-full object-cover" />
      <div className="absolute bg-black bg-opacity-50 p-8 rounded">
        <h1 className="text-white text-4xl lg:text-6xl font-bold">
          BrewMaster
        </h1>
        <p className="text-white text-sm lg:text-lg">The best coffee in town</p>
        <div className="flex gap-2">
          <Link href={"/menu"}>
            <button className="bg-white text-black px-4 py-2 mt-4 rounded">
              View Menu
            </button>
          </Link>
          <Link href={"/order-track"}>
            <button className="bg-white text-black px-4 py-2 mt-4 rounded">
              Track Order
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
