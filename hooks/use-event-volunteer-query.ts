import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { UUID } from "crypto";

export default function useEventVolunteerQuery(event_id: UUID) {
  const supabase = useSupabase();
  const queryKey = ["event_volunteer_data"];

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("event_volunteer")
      .select()
      .eq("volunteer_id", volunteer_id)
      .single();

    if (error) {
      console.log("An error has occurred in fetching event_volunteer data.");
      throw error;
    }

    // Returns the object data not in array form.
    return data;
  };

  return useQuery({ queryKey, queryFn });
}
