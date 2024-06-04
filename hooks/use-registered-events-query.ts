import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { UUID } from "crypto";

export default function useRegisteredEventsQuery(volunteer_id: UUID) {
  const supabase = useSupabase();
  const queryKey = ["event_volunteer_data", volunteer_id];

  const queryFn = async () => {
    // Retrieve the events from event_volunteer table where it matches the user_id.
    const { data: registeredEvents, error } = await supabase
      .from("event_volunteer")
      .select()
      .eq("volunteer_id", volunteer_id);

    if (error) {
      console.log("An error has occurred in fetching event_volunteer data.");
      throw error;
    }

    // Fetch the events_id from the event_volunteer
    const eventsID = registeredEvents.map((event) => event.event_id);

    // Returns the events that matches only the events_id
    const { data: events } = await supabase
      .from("events")
      .select()
      .in("event_id", eventsID);

    // Returns the object data not in array form.
    return { registeredEvents, events };
  };

  return useQuery({ queryKey, queryFn });
}
