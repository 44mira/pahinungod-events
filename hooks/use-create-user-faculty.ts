import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type Faculty = Database["public"]["Tables"]["faculty"]["Row"];

export default function useCreateFaculty() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<Faculty, "volunteer_id" | "faculty_id">,
  ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { error } = await supabase.from("faculty").insert({
      ...registrationData,
      volunteer_id: userData.user.id,
      faculty_id: crypto.randomUUID(),
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
