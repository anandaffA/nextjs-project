"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../../../../../lib/supabase";
import { useLoading } from "@/app/components/loading-context";
function HeaderPost({ refreshState }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const { setLoading } = useLoading();

  const [postContent, setPostContent] = useState("");

  const title = "";

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("FILE: ", file);
    setImgFile(file || null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitPost = async () => {
    if (!postContent && !imgFile) {
      alert("Please enter some content or upload an image.");
      return;
    }
    let hash = "";
    let img_url = "";
    setLoading(true);
    if (imgFile) {
      const arrayBuffer = await imgFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer).toString("base64");
      const res = await fetch("/api/blurhash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileData: buffer }),
      });
      hash = await res.json();

      const file_format = imgFile.name.split(".").pop();
      const file_name = `${Date.now()}.${file_format}`;
      const { error: error_storage } = await supabase.storage
        .from("posts")
        .upload(file_name, imgFile);
      if (error_storage) {
        alert(`Image Upload failed with : ${error_storage.message}`);
        setLoading(false);
        return false;
      }

      const { data: get_url } = await supabase.storage
        .from("posts")
        .getPublicUrl(file_name);
      img_url = get_url.publicUrl;
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        content: postContent,
        img: img_url,
        placeholder_img: hash,
        created_at: new Date().toISOString(),
        modified_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("Error inserting post: ", error);
      return;
    }
    console.log("Post inserted: ", data);
    alert("Post created successfully!");
    setPostContent("");
    setImgFile(null);
    setPreview(null);
    setLoading(false);
    refreshState();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        submitPost();
      }}
    >
      <div
        className="relative min-h-md w-full mx-auto flex flex-col gap-2 bg-white
              border-grey-200 shadow-lg shadow-forest-highlight/75
            rounded-xl outline-1 outline-forest-bark/35    
              "
      >
        {preview && (
          <div className="relative w-full h-92 rounded-t-xl overflow-hidden">
            <Image
              key={`key_${title}`}
              src={preview}
              alt="preview"
              className="rounded-t-lg object-cover"
              fill
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute text-2xl bottom-3 right-3 hover:text-white cursor-pointer transition-colors duration-300 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
            >
              &times;
            </button>
          </div>
        )}
        {/* border */}
        <div className="flex flex-row items-center gap-2  p-3 border-b-1 border-dashed">
          <Image
            src={"https://picsum.photos/seed/picsum/45/45"}
            alt={title}
            className="rounded-full object-cover aspect-square border-1 border-forest-bark/35"
            key={`key_${title}_img`}
            width={45}
            height={45}
          />
          <span className="text-xl text-center font-semibold text-forest-bark/75">
            Username
          </span>
        </div>
        {/* border */}
        <textarea
          placeholder="What are you thinking?"
          rows={1}
          className="w-full resize-none text-lg text-forest-bark placeholder-gray-400 bg-transparent focus:outline-none focus:ring-0 p-3 border-0 rounded-xl shadow-sm transition"
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          onChange={(e) => setPostContent(e.target.value)}
          value={postContent}
        />

        {/* border */}

        <div className="py-2 px-4 mb-2 flex flex-1  items-center">
          <button
            className="text-base font-bold cursor-pointer 
                         text-white
                        px-4 h-[40]  bg-forest-moss transition-colors duration-300 rounded-full"
            type="submit"
          >
            New Post{" "}
          </button>
          <label className="inline-flex items-center justify-center gap-2 text-lg text-forest-moss text-center p-3 cursor-pointer rounded-lg hover:animate-pulse transition">
            <i className="fas fa-plus"></i> Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={imageHandler}
            />
          </label>
        </div>
      </div>
    </form>
  );
}

export default HeaderPost;
