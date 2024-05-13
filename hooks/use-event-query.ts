import useSupabase from "./useSupabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useEventQuery(page: number) {
  const supabase = useSupabase();
  const queryKey = ["events", page];
  const offset = Math.max(page - 1, 0) * 12;

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("events")
      .select()
      .range(offset, offset + 12);

    if (error) {
      console.log("An error has occurred in fetching events.");
      throw error;
    }

    return data;
  };

  return useQuery({ queryKey, queryFn, placeholderData: keepPreviousData });
}
