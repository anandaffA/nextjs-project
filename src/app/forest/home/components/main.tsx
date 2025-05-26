"use client";
import { useState, useEffect } from "react";
import HeaderPost from "./header-post-card";
import Post from "./post-card";
import { supabase } from "../../../../../lib/supabase";
import Form from "../../components/form";
import { AnimatePresence, motion } from "framer-motion";

type dummy_data = {
  id: string;
  title: string;
  body: string;
  img_src: string;
};
type image = {
  content: string;
  img: string;
  placeholder_img: string;
  created_at: string;
  modified_at: string;
};

export default function Main() {
  const [dummy, fetchData] = useState<dummy_data[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [images, setImages] = useState<image[]>([]);
  
  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  // dummy api
  useEffect(() => {
    async function test_api() {
      const hit = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await hit.json();
      fetchData(data);
    }
    test_api();
  }, []);
  
  

  // from supabase
  useEffect(() => {
    const getImages = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching images: ", error);
        return;
      }
      setImages(data);
    };
    getImages();
  }, [refresh]);

  return (
    <>
      {/* loading spinner */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading_spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              bounce: 0.2,
              ease: "easeInOut",
            }}
            className="absolute inset-0 h-full flex justify-center items-center z-20 bg-black/35"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* main content */}

      {/* Center Content */}
      <HeaderPost loadState={setIsLoading} refreshState={refreshHandler} />

      {/* from supabase */}
      {images.map((post) => (
        // <div
        //   key={`key_${post.content}`}
        //   className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
        // >
          <Post
            key={post.content}
            title="Username"
            description={post.content}
            img_src={post.img}
          />
        // </div>
      ))}

      {/* Dummy */}
      {dummy.map((post) => (
        // <div
        //   key={`key_${post.id}`}
        //   className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
        // >
          <Post
            key={post.id}
            title={post.title}
            description={post.body}
            img_src={`https://picsum.photos/seed/what_${post.id}/400/300`}
          />
        // </div>
      ))}
      {/* end center */}
      {/* end main content */}
      <Form
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <input type="text" />
      </Form>
    </>
  );
}
