"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import HeaderPost from "./header-post-card";
import Post from "./post-card";
import { supabase } from "../../../../../lib/supabase";
import Form from "../../components/form";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
            className="absolute inset-0 flex justify-center items-center z-20 bg-black/35"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={"/img/forest.jpg"}
        alt="background-forest"
        fill
        className="absolute z-0 brightness-75"
        onLoad={() => {
          setIsLoading(false);
        }}
        priority
      />
      {/* main content */}
      <div
        className="hidden md:flex w-0 md:w-1/5 shadow-xl shadow-black
           bg-black/25 text-white flex-col items-center justify-center z-10
           text-xl font-mono text-center gap-12"
      >
        <div className="flex flex-1 flex-col gap-5 bg-black/5 items-center mx-5 py-5 ">
          <Image
            src={"https://picsum.photos/seed/picsum/400/400"}
            alt="profile"
            className="object-cover aspect-square rounded-full shadow-lg shadow-black/50"
            width={128}
            height={128}
          />
          {/* <span className="">Username</span> */}
          <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
            Dashboard
          </span>
          <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
            Profile
          </span>
          <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
            Settings
          </span>
          <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
            Logout
          </span>
        </div>
      </div>
      {/* Center Content */}
      <div className="md:flex w-screen md:w-2/3 md:flex-grow relative z-0">
        <div className="absolute inset-0 md:px-[8vw] no-scrollbar z-10 flex flex-col overflow-y-auto bg-opacity-80 p-6 gap-5">
          <HeaderPost loadState={setIsLoading} refreshState={refreshHandler} />

          {/* from supabase */}
          {images.map((post) => (
            <Post
              key={post.content}
              title="Username"
              description={post.content}
              img_src={post.img}
            />
          ))}

          {/* Dummy */}
          {dummy.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              description={post.body}
              img_src={`https://picsum.photos/seed/what_${post.id}/400/300`}
            />
          ))}
        </div>
      </div>
      {/* end center */}
      <div
        className="hidden md:flex bg-black/25  w-0 md:w-1/5 shadow-xl shadow-black
           text-white flex-col items-center justify-center z-10
           text-2xl font-mono text-center gap-12"
      >
        {/* <span
              onClick={() => {
                setIsOpen(true);
              }}
              className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100"
            >
              <i className="fas fa-plus"></i> New Post{" "}
            </span> */}
      </div>
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
