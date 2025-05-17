"use client";
import Navbar from "./components/navigation";
import Footer from "./components/footer";
import Image from "next/image";
import Post from "./components/post-card";
import { useState, useEffect } from "react";

type dummy_data = {
  id: string;
  title: string;
  body: string;
  img_src: string;
};

function Home() {
  const [dummy, fetchData] = useState<dummy_data[]>([]);
  useEffect(() => {
    async function test_api() {
      const hit = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await hit.json();
      fetchData(data);
    }
    test_api();
  }, []);

  return (
    <>
      <title>FOR.est (GHST_)</title>
      <div className="font-garamond min-h-screen w-screen flex flex-col">
        <Navbar />
        <main className="relative flex flex-row flex-grow w-full h-full">
          <Image
            src={"/img/forest.jpg"}
            alt="background-forest"
            fill
            className="absolute z-0 brightness-75"
          />
          {/* main content */}
          <div className="hidden md:flex w-full md:w-1/3 bg-red-500 text-white flex-col items-center justify-center z-10">
            <span className=""> Lorem </span>
            <span className=""> Lorem </span>
            <span className=""> Lorem </span>
            <span className=""> Lorem </span>
            <span className=""> Lorem </span>
          </div>
          {/* Center Content */}
          <div className="flex w-full h-full relative z-0">
            <div className="absolute inset-0 h-[640] no-scrollbar z-10 flex flex-col overflow-y-auto bg-opacity-80 p-6 gap-5">
              {dummy.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  description={post.body}
                  img_src={`https://picsum.photos/seed/what_${post.id}/400/300`}
                />
              ))}

              {/* Example of a post card */}

              {/* ... */}
              {/* <div
                className="relative w-full mx-auto flex flex-col gap-5 bg-white
              border-grey-200 shadow-lg shadow-forest-highlight/75
            rounded-xl outline-1 outline-forest-bark/35    
              "
              >
                <h1 className="text-xl text-forest-moss font-semibold p-3 border-b-1 border-dashed">
                  Title Here
                </h1>
                <p className="text-sm text-forest-moss p-3">
                  {" "}
                  Short Description Here{" "}
                </p>
                <button
                  className="text-base p-2 font-bold cursor-pointer 
                text-forest-moss hover:text-white
                hover:bg-forest-moss transition-colors duration-300 "
                >
                  Read More <i className="fas fa-chevron-right"></i>{" "}
                </button>
              </div> */}
              {/* ... */}
            </div>
          </div>
          {/* end center */}
          <div className="hidden md:flex w-full md:w-1/3 bg-blue-500 text-white flex-col items-center justify-center z-10">
            <p className="text-2xl"> Lorem </p>
            <p className="text-2xl"> Lorem </p>
            <p className="text-2xl"> Lorem </p>
            <p className="text-2xl"> Lorem </p>
            <p className="text-2xl"> Lorem </p>
          </div>
          {/* end main content */}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
