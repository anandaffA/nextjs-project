'use client'
import Image from "next/image";
import Input from "./components/input";
import LoginCard from "./components/loginCard";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"


export default function Home() {
  let [page_state, pageState] = useState('')
  let content

  switch (page_state) {
    case 'login':
      content = 
      <motion.div
      key="login"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      >
      {/* <button 
        onClick={()=>pageState('register')}
        className="bg-blue-50 text-black font-mono text-2xl outline-2 p-4">TESTINGG</button> */}
      <LoginCard
      />
      </motion.div>
      break;
    case 'register':
      content = 
        <motion.div
        key="register"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="no-scrollbar"
        >
          <h1>TESTINGGG</h1>
          <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
            <button 
            onClick={()=>pageState('login')}
            className="bg-blue-50 text-black font-mono text-2xl outline-2 p-4">TESTINGG</button>
            <AnimatePresence mode='wait'>
            {content}
            </AnimatePresence>
          </div>
        </motion.div>
      break;
    default:
      break;
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col-reverse bg-black">
      <main>
      <AnimatePresence mode='wait'>
        {/* background image */}
          <motion.div 
          key={page_state}
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0 }}
          transition={{
              duration: 0.45,
              bounce: 0.3,
              ease: "easeInOut"
          }}>
          <Image
          onClick={()=>pageState('login')}
          src='/img/forest_home.jpg'
          alt="LoginScreen"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
          />
          </motion.div>
      </AnimatePresence>
          
          <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
            <AnimatePresence mode='wait'>
            {content}
            </AnimatePresence>
          </div>
      </main>
      <footer className=" text-white py-3 z-10 flex justify-between items-center">
        <h3 className="font-mono text-sm text-start mx-5">FOR.EST</h3>
        <h3 className="font-mono text-sm text-end mx-5">2025 GHST_</h3>
      </footer>
    </div>
  );
}
