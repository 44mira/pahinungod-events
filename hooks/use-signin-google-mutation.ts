import useSupabase from "./useSupabase";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default function useSigninGoogleMutation() {
  const supabase = useSupabase();

  const mutationFn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: location.origin + "/auth/callback",
      },
    });

    console.log(data.url);

    if (error) {
      throw "An error occurred while logging in with Google.";
    }

    if (data.url) {
      redirect("/volunteers/dashboard");
    }
  };

  return useMutation({ mutationFn });
}
