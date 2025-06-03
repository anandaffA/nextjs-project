"use client";
import Image from "next/image";
import { createClient } from "../../../../../lib/supabaseClient";
import { useLoading } from "@/app/components/loading-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PostModal from "./post-modal";

function Post({ post, isUser }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");
  const [postImg, setPostImg] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { setLoading } = useLoading();
  const router = useRouter();

  const supabase = createClient();

  const submitEdit = async (id:number) => {
    let img_url = "";
    if (!postContent.trim()) {
      alert("Post content cannot be empty!");
      return false;
    }
    // console.log(`Post with ID ${id} edited with content: ${postContent}`);
    setLoading(true);
    if (postImg) {
      const file_format = postImg.name.split(".").pop();
      const file_name = `${Date.now()}.${file_format}`;
      const { error: error_storage } = await supabase.storage
        .from("posts")
        .upload(file_name, postImg);
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
    const { data, error } = await supabase
      .from("posts")
      .update({
        content: postContent,
        img: img_url ? img_url : post.img,
        modified_at: new Date().toISOString(),
      })
      .eq("id", id);
    console.log("Processing Result");
    if (error) {
      console.error("Error updating post:", error);
      alert(`Error Updating Post! Please try again. ${error.message}`);
      setLoading(false);
      setPostContent("");
      setIsEditing(false);
      return false;
    }
    console.log("Post updated successfully:", data);
    alert("Post updated successfully!");
    setLoading(false);
    setPostContent("");
    setIsEditing(false);
    router.refresh();
    return true;
    // Optionally, you can trigger a refresh or update the post state here
  };

  const deletePost = async (id:number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log(`Post with ID ${id} is being deleted`);
      setLoading(true);
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        console.error("Error deleting post:", error);
        alert(`Error Deleting Post! Please try again. ${error.message}`);
        setLoading(false);
        return false;
      }
      alert("Post deleted successfully!");
      setLoading(false);
      router.refresh();
      return true;
    }
  };

  return (
    <>
      <div
        className="relative min-h-md w-full mx-auto flex flex-col gap-1 bg-white
              border-grey-200 shadow-lg shadow-forest-highlight/75
            rounded-xl outline-1 outline-forest-bark/35    
              "
      >
        {/* border */}
        {post.img && (
          <div className="relative w-full rounded-t-xl overflow-hidden">
            <Image
              key={`key_${post.name}`}
              src={post.img}
              alt=""
              className="rounded-t-lg object-cover w-full h-auto"
              width={800} // or any default/fallback width
              height={600} // optional but helps calculate aspect ratio
            />
          </div>
        )}
        {/* border */}
        <div className="flex flex-row items-center gap-2  p-3 border-b-1 border-dashed">
          <Image
            src={
              post.profile_picture
                ? post.profile_picture
                : "https://picsum.photos/seed/picsum/45/45"
            }
            alt={`img_${post.name}`}
            className="rounded-full object-cover aspect-square border-1 border-forest-bark/35"
            key={`key_${post.name}_img`}
            width={45}
            height={45}
          />
          <span className="text-xl text-center font-semibold text-forest-bark/75">
            {post.name}
          </span>
        </div>
        {/* border */}
        {isEditing ? (
          <form>
            {postImg && (
              <div className="p-3">
                <Image
                  src={URL.createObjectURL(postImg)}
                  alt="Post Image Preview"
                  className="w-full h-auto rounded-lg mb-2"
                  width={800}
                  height={600}
                />
              </div>
            )}
            <div className="p-3">
              <textarea
                className="w-full h-24 p-2 border border-gray-300 text-forest-bark text-lg rounded-md"
                defaultValue={post.content}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Edit your post content here..."
              ></textarea>
              <button
                onClick={() => submitEdit(post.id)}
                type="button"
                className="mt-2 px-6 py-2 bg-forest-moss text-white rounded-full
                      hover:bg-forest-bark transition-colors cursor-pointer duration-300"
              >
                Save
              </button>
              <label className="inline-flex items-center justify-center gap-2 text-lg text-forest-moss text-center p-3 cursor-pointer rounded-lg hover:animate-pulse transition">
                <i className="fas fa-plus"></i> Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPostImg(e.target.files[0]);
                    }
                  }}
                  className="mt-2 p-2 border border-gray-300 rounded-md text-forest-bark"
                />
              </label>
            </div>
          </form>
        ) : (
          <p className="text-lg text-forest-moss p-3">{post.content}</p>
        )}
        <div className="p-2 mb-2 flex justify-between items-center">
          {post.img && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-base p-2 font-bold cursor-pointer 
                        text-forest-moss hover:text-white
                        hover:bg-forest-moss transition-colors duration-300 "
          >
            Read More <i className="fas fa-chevron-right"></i>{" "}
          </button>
          )}
          {isUser && (
            <div className="flex">
              <span
                onClick={() => setIsEditing(!isEditing)}
                className="cursor-pointer px-5 text-forest-bark"
              >
                <i className="fas fa-edit"></i> Edit
              </span>
              <span
                onClick={() => deletePost(post.id)}
                className="cursor-pointer px-5 text-forest-bark"
              >
                <i className="fas fa-close"></i> Delete
              </span>
            </div>
          )}
        </div>
      </div>

      <PostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={{
          image: post.img,
          content: post.content,
          name: post.name,
          profile_picture: post.profile_picture,
          id: post.id,
          user_id: post.user_id,
        }}
      />
    </>
  );
}

export default Post;
