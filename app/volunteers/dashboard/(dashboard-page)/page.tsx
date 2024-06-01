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
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  // Fetch data from database
  const { data: events, status } = useDashboardQuery();

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

  return (
    <div className="space-y-9">
      {eventInfo?.map((event, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-2lg">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center border-y-2 border-accent/50 pb-0 mb-3">
            <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-accent/50 pr-4">
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
              href={{ pathname: `/volunteers/dashboard/events/${event.id}` }}
              className="w-full"
            >
              <Button className=" w-full bg-gradient-to-l from-accent-strong to-accent-light from-5% to-95%">
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// Change date format into <weekday name> <month> <day> <year>
const formatDate = (inputDate: string) => {
  const formatedDate = new Date(inputDate);
  return formatedDate.toDateString(); // <weekday name> <month> <day> <year>
};