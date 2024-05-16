import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useDeleteEventMutaion() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (event_id: UUID) => {
    const { data, error } = await supabase
      .from("events")
      .delete()
      .eq("event_id", event_id)
      .select();

    if (error) {
      console.log("An error has occurred in deleting the event");
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["events"] });
    },
  });
}
