'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { input } from "motion/react-client"

export default function LoginTemplate(){
    
    const [input_state, state_function] = useState(false)

    return (
        <div className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center font-garamond">
            <AnimatePresence initial={true}>
            {
                input_state ? (
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0   }}
                    transition={{
                        duration: 0.5,
                        bounce: 0.3,
                        ease: "easeInOut"
                    }}
                    className="fixed inset-0 bg-black/33 z-0"></motion.div>
                ) : null
            }
            </AnimatePresence>
            <motion.div
            onClick={() => state_function(!input_state)}
            animate={{y: input_state ? -125 : 0 }}
            //animate={{ y: input_state? -20 : 0 }}
            transition={{
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.15,
                ease: "easeInOut",
                }}
                className="absolute flex flex-row">
                <h1 className="font-bold text-9xl text-white">GHST</h1>
                <span className="animate-typography font-bold text-9xl -mt-4 text-white">_</span>
            </motion.div>
        <AnimatePresence initial={true}>
          { 
            input_state ? (
                <motion.input
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                    type: "spring",
                    visualDuration: 0.5,
                    bounce: 0.3,
                    ease: "easeInOut"
                }}
                type="password" className="border-2 z-0 rounded-4xl text-white text-center text-6xl m-2 p-3"/>
            ) : null
        }
        </AnimatePresence>
        </div>
    )
}