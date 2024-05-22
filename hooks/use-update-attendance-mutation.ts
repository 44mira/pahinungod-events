import useSupabase from "./useSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useUpdateVolunteerMutation(
  attendance: "final_attendance" | "orientation_attendance",
  event_id: UUID,
  volunteer_id: UUID,
) {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const updateVolunteer = async (new_value: "attended" | "missed") => {
    let attendance_col:
      | { final_attendance: "attended" | "missed" }
      | { orientation_attendance: "attended" | "missed" };

    if (attendance === "final_attendance") {
      attendance_col = { final_attendance: new_value };
    } else {
      attendance_col = { orientation_attendance: new_value };
    }

    const { data, error } = await supabase
      .from("event_volunteer")
      .update(attendance_col)
      .eq("volunteer_id", volunteer_id)
      .eq("event_id", event_id)
      .select();

    if (new_value === "missed") {
      await supabase
        .from("event_volunteer")
        .update({ status: "rejected" })
        .eq("volunteer_id", volunteer_id)
        .eq("event_id", event_id)
        .select();
    }

    if (error) {
      console.log("An error has occurred in updating the volunteer");
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn: (new_value: "attended" | "missed") =>
      updateVolunteer(new_value),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["volunteer_list", event_id],
      });
    },
  });
}
