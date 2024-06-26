"use client";

import Image from "next/image";
import search_icon from "@/public/search_icon.svg";
import filter_icon from "@/public/filter_icon.svg";
import calendar_icon from "@/public/calendar.svg";
import location_icon from "@/public/location_icon.svg";
import { Input } from "@/components/ui/input";
import { Event, EventStatus } from "./_types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
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

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { VolunteerCount } from "./VolunteerCount";

export default function Events() {
  // for pagination
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 0);

  const {
    data: event,
    status,
    refetch,
  } = useEventQuery(page, searchParams.get("search") ?? "");

  const handleSearch = useDebouncedCallback((searchedName: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchedName) {
      params.set("search", searchedName);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const [eventFilter, setEventFilter] = useState<EventStatus | "none">("none");

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <>
      <Searchbar
        handleSearch={handleSearch}
        eventFilter={eventFilter}
        setEventFilter={setEventFilter}
      />
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 w-full items-center gap-3">
        {status === "pending" ? (
          <PendingResponse />
        ) : status === "error" ? (
          <ErrorResponse />
        ) : (
          event
            .filter(
              (props) =>
                eventFilter === "none" ||
                (!props.event_active && eventFilter === "past") ||
                calculateStatus(props.event_start, props.event_end) ===
                  eventFilter,
            )
            .map(({ event_id, ...props }: Event) => (
              <Card
                key={event_id}
                className="min-w-fit flex flex-col w-full h-full"
              >
                <CardHeader className="h-full min-w-fit flex flex-col">
                  <CardTitle className="flex items-center w-full mb-2 h-full">
                    <span className="text-lg grow">{props.name}</span>
                    {/*<Badge
                    status={calculateStatus(props.event_start, props.event_end)}
                  />*/}
                  </CardTitle>

                  <CardDescription className="flex flex-col gap-2 w-full text-accent">
                    <span className="flex gap-3 items-center">
                      <Image src={location_icon} alt="location icon" />
                      {props.location}
                    </span>
                    <span className="flex min-w-full">
                      <VolunteerCount
                        event_id={event_id}
                        volunteer_cap={props.volunteer_cap}
                      />
                      <span className="flex items-center gap-3 p-5 border border-accent grow">
                        <Image src={calendar_icon} alt="calendar icon" />
                        {deltaDate(props.event_start, props.event_end)}
                      </span>
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-col gap-2 justify-self-end">
                  <Button
                    variant="outline"
                    className="border-accent w-full"
                    onClick={() => router.push("events/" + event_id)}
                  >
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

function ErrorResponse() {
  return (
    <Alert variant="destructive">
      <AlertTitle>An error has occurred!</AlertTitle>
      <AlertDescription>
        There was an error in fetching Events data.
      </AlertDescription>
    </Alert>
  );
}

function PendingResponse() {
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

function Searchbar({
  handleSearch,
  eventFilter,
  setEventFilter,
}: {
  handleSearch: (searchedName: string) => void;
  eventFilter: EventStatus | "none";
  setEventFilter: any;
}) {
  return (
    <div className="flex gap-2">
      <Select onValueChange={setEventFilter} defaultValue="none">
        <SelectTrigger className="min-w-fit max-w-fit bg-white">
          <SelectValue>
            <div className="flex gap-2">
              <span>Add a filter ({eventFilter})</span>
              <Image src={filter_icon} alt="filter icon" />
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-fit bg-white">
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="past">Past</SelectItem>
        </SelectContent>
      </Select>
      <div
        className="flex grow rounded-md pl-3 drop-shadow-md
        focus-within:ring-ring focus-within:ring-2 ring-0 bg-neutral-100"
      >
        <Image src={search_icon} alt="search icon" />
        <Input
          className="border-0 focus-visible:ring-2/0 bg-neutral-100"
          placeholder="Search for events by title"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
