import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddEventFields } from "@/app/dashboard/events/_types/schemas";
import { UUID } from "crypto";

export default function useUpdateEventMutation(event_id: UUID) {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (
    eventInfo: Omit<AddEventFields, "event_id" | "admin_id">,
  ) => {
    const { data, error } = await supabase
      .from("events")
      .update(eventInfo)
      .eq("event_id", event_id)
      .select();

    if (error) {
      console.log("An error has occurred in updating the event");
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["event_information"] });
    },
  });
}
