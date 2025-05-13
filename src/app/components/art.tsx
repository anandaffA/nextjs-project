'use client'
import Button from "./button"
import Modal from "./modal"
import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabase"
import Image from "next/image"



function Art(){
    //const [page,setPage] = useState(1)  
    type ImageData = {
    id: string;
    title: string;
    description: string;
    path: string;
    };
    const [is_open_form, openForm] = useState<boolean>(false)
    const [title, setTitle] = useState<string|null>(null)
    const [description, setDesc] = useState<string|null>(null)
    const [file, setFile] = useState<File | null> (null)
    const [preview, setPreview] = useState<string | null>(null)
    const [images, imageData] = useState<ImageData[]>([])

    const openForm_ = () => {
        openForm(true)
    }

    const imageChange = (e) =>{
        const image = e.target.files[0]
        setFile(image)
        if (image) {setPreview(URL.createObjectURL(image))}
    }

    const submitForm_  = async (e) => {
        e.preventDefault()
        if (!file || !title || !description){ 
            alert("Please complete the form before submitting!")
            return false;
        }
        //console.log(title, description, file)
        
        const file_format = file.name.split('.').pop()
        const file_name = `${Date.now()}.${file_format}`

        //console.log("File Name: " , file_name)

        const {error:error}  = await supabase.storage.from('art-images').upload(file_name,file)
        if (error) {
            alert(`Upload failed with ${error.message}`)
            return false;
        }

        const {data: get_url} = await supabase.storage.from('art-images').getPublicUrl(file_name)
        const img_url = get_url.publicUrl
        const {error:insertError} = await supabase.from('gallery').insert([{
            'title' : title,
            'description' : description,
            'file_name' : file_name,
            'path' : img_url
        }])
        if (insertError){
            alert(`Failed to Insert Database with ${insertError.message}`)
            return false;
        } else { alert ("Success!")}

    }

    useEffect( () => {
        const get_images = async () =>{
            const {data, error} = await supabase.from('gallery').select('*')
            if (error) { 
                alert ("What da hell!!")
                return false;}
            else {
                console.log(data)
                imageData(data)
            }
        }
        get_images()
    },[])
    
    return(
        <>
            <nav className="flex align-center justify-center md:justify-between px-5">
                {/* <div className="flex justify-center gap-9 pt-5 px-5">
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
                    <Button>
                    Next<i className="fas fa-arrow-right text-center"></i>
                    </Button>            
                </div> */}
    
                <div className="flex justify-center pt-5 items-center flex-col md:block">
                {/* <Button onClick=""><i className="fas fa-plus text-center"></i>Add</Button>
                    <Button><i className="fas fa-arrow-left text-center"></i>Return</Button> */}
                </div>
            </nav>
            <Button onClick={openForm_}> + Add Image </Button>

            <div className="relative  columns-2 md:columns-4">
                    {images.map(img =>{
                        return(
                            <Image
                            className={`py-2 shadow-2xl object-cover cursor-pointer`}
                            key={`img_${img.id}`}
                            src={img.path}
                            alt={img.title}
                            width={400}
                            height={500}
                            />
                        )
                    })}
            </div>


            { is_open_form &&(
                <Modal isOpen={is_open_form} onClose={()=>openForm(false)}>
                    <form className="relative">
                        <div className="flex flex-col p-2">
                            <div className="relative w-full h-86 flex items-center justify-center border-white border-b border-dashed">
                                <label htmlFor="file-upload" className="w-full h-full flex items-center justify-center cursor-pointer">
                                    <p className="text-white text-center">
                                    &gt; Upload Image &lt;
                                    </p>
                                { preview && (
                                    <Image
                                    src={preview}
                                    alt={preview}
                                    objectFit="contain"
                                    fill
                                    />
                                )}
                                </label>
                                <input onChange={imageChange} id="file-upload" type="file" className="hidden"/>
                            </div>

                            <div className="flex flex-row p-1 text-white gap-3">
                                <label className="text-white text-xl flex-none "> Title :</label>
                                <input onChange={e => setTitle(e.target.value)} id="title" placeholder="title here" className="text-xl border-0 focus:outline-none flex-1" type="text" />
                            </div>
                            <div className="flex flex-row p-1 text-white gap-3">
                                <label className="text-white text-xl flex-none"> Description :</label>
                                <input onChange={e => setDesc(e.target.value)} id="description" placeholder="description here" className="text-xl border-0 focus:outline-none flex-1" type="text" />
                            </div>
                            <Button onClick={submitForm_}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default Art