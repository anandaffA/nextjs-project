'use client'
import Button from "./button"
import Modal from "./modal"
import { useState } from "react"
function Art(){
    const [page,setPage] = useState(1)  
    const [is_open_form, openForm] = useState(false)
    const openForm_ = () => {
        openForm(true)
    }

    return(
        <>
            <nav className="flex align-center justify-center md:justify-between px-5">
                <div className="flex justify-center gap-9 pt-5 px-5">
                    <button 
                    disabled={page===1}
                    className=
                    {page !== 1 ? (
                        "text-white text-center hover:bg-white hover:text-black p-2 m-2 transition-colors duration-300 font-mono flex justify-end items-center gap-2 mb-0"
                    ):("text-white text-center hover:text-gray-400 transition-colors p-2 m-2 duration-300 font-mono flex justify-start items-center gap-2 mb-0") }
                    >
                        <i className="fas fa-arrow-left text-center gap-2 mb-0 flex justify-start items-center"></i> Previous
                    </button>
                    <span className="text-white my-auto font-mono text-center">Page {page}</span>            
                    {/* <Button>
                    Next<i className="fas fa-arrow-right text-center"></i>
                    </Button>             */}
                </div>
    
                <div className="flex justify-center pt-5 items-center flex-col md:block">
                {/* <Button onClick=""><i className="fas fa-plus text-center"></i>Add</Button>
                    <Button><i className="fas fa-arrow-left text-center"></i>Return</Button> */}
                </div>
            </nav>
            <span>ANJIRRR</span>
            <Button onClick={openForm_}> + Add Image </Button>
            { is_open_form &&(
                <Modal isOpen={is_open_form} onClose={()=>openForm(false)}>
                    <form className="relative">
                        <div className="flex flex-1 flex-col p-2">
                            <div className="w-full h-86 flex items-center justify-center border-white border-b border-dashed">
                                <label htmlFor="file-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
                                    <p className="text-white text-center">
                                    &gt; Upload Image &lt;
                                    </p>
                                </label>
                                <input id="file-upload" type="file" className="hidden" />
                            </div>

                            <div className="flex flex-row p-1 text-white gap-3">
                                <label className="text-white text-xl "> Title :</label>
                                <input placeholder="title here" className="text-xl border-0 focus:outline-none" type="text" />
                            </div>
                            <div className="flex flex-row p-1 text-white gap-3">
                                <label className="text-white text-xl"> Description :</label>
                                <input placeholder="description here" className="text-xl border-0 focus:outline-none" type="text" />
                            </div>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default Art