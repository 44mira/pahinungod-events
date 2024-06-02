import useSupabase from "./useSupabase";
import { useMutation } from "@tanstack/react-query";

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

    if (error) {
      throw "An error occurred while logging in with Google.";
    }
  };

  return useMutation({ mutationFn });
}
