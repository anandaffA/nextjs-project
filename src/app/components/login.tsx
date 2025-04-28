'use client'
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { form, input } from "motion/react-client"

export default function LoginTemplate({onLogin}){
    
    const [input_state, state_function] = useState(false);
    const [input_value, setInput] = useState('')
    const submit_ = (e) => {
        console.log(input_value)
        e.preventDefault()
        onLogin(input_value)
    }
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
                <form onSubmit={submit_} className="z-10">
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
                type="password" className="border-2 z-0 rounded-4xl text-white text-center text-6xl m-2 p-3"
                value={input_value}
                onChange={(e) => setInput(e.target.value)}
                />
                </form>
            ) : null
        }
        </AnimatePresence>
        </div>
    )
}