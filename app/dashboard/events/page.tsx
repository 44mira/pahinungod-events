import Events from "./Events";
import notification_bell from "@/public/notification_bell.svg";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { Event } from "./types";
import { Button } from "@/components/ui/button";
import AddEvent from "./AddEvent";

export default async function EventPage() {
  const supabase = createClient();
  const { data } = await supabase.from("events").select();

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="lg:flex w-full items-center gap-5 hidden">
        <h1 className="text-2xl text-primary font-bold basis-5">Events</h1>
        <div className="flex w-full items-center gap-5">
          <AddEvent />
          <div className="grow" />
          <Image
            src={notification_bell}
            alt="notification bell"
            className="m-4"
          />
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <div className="flex gap-2 items-center">
          <div className="grow" />
          <Image src={notification_bell} alt="notification bell" />
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
        <h1 className="text-2xl text-primary font-bold mx-auto">Events</h1>
        <AddEvent />
      </div>
      <Events data={data as Event[]} />
    </div>
  );
}
