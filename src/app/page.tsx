'use client'
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"
import LoginTemplate from "./components/login";
import ProfileIrlPage from "./components/home";
import GalleryTest from "./components/gallery";

export default function Home() {
  const [page_state, pageState] = useState('login')
  const bg_url = {
    'login' :'/img/home.png',
    'profile_irl' :'/img/profile-irl.jpg',
    'gallery' :'/img/stars_bg.jpg',
  }
  const bg_switch = bg_url[page_state] || '/img/stars_bg.jpg'
  const login_handler = (input) =>{
    if (input == 'profile'){pageState('profile_irl')}
    else if (input == 'login') { pageState('login')}
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
          exit={{ opacity: 0   }}
          transition={{
              duration: 0.45,
              bounce: 0.3,
              ease: "easeInOut"
          }}>
          <Image
          src={bg_switch}
          alt="LoginScreen"
          layout="fill"
          objectFit="cover"
          priority
          className={page_state != 'login' ? "brightness-50" : "brightness-100"}
          />
          </motion.div>
          
          <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
          {page_state==='login' ? (
            
            <motion.div
            key="login"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            >
            <div className="flex-1 flex z-10">
              <LoginTemplate onLogin={login_handler}/>
            </div>
            </motion.div>
            ) : (
              <motion.div
              key="profile"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-2/3 overflow-y-auto justify-center items-center no-scrollbar">
                <GalleryTest returnPage={login_handler}/>
                {/* <ProfileIrlPage pageReturn={login_handler}/> */}
              </motion.div>
            )
          }
      </div>
      </AnimatePresence>
      </main>

      <footer className=" text-white py-3 z-10 flex justify-between items-center">
        <h3 className="font-mono text-sm text-start mx-5">Background Art by ME, yes i can draw too</h3>
        <h3 className="font-mono text-sm text-end mx-5">2025 GHST_</h3>
      </footer>

    </div>
  );
}
