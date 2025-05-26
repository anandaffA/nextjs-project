// app/forest/home/page.tsx
import { createClient } from "../../../../lib/supabaseServer";
import { redirect } from "next/navigation";
import Main from "./components/main";
export default async function HomePage() {
  
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forest");
  }

  return <Main />;
}
