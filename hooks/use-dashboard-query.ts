import useSupabase from "./useSupabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useDashboardQuery() {
  const supabase = useSupabase();
  const queryKey = ["dashboardIds"];

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("name, event_id, event_start, event_end")
      .order("event_end", { ascending: false });

    if (error) {
      console.log("An error has occurred in fetching events.");
      throw error;
    }

    return data;
  };

  return useQuery({ queryKey, queryFn, placeholderData: keepPreviousData });
}
