import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"
import Button from "./button";
import Modal from "./modal";

 function GalleryTest({returnPage}){
    type ImageItem = {
        id: string;
        author: string;
        width: number;
        height: number;
        url: string;
        download_url: string;
      };
    
    const [data, setData] = useState<ImageItem[]>([]); 
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

    const [open_modal, openModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [origin, setOrigin] = useState({ x: 0, y: 0 })

    const handleClick = (event,itm) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
        setSelectedImage(itm)
        openModal(true)
    }

    return(
        <>
        <nav className="flex align-center justify-center md:justify-between px-5">
            <div className="flex justify-center gap-9 pt-5 px-5">
                <button 
                disabled={page===1}
                onClick={() => changePage(page-1)} 
                className=
                {page !== 1 ? (
                    "text-white text-center hover:bg-white hover:text-black p-2 m-2 transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0"
                ):("text-white text-center hover:text-gray-400 transition-colors p-2 m-2 duration-300 font-mono flex justify-start items-center gap-2 mb-0") }
                >
                    <i className="fas fa-arrow-left text-center gap-2 mb-0 flex justify-start items-center"></i> Previous
                </button>
                <span className="text-white my-auto font-mono text-center">Page {page}</span>            
                <Button 
                onClick={() => changePage(page+1)}>
                Next<i className="fas fa-arrow-right text-center"></i>
                </Button>            
            </div>

            <div className="flex justify-center pt-5 items-center flex-col md:block">
            <Button onClick=""><i className="fas fa-plus text-center"></i>Add</Button>
                <Button onClick={return_}><i className="fas fa-arrow-left text-center"></i>Return</Button>
            </div>
        </nav>
        <div className="columns-2 md:columns-3 gap-5 p-5" id="gallery" key="gallery">
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
                        <motion.div
                        layout
                        layoutId={`layout_${itm.id}`}
                        >
                        <Image
                        onClick={(e) => handleClick(e,itm)}
                        className={`${aspectClass} py-2 shadow-2xl object-cover cursor-pointer`}
                        src={itm.download_url}
                        alt={itm.author}
                        width={400}
                        height={500}
                        />
                        </motion.div>
                    </motion.div>
                )
            // border
            })
        }
            {selectedImage &&  ( 
                <Modal isOpen={open_modal} onClose={()=>openModal(false)} origin={origin} key={`modal_${selectedImage.id}`} layout_id={`layout_${selectedImage.id}`}>
                <Image
                className="relative object-cover w-auto md:w-full h-96 md:h-auto"
                src={selectedImage.download_url}
                alt={`alt_${selectedImage.author}`}
                width={400}
                height={500}
                />
                <div className="flex flex-col">
                    <p className="text-white text-start p-4 flex align-middle text-lg"> By: {selectedImage.author}</p>
                    <p className="text-white text-start p-4 flex align-middle text-lg"> The most of Lorem through the eyes of Ipsumus, Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </Modal>
            )}
            </AnimatePresence>
        </div>
        </>
    );
}

export default GalleryTest