"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import person_icon from "@/public/person_icon.svg";
import calendar_icon from "@/public/calendar.svg";
import location_icon from "@/public/location_icon.svg";
import left_arrow_icon from "@/public/left_arrow_icon.svg";
import useSingleEventQuery from "@/hooks/use-single-event-query";
import { UUID } from "crypto";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";

export default function EventInformation() {
  // get information of the viewed event
  const { event_id } = useParams();
  const [eventInfoData, volunteerListData] = useSingleEventQuery(
    event_id as UUID,
  );

  const router = useRouter();
  const READABLE_FORMAT = "MMM D YYYY, hh:mm a";
  const { data: eventInfo, status: eventStatus } = eventInfoData;
  const { data: volunteerList, status: volunteerListStatus } =
    volunteerListData;

  return (
    <>
      <Button
        className="border-primary w-full self max-w-fit"
        onClick={() => router.back()}
      >
        <Image src={left_arrow_icon} alt="left arrow icon" />
        Back
      </Button>
      <div className="flex flex-col gap-5 min-h-screen min-w-screen bg-muted p-5 rounded-md">
        {/* Event info */}
        {eventStatus === "pending" ? (
          <Skeleton className="min-h-5/12 min-w-screen" />
        ) : eventStatus === "error" ? (
          <></>
        ) : (
          <Card className="p-5 min-w-screen">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {eventInfo.name.toUpperCase()}
              </CardTitle>
              <div className="flex min-w-screen py-2 px-5 gap-5">
                {volunteerListStatus === "pending" ? (
                  <></>
                ) : (
                  <div className="flex gap-3 justify-center items-center shrink-0">
                    <Image src={person_icon} alt="person icon" />
                    <p>{volunteerList!.length} volunteers</p>
                  </div>
                )}
                <div className="flex gap-3 justifcy-center items-center grow">
                  <Image src={calendar_icon} alt="calendar icon" />
                  <span>
                    {moment(eventInfo.event_start).format(READABLE_FORMAT)}
                  </span>{" "}
                  -
                  <span>
                    {moment(eventInfo.event_end).format(READABLE_FORMAT)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-col gap-4">
                <span className="flex flex-col gap-2">
                  <span className="font-bold">Location</span>
                  <span className="flex gap-3 items-center">
                    <Image src={location_icon} alt="location icon" />
                    <p>{eventInfo.location}</p>
                  </span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-bold">Description</span>
                  <span className="flex gap-3 items-center">
                    <p>{eventInfo.description}</p>
                  </span>
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        )}
        {/* Volunteer list */}
      </div>
    </>
  );
}
