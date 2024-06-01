import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

export default function useAdminUpdateMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (formData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { error } = await supabase.auth.updateUser({
      email: formData.email,
      password: formData.password,
      data: {
        name: formData.name,
      },
    });

    if (error) {
      throw "There was an error updating the user";
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["sessionAdmin"] }),
  });
}
