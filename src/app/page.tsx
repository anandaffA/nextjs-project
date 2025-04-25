import Image from "next/image";
import LoginTemplate from "./components/login";

export default function Home() {
  return (
    <div className="relative min-h-screen min-w-screen">
      <main>
        <Image
        src="/img/home.png"
        alt="LoginScreen"
        layout="fill"
        objectFit="cover"
        priority
        />
        <LoginTemplate/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
