'use client'
import Image from "next/image";
import { useState } from "react";
import LoginTemplate from "./components/login";

export default function Home() {
  const [page_state, pageState] = useState('login')
  return (
    <div className="relative min-h-screen w-screen flex flex-col-reverse">
      <main>
        <Image
        src="/img/home.png"
        alt="LoginScreen"
        layout="fill"
        objectFit="cover"
        priority
        />
        <div className="flex-1 flex">
        <LoginTemplate/>
        </div>
      </main>
      <footer className=" text-white text-center py-3 z-10">
        <h3 className="font-mono text-sm">2025 GH*ST  -  ALL RIGHTS RESERVED.</h3>
      </footer>
    </div>
  );
}
