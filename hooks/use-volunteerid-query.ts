import useSupabase from "./useSupabase";
import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";

export default function useVolunteeridQuery(volunteer_id: UUID) {
  const supabase = useSupabase();
  const queryKey = ["volunteerData"];

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("volunteer")
      .select()
      .eq("volunteer_id", volunteer_id)
      .single(); //Filter

    if (error) {
      console.log("An error has occurred in fetching volunteer data.");
      throw error;
    }

    return data;
  };

  return useQuery({ queryKey, queryFn });
}
