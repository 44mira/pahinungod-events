import { Button } from "@/components/ui/button";
import notification_bell from "@/public/notification_bell.svg";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Event } from "./types";
import Events from "./Events";

export default async function EventPage() {
  const supabase = createClient();
  const { data } = await supabase.from("events").select();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center">
        <h1 className="text-2xl text-primary font-bold grow">Events</h1>
        <Image
          src={notification_bell}
          alt="notification bell"
          className="m-4"
        />
        <Button className="text-xsm text-primary-foreground">Log out</Button>
      </div>
      <Events data={data as Event[]} />
    </div>
  );
}
