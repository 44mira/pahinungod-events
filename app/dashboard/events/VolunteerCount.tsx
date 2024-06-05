"use client";

import Image from "next/image";
import person_icon from "@/public/person_icon.svg";
import useEventVolunteerCountQuery from "@/hooks/use-event-volunteer-count-query";

export function VolunteerCount({
  event_id,
  volunteer_cap,
}: {
  event_id: string;
  volunteer_cap: number | null;
}) {
  const { data, status } = useEventVolunteerCountQuery(event_id);

  if (status === "error") {
    return (
      <span className="flex text-destructive items-center gap-3 p-5 border border-accent">
        Error
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3 p-5 border border-accent">
      <Image src={person_icon} alt="person icon" />
      {status === "pending"
        ? "..."
        : volunteer_cap
          ? `${data}/${volunteer_cap}`
          : "N/A"}
    </span>
  );
}
