"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ScrollArea } from "@/components/ui/scroll-area";

export type RecentRequest = {
  id: number,
  room: string,
  status: "Accepted" | "Rejected" | "Pending",
}

export const recentBuildingRequestColumns: ColumnDef<RecentRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "room",
    header: "Room",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

type RecentRequestsTableProps = {
  tableData: RecentRequest[]
}

const RecentRequestsTable = ({ tableData }: RecentRequestsTableProps ) => {
  const table = useReactTable({
    data: tableData, 
    columns: recentBuildingRequestColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className="flex flex-col m-1 w-full box-border">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Recent Requests</CardTitle>
      </CardHeader>
      <ScrollArea className="flex rounded-md border m-6 mt-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={recentBuildingRequestColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  )
}

export default RecentRequestsTable;