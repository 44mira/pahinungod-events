import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type Alumni = Database["public"]["Tables"]["alumni"]["Row"];

export default function useCreateAlumni() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<Alumni, "volunteer_id" | "alumni_id">,
  ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { error } = await supabase.from("alumni").insert({
      ...registrationData,
      volunteer_id: userData.user.id,
      alumni_id: crypto.randomUUID(),
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
