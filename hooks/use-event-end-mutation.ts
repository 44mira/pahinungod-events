import { UUID } from "crypto";
import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export default function useEventEndMutation(event_id: UUID) {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async () => {
    // set event to not active
    const { data, error } = await supabase
      .from("events")
      .update({ event_active: false })
      .eq("event_id", event_id)
      .select()
      .single();

    if (error) {
      console.log("Error ending event");
      throw error;
    }

    // retrieve all volunteers of the event and their hours rendered
    const { data: volunteers, error: volunteersError } = await supabase
      .from("event_volunteer")
      .select("volunteer_id, volunteer ( hours_rendered )")
      .eq("event_id", event_id);

    const BY_HOUR = 1000 * 60 * 60;

    if (volunteersError) {
      console.log("There was an error in updating volunteer time logged");
      throw volunteersError;
    }

    // for each volunteer, update time rendered by adding the event length to
    // current rendered
    const updates = volunteers!.map(({ volunteer_id, volunteer }) => {
      const newTime =
        moment(volunteer!.hours_rendered).valueOf() +
        moment(data.event_end).valueOf() -
        moment(data.event_start).valueOf();

      // Store as a promise for optimization
      return supabase
        .from("volunteer")
        .update({ hours_rendered: newTime / BY_HOUR })
        .eq("volunteer_id", volunteer_id);
    });

    // Concurrently await all updates
    Promise.all(updates);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["event_information", event_id] });
    },
  });
}
