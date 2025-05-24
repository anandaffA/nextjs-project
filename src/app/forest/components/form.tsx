"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Form({
  isOpen,
  onClose,
  children,
  className = "",
  ...props
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
            className="fixed -translate-x-1/2 left-1/2 -translate-y-1/2 border-2 no-scrollbar border-white z-50 min-w-4/5 md:min-w-3/5 max-h-[92vh] md:overflow-y-auto"
            layout
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: 0 }}
            transition={{ type: "spring", stiffness: 233, damping: 33 }}
          >
            <form
              className={`flex flex-col gap-5 p-5 bg-white/90 rounded-lg shadow-lg ${className}`}
              {...props}
            >
              {children}
            </form>{" "}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
