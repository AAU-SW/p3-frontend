"use client";

import { Badge } from "@/components/ui/badge.tsx";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { Asset } from "@/types/asset.ts";

export const useColumns = () => {
	const columns = useMemo<ColumnDef<Asset>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "status",
				header: "Status",
				cell: ({ row }) => {
					const status = row.getValue("status") as "Active" | "Closed";

					const statusColor =
						status === "Active"
							? "bg-green-100 text-green-800 border-green-300"
							: "bg-red-100 text-red-800 border-red-300";

					return <Badge className={`${statusColor}`}>{status}</Badge>;
				},
			},
			{
				accessorKey: "registrationNumber",
				header: "Registration Number",
			},
		],
		[],
	);

	return columns;
};
