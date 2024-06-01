import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export default function useAdminQuery() {
  const supabase = useSupabase();

  const queryFn = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw "There was an error fetching the admin data.";
    }

    return data;
  };

  return useQuery({ queryKey: ["sessionAdmin"], queryFn });
}
