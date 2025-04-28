"use client"

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas, fad, fass, fasds } from '@awesome.me/'
export default function ProfileIrlPage({pageReturn}){
    const return_ = () =>{
        pageReturn('login')
    }

    return ( 
        <>
        <div className="relative z-10 flex items-center justify-center">
            <div className="flex flex-row justify-center items-center mx-auto max-h-1/2 gap-4">
            <div className="relative w-50 h-40 md:w-96 md:h-96 basis-1/3">
                <Image
                src={'/img/knight_placeholder.jpg'}
                alt="placeholder"
                fill
                objectFit="cover"
                />
            </div>
            {/* <h1 className="text-white text-8xl">TESTINGG</h1> */}
            <div className="grid grid-cols-2 gap-3 text-lg basis-2/3 font-mono">
                <div className="p-5 border-1 ring-white text-white">Name: </div>
                <div className="p-5 text-white border-1 ring-white">Anandaffa Apriadi</div>
                <div className="p-5 border-1 ring-white text-white">Email: </div>
                <div className="p-5 text-white border-1 ring-white">anandaffa.apriadi@gmail.com</div>
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
        className="text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 p-2">
            <i className="fas fa-arrow-left text-center"></i> Return 
        </button>
        </>
    );
}