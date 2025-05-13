'use client'
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"
import LoginTemplate from "./components/login";
import ProfileIrlPage from "./components/home";
import GalleryTest from "./components/gallery-test";
import Art from "./components/art";

function Home() {
  const [page_state, pageState] = useState<string>('login')
  const [is_loaded, loadState] = useState<boolean>(false)
  
  const bg_url = {
    'login' :'/img/home.png',
    'profile' :'/img/profile-irl.jpg',
    'gallery' :'/img/stars_bg.jpg',
    'test' : '/img/johnbrosio inspired.png'
  }
  const bg_credit = {
    'login' : 'ME',
    'profile' : 'Simon Stalenhag',
    'gallery' : 'idk...',
    'test' : 'MEEE'
  }

  const credit = bg_credit[page_state] || 'ME'
  const bg_switch = bg_url[page_state] || '/img/stars_bg.jpg'
  // const login_handler = (input) =>{
  //   console.log("LOGIN_HANDLER_INPUT: ",input)
  //   pageState(input)
  //   console.log("LOGIN_HANDLER: ",page_state)
  // }
  let content

  switch (page_state) {
    case 'login':
      content = <motion.div
      key="login"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      >
      <div className="flex-1 flex z-10">
        <LoginTemplate onLogin={pageState}/>
      </div>
      </motion.div>
      break;
    case 'profile':
      content = 
        <motion.div
        key="profile"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="no-scrollbar"
        >
          <ProfileIrlPage pageReturn={pageState}/>
        </motion.div>
      break;
    case 'gallery':
      content = 
        <motion.div
        key="gallery-test"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full md:w-2/3 overflow-y-auto overflow-x-auto justify-center items-center no-scrollbar">
          <GalleryTest returnPage={pageState}/>
        </motion.div>
      break;
    case 'test':
      content = 
        <motion.div
        key="art-gallery"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="relative h-full w-full md:w-5/6 overflow-y-auto justify-center items-center no-scrollbar">
          <Art/>
        </motion.div>
      break;
    default:
      alert('Invalid Entry!')
      pageState('login')
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
          src={bg_switch}
          alt="LoginScreen"
          layout="fill"
          objectFit="cover"
          onLoadingComplete={()=>loadState(true)}
          className={page_state != 'login' ? "brightness-75" : "brightness-100"}
          />
          </motion.div>
      </AnimatePresence>
        {!is_loaded ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )
          : (
          <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
            <AnimatePresence mode='wait'>
            {content}
            </AnimatePresence>
          </div>
          )
        }
      </main>

      <footer className=" text-white py-3 z-10 flex justify-between items-center">
        <h3 className="font-mono text-sm text-start mx-5">Background Art by {credit}</h3>
        <h3 className="font-mono text-sm text-end mx-5">2025 GHST_</h3>
      </footer>

    </div>
  );
}

export default Home