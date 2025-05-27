"use client";
import { useState, useEffect } from "react";
import HeaderPost from "./header-post-card";
import Post from "./post-card";
// import { supabase } from "../../../../../lib/supabase";
import { createClient } from "../../../../../lib/supabaseClient";
// import { createClient } from "../../../../../lib/supabaseServer";
import Form from "../../components/form";
// import { AnimatePresence, motion } from "framer-motion";
// import { useLoading } from "@/app/components/loading-context";

type image = {
  content: string;
  img: string;
  placeholder_img: string;
  created_at: string;
  modified_at: string;
};


export default function Main() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [images, setImages] = useState<image[]>([]);
  // const {isLoading} = useLoading()
  
  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  // from supabase
  useEffect(() => {
    const getImages = async () => {
      const supabase = createClient()
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
      {/* Center Content */}
      <HeaderPost refreshState={refreshHandler} />

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
