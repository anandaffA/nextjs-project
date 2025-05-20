"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function TestModal({ isOpen, onClose, layout_id, children }) {
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
            className="fixed -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2  border-2 no-scrollbar border-white z-50 min-w-4/5 w-4/5 md:min-w-3/5 max-h-[92vh] md:overflow-y-auto"
            layoutId={layout_id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 233, damping: 33 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
