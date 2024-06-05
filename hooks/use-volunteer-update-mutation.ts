import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";

type ProfileDataKey = "name" | "nickname" | "phone_number" | "sex" | "age";

type Volunteer = Pick<
  Database["public"]["Tables"]["volunteer"]["Row"],
  ProfileDataKey
>;

export default function useVolunteerUpdateMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (formData: Volunteer) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("There was an error in fetching user data");
      throw userError;
    }

    const { data, error } = await supabase
      .from("volunteer")
      .update(formData)
      .eq("volunteer_id", userData.user.id)
      .select();

    if (error) {
      console.log("There was an error in updating user data");
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.refetchQueries({ queryKey: ["user"] }),
  });
}
