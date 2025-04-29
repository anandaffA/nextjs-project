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
            className="fixed -translate-x-1/2 -translate-y-1/2 border-2 border-white z-50 min-w-3/5"
            initial={{ scale:0, top:origin.y, left:origin.x   }}
            animate={{ scale:1, top:"50%", left:"50%"   }}
            exit   ={{ scale:0, top:origin.y, left:origin.x   }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
