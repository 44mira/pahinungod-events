import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { UUID } from "crypto";

export default function useInsertVntrToEvent(event_id: UUID) {
  const supabase = useSupabase();

  const mutationFn = async () => {
    // Fetch raw_user_meta_data
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("There was an error in fetching user data");
      throw userError;
    }

    const { data, error } = await supabase
      .from("event_volunteer")
      .insert([{ volunteer_id: userData.user.id, event_id: event_id }])
      .select();

    if (error) {
      console.log(
        "Error inserting either userID or eventID to event_volunteer table."
      );
      throw error;
    }

    return data;
  };

  return useMutation({ mutationFn });
}
