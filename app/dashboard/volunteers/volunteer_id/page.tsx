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

export default function Volunteers() {
  const accountDetails = [
    { Name: "First Name", Value: "Legolas" },
    { Name: "Middle Name", Value: "Wala ko kabalo" },
    { Name: "Last Name", Value: "Lada" },
    { Name: "Sex", Value: "Female" },
    { Name: "Date of Birth", Value: "May 05, 2023" },
    { Name: "Email Address", Value: "tllada@up.edu.ph" },
    { Name: "Age", Value: 90 },
  ];

  const contactDetails = [
    { Name: "Phone No.", Value: "N/A" },
    { Name: "Emergency Contact", Value: "N/A" },
    { Name: "Facebook Link", Value: "N/A" },
    { Name: "Other Social Link", Value: "N/A" },
  ];

  const currentAddress = [
    { Name: "House/Building no.", Value: "9999" },
    { Name: "Barangay", Value: "Talomo" },
    { Name: "Street", Value: "Española St." },
    { Name: "City/ Municipality", Value: "Davao City" },
    { Name: "Province", Value: "Davao Del Sur" },
    { Name: "Region", Value: "Davao Region (XI)" },
  ];

  const occupationDetails = [
    { Name: "Department", Value: "DMPCS" },
    { Name: "College", Value: "CSM" },
    { Name: "Year", Value: "2022" },
    { Name: "Degree", Value: "BSCS" },
    { Name: "Office/ Department Unit", Value: "N/A" },
    { Name: "Position/ Designation", Value: "N/A" },
    { Name: "Year Graduated", Value: "N/A" },
    { Name: "UP Constituent", Value: "N/A" },
    { Name: "Current Occupation", Value: "N/A" },
  ];

  const event1 = [
    { Title: "BINI Pantropiko Tour", Date: "May 05, 2023", VolunteerCount: 33 },
    { Title: "Django Workshop", Date: "May 03, 2024", VolunteerCount: 23 },
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
                <AvatarImage src="https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/436305359_8344398655586804_6083018213478162079_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF7IQx45DVl4wc5LIw0sAl325QHmBflQ6bblAeYF-VDpqBf_8Qya_fEawuepFl_R8Yx35xImwIHkqcagcSM4dmL&_nc_ohc=FTbTgIkUvYcQ7kNvgG-exgV&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&oh=00_AYB7D_3gk2rltq6EYOJxAT77xYO1Dh7Au_yX71vO0A-_Gg&oe=664BDE25" />
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
              {Object.entries(accountDetails).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.Name}</p>
                  <p>{value.Value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(currentAddress).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.Name}</p>
                  <p>{value.Value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* 3rd Grid */}
        <div className="col-span-2 space-y-3">
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(contactDetails).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.Name}</p>
                  <p>{value.Value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-1 ps-3">
              <CardTitle className="text-sm">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(occupationDetails).map(([key, value], index) => (
                <div key={index} className="flex justify-between">
                  <p className="py-1">{value.Name}</p>
                  <p>{value.Value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <p className="pt-12 text-lg font-bold">Participated Events</p>
      {/* Participated Events */}
      <div className="text-xs grid grid-cols-4 gap-5">
        {event1.map((event, index) => (
          <Card key={index}>
            <CardHeader className="p-3 pt-4">
              <CardTitle className="text-md leading-8">{event.Title}</CardTitle>
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
    </>
  );
}
