"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import person_icon from "@/public/person_icon.svg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter, useParams } from "next/navigation";

import { event1 } from "./volunteer-dummyData";

import { UUID } from "crypto";
import useVolunteeridQuery from "@/hooks/use-volunteerid-query";
import left_arrow_icon from "@/public/left_arrow_icon.svg";
import useRegisteredEventsOnAdminQuery from "@/hooks/use-registered-events-on-admin";
import moment from "moment";
import Link from "next/link";

export default function Volunteers() {
  const router = useRouter();
  const { volunteer_id } = useParams();
  const { data: volunteer, status } = useVolunteeridQuery(volunteer_id as UUID);
  const { data: registeredEvents, status: eventStatus } =
    useRegisteredEventsOnAdminQuery(volunteer_id as UUID);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <ErrorResponse />;

  const accountDetails = [
    {
      name: "Name",
      value: volunteer.name,
    },
    { name: "Sex", value: volunteer.sex },
    { name: "Date of Birth", value: volunteer.birth_date },
    { name: "Email Address", value: volunteer.email },
    { name: "Age", value: volunteer.age },
  ];

  const addressDetails = [
    {
      name: "Address",
      value: volunteer.address,
    },
    { name: "City", value: volunteer.city },
    { name: "Province", value: volunteer.province },
    { name: "Postal Code", value: volunteer.postal_code },
  ];

  const contactDetails = [
    {
      name: "Phone Number",
      value: volunteer.phone_number,
    },
    { name: "Emergency Contact", value: volunteer.emergency_contact },
    { name: "Facebook Link", value: volunteer.email }, //to be changed
  ];

  const schoolDetails = [
    {
      name: "School",
      value: "placeholder",
    },
    { name: "Major", value: "placeholder" },
    { name: "Year", value: "placeholder" },
  ];

  const hoursRendered = [
    {
      name: "Hours Rendered",
      value: volunteer.rendered_hours,
    },
  ];

  return (
    <>
      <Button
        className="border-primary w-full max-w-fit"
        onClick={() => router.back()}
      >
        <Image src={left_arrow_icon} alt="left arrow icon" />
        Back
      </Button>
      {/* Profile */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 text-xsm">
        {/* Account Details */}
        <div className="col-span-1">
          <Card className="">
            <CardHeader className="p-0 py-7 text-xsm">
              <Avatar className="w-44 h-44 mx-auto">
                <AvatarImage src={volunteer.picture} />
              </Avatar>
              <CardTitle className="text-md mx-auto pt-5 pb-1">
                {volunteer.nickname}
              </CardTitle>
              <CardDescription className="mx-auto text-white">
                <Button className="rounded-3xl font-semibold text-xsm">
                  Registration Form
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent className="font-semibold text-center text-lg pt-4 grid gap-y-2 bg-slate-300 rounded-b-md">
              <p>{volunteer.occupation}</p>
            </CardContent>
          </Card>
        </div>
        {/* 2nd Grid */}
        <div className="col-span-2 space-y-3">
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Account Details</CardTitle>
            </CardHeader>

            <CardContent>
              {accountDetails.map((value, index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.name}</p>
                  <p>{value.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Address Details</CardTitle>
            </CardHeader>
            <CardContent>
              {addressDetails.map((value, index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.name}</p>
                  <p>{value.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* 3rd Grid */}
        <div className="col-span-2 space-y-3">
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              {contactDetails.map((value, index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.name}</p>
                  <p>{value.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">School Details</CardTitle>
            </CardHeader>
            <CardContent>
              {schoolDetails.map((value, index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.name}</p>
                  <p>{value.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="md:flex">
        <div className="">
          <p className="pt-12 text-lg font-bold">Participated Events</p>
          {/* Participated Events */}
          <div className="text-xs grid md:grid-cols-3 gap-5 col-span-4 mr-10">
            {registeredEvents?.events!.map(
              ({ event_id, name, event_start, volunteer_cap }) => (
                <Card key={event_id}>
                  <CardHeader className="p-3 pt-4">
                    <CardTitle className="text-md leading-8">{name}</CardTitle>
                    <CardDescription className="text-sm">
                      {moment(event_start).format(" MMMM DD YYYY")}
                    </CardDescription>
                    {registeredEvents?.eventVolunteer.map(
                      ({ event_id: singleEventID, status }) =>
                        singleEventID == event_id ? (
                          <CardDescription
                            key={event_id}
                            className={
                              status === "accepted"
                                ? "text-center text-primary-foreground font-semibold py-3 px-5 mt-3 bg-green-400 rounded-lg"
                                : "text-center text-primary-foreground font-semibold py-3 px-5 mt-3  bg-red-500 rounded-lg"
                            }
                          >
                            {status}
                          </CardDescription>
                        ) : (
                          ""
                        )
                    )}
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="p-3 flex justify-between text-white">
                    <div>
                      <Image
                        className="inline-block"
                        src={person_icon}
                        alt="person icon"
                      />
                      <span className="ps-2 align-middle text-black font-semibold">
                        {volunteer_cap}
                      </span>
                    </div>
                    <Link href={{ pathname: `/dashboard/events/${event_id}` }}>
                      <Button className="text-xsm ">View Event</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className=" p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-lg font-bold text-center">Total Hours</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="flex flex-col items-center justify-center">
                <CardContent>
                  {hoursRendered.map((value, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-5xl font-bold"
                    >
                      {value.value}
                    </div>
                  ))}
                </CardContent>
                {/* <div className="text-4xl font-bold">160</div> */}
                <p className="text-gray-500 dark:text-gray-400">Hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ErrorResponse() {
  return (
    <Alert variant="destructive">
      <AlertTitle>An error has occurred!</AlertTitle>
      <AlertDescription>
        There was an error in fetching Volunteers data.
      </AlertDescription>
    </Alert>
  );
}
