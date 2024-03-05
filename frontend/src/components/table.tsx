"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, Table } from "flowbite-react";

import { EventLog } from "../types/event-log";

const DataTable = ({ data }: { data: EventLog[] }) => {
  const columnHelper = createColumnHelper<EventLog>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("timestamp", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("userId", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("eventType", {
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="m-7 w-full overflow-scroll">
      <div className="h-full">
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <Table.HeadCell key={header.id} className="p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.HeadCell>
              ))
            )}
          </Table.Head>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export default DataTable;
