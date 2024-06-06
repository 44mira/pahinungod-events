import useSupabase from "./useSupabase";
import { Database } from "@/utils/database.types";
import { useMutation } from "@tanstack/react-query";

type Volunteer = Database["public"]["Tables"]["volunteer"]["Row"];

export default function useCreateVolunteer() {
  const supabase = useSupabase();

  const mutationFn = async (
    registrationData: Omit<
      Volunteer,
      "volunteer_id" | "hours_rendered" | "email"
    >,
  ) => {
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

    const { error } = await supabase
      .from("volunteer")
      .update(registrationData)
      .eq("volunteer_id", userData.user.id);

    if (error) {
      console.log("An error has occurred in updating the volunteer data");
      throw error;
    }
  };

  return useMutation({
    mutationFn,
  });
}
