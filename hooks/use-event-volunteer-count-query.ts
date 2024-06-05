import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";

export default function useEventVolunteerCountQuery(event_id: string) {
  const supabase = useSupabase();
  const queryKey = ["event-volunteer-count", event_id];

  const queryFn = async () => {
    const { count, error } = await supabase
      .from("event_volunteer")
      .select("event_id", { count: "exact" })
      .eq("event_id", event_id);

    if (error) {
      console.log("There was an error in fetching the event volunteer count");
      throw error;
    }

    return count;
  };

  return useQuery({ queryKey, queryFn });
}
