'use client'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../_components/Map"), { ssr: false })

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/5 bg-emerald-300">
        LEFT
      </div>
      <div className="w-4/5">
        <Map />
      </div>
    </div>
  );
}
