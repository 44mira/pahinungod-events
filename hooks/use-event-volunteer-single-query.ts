import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { UUID } from "crypto";

export default function useEventVolunteerSingleQuery(event_id: UUID) {
  const supabase = useSupabase();
  const queryKey = ["event_volunteer_data", event_id];

  const queryFn = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("There was an error in fetching user data");
      throw userError;
    }

    const { data, error } = await supabase
      .from("event_volunteer")
      .select()
      .eq("event_id", event_id)
      .eq("volunteer_id", userData.user.id)
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
