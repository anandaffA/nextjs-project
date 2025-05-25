// app/forest/layout.tsx
"use client";
import Navbar from "./components/navigation";
import Footer from "./components/footer";
import { ReactNode } from "react";
import Image from "next/image";
import SidebarLeft from "./components/sidebar-left";
import SidebarRight from "./components/sidebar-right";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ForestLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="font-garamond min-h-screen w-screen flex flex-col">
      <Navbar />
      <main className="relative flex md:px-12 flex-row flex-grow w-full max-w-full max-h-full h-full">
        <Image
          src={"/img/forest.jpg"}
          alt="background-forest"
          onLoad={() => setIsLoading(false)}
          fill
          className="absolute z-0 brightness-75"
          priority
        />

        {/* loading spinner */}
        <AnimatePresence mode="wait">
          {isLoading && (
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
        {/* loading spinner */}

        <SidebarLeft />
        {/* Main content area */}
        <div className="md:flex w-screen md:w-2/3 md:flex-grow relative z-0">
          <div className="absolute inset-0 md:px-[8vw] no-scrollbar z-10 flex flex-col overflow-y-auto bg-opacity-80 p-6 gap-5">
            {children}
          </div>
        </div>
        <SidebarRight />
      </main>
      <Footer />
    </div>
  );
}
