"use client";

import { ColumnDef } from "@tanstack/react-table";

export type EventVolunteerList = {
  volunteer: { name: string };
  time_logged: number;
  orientation_attendance: "attended" | "rejected" | null;
  final_attendance: "attended" | "rejected" | null;
};

export const EventVolunteerColumns: ColumnDef<EventVolunteerList>[] = [
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
  },
  {
    accessorKey: "final_attendance",
    header: "Final Attendance",
  },
];
