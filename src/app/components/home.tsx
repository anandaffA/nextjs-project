"use client"

import { useState } from "react";
import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from "motion/react"
import Button from "./buttontemplate";
import Modal from "./modal";

// import { fas, fad, fass, fasds } from '@awesome.me/'
export default function ProfileIrlPage({pageReturn}){
    const [open_profile, OpenProfile] = useState(false)
    const [origin, setOrigin] = useState({ x: 0, y: 0 })

    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
        OpenProfile(true)
    }

    const return_ = () =>{
        pageReturn('login')
    }

    return ( 
        <>
        <div className="relative z-10 flex items-center justify-center h-full w-full">
            <div className="flex flex-col md:flex-row justify-center items-center mx-auto gap-4 h-full w-full">
                <motion.div 
                onClick={handleClick}
                className="relative w-50 h-40 md:w-96 md:h-96 basis-1/3">
                    <Image
                    src={'/img/knight_placeholder.jpg'}
                    alt="placeholder"
                    fill
                    objectFit="cover"
                    />
                </motion.div>
                
                {/* <h1 className="text-white text-8xl">TESTINGG</h1> */}
                <div className="grid grid-cols-2 gap-3 text-lg basis-2/3 font-mono">
                    <div className="p-5 border-1 ring-white text-white">Name: </div>
                    <div className="p-5 text-white border-1 ring-white">Anandaffa Apriadi</div>
                    <div className="p-5 border-1 ring-white text-white">Email: </div>
                    <div className="p-5 text-white border-1 ring-white">test</div>
                    <div className="p-5 border-1 ring-white text-white">Age: </div>
                    <div className="p-5 text-white border-1 ring-white">26 y/o (29 April 1999)</div>
                    <div className="p-5 border-1 ring-white text-white">Last Education: </div>
                    <div className="p-5 text-white border-1 ring-white">Binus University (IT), S1</div>
                    <a href="https://drive.google.com/file/d/1yUWHHTvW4hvroIqWinTavjgK8Y50ernF/view?usp=sharing" 
                    target="_blank" rel="noopener noreferrer"
                    className="col-span-2 p-5 border-1 ring-white text-white
                    transition-colors duration-300 hover:bg-white hover:text-black
                    ">Resume <i className="fas fa-download"></i></a>
                </div>
            </div>   
        </div>
        <Modal isOpen={open_profile} onClose={()=>OpenProfile(false)} origin={origin}>
            <div onClick={()=>OpenProfile(false)} className="flex flex-row gap-x-5 justify-items-start items-center">
                <div 
                className="relative w-28 h-40 md:w-80 md:h-96 basis-1/3">
                    <Image
                    src={'/img/knight_placeholder.jpg'}
                    alt="placeholder"
                    fill
                    style={{objectFit:"cover"}}
                    />
                </div>        
                <div className="basis-2/3">
                <p className="text-white font-garamond py-5 text-xl text-left">Born in Jakarta, art and gaming enthusiast (fuck gacha games though), is an artist myself.
                Started coding in college, did an internship for one year as a PHP developer then graduated.
                Worked as a freelance illustrator after graduation and now currently has a working contract as a full-stack developer using Django w/ bootstrap and PostgreSQL
                And now working in this profile section while learning React/Next.js on the go! Despised javascript but... <br/>Honestly it's been fun learning this and Tailwind
                <br /><br />
                I have NOT optimize this app for mobile, i will eventually..
                </p>
                </div>
            </div>
        </Modal>
        <button 
        onClick={return_} 
        className="text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 p-2">
            <i className="fas fa-arrow-left text-center"></i> Return 
        </button>
        </>
    );
}