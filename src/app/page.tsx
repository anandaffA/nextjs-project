"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Modal from "./components/modal";
import LoginTemplate from "./components/login";
import ProfileIrlPage from "./components/home";
import GalleryTest from "./components/gallery-test";
import Art from "./components/art";

function Home() {
  const [page_state, pageState] = useState<string>("login");
  const [page_confirm, confirmState] = useState<string>("");
  const [is_loaded, loadState] = useState<boolean>(false);
  const router = useRouter();

  const bg_url = {
    login: "/img/home.png",
    profile: "/img/profile-irl.jpg",
    gallery: "/img/stars_bg.jpg",
    art: "/img/johnbrosio inspired.png",
  };
  const bg_credit = {
    login: "ME",
    profile: "Simon Stalenhag",
    gallery: "idk...",
    art: "MEEE",
  };

  const credit = bg_credit[page_state] || "ME";
  const bg_switch = bg_url[page_state] || "/img/stars_bg.jpg";
  // const login_handler = (input) =>{
  //   console.log("LOGIN_HANDLER_INPUT: ",input)
  //   pageState(input)
  //   console.log("LOGIN_HANDLER: ",page_state)
  // }
  let content: React.ReactNode;

  useEffect(() => {
    loadState(false);
  }, [bg_switch]);

  switch (page_state) {
    case "login":
      content = (
        <motion.div
          key="login"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 flex z-10">
            <LoginTemplate onLogin={pageState} testConfirm={confirmState} />
          </div>
        </motion.div>
      );
      break;
    case "profile":
      content = (
        <motion.div
          key="profile"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative no-scrollbar w-full h-full md:h-auto md:w-auto overflow-y-auto md:overflow-y-visible"
        >
          <ProfileIrlPage pageReturn={pageState} />
        </motion.div>
      );
      break;
    case "gallery":
      content = (
        <motion.div
          key="gallery-test"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full md:w-2/3 overflow-y-auto overflow-x-auto justify-center items-center no-scrollbar"
        >
          <GalleryTest returnPage={pageState} />
        </motion.div>
      );
      break;
    case "art":
      content = (
        <motion.div
          key="art-gallery"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full md:w-6/7 overflow-y-auto justify-center items-center no-scrollbar"
        >
          <Art returnPage={pageState} isLoading={loadState} />
        </motion.div>
      );
      break;
    case "forest":
      router.push("/forest/home");
      break;
    default:
      alert("Invalid Entry!");
      pageState("login");
      break;
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col-reverse bg-black">
      <main>
        <AnimatePresence mode="wait">
          {/* background image */}
          <motion.div
            key={page_state}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              bounce: 0.3,
              ease: "easeInOut",
            }}
          >
            <Image
              src={bg_switch}
              alt="LoginScreen"
              fill
              objectFit="cover"
              onLoad={() => loadState(true)}
              className={
                page_state != "login" ? "brightness-75" : "brightness-100"
              }
            />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!is_loaded && (
            <motion.div
              key="loading_spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                bounce: 0.2,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex justify-center items-center z-20 bg-black/35"
            >
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
          <AnimatePresence mode="wait">{content}</AnimatePresence>
        </div>

        <Modal isOpen={page_confirm} onClose={() => confirmState("")}>
          <div className="flex flex-1 flex-col p-4">
            <span className="text-white p-2 font-mono text-center ">
              Experimental feature in Development! Proceed?
            </span>
            <div className="flex flex-1 flex-row gap-8 text-white text-center font-mono items-center justify-center">
              <span
                onClick={() => pageState(page_confirm)}
                className="hover:bg-white hover:text-black/80 transition-colors cursor-pointer p-4 w-50 border-1"
              >
                Yes
              </span>
              <span
                onClick={() => confirmState("")}
                className="hover:bg-white hover:text-black/80 transition-colors cursor-pointer p-4 w-50 border-1"
              >
                No
              </span>
            </div>
          </div>
        </Modal>
      </main>

      <footer className=" text-white py-3 z-10 flex justify-between items-center">
        <h3 className="font-mono text-sm text-start mx-5">
          Background Art by {credit}
        </h3>
        <h3 className="font-mono text-sm text-end mx-5">2025 GHST_</h3>
      </footer>
    </div>
  );
}

export default Home;
