"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/* Not sure if we'll do signup */
// export async function signup(formData: FormData) {
//   const supabase = createClient();
//
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };
//
//   const { error } = await supabase.auth.signUp(data);
//
//   if (error) {
//     throw new Error(error.message);
//   }
//
//   revalidatePath("/", "layout");
//   redirect("/signin");
// }

export async function login(formData: string) {
  const supabase = createClient();

  const data = JSON.parse(formData);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = createClient();

  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login_admin");
}
