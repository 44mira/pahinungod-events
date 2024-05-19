"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Volunteer = {
  id: string;
  name: string;
  occupation: "Student" | "Faculty" | "UP|REPS" | "Admin Staff" | "NGS";
  email: string;
  sex: string;
  age: number;
};

export const columns: ColumnDef<Volunteer>[] = [
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
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];
