"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryModalCard(
  isOpen = false,
  title = "",
  desc = "",
  url = ""
) {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const imageUrl = "https://picsum.photos/1200/800?random=1";

  return (
    <>
      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <motion.div
          layoutId="card"
          className="w-72 bg-white shadow-xl rounded-3xl cursor-pointer overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <motion.img
            layoutId="card-image"
            src={imageUrl}
            alt="preview"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <motion.h2 layoutId="card-title" className="text-lg font-bold">
              Gallery Item
            </motion.h2>
            <motion.p className="text-sm text-gray-500">
              Tap to view fullscreen
            </motion.p>
          </div>
        </motion.div>
      </div> */}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => isOpen(false)}
            />

            <motion.div
              layoutId="card"
              className="fixed inset-0 z-30 bg-white rounded-none md:rounded-3xl md:inset-8 overflow-hidden shadow-2xl"
            >
              <motion.img
                layoutId="card-image"
                src={url}
                alt="fullscreen image"
                className="w-full h-[70vh] object-cover"
              />

              <div className="p-6 overflow-auto h-[30vh] md:h-auto">
                <div className="flex justify-between items-center mb-4">
                  <motion.h2
                    layoutId="card-title"
                    className="text-2xl font-bold"
                  >
                    Gallery Item
                  </motion.h2>
                  <button
                    className="text-gray-400 hover:text-black text-2xl leading-none"
                    onClick={() => setIsOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">desc</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
