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

  const data_user = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    username: formData.get("username") as string,
  };
  console.log("SIGNUP DATA: ", data);
  console.log("SIGNUP USER DATA: ", data_user);

  const { error } = await supabase.auth.signUp(data);

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert(data_user)
    .select();

  if (error) {
    // redirect("/error");
    return { error: error.message };
  }

  if (userError) {
    console.error("User creation error:", userError);
    return { error: userError.message };
  }

  console.log("User created:", user);

  revalidatePath("/", "layout");
  redirect("/forest/components/check-email/");
}
