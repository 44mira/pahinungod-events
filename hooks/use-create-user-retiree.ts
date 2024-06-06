import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type Retiree = Database["public"]["Tables"]["retiree"]["Row"];

export default function useCreateRetiree() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<Retiree, "volunteer_id" | "retiree_id">,
  ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { error } = await supabase.from("retiree").insert({
      ...registrationData,
      volunteer_id: userData.user.id,
      retiree_id: crypto.randomUUID(),
    });

    if (error) {
      console.log("An error has occurred in updating the volunteer data");
      throw error;
    }
  };

  return useMutation({
    mutationFn,
  });
}
