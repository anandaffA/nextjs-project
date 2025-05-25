"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../../../../../lib/supabase";
import Post from "../components/post-card";
import HeaderPost from "../components/header-post-card";
import { motion, AnimatePresence } from "framer-motion";

type PostType = {
  id: string;
  content: string;
  img: string;
  created_at: string;
};

type Profile = {
  name: string;
  username: string;
  avatar: string;
  banner: string;
  age: number;
  gender: string;
  bio: string;
};

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      // Fetch posts
      const { data: postData } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      setPosts(postData || []);

      // Dummy profile for now
      setProfile({
        name: "John Doe",
        username: "johndoe",
        avatar: "https://picsum.photos/200/300",
        banner: "https://picsum.photos/seed/picsum/800/400",
        age: 28,
        gender: "Male",
        bio: "Photographer & Traveler. Capturing stories one frame at a time.",
      });
    };

    fetchData();
    setIsLoading(false);
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
            className="absolute inset-0 w-screen h-full flex justify-center items-center z-20 bg-black/35"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white z-30"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8 text-white">
        {/* profile */}
        {profile && (
          <div className="relative -mt-0 z-10 flex flex-col items-center text-center px-4">
            <div className="w-32 h-32 relative">
              <Image
                src={profile.avatar}
                alt="avatar"
                layout="fill"
                className="rounded-full border-4 border-white/30 shadow-md"
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
            <p className="text-white/60 text-sm mb-2">@{profile.username}</p>

            <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span>Age: {profile.age}</span>
              <span>Gender: {profile.gender}</span>
            </div>

            <p className="mt-3 text-white/80 italic max-w-xl">{profile.bio}</p>
          </div>
        )}

        {/* Posts */}
        <div className="flex flex-col gap-6">
          <div
            key="post_header"
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
          >
            <HeaderPost
              loadState={setIsLoading}
              refreshState={refreshHandler}
            />
          </div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
              >
                <Post
                  title="Post"
                  description={post.content}
                  img_src={post.img}
                />
              </div>
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
