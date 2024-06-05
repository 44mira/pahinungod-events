"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import useDeleteEventMutaion from "@/hooks/use-delete-event-mutation";
import person_icon from "@/public/person_icon.svg";
import calendar_icon from "@/public/calendar.svg";
import location_icon from "@/public/location_icon.svg";
import left_arrow_icon from "@/public/left_arrow_icon.svg";
import useSingleEventQuery from "@/hooks/use-single-event-query";
import { UUID } from "crypto";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { DataTable } from "./data-table";
import { EventVolunteerList, EventVolunteerColumns } from "./columns";
import delete_icon from "@/public/delete_icon.svg";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import UpdateEvent from "./UpdateEvent";
import { AddEventFields } from "../_types/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventInformation() {
  // get information of the viewed event
  const { event_id } = useParams();
  const [eventInfoData, volunteerListData] = useSingleEventQuery(
    event_id as UUID,
  );

  const { mutate: deleteEvent } = useDeleteEventMutaion();
  const router = useRouter();
  const READABLE_FORMAT = "MMM D YYYY, hh:mm a";
  const { data: eventInfo, status: eventStatus } = eventInfoData;
  const { data: volunteerList, status: volunteerListStatus } =
    volunteerListData;

  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <Button
          className="border-primary w-full max-w-fit"
          onClick={() => router.back()}
        >
          <Image src={left_arrow_icon} alt="left arrow icon" />
          Back
        </Button>
        <div className="grow" />
        <UpdateEvent
          event_id={event_id as UUID}
          eventInfo={eventInfo as AddEventFields}
          disabled={eventStatus !== "success"}
        />

        <DeleteAlert
          event_id={event_id as UUID}
          deleteEvent={deleteEvent}
          router={router}
        />
      </div>
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
                    <span>
                      {`${volunteerList!.length} volunteer${volunteerList!.length === 1 ? "" : "s"} ${
                        eventInfo.volunteer_cap
                          ? `out of ${eventInfo.volunteer_cap}`
                          : ""
                      }`}
                    </span>
                  </div>
                )}
                <div className="flex gap-3 justify-center items-center grow">
                  <Image src={calendar_icon} alt="calendar icon" />
                  {"Event Date: "}
                  <span>
                    {moment(eventInfo.event_start).format(READABLE_FORMAT)}
                  </span>{" "}
                  -
                  <span>
                    {moment(eventInfo.event_end).format(READABLE_FORMAT)}
                  </span>
                </div>
                {!!eventInfo.orientation_date && (
                  <div className="flex gap-3 justify-center items-center grow">
                    <Image src={calendar_icon} alt="calendar icon" />
                    <span>
                      {"Orientation Date: "}
                      {moment(eventInfo.orientation_date).format("MMM DD YYYY")}
                    </span>{" "}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-col gap-4">
                <span className="flex flex-col gap-2">
                  <span className="font-bold">Location</span>
                  <span className="flex gap-3 items-center">
                    <Image src={location_icon} alt="location icon" />
                    <span>{eventInfo.location}</span>
                  </span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-bold">Description</span>
                  <span className="flex gap-3 items-center">
                    <span>{eventInfo.description}</span>
                  </span>
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        )}
        {/* Volunteer list */}

        {volunteerListStatus === "pending" ||
        volunteerListStatus === "error" ? (
          <></>
        ) : (
          <>
            <Tabs defaultValue="accepted" className="w-full">
              <TabsList className="grid grid-cols-2 w-full bg-secondary text-secondary-foreground">
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="accepted">
                <DataTable
                  columns={EventVolunteerColumns}
                  orientation={!!eventInfo?.orientation_date}
                  rejected={false}
                  data={
                    volunteerList
                      .filter(({ status }) => status === "accepted")
                      .sort(
                        (a, b) => b.time_logged - a.time_logged,
                      ) as EventVolunteerList[]
                  }
                />
              </TabsContent>
              <TabsContent value="rejected">
                <DataTable
                  columns={EventVolunteerColumns}
                  orientation={!!eventInfo?.orientation_date}
                  rejected={true}
                  data={
                    volunteerList
                      .filter(({ status }) => status === "rejected")
                      .sort(
                        (a, b) => b.time_logged - a.time_logged,
                      ) as EventVolunteerList[]
                  }
                />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </>
  );
}
function DeleteAlert({
  event_id,
  deleteEvent,
  router,
}: {
  event_id: UUID;
  deleteEvent: any; // type too long
  router: AppRouterInstance;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full max-w-fit">
          <Image src={delete_icon} alt="delete icon" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this event
          and remove this data from our servers.
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => {
              deleteEvent(event_id);
              router.back();
            }}
          >
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
