'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../../components/login/client";

export default function SidebarLeft() {
  type User = {
    name:string,
    username:string,
    age: number,
    gender: string,
    profile_picture: string, 
    description: string
  }

  const [user, setUser] = useState<User[]>([])
  const router = useRouter()

  //ssr api
  useEffect(()=>{
    const getUserData = async () => {
      const userData = await getUser()
      if (userData) {setUser(userData)}
      else { router.push('/forest') }
      console.log("Browser: ",userData)
      setUser(userData)
    }
    getUserData()
  },[])

  return (
    <div
      className="hidden md:flex w-0 md:w-1/5 shadow-xl shadow-black
           bg-black/25 text-white flex-col items-center justify-center z-10
           text-xl font-mono text-center gap-12"
    >
      <div className="flex flex-1 flex-col gap-5 bg-black/5 items-center mx-5 py-5 ">
        <Image
          src={user['profile_picture'] || "https://picsum.photos/seed/picsum/400/400"}
          alt="profile"
          className="object-cover aspect-square rounded-full shadow-lg shadow-black/50"
          width={128}
          height={128}
        />
        {/* <span className="">Username</span> */}
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Dashboard
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100"
        onClick={()=>router.push('/forest/home/profile')}
        >
          Profile
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Settings
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Logout
        </span>
      </div>
    </div>
  );
}
