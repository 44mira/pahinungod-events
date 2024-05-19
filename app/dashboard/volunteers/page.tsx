"use client";

import {
  // Volunteer,
  columns,
} from "./columns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  // ColumnDef,
  ColumnFiltersState,
  // SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  // getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useVolunteerQuery from "@/hooks/use-volunteer-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DemoPage() {
  const { data, status } = useVolunteerQuery();

  // const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  if (status === "error") return <ErrorResponse />;

  return (
    <>
      <div className="">
        <div>
          <div className="flex items-center pb-4 gap-2">
            <Select
              onValueChange={(value) =>
                table
                  .getColumn("occupation")
                  ?.setFilterValue(value === "none" ? "" : value)
              }
            >
              <SelectTrigger className="w-[180px] drop-shadow-md bg-white">
                <SelectValue placeholder="Add filters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="retiree">Retiree</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="admin staff">Admin Staff</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Search by name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="w-full drop-shadow-md border-0 bg-muted"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-primary-foreground"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    {status === "pending" ? (
                      <></>
                    ) : (
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function ErrorResponse() {
  return (
    <Alert variant="destructive">
      <AlertTitle>An error has occurred!</AlertTitle>
      <AlertDescription>
        There was an error in fetching Volunteers data.
      </AlertDescription>
    </Alert>
  );
}
