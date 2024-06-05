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
  emergency_contact: string;
  emergency_contact_name: string;
  emergency_contact_affiliation: string;
  emergency_contact_address: string;
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

    const { error: metaError } = await supabase.auth.updateUser({
      data: {
        registered: true,
      },
    });

    if (metaError) {
      console.log("An error has occurred in updating the user metadata");
      throw metaError;
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