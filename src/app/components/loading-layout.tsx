'use client'
import { motion, AnimatePresence } from "motion/react"
import { useLoading } from "./loading-context"

export default function LoadingOverlay(){
    const {isLoading} = useLoading()
    return(
        <>
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
                    className="absolute inset-0 flex justify-center items-center z-20 bg-black/45"
                    >
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
                </motion.div>
            )}
            </AnimatePresence>
            {/* loading spinner */}
        </>
    )
}