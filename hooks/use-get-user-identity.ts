import useSupabase from "./useSupabase";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js"; // Adjust the import according to your Supabase setup

export default function useGetUserIdentity() {
    const supabase = useSupabase();
    // Handle user
    const [user, setUser] = useState<User | null>(null); // Initialized to null until user data is fetched.

    // If the user data is fetched, update the value of user variable. 
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        fetchUser();
    }, [supabase]);

    return user;
}
