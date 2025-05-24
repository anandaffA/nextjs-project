import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const { data: data_auth, error: error_auth } =
  await supabase.auth.signInWithPassword({
    email: "testing@email.com",
    password: "testing",
  });

if (error_auth) {
  console.log("Auth failed: " + error_auth.message);
} else {
  console.log(data_auth);
}

export { supabase };
