'use client'
import Image from "next/image";
import { useEffect } from "react";

function Post({ post, isUser }) {
  useEffect(()=>{
    console.log("Status: ", isUser)
  },[isUser])
  return (
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
          src={post.profile_picture ? post.profile_picture : "https://picsum.photos/seed/picsum/45/45"}
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
      <p className="text-lg text-forest-moss p-3">{post.content}</p>
      <div className="p-2 mb-2 flex justify-between items-center">
        <button
          className="text-base p-2 font-bold cursor-pointer 
                        text-forest-moss hover:text-white
                        hover:bg-forest-moss transition-colors duration-300 "
        >
          Read More <i className="fas fa-chevron-right"></i>{" "}
        </button>
        {isUser && (
          <div className="flex">
            <span className="cursor-pointer px-5 text-black">
              <i className="fas fa-edit"></i> Edit
            </span>
            <span className="cursor-pointer px-5 text-black">
              <i className="fas fa-close"></i> Delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
