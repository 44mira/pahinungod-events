"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import add_icon from "@/public/add_icon.svg";
import AddEventForm from "./AddEventForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddEvent() {
  const pathname = usePathname();

  if (pathname === "/dashboard/events")
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-xsm text-accent-foreground lg:ml-5"
            size="sm"
            variant={"accent"}
          >
            <Image src={add_icon} alt="add icon" />
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[40%]">
          <DialogHeader className="text-lg font-bold">Add Event</DialogHeader>

          <AddEventForm />
        </DialogContent>
      </Dialog>
    );
  return <></>;
}
