import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"
import { div } from "motion/react-client";

export default function GalleryTest({returnPage}){
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const return_ = () => {
        returnPage('login')
    }
    const changePage = (num) =>{
        setData([])
        setPage(num)
    }
    useEffect(() => {
        async function get_list(){
            const get_data = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=18`)
            const set_data = await get_data.json()
            setData(set_data)
        }
        get_list()
    },[page])

    return(
        <>
        {/* <h1 className="font-mono text-6xl text-white"> Gallery </h1> */}
        <nav className="flex align-center justify-between px-5">
            <div className="flex justify-center gap-9 pt-5 px-5">
                <button 
                disabled={page===1}
                onClick={() => changePage(page-1)} 
                className=
                {page !== 1 ? (
                    "text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0"
                ):("text-white text-center hover:text-gray-400 transition-colors duration-300 font-mono flex justify-start items-center gap-2 mb-0") }
                >
                    <i className="fas fa-arrow-left text-center gap-2 mb-0 flex justify-start items-center"></i> Previous
                </button>
                <span className="text-white font-mono text-center"> Page {page}</span>            
                <button 
                onClick={() => changePage(page+1)} 
                className="text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0">
                    Next<i className="fas fa-arrow-right text-center"></i>
                </button>            
            </div>
            <div className="flex justify-center pt-5 items-center">
                <button 
                onClick={return_} 
                className="text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0">
                    <i className="fas fa-arrow-left text-center"></i> Return 
                </button>
            </div>
        </nav>
        <div className="columns-2xs gap-5 p-5" id="gallery" key="gallery">
            <AnimatePresence>
            {
            data.map((itm)=>{
                let aspectClass = "aspect-square"; 
                if (itm.width > itm.height) {
                    if (itm.width/itm.height > 1.5){aspectClass = "aspect-4/2"; }
                    else {aspectClass="aspect-3/2"}
                } else if (itm.height > itm.width) {
                    aspectClass = "aspect-2/3"; 
                }
                //asdasd
                return(
                    <motion.div
                    key={`animate_${itm.id}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.42 }}
                    >
                        <Image
                        className={`${aspectClass} py-2 rounded-2xl object-cover`}
                        src={itm.download_url}
                        alt={itm.author}
                        width={400}
                        height={500}
                        />
                    </motion.div>
                )
            })}
            </AnimatePresence>
        </div>
        </>
    );
}
