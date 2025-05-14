"use client"

import { useState } from "react";
import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion} from "motion/react"
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
        <div className="relative z-10 items-center justify-center w-full h-full md:w-auto md:h-auto">
            <div className="flex flex-col md:flex-row gap-4 w-full h-full md:w-auto md:h-auto">
                <motion.div 
                onClick={handleClick}
                className="relative m-4 md:m-0 md:w-96 h-100 overflow-y-auto">
                    <Image
                    src={'/img/knight_placeholder.jpg'}
                    alt="placeholder"
                    fill
                    objectFit="cover"
                    />
                </motion.div>
                
                {/* <h1 className="text-white text-8xl">TESTINGG</h1> */}
                <div className="grid grid-cols-2 gap-3 px-3 md:px-0 text-lg basis-2/3 font-mono">
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
        <button 
        onClick={return_} 
        className="text-white text-center hover:bg-white mb-18 md:0 hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 p-4 md:p-2">
            <i className="fas fa-arrow-left text-center"></i> Return 
        </button>
        <Modal isOpen={open_profile} onClose={()=>OpenProfile(false)} origin={origin}>
            <div onClick={()=>OpenProfile(false)} className="flex flex-col md:flex-row gap-x-5 justify-items-start items-center">
                <div 
                className="relative w-80 h-40 md:w-80 md:h-96 basis-1/3">
                    <Image
                    src={'/img/knight_placeholder.jpg'}
                    alt="placeholder"
                    fill
                    style={{objectFit:"cover"}}
                    />
                </div>        
                <div className="basis-2/3">
                <p className="text-white font-garamond py-5 text-xl text-left">
Born in Jakarta, Big fan of art and games, unless we&quot;re talking about gacha games, those can choke. I do art myself too.
<br/><br />
Started coding back in college when I decided sleep was optional. Did a one-year internship as a PHP developer (don&quot;t judge me, we&quot;ve all got skeletons), graduated, and then jumped straight into the chaotic freedom of freelance illustration, because what screams financial security more than drawing for random people?
<br /><br />
Currently locked into a working contract as a full-stack dev using Django, Bootstrap, and PostgreSQL. Basically juggling both ends of the stack like it owes me money.
<br /><br />
I used to hate JavaScript with the burning passion of a thousand devlogs, but now I&apos;m learning React/Next.js on the fly and honestly is enjoying it. Tailwind&quot;s also cool, which means I&quot;ve officially crossed into actually likes front-end territory.
<br /><br />
This is NOT optimized for mobile yet. I&apos;ll get there eventually. Probably.
                </p>
                </div>
            </div>
        </Modal>

        </>
    );
}