"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "@/app/dashboard/(dashboard-page)/calendar";
import useDashboardQuery from "@/hooks/use-dashboard-query";
import EventCard from "./EventCard";
import moment from "moment";
import { UUID } from "crypto";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const { data, status } = useDashboardQuery();

  return (
    <div
      className="flex gap-5 min-h-screen min-w-screen bg-muted p-5
                 rounded-md"
    >
      <Card className="bg-background grow">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Recent Event</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {data
            ?.filter(({ event_start }) => moment(event_start) <= moment())
            .map(({ event_id }) => (
              <EventCard event_id={event_id as UUID} key={event_id} />
            ))}
        </CardContent>
      </Card>
      <Card className="bg-background min-w-fit px-5">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Calendar</CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-md drop-shadow-md shadow-lg py-2">
          {status === "success" ? <EventCalendar data={data} /> : <></>}
          <Separator />
          <CardFooter className="flex flex-col mt-2 gap-3 items-start rounded-md p-2">
            {data?.toReversed().map(({ name, event_start }) => (
              <span className="flex gap-3 items-center">
                <span
                  className="bg-primary rounded-[99px] h-9 w-8
                  text-primary-foreground flex justify-center items-center"
                >
                  {moment(event_start).format("DD")}
                </span>
                <span>{name}</span>
              </span>
            ))}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

function EventCalendar({
  data,
}: {
  data: {
    name: string;
    event_id: string;
    event_start: string;
    event_end: string;
  }[];
}) {
  const highlighted = data.map(({ event_start }) => new Date(event_start));

  return (
    <Calendar mode="multiple" selected={highlighted} className="min-w-full" />
  );
}
