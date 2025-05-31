// app/forest/layout.tsx
"use client";
import Navbar from "./components/navigation";
import Footer from "./components/footer";
import { ReactNode } from "react";
import Image from "next/image";
import SidebarLeft from "./components/sidebar-left";
import SidebarRight from "./components/sidebar-right";
import LoadingOverlay from "@/app/components/loading-layout";
import { LoadingProvider } from "../../components/loading-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-garamond min-h-screen w-screen flex flex-col">
      <Navbar />
      <LoadingProvider>
        <LoadingOverlay />
        <main className="relative flex md:px-12 flex-row flex-grow w-full max-w-full max-h-full h-full">
          <Image
            src={"/img/forest.jpg"}
            alt="background-forest"
            fill
            className="absolute z-0 brightness-75"
            priority
          />

          <SidebarLeft />
          {/* Main content area */}
          <div className="md:flex w-screen md:w-2/3 md:flex-grow relative z-20">
            <div className="absolute inset-0 md:px-[8vw] no-scrollbar z-10 flex flex-col overflow-y-auto bg-opacity-80 p-6 gap-5">
              {children}
            </div>
          </div>
          <SidebarRight />
        </main>
        <Footer />
      </LoadingProvider>
    </div>
  );
}
