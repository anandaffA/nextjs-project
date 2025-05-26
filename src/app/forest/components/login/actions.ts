"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../lib/supabaseServer";

export type LoginState = {
  error: string | null;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  console.log("LOGIN DATA: ", data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // throw new Error("Login failed. Please check your credentials.");
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/forest/home");
}

export async function signup(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  
  const { data:authData,error: signUperror } = await supabase.auth.signUp(data);
  
  if (signUperror) {
    // redirect("/error");
    return { error: signUperror.message };
  }
  
  const userId = authData?.user?.id;
  
  if (!userId) {
    return { error: "User ID not found after sign-up." };
  }
  
  const data_user = {
    uuid: userId as string,
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    username: formData.get("username") as string,
  };

  const { data: user, error: userError } = await supabase
  .from("users")
  .insert(data_user)
  .select();
  
  
  if (userError) {
    console.error("User creation error:", userError);
    return { error: userError.message };
  }
  
  console.log("User created:", user);
  
  revalidatePath("/", "layout");
  redirect("/forest/components/check-email/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/forest");
}

export async function requireSession() {
  console.log('--- Checking Session ---')
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/forest"); // or to "/login"
  }

  return session;
}



