import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type User = {
  volunteer_id: string;
  name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  age: number | null;
  sex: string;
  indigenous_affiliation: string;
  address: string;
  city: string;
  province: string;
  postal_code: number | null;
};

export default function useCreateUser() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (registrationData: User) => {
    const { data, error } = await supabase
      .from("volunteer")
      .insert(registrationData)
      .select();

    if (error) {
      console.log("An error has occurred in registration.");
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["volunteer"] });
    },
  });
}
