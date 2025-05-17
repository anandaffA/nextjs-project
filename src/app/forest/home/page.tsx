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
        <main className="relative flex flex-row flex-grow w-full max-w-full max-h-full h-full">
          <Image
            src={"/img/forest.jpg"}
            alt="background-forest"
            fill
            className="absolute z-0 brightness-75"
          />
          {/* main content */}
          <div
            className="hidden md:flex w-0 md:w-1/5 shadow-xl shadow-black
           bg-black/25 text-white flex-col items-center justify-center z-10
           text-2xl font-mono text-center gap-12"
          >
            <span> Lorem </span>
            <span> Lorem </span>
            <span> Lorem </span>
          </div>
          {/* Center Content */}
          <div className="md:flex w-screen md:flex-grow relative z-0">
            <div className="absolute inset-0 no-scrollbar z-10 flex flex-col overflow-y-auto bg-opacity-80 p-6 gap-5">
              {dummy.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  description={post.body}
                  img_src={`https://picsum.photos/seed/what_${post.id}/400/300`}
                />
              ))}
            </div>
          </div>
          {/* end center */}
          <div
            className="hidden md:flex bg-black/25  w-0 md:w-1/5 shadow-xl shadow-black
           text-white flex-col items-center justify-center z-10
           text-2xl font-mono text-center gap-12"
          >
            <span> Lorem </span>
            <span> Lorem </span>
            <span> Lorem </span>
          </div>
          {/* end main content */}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
