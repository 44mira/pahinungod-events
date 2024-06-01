import { TypedSupabaseClient } from "@/utils/supabase";
import useSupabase from "./useSupabase";
import { User } from "@supabase/supabase-js"; 
import { useQuery } from "@tanstack/react-query";


const fetchUserData = async (supabase: TypedSupabaseClient): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser(); // Fetch current user data

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export default function useGetUserIdentity() {
  const supabase = useSupabase();

  // Use the useQuery hook to manage the user data fetching
  return useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: () => fetchUserData(supabase),
  });
}
