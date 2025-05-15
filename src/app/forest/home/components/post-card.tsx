import Image from "next/image"

function Post({title, description, img_src}){
    return(
            <div className="relative box-border
            bg-white/85 border-grey-200 shadow-lg shadow-forest-highlight/75
            rounded-xl w-full max-w-md mx-auto  outline-1 outline-forest-bark/35
            ">
                <div className="relative w-full aspect-3/2">
                    <Image
                    key={`key_${title}`}
                    src={img_src}
                    alt="example"
                    className="rounded-t-lg object-cover"
                    fill
                    />
                </div>
                    <h1 className="text-xl text-forest-moss font-semibold p-3 border-b-1 border-dashed">{title} </h1>
                    <p  className="text-sm text-forest-moss p-3">{description}</p>
                    <div className="p-2 mb-2">
                        <button 
                        className="text-base p-2 font-bold cursor-pointer 
                        text-forest-moss hover:text-white
                        hover:bg-forest-moss transition-colors duration-300 "> 
                        Read More <i className="fas fa-chevron-right"></i> </button>
                    </div>
            </div>
    )
}

export default Post