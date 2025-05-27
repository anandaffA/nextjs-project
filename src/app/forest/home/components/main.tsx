"use client";
import { useState, useEffect } from "react";
import HeaderPost from "./header-post-card";
import Post from "./post-card";
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
  profile_picture:string;
  name:string;
};

type User = {
  name:string,
  username:string,
  age: number,
  gender: string,
  profile_picture: string, 
  description: string,
  uuid:string
}

export default function Main() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [images, setImages] = useState<image[]>([]);
  const [user, setUser] = useState<User[]>([])
  const supabase = createClient()

  // const {isLoading} = useLoading()
  
  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  //fetch user
  useEffect(() => {
   const fetchSession = async () => {
     const {
       data: { session },
     } = await supabase.auth.getSession();
     if (!session) { throw new Error ('User Not Found?')}
     if (session?.user?.id) {
       const { data: userData, error } = await supabase
         .from("users")
         .select("*")
         .eq("uuid", session.user.id)
         .single();

       if (error) {
         console.error("Error fetching user:", error);
       } else {
         console.log("User data:", userData);
         setUser(userData)
       }
     }
   };
   fetchSession();
 }, [supabase]);


  // from supabase
  useEffect(() => {
    const getImages = async () => {
      const { data, error } = await supabase
        .from("dashboard_view")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching posts: ", error);
        return;
      }
      setImages(data);
    };
    getImages();
  }, [refresh]);

  return (
    <>
      {/* Center Content */}
      <HeaderPost refreshState={refreshHandler} user={user} />

      {/* from supabase */}
      {images.map((post, index) => (
        // <div
        //   key={`key_${post.content}`}
        //   className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
        // >
          <Post
            title={post.name}
            key={`post_${index}`}
            description={post.content}
            img_src={post.img}
            profile_picture = {post.profile_picture}
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
