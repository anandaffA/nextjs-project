"use client";
import Button from "./button";
import Modal from "./modal";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Image from "next/image";
import { blurHashToDataURL } from "../utils/blurdecode";
//import ImageModal from "./artModal";
import { motion, AnimatePresence } from "framer-motion";
import TestModal from "./artModal";

function Art({ returnPage, isLoading, isAdmin }) {
  type ImageData = {
    id: string;
    title: string;
    description: string;
    path: string;
    blur: string;
    file_name: string;
  };
  type OpenImageData = {
    id: string;
    title: string;
    description: string;
    path: string;
    blur: string;
    file_name: string;
  };
  const [is_open_form, openForm] = useState<boolean>(false);
  const [is_open_image, openImageModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDesc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [images, imageData] = useState<ImageData[]>([]);
  const [open_image, openImage] = useState<OpenImageData | null>(null);
  //const [is_loading, loadState] = useState<boolean>(false)

  const ImageMotion = motion(Image);
  const ModalMotion = motion(TestModal);

  const openForm_ = () => {
    openForm(true);
  };

  const imageChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  };

  const submitForm_ = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      alert("Please complete the form before submitting!");
      return false;
    }
    console.log(file);
    isLoading(false);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer).toString("base64");
    const res = await fetch("/api/blurhash", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileData: buffer }),
    });
    const hash = await res.json();
    // const blurHash = await getBlurHash(buffer)
    // console.log(blurHash)
    //console.log(title, description, file)

    const file_format = file.name.split(".").pop();
    const file_name = `${Date.now()}.${file_format}`;
    // const file_dimension = getImageSize(buffer)
    // console.log(file_dimension)
    //console.log("File Name: " , file_name)

    const { error: error } = await supabase.storage
      .from("art-images")
      .upload(file_name, file);
    if (error) {
      alert(`Upload failed with ${error.message}`);
      return false;
    }

    const { data: get_url } = await supabase.storage
      .from("art-images")
      .getPublicUrl(file_name);
    const img_url = get_url.publicUrl;
    const { error: insertError } = await supabase.from("gallery").insert([
      {
        title: title,
        description: description,
        file_name: file_name,
        path: img_url,
        blur: hash.blurHash,
        created_at: new Date(),
      },
    ]);

    if (insertError) {
      alert(`Failed to Insert Database with ${insertError.message}`);
      return false;
    } else {
      isLoading(true);
      alert("Success!");
    }
  };

  const clickImage = (data) => {
    openImage(data);
    openImageModal(true);
  };

  const deleteImage = async (id: string, file_name: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      isLoading(false);
      const { error: error_row } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);
      if (error_row) {
        alert(`Failed to Delete Image! with row ${error_row}`);
        isLoading(true);
        return false;
      }
      const { error: error_storage } = await supabase.storage
        .from("art-images")
        .remove([file_name]);
      if (error_storage) {
        alert(`Failed to Delete Image! with storage ${error_storage}`);
        isLoading(true);
        return false;
      }
      alert("Image Deleted!");
      isLoading(true);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const get_images = async () => {
      const { data, error } = await supabase.from("gallery").select("*");
      if (error) {
        alert("What da hell!!");
        return false;
      } else {
        imageData(data);
      }
    };
    get_images();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const imageVariants = {
    hidden: (i) => ({
      y: -50, // Start 100px left
      opacity: 0,
    }),
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <>
      <nav className="flex items-center justify-center md:justify-between px-5">
        {/* <div className="flex flex-col items-center md:flex-row md:items-end gap-2 pt-5"> */}
        {isAdmin && (
          <Button onClick={openForm_}>
            <i className="fas fa-plus text-center"></i> Add Image
          </Button>
        )}
        {/* </div> */}
        <Button onClick={() => returnPage("login")}>
          <i className="fas fa-arrow-left text-center"></i> Return
        </Button>
      </nav>

      {/* <div className="relative  columns-2 md:columns-4">
        {images.map((img) => {
          return (
            <motion.div
              layout
              key={`img_${img.id}`}
              layoutId={`layout_${img.id}`}
            >
              <ImageMotion
                className={`py-2 shadow-2xl object-cover cursor-pointer transition duration-700 ease-in-out md:rounded-0 rounded-2xl`}
                key={`img_${img.id}`}
                onClick={() => clickImage(img)}
                src={img.path}
                alt={img.title}
                placeholder="blur"
                blurDataURL={blurHashToDataURL(img.blur, 32, 32)}
                loading="lazy"
                width={400}
                height={500}
              />
            </motion.div>
          );
        })}
      </div> */}

      <motion.div
        className="relative columns-2 md:columns-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((img, i) => (
          <motion.div
            layout
            key={`img_${img.id}`}
            layoutId={`layout_${img.id}`}
            variants={imageVariants}
            custom={i} // pass index for stagger
          >
            <ImageMotion
              className="py-2 shadow-2xl object-cover cursor-pointer transition duration-700 ease-in-out md:rounded-0 rounded-2xl"
              key={`img_${img.id}`}
              onClick={() => clickImage(img)}
              src={img.path}
              alt={img.title}
              placeholder="blur"
              blurDataURL={blurHashToDataURL(img.blur, 32, 32)}
              loading="lazy"
              width={400}
              height={500}
            />
          </motion.div>
        ))}
      </motion.div>

      {is_open_form && (
        <Modal isOpen={is_open_form} onClose={() => openForm(false)}>
          <form className="relative">
            <div className="flex flex-col p-2">
              <div className="relative w-full h-86 flex items-center justify-center border-white border-b border-dashed">
                <label
                  htmlFor="file-upload"
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                >
                  <p className="text-white text-center">
                    &gt; Upload Image &lt;
                  </p>
                  {preview && (
                    <Image
                      src={preview}
                      alt={preview}
                      objectFit="contain"
                      fill
                    />
                  )}
                </label>
                <input
                  onChange={imageChange}
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
              </div>

              <div className="flex flex-row p-1 text-white gap-3">
                <label className="text-white text-xl flex-none ">
                  {" "}
                  Title :
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  placeholder="title here"
                  className="text-xl border-0 focus:outline-none flex-1"
                  type="text"
                />
              </div>
              <div className="flex flex-row p-1 text-white gap-3">
                <label className="text-white text-xl flex-none">
                  {" "}
                  Description :
                </label>
                <input
                  onChange={(e) => setDesc(e.target.value)}
                  id="description"
                  placeholder="description here"
                  className="text-xl border-0 focus:outline-none flex-1"
                  type="text"
                />
              </div>
              <Button onClick={submitForm_}>Submit</Button>
            </div>
          </form>
        </Modal>
      )}

      {open_image && (
        <ModalMotion
          isOpen={is_open_image}
          onClose={() => openImageModal(false)}
          key={`modal_${open_image.id}`}
          layout_id={`layout_${open_image.id}`}
        >
          <ImageMotion
            className="relative object-contain w-full h-96 md:h-auto"
            src={open_image.path}
            alt={`alt_${open_image.title}`}
            layoutId={`layout_${open_image.id}`}
            width={800}
            height={600}
          />
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between p-4 border-white border-b border-dashed">
              <p className="text-white text-start flex align-middle text-xl ">
                {" "}
                {open_image.title}
              </p>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() =>
                    deleteImage(open_image.id, open_image.file_name)
                  }
                >
                  <i className="fas fa-close text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"></i>{" "}
                </button>
              )}
            </div>
            <p className="text-white text-start p-4 flex align-middle text-lg">
              {" "}
              {open_image.description}
            </p>
          </div>
        </ModalMotion>
      )}
    </>
  );
}

export default Art;
