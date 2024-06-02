import { useMutation } from "@tanstack/react-query";
import useSupabase from "./useSupabase";
import { UUID } from "crypto";

export default function useInsertVntrToEvent(event_id: UUID, userID: UUID) {
    const supabase = useSupabase();

    const mutationFn = async () => {
        const { data, error } = await supabase
        .from('event_volunteer')
        .insert([
        { volunteer_id: userID, event_id: event_id },
        ])
        .select()

        if (error) {
            console.log("Error inserting either userID or eventID to event_volunteer table.");
            throw error;
        }
      
        return data;
        
    }
    
    return useMutation({mutationFn});
    
}