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
    <Card className="m-1">
      <CardHeader className="flex justify-center">
        <CardTitle className="text-center">Building Counts</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="rounded-md border">
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center flex-col gap-2 text-xs">
        <div className="leading-none text-muted-foreground italic text-center">
          Counts are sum over the past 90 days.<br/>
          Priorities are a mean over the past 90 days.
        </div>
      </CardFooter>
    </Card>
  )
}

export default HotBuildingsTable;