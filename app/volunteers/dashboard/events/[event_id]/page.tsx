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
import useInsertVntrToEvent from "@/hooks/use-insert-volunteer-to-event-mutation";
import useGetUserIdentity from "@/hooks/use-get-user-identity";
import useEventVolunteerQuery from "@/hooks/use-event-volunteer-query";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SingleEvent() {
  // Get user meta_data
  const { data: user } = useGetUserIdentity();
  // Get the ID from the URL
  const { event_id } = useParams();

  // User ID
  const user_id = user?.id;

  // Row from the event_volunteer table.
  const { data: eventData } = useEventVolunteerQuery(user_id as UUID);

  // Fetch the row from database with corresponding ID in the URL.
  const [eventInfoData, volunteerListData] = useSingleEventQuery(
    event_id as UUID,
  );

  // Apply Event Mutation
  const { mutate: applyEvent } = useInsertVntrToEvent(
    event_id as UUID,
    user_id as UUID,
  );

  // Checks if the state of the event is still open or close.
  const [isOpen, setStatus] = useState(true);

  // Checks if the the row has description.
  const [hasDescription, setDescription] = useState(true);

  //  Nullish coalescing operator if there is potential undefined values.

  useEffect(() => {
    // Close if the volunteer count exceeds or is equal to the maximum count.
    if (
      (volunteerListData!.data?.length ?? 0) >=
      (eventInfoData.data?.volunteer_cap ?? 0)
    ) {
      setStatus(false);
    }

    // If there is no volunteer cap.
    if (!eventInfoData.data?.volunteer_cap) {
      setStatus(true);
    }

    // Checks if the event has description or not
    if (eventInfoData.data?.description === "") {
      setDescription(false);
    }
  }, [volunteerListData, eventInfoData, isOpen, hasDescription]);

  const formatedDate = formatDate(eventInfoData.data?.event_start ?? "");

  // For handling form submits.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyEvent();
  };

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
          {volunteerListData!.data?.length}/
          {eventInfoData.data?.volunteer_cap || "No max participants"}
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

      {eventData?.status === "accepted" ? (
        <Button
          className="w-full text-lg rounded-full"
          variant={"outline"}
          size={"lg"}
          type="button"
          disabled
        >
          You are accepted
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full text-lg rounded-full"
              variant={"default"}
              size={"lg"}
              type="button"
            >
              Apply
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Are you sure you want to volunteer on this event?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:gap-x-0 flex-row justify-end md: gap-x-3">
              <DialogClose>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <form onSubmit={handleSubmit}>
                <DialogClose>
                  <Button variant="outline" type="submit">
                    Confirm
                  </Button>
                </DialogClose>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// Change date format into <weekday name> <month> <day> <year>
const formatDate = (inputDate: string) => {
  const formatedDate = new Date(inputDate);
  return formatedDate.toDateString(); // <weekday name> <month> <day> <year>
};
