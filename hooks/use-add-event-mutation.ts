import { Event } from "@/app/dashboard/events/_api/types";
import useSupabase from "./useSupabase";
import {
  RefetchQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function useAddEventMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (formData: Event) => {
    const { data } = await supabase.from("events").insert(formData).select();

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["events"] });
    },
  });
}
