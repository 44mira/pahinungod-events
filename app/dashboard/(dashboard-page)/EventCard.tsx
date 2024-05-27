import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { UUID } from "crypto";
import location_icon from "@/public/location_icon.svg";
import Image from "next/image";
import moment from "moment";
import useDashboardEventQuery from "@/hooks/use-dashboard-event-query";

export default function EventCard({ event_id }: { event_id: UUID }) {
  const [volunteerCountInfo, eventInfo] = useDashboardEventQuery(event_id);

  const { data: event, status: eventStatus } = eventInfo;
  const { data: volunteerCount, status: volunteerCountStatus } =
    volunteerCountInfo;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-2lg font-bold">
          <span>{event?.name}</span>
          <span className="grow" />
          <span className="text-md text-accent">
            {moment(event?.event_end).format("MMM D")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-secondary">
          {event?.description ?? "No description"}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex">
        <span className="flex gap-3 items-center">
          <Image src={location_icon} alt="location icon" />
          {event?.location}
        </span>
        <span className="grow" />
        <span>
          {volunteerCount} {volunteerCount === 1 ? "volunteer" : "volunteers"}
        </span>
      </CardFooter>
    </Card>
  );
}
