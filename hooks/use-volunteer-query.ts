import useSupabase from "./useSupabase";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useVolunteerQuery() {
  const supabase = useSupabase();
  const queryKey = ["volunteers"];

  const queryFn = async () => {
    const { data, error } = await supabase
      .from("volunteer")
      .select(
        "volunteer_id, name, occupation, email, age, sex, hours_rendered",
      );

    if (error) {
      console.log("An error has occurred in fetching volunteers.");
      throw error;
    }

    return data;
  };

  return useQuery({ queryKey, queryFn, placeholderData: keepPreviousData });
}
