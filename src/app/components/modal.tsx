"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  origin = { x: 0, y: 0 },
  layout_id = "",
  children,
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/75 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed -translate-x-1/2 left-1/2 -translate-y-1/2 border-2 
            no-scrollbar border-white z-99 min-w-4/5 md:min-w-4/5 max-w-[94vw] max-h-[94vh] 
            md:overflow-y-auto"
            layout
            layoutId={layout_id}
            initial={{ opacity: 0, top: origin.y }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: origin.y }}
            transition={{ type: "spring", stiffness: 233, damping: 33 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
