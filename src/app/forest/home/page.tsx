'use client'
import Navbar from "./components/navigation"
import Footer from "./components/footer"
function home(){
    
    return(
        <>
        <div className="font-garamond relative min-h-screen w-screen flex flex-col">
        <main className="flex-1">
            <Navbar></Navbar>
            <div className="absolute">
                
            </div>
        </main>
        <Footer></Footer>
        </div>
        </>
    )
}

export default home