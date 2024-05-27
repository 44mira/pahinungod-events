"use client";

import CalendarWhite from "@/public/calendar_white";
import UsersWhite from "@/public/usersWhite";
import Location from "@/public/location";
import { Button } from "@/components/ui/button";
import useSingleEventQuery from "@/hooks/use-single-event-query";
import { UUID } from "crypto";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function SingleEvent() {
  // Get the ID from the URL
  const { event_id } = useParams();

  // Fetch the row from database with corresponding ID in the URL.
  const [eventInfoData, volunteerListData] = useSingleEventQuery(
    event_id as UUID
  );

  // Checks if the state of the event is still open or close.
  const [isOpen, setStatus] = useState(true);

  // Checks if the the row has description.
  const [hasDescription, setDescription] = useState(true);

  //  Nullish coalescing operator if there is potential undefined values.

  useEffect(() => {
    // Close if the volunteer count exceeds the maximum count.
    if (
      (volunteerListData!.data?.length ?? 0) >=
      (eventInfoData.data?.volunteer_cap ?? 0)
    ) {
      setStatus(isOpen);
    }

    // Checks if the event has description or not
    if (eventInfoData.data?.description === "") {
      setDescription(false);
    }
  }, [volunteerListData, eventInfoData, isOpen, hasDescription]);

  const formatedDate = formatDate(eventInfoData.data?.event_start ?? "");

  return (
    <>
      <div className="flex justify-end items-center gap-3 text-accent-strong ">
        <span className=" bg-accent-strong text-white px-3 space-x-1 py-1 rounded-2xl">
          <span>&#x2022;</span>
          <span>{isOpen ? "open" : "close"}</span>
        </span>
        <UsersWhite />
        <span>
          {/* Volunteer Count / Maximum Volunteer*/}
          {volunteerListData!.data?.length}/{eventInfoData.data?.volunteer_cap}
        </span>
      </div>
      <div className="font-bold text-xl">{eventInfoData.data?.name}</div>
      <div className="flex pt-5 items-center gap-3 ps-1 text-lg font-semibold  text-accent-strong">
        <CalendarWhite />
        <span>{formatedDate}</span>
      </div>
      <div className="flex items-center gap-3 ps-1 text-lg font-semibold  text-accent-strong">
        <Location />
        <span>{eventInfoData.data?.location}</span>
      </div>
      <div className="pt-5 py-10 text-lg">
        {hasDescription
          ? eventInfoData.data?.description
          : "No available description."}
      </div>

      <Button
        className="w-full text-lg rounded-full"
        variant={"accent"}
        size={"lg"}
      >
        Apply
      </Button>
    </>
  );
}

// Change date format into <weekday name> <month> <day> <year>
const formatDate = (inputDate: string) => {
  const formatedDate = new Date(inputDate);
  return formatedDate.toDateString(); // <weekday name> <month> <day> <year>
};
