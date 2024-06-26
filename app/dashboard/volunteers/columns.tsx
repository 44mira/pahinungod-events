"use client";

import { ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Volunteer = {
  volunteer_id: string;
  name: string;
  occupation:
    | "Student"
    | "Faculty"
    | "Retiree"
    | "Admin Staff"
    | "Alumni"
    | null;
  email: string;
  hours_rendered: number | null;
};

export const columns: ColumnDef<Volunteer>[] = [
  {
    accessorKey: "volunteer_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
  },
  {
    accessorKey: "hours_rendered",
    header: "Hours Rendered",
  },
];
