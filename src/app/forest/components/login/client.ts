import { createClient } from "../../../../../lib/supabaseClient";

export async function getUser(){

    const supaClient = createClient()

    const fetchSession = async () => {
        const {
        data: { session },
        } = await supaClient.auth.getSession();
        if (!session) { return null}
        if (session?.user?.id) {
        const { data: userData, error } = await supaClient
            .from("users")
            .select("*")
            .eq("uuid", session.user.id)
            .single();

        if (error) {
            console.error("Error fetching user:", error);
        } else {
            return userData
        }
        }
    }
    
    return await fetchSession();
}

export const fetchSession = async () => {
    const supabase = createClient()
     const {
       data: { session },
     } = await supabase.auth.getSession();
     if (!session) { throw new Error ('User Not Found?')}
     if (session?.user?.id) {
       const { data: userData, error } = await supabase
         .from("users")
         .select("*")
         .eq("uuid", session.user.id)
         .single();

       if (error) {
         console.error("Error fetching user:", error);
         throw new Error ("No User Found?")
       }
      return userData
     }
   };