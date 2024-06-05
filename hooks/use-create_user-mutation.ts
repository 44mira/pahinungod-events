import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type User = {
  name: string;
  phone_number: string;
  birth_date: string;
  age: number | null;
  sex: string;
  indigenous_affiliation: string;
  address: string;
  city: string;
  province: string;
  postal_code: number | null;
  region: string;
  occupation: "Student" | "Faculty" | "Retiree" | "Alumni" | "Admin Staff";
};

export default function useCreateUser() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (registrationData: User) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { data, error } = await supabase
      .from("volunteer")
      .update(registrationData)
      .eq("volunteer_id", userData.user.id)
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
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
  });
}
