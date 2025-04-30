'use client'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ isOpen, onClose, origin, children }) {
  return (
    <AnimatePresence>
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
            className="fixed -translate-x-1/2 -translate-y-1/2 border-2 no-scrollbar border-white z-50 min-w-4/5 md:min-w-3/5 max-h-[92vh] overflow-y-auto"
            initial={{ scale:0, opacity:0, top:origin.y, left:origin.x   }}
            animate={{ scale:1, opacity:1, top:"50%", left:"50%"   }}
            exit   ={{ scale:0, opacity:0, top:origin.y, left:origin.x   }}
            transition={{ type: "spring", stiffness: 233, damping: 33 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
