import Image from "next/image";

function Post({ title = "", description = "", img_src = "" }) {
  return (
    <div
      className="relative min-h-md w-full mx-auto flex flex-col gap-1 bg-white
              border-grey-200 shadow-lg shadow-forest-highlight/75
            rounded-xl outline-1 outline-forest-bark/35    
              "
    >
      {/* border */}
      {img_src && (
        <div className="relative w-full rounded-t-xl overflow-hidden">
          <Image
            key={`key_${title}`}
            src={img_src}
            alt="example"
            className="rounded-t-lg object-cover w-full h-auto"
            width={800} // or any default/fallback width
            height={600} // optional but helps calculate aspect ratio
          />
        </div>
      )}
      {/* border */}
      <div className="flex flex-row items-center gap-2  p-3 border-b-1 border-dashed">
        <Image
          src={img_src ? img_src : "https://picsum.photos/seed/picsum/45/45"}
          alt={title}
          className="rounded-full object-cover aspect-square border-1 border-forest-bark/35"
          key={`key_${title}_img`}
          width={45}
          height={45}
        />
        <span className="text-xl text-center font-semibold text-forest-bark/75">
          {title}
        </span>
      </div>
      {/* border */}
      <p className="text-lg text-forest-moss p-3">{description}</p>
      <div className="p-2 mb-2">
        <button
          className="text-base p-2 font-bold cursor-pointer 
                        text-forest-moss hover:text-white
                        hover:bg-forest-moss transition-colors duration-300 "
        >
          Read More <i className="fas fa-chevron-right"></i>{" "}
        </button>
      </div>
    </div>
  );
}

export default Post;
