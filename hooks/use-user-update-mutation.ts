import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSingleUserQuery from "./use-single-user-query";
import useSupabase from "./useSupabase";

export default function useUserUpdateMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const { data: userData } = useSingleUserQuery();

  const mutationFn = async (formData: {
    /* email: string;
    password: string;
    name: string; */
  }) => {
    const userID = userData?.volunteer_id;

    const { data, error } = await supabase
      .from("volunteer")
      .select()
      .eq("volunteer_id", !userID);

    if (error) {
      throw "There was an error updating the user";
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["userSession"] }),
  });
}
