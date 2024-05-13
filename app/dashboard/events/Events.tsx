"use client";

import Image from "next/image";
import clsx from "clsx";
import search_icon from "@/public/search_icon.svg";
import filter_icon from "@/public/filter_icon.svg";
import calendar_icon from "@/public/calendar.svg";
import location_icon from "@/public/location_icon.svg";
import person_icon from "@/public/person_icon.svg";
import { Input } from "@/components/ui/input";
import { Event, EventStatus } from "./_api/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateStatus, deltaDate } from "./utils";
import useEventQuery from "@/hooks/use-event-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useSearchParams, useParams } from "next/navigation";
import { useCallback } from "react";

export default function Events() {
  // for pagination
  const pathname = useParams();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);

  const { data: event, status } = useEventQuery(page);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      <Searchbar />
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full items-center gap-3">
        {status === "pending" ? (
          <PendingResponse />
        ) : status === "error" ? (
          <ErrorResponse />
        ) : (
          event!.map(({ event_id, ...props }: Event) => (
            <Card
              key={event_id}
              className="min-w-fit flex flex-col w-full h-full"
            >
              <CardHeader className="h-full min-w-fit">
                <CardTitle className="flex items-center w-full mb-2 h-full">
                  <span className="text-lg grow">{props.name}</span>
                  <Badge
                    status={calculateStatus(props.event_start, props.event_end)}
                  />
                </CardTitle>

                <CardDescription className="flex flex-col gap-2 w-full text-primary">
                  <span className="flex gap-3 items-center">
                    <Image src={location_icon} alt="location icon" />
                    {props.location}
                  </span>
                  <span className="flex min-w-full">
                    <span className="flex items-center gap-3 p-5 border border-primary">
                      <Image src={person_icon} alt="person icon" />0
                    </span>
                    <span className="flex items-center gap-3 p-5 border border-primary grow">
                      <Image src={calendar_icon} alt="calendar icon" />
                      {deltaDate(props.event_start, props.event_end)}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-col gap-2 justify-self-end">
                <Button variant="outline" className="border-primary w-full">
                  VIEW EVENT
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export function ErrorResponse() {
  return (
    <Alert variant="destructive">
      <AlertTitle>An error has occurred!</AlertTitle>
      <AlertDescription>
        There was an error in fetching Events data.
      </AlertDescription>
    </Alert>
  );
}

export function PendingResponse() {
  return (
    <>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} className="min-w-fit h-56" />
        ))}
    </>
  );
}

export function Badge({ status }: { status: EventStatus }) {
  return (
    <span
      className={clsx("rounded-full w-fit px-4 py-2 text-sm", {
        "bg-primary text-primary-foreground": status == "active",
        "bg-secondary text-secondary-foreground": status == "upcoming",
        "bg-accent text-accent-foreground": status == "past",
      })}
    >
      {status}
    </span>
  );
}

export function Searchbar() {
  return (
    <div className="flex gap-2">
      <Button className="flex gap-2 text-body" variant="outline">
        Add a filter
        <Image src={filter_icon} alt="filter icon" />
      </Button>
      <div
        className="border border-input flex grow rounded-md pl-3
        focus-within:ring-ring focus-within:ring-2 ring-0 bg-muted"
      >
        <Image src={search_icon} alt="search icon" />
        <Input
          className="border-0 focus-visible:ring-2/0 bg-inherit"
          placeholder="Search for events by title or id"
        />
      </div>
    </div>
  );
}
