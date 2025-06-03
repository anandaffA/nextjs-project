"use client";
import { useState, useEffect } from "react";
import HeaderPost from "./header-post-card";
import Post from "./post-card";
import { fetchSession } from "../../components/login/client";
import { createClient } from "../../../../../lib/supabaseClient";
// import { createClient } from "../../../../../lib/supabaseServer";
// import { UseUser } from "./user-context";
import Form from "../../components/form";
// import { AnimatePresence, motion } from "framer-motion";
// import { useLoading } from "@/app/components/loading-context";

type image = {
  content: string;
  img: string;
  placeholder_img: string;
  created_at: string;
  modified_at: string;
  profile_picture: string;
  name: string;
  user_id: number;
};

type User = {
  name: string;
  username: string;
  age: number;
  gender: string;
  profile_picture: string;
  description: string;
  uuid: string;
  id: number;
};

export default function Main() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [images, setImages] = useState<image[]>([]);
  const [user, setUser] = useState<User[]>([]);
  // const [isUser, setIsUser] = useState<boolean>(false)
  // const TestData = UseUser()
  // useEffect(()=>{
  //   console.log("TESTING: ", TestData)
  // },[TestData])
  const supabase = createClient();

  // const {isLoading} = useLoading()

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  //fetch user
  useEffect(() => {
    const getUser = async () => {
      const session = await fetchSession();
      console.log("debug: ", session);
      setUser(session);
    };
    getUser();
  }, []);

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
      <HeaderPost refreshState={refreshHandler} />

      {/* from supabase */}
      {images.length > 0 ? (
        images.map((post, index) => {
          const isUser = post["user_id"] == user["id"];
          return <Post key={`post_${index}`} post={post} isUser={isUser} />;
        })
      ) : (
        <div className="text-white/60 text-center italic">No posts yet.</div>
      )}

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
