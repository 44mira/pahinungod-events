"use client";

import useUpdateVolunteerMutation from "@/hooks/use-update-attendance-mutation";
import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type EventVolunteerList = {
  volunteer: { name: string };
  time_logged: number;
  orientation_attendance: "attended" | "rejected" | null;
  final_attendance: "attended" | "rejected" | null;
};

export const EventVolunteerColumns: ColumnDef<EventVolunteerList>[] = [
  { accessorKey: "volunteer_id" },
  { accessorKey: "event_id" },
  {
    accessorKey: "volunteer",
    header: "Name",
    cell: ({ row }) => {
      const { name }: { name: string } = row.getValue("volunteer");
      return name;
    },
  },
  {
    accessorKey: "time_logged",
    header: "Time Logged",
    cell: ({ row }) => {
      return row.getValue("time_logged") + " hrs";
    },
  },
  {
    accessorKey: "orientation_attendance",
    header: "Orientation Attendance",
    cell: ({ row, table }) => {
      const { mutate } = useUpdateVolunteerMutation(
        "orientation_attendance",
        row.getValue("event_id"),
        row.getValue("volunteer_id"),
      );

      const attendance: string = row.getValue("orientation_attendance");
      const rejected = !table.getColumn("time_logged")?.getIsVisible();

      return (
        <SelectAttendance
          mutate={mutate}
          attendance={attendance}
          rejected={rejected}
        />
      );
    },
  },
  {
    accessorKey: "final_attendance",
    header: "Final Attendance",
    cell: ({ row, table }) => {
      const { mutate } = useUpdateVolunteerMutation(
        "final_attendance",
        row.getValue("event_id"),
        row.getValue("volunteer_id"),
      );

      const attendance: string = row.getValue("final_attendance");
      const rejected = !table.getColumn("time_logged")?.getIsVisible();

      return (
        <SelectAttendance
          mutate={mutate}
          attendance={attendance}
          rejected={rejected}
        />
      );
    },
  },
];

function SelectAttendance({ mutate, attendance, rejected }: any) {
  if (rejected) {
    return <span>{attendance}</span>;
  }

  return (
    <Select onValueChange={mutate} defaultValue={attendance}>
      <SelectTrigger className="max-w-fit">
        <SelectValue placeholder={attendance} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="attended">attended</SelectItem>
        <SelectItem value="missed">missed</SelectItem>
      </SelectContent>
    </Select>
  );
}
