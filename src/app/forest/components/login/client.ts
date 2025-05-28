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