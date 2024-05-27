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

import {
  accountDetails,
  contactDetails,
  currentAddress,
  occupationDetails,
  event1,
} from "./volunteer-dummyData";

import { UUID } from "crypto";
import useVolunteeridQuery from "@/hooks/use-volunteerid-query";
import { useParams } from "next/navigation";
import { VolumeIcon } from "lucide-react";

export default function Volunteers() {
  const { volunteer_id } = useParams();
  const { data: student, status } = useVolunteeridQuery(volunteer_id as UUID);

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <ErrorResponse />;

  const accountDetails = [
    {
      name: "Name",
      value: student.volunteer?.name,
    },
    { name: "Sex", value: student.volunteer?.sex },
    { name: "Date of Birth", value: student.volunteer?.birth_date },
    { name: "Email Address", value: student.volunteer?.email },
    { name: "Age", value: student.volunteer?.age },
  ];

  const addressDetails = [
    {
      name: "Address",
      value: student.volunteer?.address,
    },
    { name: "City", value: student.volunteer?.city },
    { name: "Province", value: student.volunteer?.province },
    { name: "Postal Code", value: student.volunteer?.postal_code },
  ];

  const contactDetails = [
    {
      name: "Phone Number",
      value: student.volunteer?.phone_number,
    },
    { name: "Emergency Contact", value: student.volunteer?.emergency_contact },
    { name: "Facebook Link", value: student.volunteer?.email }, //to be changed
  ];

  const schoolDetails = [
    {
      name: "Phone Number",
      value: student.volunteer?.phone_number,
    },
    { name: "Emergency Contact", value: student.volunteer?.emergency_contact },
    { name: "Facebook Link", value: student.volunteer?.email }, //to be changed
  ];

  const hoursRendered = [
    {
      name: "Hours Rendered",
      value: student.volunteer?.rendered_hours,
    },
  ];
  return (
    <>
      {/* Profile */}
      <div className="grid gap-4 grid-cols-5 text-xsm">
        {/* Account Details */}
        <div className="col-span-1">
          <Card className="">
            <CardHeader className="p-0 py-7 text-xsm">
              <Avatar className="w-44 h-44 mx-auto">
                <AvatarImage src="https:scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/436305359_8344398655586804_6083018213478162079_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF7IQx45DVl4wc5LIw0sAl325QHmBflQ6bblAeYF-VDpqBf_8Qya_fEawuepFl_R8Yx35xImwIHkqcagcSM4dmL&_nc_ohc=FTbTgIkUvYcQ7kNvgG-exgV&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&oh=00_AYB7D_3gk2rltq6EYOJxAT77xYO1Dh7Au_yX71vO0A-_Gg&oe=664BDE25" />
              </Avatar>
              <CardTitle className="text-md mx-auto pt-5 pb-1">
                Legolas Lada
              </CardTitle>
              <CardDescription className="mx-auto text-white">
                <Button className="rounded-3xl font-semibold text-xsm">
                  Registration Form
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent className="font-semibold pt-4 grid gap-y-2 bg-slate-300 rounded-b-md">
              <p>Student</p>
              <p>Disaster and Risk Reduction Management Program</p>
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

      <div className="flex">
        <div className="">
          <p className="pt-12 text-lg font-bold">Participated Events</p>
          {/* Participated Events */}
          <div className="text-xs grid grid-cols-3 gap-5 col-span-4 mr-10">
            {event1.map((event, index) => (
              <Card key={index}>
                <CardHeader className="p-3 pt-4">
                  <CardTitle className="text-md leading-8">
                    {event.Title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {event.Date}
                  </CardDescription>
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
                      {event.VolunteerCount}
                    </span>
                  </div>
                  <Button className="text-xsm ">View Event</Button>
                </CardFooter>
              </Card>
            ))}
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
