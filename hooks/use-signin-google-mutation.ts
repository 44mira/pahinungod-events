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
    console.log(data.url);

    if (error) {
      throw "An error occurred while logging in with Google.";
    }
  };

  // Fetch the id of the current user from auth table.
  const queryFn = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw "There was an error fetching the user data.";
    }

    return data.user.id;
  };

  // Upserts the id into volunteer_id from volunteer table.
  const upsertRow = async () => {
    const user_id = await queryFn();

    const { data, error } = await supabase
      .from("volunteer")
      .upsert({ volunteer_id: user_id }); 

    if (error) {
      throw "There was an error upserting the row.";
    }

    return data; 
  };

  upsertRow();

  return useMutation({ mutationFn });
}
