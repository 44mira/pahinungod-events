"use client";

import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersWhite from "@/public/usersWhite";
import CalendarWhite from "@/public/calendar_white";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useRegisteredEventsQuery from "@/hooks/use-registered-events-query";

export default function RegisteredEvents() {
  // Fetch only the events that the user registered.
  const { data: registeredEvents, status } = useRegisteredEventsQuery();

  // If fetching is successful
  if (status === "pending")
    return <p className="text-accent text-2lg font-bold">Loading...</p>; // Will replace with skeleton

  return (
    <div className="space-y-5 sm:grid sm:space-y-0 sm:grid-cols-2  lg:grid-cols-4 gap-5">
      {registeredEvents?.events!.map(
        ({ event_id, name, event_start, volunteer_cap }) => (
          <Card key={event_id}>
            <CardHeader>
              <CardTitle className="text-2lg">{name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center border-y-2 border-black/50 pb-0 mb-3">
              <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-black/50 pr-4">
                <UsersWhite className="text-accent-strong" />
                <span>{volunteer_cap}</span>
              </CardDescription>
              <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
                <div className=" text-accent-strong">
                  <CalendarWhite />
                </div>
                <span>{moment(event_start).format(" MMMM DD YYYY")}</span>
              </CardDescription>
            </CardContent>
            {registeredEvents?.eventVolunteer.map(
              ({ event_id: singleEventID, status }) =>
                singleEventID == event_id ? (
                  <CardDescription
                    key={event_id}
                    className={
                      status === "accepted"
                        ? "text-center text-primary-foreground font-semibold py-3 px-5 mb-3 bg-green-400 rounded-lg"
                        : "text-center text-primary-foreground font-semibold py-3 px-5 mb-3 bg-red-500 rounded-lg"
                    }
                  >
                    You are&nbsp;
                    {status}
                  </CardDescription>
                ) : (
                  ""
                )
            )}
            <CardFooter>
              <Link
                href={{ pathname: `/volunteers/dashboard/events/${event_id}` }}
                className="w-full"
              >
                <Button className=" w-full " variant={"outline"}>
                  View
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
}
