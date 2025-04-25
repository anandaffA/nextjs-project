'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { input } from "motion/react-client"

export default function LoginTemplate(){
    
    const [input_state, state_function] = useState(false)

    return (

        <div onClick={() => state_function(!input_state)} className="absolute inset-0 z-10 text-center mx-auto flex flex-col justify-center items-center">
            <motion.div
            layout
            initial={{y: -15 }}
            animate={{y: 0 }}
            exit   ={{y: -15 }}
            //animate={{ y: input_state? -20 : 0 }}
            transition={{
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.3,
                ease: "easeInOut",
                delay: !input_state? 0.5 : 0
                }}
                className="flex flex-row">
                <h1 className="font-bold text-8xl text-white">GHST</h1>
                <span className="animate-typography font-bold text-8xl text-white">_</span>
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
                type="text" className="border-2 rounded-4xl text-white text-6xl m-2 p-3"/>
            ) : null
        }
        </AnimatePresence>
        </div>
    )
}