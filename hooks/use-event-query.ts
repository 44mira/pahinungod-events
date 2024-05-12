import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

function useEventQuery() {
  const supabase = useSupabase();
  const queryKey = ["events"];

  const queryFn = async () => {
    const { data } = await supabase.from("events").select();

    return data;
  };

  return useQuery({ queryKey, queryFn });
}

export default useEventQuery;
