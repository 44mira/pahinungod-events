import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersWhite from "@/public/usersWhite";
import CalendarWhite from "@/public/calendar_white";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2lg">Event Title</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center border-y-2 border-accent/50 pb-0 mb-3">
          <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-accent/50 pr-4">
            <UsersWhite className="text-accent-strong" />
            <span>30</span>
          </CardDescription>
          <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
            <div className=" text-accent-strong">
              <CalendarWhite />
            </div>
            <span>May 05, 2024</span>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-l from-accent-strong to-accent-light from-5% to-95%">
            View
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2lg">Event Title</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center border-y-2 border-accent/50 pb-0 mb-3">
          <CardDescription className="flex items-center gap-3 font-semibold text-md border-r-[3px] border-accent/50 pr-4">
            <UsersWhite className="text-accent-strong" />
            <span>30</span>
          </CardDescription>
          <CardDescription className=" flex items-center gap-3 ps-1 font-semibold text-md">
            <div className=" text-accent-strong">
              <CalendarWhite />
            </div>
            <span>May 05, 2024</span>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-l from-accent-strong to-accent-light from-5% to-95%">
            View
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
