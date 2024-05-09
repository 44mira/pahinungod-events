import { Button } from "@/components/ui/button";
import notification_bell from "@/public/notification_bell.svg";
import add_icon from "@/public/add_icon.svg";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Event } from "./types";
import Events from "./Events";
import { Separator } from "@/components/ui/separator";

export default async function EventPage() {
  const supabase = createClient();
  const { data } = await supabase.from("events").select();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center gap-5">
        <h1 className="text-2xl text-primary font-bold basis-5">Events</h1>
        <Button className="text-xsm text-primary-foreground ml-5" size="sm">
          <Image src={add_icon} alt="add icon" />
          Add Event
        </Button>
        <div className="grow"></div>
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
