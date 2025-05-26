"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../../../../lib/supabaseClient";
import { supabase } from "../../../../../lib/supabase";
import { useRouter } from "next/navigation";
import Post from "../components/post-card";
import HeaderPost from "../components/header-post-card";
import { motion, AnimatePresence } from "framer-motion";

type PostType = {
  id: string;
  content: string;
  img: string;
  created_at: string;
};

type User = {
  name:string,
  username:string,
  age: number,
  gender: string,
  profile_picture: string, 
  description: string
}

// type Profile = {
//   name: string;
//   username: string;
//   avatar: string;
//   banner: string;
//   age: number;
//   gender: string;
//   bio: string;
// };

export default function ProfilePage() {

  const router = useRouter()

  const [posts, setPosts] = useState<PostType[]>([]);
  // const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([])

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { data: postData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      setPosts(postData || []);

    };

    fetchData();
    setIsLoading(false);
  }, [refresh]);

   useEffect(() => {
    const supaClient = createClient()
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supaClient.auth.getSession();
      if (!session) { router.push('/forest')}
      if (session?.user?.id) {
        const { data: userData, error } = await supaClient
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
  }, []);

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
            className="absolute inset-0 w-screen h-full flex justify-center items-center z-20 bg-black/35"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8 text-white">
        {/* profile */}
        {user && (
          <div className="relative -mt-0 z-10 flex flex-col items-center text-center px-4">
            <div className="w-32 h-32 relative">
              <Image
                src={user['profile_picture'] || "https://picsum.photos/200"}
                alt="avatar"
                layout="fill"
                className="rounded-full border-4 border-white/30 shadow-md"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{user['name']}</h1>
            <p className="text-white/60 text-sm mb-2">@{user['username']}</p>

            <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span>Age: {user['age']}</span>
              <span>Gender: {user['gender']}</span>
            </div>

            <p className="mt-3 text-white/80 italic max-w-xl">{user['description']}</p>
          </div>
        )}

        {/* posts */}
        <div className="flex flex-col gap-6">
          {/* <div
            key="post_header"
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
          > */}
            <HeaderPost
              loadState={setIsLoading}
              refreshState={refreshHandler}
            />
          {/* </div> */}
          {posts.length > 0 ? (
            posts.map((post) => (
              // <div
              //   key={post.id}
              //   className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
              // >
                <Post
                  title="Post"
                  key={post.id}
                  description={post.content}
                  img_src={post.img}
                />
              // </div>
            ))
          ) : (
            <div className="text-white/60 text-center italic">
              No posts yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
