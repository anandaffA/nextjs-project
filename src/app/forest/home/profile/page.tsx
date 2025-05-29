"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Post from "../components/post-card";
import HeaderPost from "../components/header-post-card";
import { useLoading } from "@/app/components/loading-context";
// import Modal from "@/app/components/modal";
import Form from "../../components/form";
import Input from "../../components/input";

type PostType = {
  id: string;
  content: string;
  img: string;
  created_at: string;
  profile_picture: string;
  name: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  age: number;
  gender: string;
  profile_picture: string;
  description: string;
  uuid: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const { setLoading } = useLoading();

  const [posts, setPosts] = useState<PostType[]>([]);
  // const [isLoading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [user, setUser] = useState<User[]>([]);
  const [isClose, setClose] = useState<boolean>(false);

  // const [profImg, setProfImg] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  const supabase = createClient();

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      let img_url = "";
      const file_format = file.name.split(".").pop();
      const file_name = `${Date.now()}.${file_format}`;
      const { error: error_storage } = await supabase.storage
        .from("profile-picture")
        .upload(file_name, file);

      if (error_storage) {
        alert(`Image Upload failed with : ${error_storage.message}`);
        setLoading(false);
        return false;
      }

      const { data: get_url } = await supabase.storage
        .from("profile-picture")
        .getPublicUrl(file_name);

      img_url = get_url.publicUrl;

      const { error: error_update } = await supabase
        .from("users")
        .update({ profile_picture: img_url })
        .eq("uuid", user["uuid"]);
      if (error_update) {
        alert(`Failed to Update Profile Picture with: ${error_update}`);
        setLoading(false);
        return false;
      }
      alert("Profile Picture Updated!");
      setLoading(false);
      setRefresh((prev) => !prev);
      return true;
    }
  };

  const editProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .update({
        name: name,
        username: username,
        age: age,
        gender: gender,
      })
      .eq("uuid", user["uuid"]);
    if (error) {
      alert(`Failed to Update User Data with : ${error.message}`);
      setLoading(false);
      return false;
    }
    alert(`User Info Updated! ${data}`);
    setLoading(false);
    setRefresh((prev) => !prev);
    return true;
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/forest");
      }
      if (session?.user?.id) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("uuid", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(userData);
        }
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data: postData } = await supabase
        .from("dashboard_view")
        .select("*")
        .eq("user_id", user["id"])
        .order("created_at", { ascending: false });
      setPosts(postData || []);
    };
    fetchData();
    setLoading(false);
  }, [refresh, user]);

  return (
    <>
      <div className="flex flex-col gap-8 text-white">
        {/* profile */}
        {user && (
          <div className="relative -mt-0 z-10 flex flex-col items-center text-center px-4">
            <label className="w-32 h-32 relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={imageHandler}
              />
              <Image
                src={user["profile_picture"] || "https://picsum.photos/200"}
                alt="avatar"
                layout="fill"
                className="rounded-full object-cover border-4 border-white/30 shadow-md"
              />
            </label>
            <h1 className="mt-4 text-2xl font-bold">
              {user["name"]}
              <i
                className="px-2 fas fa-edit text-white cursor-pointer text-sm"
                onClick={() => setClose(true)}
              ></i>
            </h1>
            <p className="text-white/60 text-sm mb-2">@{user["username"]}</p>

            <div className="flex flex-wrap justify-center gap-4 text-white/70 text-sm">
              <span>Age: {user["age"]}</span>
              <span>Gender: {user["gender"]}</span>
            </div>

            <p className="mt-3 text-white/80 italic max-w-xl">
              {user["description"]}
            </p>
          </div>
        )}

        {/* posts */}
        <div className="flex flex-col gap-6">
          {/* <div
            key="post_header"
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-md"
          > */}
          <HeaderPost user={user} refreshState={refreshHandler} />
          {/* </div> */}
          {posts.length > 0 ? (
            posts.map((post, index) => {
              const isUser = post["user_id"] == user["id"];
              return <Post key={`post_${index}`} post={post} isUser={isUser} />;
            })
          ) : (
            <div className="text-white/60 text-center italic">
              No posts yet.
            </div>
          )}
        </div>
      </div>

      <Form
        isOpen={isClose}
        onClose={() => setClose(false)}
        title="Edit Profile"
        onSubmit={(e) => {
          editProfile(e);
        }}
      >
        <h2 className="text-forest-bark text-3xl ml-1">Edit Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 text-white gap-4 text-2xl">
          <Input
            type="text"
            placeholder="Name"
            id="name"
            defaultValue={user["name"] ?? ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={user["username"] ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Age"
            id="age"
            defaultValue={user["age"] ?? ""}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Gender"
            id="gender"
            defaultValue={user["gender"] ?? ""}
            onChange={(e) => setGender(e.target.value)}
          />
          <button
            type="submit"
            // formAction={formSignup}
            className="
              bg-forest-moss text-white cursor-pointer md:text-xl mt-2
              text-xl p-2 rounded-full w-1/2 hover:outline-1 hover:outline-forest-bark/85 shadow-md hover:bg-forest-mist hover:text-forest-bark transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
