import Image from "next/image";

export default function SidebarLeft() {
  return (
    <div
      className="hidden md:flex w-0 md:w-1/5 shadow-xl shadow-black
           bg-black/25 text-white flex-col items-center justify-center z-10
           text-xl font-mono text-center gap-12"
    >
      <div className="flex flex-1 flex-col gap-5 bg-black/5 items-center mx-5 py-5 ">
        <Image
          src={"https://picsum.photos/seed/picsum/400/400"}
          alt="profile"
          className="object-cover aspect-square rounded-full shadow-lg shadow-black/50"
          width={128}
          height={128}
        />
        {/* <span className="">Username</span> */}
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Dashboard
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Profile
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Settings
        </span>
        <span className="cursor-pointer transition-opacity hover:animate-pulse hover:opacity-100">
          Logout
        </span>
      </div>
    </div>
  );
}
