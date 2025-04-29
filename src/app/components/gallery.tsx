import { img } from "motion/react-client";
import Image from "next/image";
export default function GalleryTest({returnPage}){
    let gallery=[]
    const return_ = () => {
        returnPage('login')
    }

    for (let a=0 ; a < 9 ; a++) {
        gallery.push(
        <>
    <Image
        className="aspect-3/2 py-2 rounded-2xl object-cover"
        key={`a_${a + 1}`}
        src={`https://picsum.photos/seed/picsum${a + 1 * 123}/400/500`}
        alt=""
        width={400}
        height={500}
    />
    <Image
        className="aspect-square py-2 rounded-2xl object-cover"
        key={`b_${a + 1}`}
        src={`https://picsum.photos/seed/picsum${a + 1 * 321}/400/500`}
        alt=""
        width={400}
        height={500}
    />
    <Image
        className="aspect-2/3 py-2 rounded-2xl object-cover"
        key={`c_${a + 1}`}
        src={`https://picsum.photos/seed/picsum${a + 1 * 69}/400/500`}
        alt=""
        width={400}
        height={500}
    />
    <Image
        className="aspect-square py-2 rounded-2xl object-cover"
        key={`d_${a + 1}`}
        src={`https://picsum.photos/seed/picsum${a + 1 * 521}/400/500`}
        alt=""
        width={400}
        height={500}
    />
        </>
        )
    }

    return(
        <>
        {/* <h1 className="font-mono text-6xl text-white"> Gallery </h1> */}
        <nav className="flex align-bottom justify-between pt-5 px-5">
            <span className="text-white font-mono text-xl"> Gallery </span>
            
            <button 
            onClick={return_} 
            className="text-white text-center hover:bg-white hover:text-black transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0">
                <i className="fas fa-arrow-left text-center"></i> Return 
            </button>
        </nav>
        <div className="columns-2xs gap-5 p-5 min-h-[200vh]">
            {gallery}
        </div>
        </>
    );
}
