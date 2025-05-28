"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
// import { form, input } from "motion/react-client"

export default function LoginTemplate({ onLogin, testConfirm }) {
  const [input_state, state_function] = useState(false);
  const [input_value, setInput] = useState("");
  const submit_ = (e) => {
    e.preventDefault();
    onLogin(input_value);
  };
  //check screen size...
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // small screen
    };
    checkScreenSize(); // run once
    window.addEventListener("resize", checkScreenSize); // run on resize
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  //const offset = isSmallScreen ? -80 : -125
  return (
    <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
      <AnimatePresence initial={true}>
        {input_state ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              bounce: 0.3,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-black/33 z-0"
          ></motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: input_state ? (isSmallScreen ? -80 : -125) : 0 }}
        exit={{ y: 0 }}
        transition={{
          type: "spring",
          visualDuration: 0.5,
          bounce: 0.15,
          ease: "easeInOut",
        }}
        className="absolute flex flex-col"
      >
        <div className="flex flex-row justify-center">
          <h1
            onClick={() => state_function(!input_state)}
            className="font-bold text-7xl lg:text-9xl md:text-6xl text-white cursor-pointer"
          >
            GHST
          </h1>
          <span className="animate-typography font-bold text-6xl lg:text-9xl md:text-6xl md:-mt-4 text-white">
            _
          </span>
        </div>
        <AnimatePresence mode="wait">
          {!input_state && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 15 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{
                duration: 0.33,
                bounce: 0.3,
                ease: "easeInOut",
              }}
              className="flex flex-col md:flex-row text-white text-xl font-mono z-10 items-center text-center"
            >
              <span
                onClick={() => {
                  onLogin("profile");
                }}
                className="hover:bg-white hover:text-black/90 transition-colors duration-300 cursor-pointer py-5 px-8 border-1 bg-black/25"
              >
                {" "}
                Profile{" "}
              </span>
              <span
                onClick={() => {
                  onLogin("art");
                }}
                className="hover:bg-white hover:text-black/90 transition-colors duration-300 cursor-pointer py-5 px-8 border-1 md:border-x-0 md:border-y-1 bg-black/25"
              >
                {" "}
                Art{" "}
              </span>
              <span
                onClick={() => {
                  testConfirm("forest");
                }}
                className="hover:bg-white hover:text-black/90 transition-colors duration-300 cursor-pointer py-5 px-8 border-1 bg-black/25"
              >
                {" "}
                For.est{" "}
              </span>
              <a
                href="https://drive.google.com/file/d/110VlrxSP8hopxlJkAWVzQ74AbLII0wCS/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-white hover:text-black/90 transition-colors duration-300 cursor-pointer py-5 px-8 border-y-1 border-r-1 border-l-1 md:border-l-0  bg-black/25"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence initial={true}>
        {input_state ? (
          <form onSubmit={submit_} className="z-10">
            <motion.input
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.3,
                ease: "easeInOut",
              }}
              type="password"
              className="border-2 z-0 rounded-full text-white text-center text-2xl lg:text-6xl m-2 p-3"
              value={input_value}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
