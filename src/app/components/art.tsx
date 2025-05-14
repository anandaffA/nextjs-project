'use client'
import Button from "./button"
import Modal from "./modal"
import { useState, useEffect } from "react"
import { supabase } from "../../../lib/supabase"
import Image from "next/image"
import { blurHashToDataURL } from "../utils/blurdecode"
function Art({returnPage, isLoading}){
    type ImageData = {
    id: string;
    title: string;
    description: string;
    path: string;
    blur: string;
    };

    type OpenImageData = {
    id: string;
    title: string;
    description: string;
    path: string;
    blur: string;
    };

    const [is_open_form, openForm] = useState<boolean>(false)
    const [is_open_image, openImageModal] = useState<boolean>(false)
    //const [is_loading, loadState] = useState<boolean>(false)
    const [title, setTitle] = useState<string|null>(null)
    const [description, setDesc] = useState<string|null>(null)
    const [file, setFile] = useState<File | null> (null)
    const [preview, setPreview] = useState<string | null>(null)
    const [images, imageData] = useState<ImageData[]>([])
    const [open_image, openImage] = useState<OpenImageData | null>(null)

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
        isLoading(false)
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer).toString('base64')
        const res = await fetch('/api/blurhash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileData: buffer }),
        })
        const hash = await res.json()
        // const blurHash = await getBlurHash(buffer)
        // console.log(blurHash)
        //console.log(title, description, file)
        
        const file_format = file.name.split('.').pop()
        const file_name = `${Date.now()}.${file_format}`
        // const file_dimension = getImageSize(buffer)
        // console.log(file_dimension)
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
            'path' : img_url,
            'blur' : hash.blurHash,
            'created_at': new Date()
        }])
        if (insertError){
            alert(`Failed to Insert Database with ${insertError.message}`)
            return false;
        } else { 
            isLoading(true)
            alert ("Success!")}
        
    }

    const clickImage = (data) => {
        openImage(data)
        openImageModal(true)
    }

    useEffect( () => {
        const get_images = async () =>{
            const {data, error} = await supabase.from('gallery').select('*')
            if (error) { 
                alert ("What da hell!!")
                return false;}
            else {
                imageData(data)
            }
        }
        get_images()
    },[])
    
    return(
        <>
            <nav className="flex items-center justify-center md:justify-between px-5">
                {/* <div className="flex flex-col items-center md:flex-row md:items-end gap-2 pt-5"> */}
                    <Button onClick={openForm_}>
                    <i className="fas fa-plus text-center"></i> Add Image
                    </Button>
                {/* </div> */}
                    <Button onClick={() => returnPage('login')}>
                    <i className="fas fa-arrow-left text-center"></i> Return
                    </Button>
            </nav>

            <div className="relative  columns-2 md:columns-4">
                    {images.map(img =>{
                        return(
                            <Image
                            className={`py-2 shadow-2xl object-cover cursor-pointer transition duration-700 ease-in-out`}
                            key={`img_${img.id}`}
                            onClick={()=>clickImage(img)}
                            src={img.path}
                            alt={img.title}
                            placeholder="blur"
                            blurDataURL={blurHashToDataURL(img.blur,32,32)}
                            loading="lazy"
                            width={400}
                            height={500}
                            />
                        )
                    })}
            </div>

            { is_open_form && (
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

            {open_image &&  ( 
                <Modal isOpen={is_open_image} onClose={()=>openImageModal(false)} key={`modal_${open_image.id}`} layout_id={`layout_${open_image.id}`}>
                        <Image
                        className="relative object-cover w-auto md:w-full h-96 md:h-auto"
                        src={open_image.path}
                        alt={`alt_${open_image.title}`}
                        width={400}
                        height={800}
                        />
                        <div className="flex flex-1 flex-col">
                            <p className="text-white text-start p-4 flex align-middle text-xl text border-white border-b border-dashed"> {open_image.title}</p>
                            <p className="text-white text-start p-4 flex align-middle text-lg"> {open_image.description}</p>
                        </div>
                </Modal>
            )}
        </>
    )
}

export default Art