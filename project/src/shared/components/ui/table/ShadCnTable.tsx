import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { DataTable } from "@/shared/components/data-table/DataTable"; // jouw component hierboven

type User = { name: string; email: string; age: number };

const data: User[] = [
  { name: "Jan", email: "jan@example.com", age: 31 },
  { name: "Piet", email: "piet@example.com", age: 27 },
  { name: "Klaas", email: "klaas@example.com", age: 40 },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button onClick={column.getToggleSortingHandler()}>
        Naam {column.getIsSorted() ? (column.getIsSorted() === "asc" ? "↑" : "↓") : ""}
      </button>
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "email",
    // voeg dezelfde handler toe
    header: ({ column }) => (
      <button onClick={column.getToggleSortingHandler()}>
        Email {column.getIsSorted() ? (column.getIsSorted() === "asc" ? "↑" : "↓") : ""}
      </button>
    ),
    // optioneel: expliciet aanzetten/uitzetten
    // enableSorting: true,
  },
  {
    accessorKey: "age",
    header: ({ column }) => (
      <button onClick={column.getToggleSortingHandler()}>
        Leeftijd {column.getIsSorted() ? (column.getIsSorted() === "asc" ? "↑" : "↓") : ""}
      </button>
    ),
  },
];

export default function UsersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageSize, setPageSize] = React.useState(5);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // optioneel: page size
    initialState: { pagination: { pageSize } },
  });

  // voorbeeld: actionBar die alleen verschijnt bij geselecteerde rijen (als je selection toevoegt)
  const actionBar = (
    <div className="flex items-center gap-2">
      <button
        className="rounded bg-blue-600 px-3 py-1 text-white"
        onClick={() => alert("Do something with selected rows")}
      >
        Actie
      </button>
    </div>
  );

  return (
    <DataTable table={table} actionBar={actionBar}>
      {/* Optioneel: extra controls boven de tabel */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Gebruikers</h2>
        <select
          className="rounded border px-2 py-1 text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n} / pagina</option>
          ))}
        </select>
      </div>
    </DataTable>
  );
}
