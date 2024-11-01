"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Cell } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";


export type HotBuildingCount = {
  building: string,
  count: number,
  average_priority: string,
}

export const hotBuildingColumns: ColumnDef<HotBuildingCount>[] = [
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "average_priority",
    header: "Priority",
  },
]

type HotBuildingsTableProps = {
  tableData: HotBuildingCount[]
}

const HotBuildingsTable = ( { tableData }: HotBuildingsTableProps ) => {
  const table = useReactTable({
    data: tableData, 
    columns: hotBuildingColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className="flex flex-col m-1 w-full">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Building Counts</CardTitle>
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
                <TableCell colSpan={hotBuildingColumns.length} className="h-24 text-center">
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

export default HotBuildingsTable;