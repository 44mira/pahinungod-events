import { UUID } from "crypto";
import useSupabase from "./useSupabase";
import { useQueries } from "@tanstack/react-query";

export default function useSingleEventQuery(event_id: UUID) {
  const supabase = useSupabase();

  const eventInfoQuery = async () => {
    const { data, error } = await supabase
      .from("events")
      .select()
      .eq("event_id", event_id);

    if (error || !data) {
      console.log("An error has occurred in fetching event information.");
      throw error;
    }

    return data[0];
  };

  const volunteerListQuery = async () => {
    const { data, error } = await supabase
      .from("event_volunteer")
      .select(`*, volunteer ( name )`)
      .eq("event_id", event_id);

    if (error) {
      console.log(
        "An error has occurred in fetching volunteer list for this event.",
      );
      throw error;
    }

    return data;
  };

  return useQueries({
    queries: [
      { queryKey: ["event_information", event_id], queryFn: eventInfoQuery },
      {
        queryKey: ["volunteer_list", event_id],
        queryFn: volunteerListQuery,
      },
    ],
  });
}
