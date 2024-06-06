import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type AdminStaff = Database["public"]["Tables"]["admin_staff"]["Row"];

export default function useCreateAdminStaff() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<AdminStaff, "volunteer_id" | "admin_staff_id">,
  ) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("An error has occurred in getting the user info");
      throw userError;
    }

    const { error } = await supabase.from("admin_staff").insert({
      ...registrationData,
      volunteer_id: userData.user.id,
      admin_staff_id: crypto.randomUUID(),
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
