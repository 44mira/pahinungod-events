"use client";

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
import useDashboardQuery from "@/hooks/use-dashboard-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  // Fetch data from database
  const { data: events, status } = useDashboardQuery();

  // For rendering active events
  const [activeEvent, setActiveStatus] = useState(false);
  const [upcomingEvent, setUpcomingStatus] = useState(false);
  const [pastEvent, setPastStatus] = useState(false);

  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week

  const currentDate = formatDate(new Date().toISOString());
  useEffect(() => {
    if (events) {
      // Check if there is active event
      const isActive = events.some(
        (event) => formatDate(event.event_start) === currentDate,
      );
      setActiveStatus(isActive); // Sets to true if there is active

      // Check if there is upcoming event
      const isUpcoming = events.some(
        (event) => event.event_start > new Date().toISOString(),
      );
      setUpcomingStatus(isUpcoming); // Sets to true if there is upcoming

      const isPast = events.some(
        (event) =>
          new Date().getTime() - new Date(event.event_start).getTime() <
            oneWeekInMilliseconds &&
          new Date(event.event_start).getTime() < new Date().getTime() &&
          new Date().toISOString() !== event.event_start
      );
      setPastStatus(isPast); // Sets to true if there is past event within a week
    }
  }, [events, currentDate, oneWeekInMilliseconds]);

  // If fetching is successful
  if (status === "pending")
    return <p className="text-accent text-2lg font-bold">Loading...</p>; // Will replace with skeleton

  // Iterate all the row in the database = 'events' object.
  const eventInfo = events?.map((event) => ({
    id: event.event_id, // 'event_id' column in a single row iterated.
    title: event.name, // 'name' column in a single row iterated.
    date: formatDate(event.event_start), //  'event_start' column in a single row iterated.
    volunteerCap: event.volunteer_cap, // 'volunteer_cap' column in a single row iterated.
  }));

  console.log(pastEvent);

  return (
    <>
      <div className="space-y-14">
        <div>
          <p className="text-2lg font-semibold mb-5">Active Events</p>
          <div className="space-y-9">
            {eventInfo?.map((event, index) =>
              currentDate === event.date ? (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-2lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center border-y-2 border-black/50 pb-0 mb-3">
                    <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-black/50 pr-4">
                      <UsersWhite className="text-accent-strong" />
                      <span>{event.volunteerCap}</span>
                    </CardDescription>
                    <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
                      <div className=" text-accent-strong">
                        <CalendarWhite />
                      </div>
                      <span>{event.date}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={{
                        pathname: `/volunteers/dashboard/events/${event.id}`,
                      }}
                      className="w-full"
                    >
                      <Button className=" w-full " variant={"outline"}>
                        View
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ) : (
                ""
              ),
            )}
            {activeEvent ? (
              ""
            ) : (
              <p className="p-5 text-center text-xl font-semibold text-primary">
                No Active Events
              </p>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-2lg font-semibold mb-5">Upcoming Events</p>
          <div className="space-y-9">
            {eventInfo?.map((event, index) =>
              new Date(event.date).getTime() > new Date().getTime() &&
              currentDate !== event.date ? (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-2lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center border-y-2 border-black/50 pb-0 mb-3">
                    <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-black/50 pr-4">
                      <UsersWhite className="text-accent-strong" />
                      <span>{event.volunteerCap}</span>
                    </CardDescription>
                    <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
                      <div className=" text-accent-strong">
                        <CalendarWhite />
                      </div>
                      <span>{event.date}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={{
                        pathname: `/volunteers/dashboard/events/${event.id}`,
                      }}
                      className="w-full"
                    >
                      <Button className=" w-full " variant={"outline"}>
                        View
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ) : (
                ""
              ),
            )}
            {upcomingEvent ? (
              ""
            ) : (
              <p className="p-5 text-center text-xl font-semibold text-primary">
                No Upcoming Events
              </p>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <p className="text-2lg font-semibold mb-5">Past Events</p>
          <div className="space-y-9">
            {eventInfo?.map((event, index) =>
              new Date().getTime() - new Date(event.date).getTime() <
                oneWeekInMilliseconds &&
              new Date(event.date).getTime() < new Date().getTime() &&
              currentDate !== event.date ? (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-2lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center border-y-2 border-black/50 pb-0 mb-3">
                    <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-black/50 pr-4">
                      <UsersWhite className="text-accent-strong" />
                      <span>{event.volunteerCap}</span>
                    </CardDescription>
                    <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
                      <div className=" text-accent-strong">
                        <CalendarWhite />
                      </div>
                      <span>{event.date}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={{
                        pathname: `/volunteers/dashboard/events/${event.id}`,
                      }}
                      className="w-full"
                    >
                      <Button className=" w-full " variant={"outline"}>
                        View
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ) : (
                ""
              ),
            )}
            {pastEvent ? (
              ""
            ) : (
              <p className="p-5 text-center text-xl font-semibold text-primary">
                Events from last week will show here
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Change date format into <weekday name> <month> <day> <year>
const formatDate = (inputDate: string) => {
  const formatedDate = new Date(inputDate);
  return formatedDate.toDateString(); // <weekday name> <month> <day> <year>
};
