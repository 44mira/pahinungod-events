import { Button } from "@/components/ui/button";
import AddEvent from "./addEvent";
import { Suspense } from "react";

export default function Events({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="lg:flex w-full items-center gap-5 hidden">
        <h1 className="text-2xl text-primary font-bold basis-5">Events</h1>
        <div className="flex w-full items-center gap-5">
          <AddEvent />
          <div className="grow" />
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <div className="flex gap-2 items-center self-end">
          <Button className="text-xsm text-primary-foreground">Log out</Button>
        </div>
        <h1 className="text-2xl text-primary font-bold mx-auto">Events</h1>
        <AddEvent />
      </div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
