'use client'
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"
import LoginTemplate from "./components/login";
import TestPage from "./components/home";

export default function Home() {
  const [page_state, pageState] = useState('login')
  const login_handler = (yes) =>{
    if (yes == 'testing'){
      pageState('testing')
    }
  }
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
          <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
          {page_state==='login' ? (
          <>
          <div className="flex-1 flex z-10">
            <LoginTemplate onLogin={login_handler}/>
          </div>
          </>
        ) : (
          <>
            <TestPage/>
          </>
        )
      }
      </div>
      </main>
      <footer className=" text-white text-center py-3 z-10">
        <h3 className="font-mono text-sm">2025 GH*ST  -  ALL RIGHTS RESERVED.</h3>
      </footer>
    </div>
  );
}
