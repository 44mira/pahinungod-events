import { Event } from "@/app/dashboard/events/_types/types";
import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddEventMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (formData: Event) => {
    const { data, error } = await supabase
      .from("events")
      .insert(formData)
      .select();

    if (error) {
      console.log("An error has occurred in creating an event");
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
