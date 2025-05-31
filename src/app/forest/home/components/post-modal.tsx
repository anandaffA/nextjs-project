"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "../../../../../lib/supabaseClient";
import { useLoading } from "@/app/components/loading-context";

export default function PostModal({ isOpen, onClose, content }) {
  type ContentType = {
    id: string;
    user_id: string;
    name: string;
    username: string;
    profile_picture?: string;
    comment: string;
    image: string;
  };
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<ContentType[]>([]); // Adjust type as needed

  const supabase = createClient();
  const { setLoading } = useLoading();

  const submitComment = async () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    setLoading(true);
    console.log("Submitting comment:", comment);
    console.log(content);

    try {
      const { error } = await supabase.from("comments").insert([
        {
          post_id: content.id,
          user_id: content.user_id,
          comment: comment,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) {
        throw error;
      }
      setComment("");
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert(`Error adding comment`);
    }
    setLoading(false);
    return true;
  };

  useEffect(() => {
    if (isOpen) {
      setComment("");
    }
    const getComments = async () => {
      if (!content || !content.id) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("comments_view")
          .select("*")
          .eq("post_id", content.id);

        if (error) {
          throw error;
        }
        setComments(data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        alert(`Error fetching comments: ${error}`);
      }
      setLoading(false);
    };
    getComments();
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/75 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2
            no-scrollba z-50 w-[76vw] h-[72vh]
            md:overflow-y-auto rounded-lg bg-white shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 233, damping: 33 }}
          >
            <div className="flex w-[90vw] max-w-6xl h-[90vh] bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Left: Image */}
              <div className="relative w-1/2 h-full bg-black">
                <Image
                  src={content.image}
                  alt="Post"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Right: Content */}
              <div className="w-1/2 flex flex-col p-4 overflow-y-auto">
                {/* User Info */}
                <div className="flex items-center gap-3 border-b pb-4 mb-4 text-xl">
                  <Image
                    src={
                      content.profile_picture ||
                      "https://picsum.photos/seed/picsum/45/45"
                    }
                    alt={content.name}
                    width={64}
                    height={64}
                    className="rounded-full aspect-square object-cover border-1 border-forest-bark/35"
                  />
                  <div>
                    <p className="font-semibold">{content.name}</p>
                    <p className="text-sm text-gray-500">@{content.username}</p>
                  </div>
                </div>

                {/* Post Caption */}
                <div className="mb-4">
                  <p className="text-lg whitespace-pre-wrap">
                    {content.content}
                  </p>
                </div>

                {/* Comments */}
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Comments</h3>
                  <div className="space-y-3">
                    {comments.map((comment, i) => (
                      <div
                        key={i}
                        className="text-lg text-black flex flex-row gap-3 text-center items-center justify-start border-b pb-2"
                      >
                        <Image
                          src={
                            comment.profile_picture ||
                            "https://picsum.photos/seed/picsum/45/45"
                          }
                          alt={comment.user_id}
                          width={40}
                          height={40}
                          className="rounded-full aspect-square object-cover border-1 border-forest-bark/35"
                        />
                        <span className="font-semibold">{comment.name}:</span>{" "}
                        <span>{comment.comment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add a Comment */}
                <form className="mt-4 border-t pt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      submitComment();
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {" "}
                    Post Comment{" "}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
