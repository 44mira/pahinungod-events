import useSupabase from "./useSupabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useEventQuery(page: number) {
  const supabase = useSupabase();
  const queryKey = ["events"];
  const offset = Math.max(page - 1, 0) * 12;

  const queryFn = async () => {
    const { data } = await supabase
      .from("events")
      .select()
      .range(offset, offset + 12);

    return data;
  };

  return useQuery({ queryKey, queryFn, placeholderData: keepPreviousData });
}
