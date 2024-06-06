import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type Student = Database["public"]["Tables"]["student"]["Row"];

export default function useCreateStudent() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<Student, "volunteer_id" | "year" | "student_id">,
  ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { error } = await supabase.from("student").insert({
      ...registrationData,
      volunteer_id: userData.user.id,
      student_id: crypto.randomUUID(),
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
