import Navbar from "./components/navigation";
import Footer from "./components/footer";
import { createClient } from "../../../../lib/supabaseServer";
import { redirect } from "next/navigation";
import Main from "./components/main";

async function Home() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log("Session: ", session);
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <title>FOR.est (GHST_)</title>
      <div className="font-garamond min-h-screen w-screen flex flex-col">
        <Navbar />
        <main className="relative flex md:px-12 flex-row flex-grow w-full max-w-full max-h-full h-full">
          <Main />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
