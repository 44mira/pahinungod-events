import { UUID } from "crypto";
import useSupabase from "./useSupabase";
import { useQueries } from "@tanstack/react-query";

export default function useDashboardEventQuery(event_id: UUID) {
  const supabase = useSupabase();

  const countQuery = async () => {
    const { count, error } = await supabase
      .from("event_volunteer")
      .select("event_id", { count: "exact", head: true })
      .eq("event_id", event_id);

    if (error) {
      console.log("An error has occurred in fetching count.");
      throw error;
    }

    return count;
  };

  const eventQuery = async () => {
    const { data, error } = await supabase
      .from("events")
      .select()
      .eq("event_id", event_id)
      .single();

    if (error) {
      console.log(`An error has occurred in fetching event ${event_id}.`);
      throw error;
    }

    return data;
  };

  return useQueries({
    queries: [
      { queryKey: ["dashboardCount", event_id], queryFn: countQuery },
      { queryKey: ["dashboardEvent", event_id], queryFn: eventQuery },
    ],
  });
}
