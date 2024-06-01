import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export default function useGetUserIdentity() {
  const supabase = useSupabase();

  const queryFn = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw "There was an error fetching the user data.";
    }

    return data.user;
  };

  return useQuery({ queryKey: ["user"], queryFn });
}
