import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

export default function useSingleUserQuery() {
  const supabase = useSupabase();
  const queryKey = ["user"];

  const queryFn = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("There was an error in fetching user data");
      throw userError;
    }

    const { data, error } = await supabase
      .from("volunteer")
      .select()
      .eq("volunteer_id", userData.user.id)
      .single();

    if (error) {
      console.log("There was an error in fetching volunteer data");
      throw error;
    }

    return { ...data, userData };
  };

  return useQuery({ queryKey, queryFn });
}
