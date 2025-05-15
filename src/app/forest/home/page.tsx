'use client'
import Navbar from "./components/navigation"
import Footer from "./components/footer"
import Image from "next/image"
import Post from "./components/post-card"
import { useState, useEffect } from "react"

type dummy_data={
    'id' : string,
    'title' : string,
    'body' : string
}


function Home(){
    
    const [dummy, fetchData] = useState<dummy_data[]>([])
    useEffect(()=>{
        async function test_api(){
            const hit = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await hit.json()
            fetchData(data)
        }
        test_api()
    },[])

    return(
        <>
        <title>FOR.est (GHST_)</title>
        <div className="font-garamond relative min-h-screen w-screen flex flex-col">
        <main className="relative w-full h-full flex-1">
            <Navbar/>
            <Image 
                src={'/img/forest.jpg'}
                alt="background-forest"
                fill
                className="absolute z-0 brightness-75"
            />
        {/* main content */}
            <div className="relative flex flex-row">
                <div className="w-1/4 flex flex-col text-white items-center justify-start z-99">
                    <p className="text-2xl"> Lorem </p>
                    <p className="text-2xl"> Lorem </p>
                    <p className="text-2xl"> Lorem </p>
                    <p className="text-2xl"> Lorem </p>
                    <p className="text-2xl"> Lorem </p>
                </div>
                <div className="relative w-2/4 h-100 mt-[60px]">
                    <div className="absolute h-full inset-0 grid grid-cols-2 justify-center overflow-y-auto no-scrollbar items-center">
                        {dummy.map(itm=>{
                            return(
                                <Post key={`key_${itm.id}`} title={itm.title} description={itm.body} img_src={`https://picsum.photos/seed/abc${itm.id}/200/300`}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
        </div>
        </>
    )
}

export default Home