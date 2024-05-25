'use client'
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../_helpers/localStorage";

export default function HomePage() {
  const router = useRouter()
  const [userData, setUserData] = useState<{ email: string, name: string, accessToken: string }>()

  useEffect(() => {
    const storedUserData = LocalStorage.get('userData')
    if (storedUserData) {
      setUserData(storedUserData)
    }
    else {
      router.push('/')
    }
  }, [router])

  const Map = useMemo(() => {
    return dynamic(() => import("../_components/Map"), { ssr: false })
  }, [])

  function logout() {
    LocalStorage.clear()
    router.push('/')
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/5 h-full flex flex-col p-2 justify-between">
        <div>
          <p className="text-center text-2xl">Bem vindo, {userData?.name}!</p>
        </div>

        <button className="w-full p-2 bg-red-300"
          onClick={() => logout()}
        >
          LOGOUT
        </button>
      </div>

      <div className="w-4/5">
        <Map />
      </div>
    </div>
  );
}
