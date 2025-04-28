"use state"

import { useState } from "react";
import Image from "next/image";

export default function TestPage(){

    return ( 
        <div className="relative z-10 flex items-center justify-center">
            <div className="flex flex-row justify-center items-center mx-auto max-h-1/2 gap-4">
            <Image
            src={'/img/knight_placeholder.jpg'}
            alt="placeholder"
            width={600}
            height={800}
            objectFit="cover"
            className="basis-1/3 max-h-1/2"
            />
            {/* <h1 className="text-white text-8xl">TESTINGG</h1> */}
            <div className="grid grid-cols-2 gap-3 text-lg basis-2/3">
                <div className="p-5 border-1 ring-white text-white">Name: </div>
                <div className="p-5 text-white border-1 ring-white">Jacob Frye</div>
                <div className="p-5 border-1 ring-white text-white">Name: </div>
                <div className="p-5 text-white border-1 ring-white">Jacob Frye</div>
                <div className="p-5 border-1 ring-white text-white">Name: </div>
                <div className="p-5 text-white border-1 ring-white">Jacob Frye</div>
                <div className="p-5 border-1 ring-white text-white">Name: </div>
                <div className="p-5 text-white border-1 ring-white">Jacob Frye</div>
                <a href="" 
                className="col-span-2 p-5 border-1 ring-white text-white
                transition-colors duration-300 hover:bg-white hover:text-black
                ">Download Document</a>
            </div>
            </div>
        </div>
    );
}