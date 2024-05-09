"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";
import search_icon from "@/public/search_icon.svg";
import filter_icon from "@/public/filter_icon.svg";
import { Input } from "@/components/ui/input";
import { Event } from "./types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function Events({ data }: { data: Event[] }) {
  const [event, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    setEvents(data ?? []);
  }, [data]);

  return (
    <>
      <Searchbar />
      <div className="grid grid-cols-4 w-full items-center gap-3">
        {event.map(({ event_id, ...props }: Event) => (
          <Card key={event_id} className="min-w-[56p] h-full">
            <CardHeader>
              <CardTitle className="flex items-center w-full mb-2">
                <p className="text-lg grow">{props.name}</p>
                <Badge status={props.status} />
              </CardTitle>
              <CardDescription>
                <p>Event time: {props.event_time}</p>
                <p>Orientation time: {props.orientation_time}</p>
                <p>Location: {props.location}</p>
              </CardDescription>
            </CardHeader>
            <CardFooter>{props.description}</CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export function Badge({ status }: { status: string }) {
  return (
    <div
      className={clsx("rounded-full w-fit px-4 py-2 text-sm", {
        "bg-primary text-primary-foreground": status == "active",
        "bg-secondary text-secondary-foreground": status == "upcoming",
        "bg-accent text-accent-foreground": status == "past",
      })}
    >
      {status}
    </div>
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
