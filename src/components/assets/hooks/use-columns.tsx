"use client"

import {Badge} from "@/components/ui/badge.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import {useMemo} from "react";

export type Case = {
    name: string;
    assignedTo: string;
    status: "Active" | "Closed";
    customer: string;
};

export const useColumns = () => {
    const columns = useMemo<ColumnDef<Case>[]>(() => [
        {
            accessorKey: "name",
            header: "Title",
        },
        {
            accessorKey: "assignedTo",
            header: "Assigned",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => {
                const status = row.getValue("status") as "Active" | "Closed";

                const statusColor =
                    status === "Active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-800 border-red-300";

                return (
                    <Badge className={`${statusColor}`}>
                        {status}
                    </Badge>
                );
            },

        },
        {
            accessorKey: "customer",
            header: "Customer",
        },
    ], []);

    return columns;
};
