"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { User } from "@/types/user.ts";

export const useColumns = () => {
	const columns = useMemo<ColumnDef<User>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Name",
			},
{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "email",
				header: "Email",
			},
			{
				accessorKey: "encryptedPassword",
				header: "Encrypted Password",
			},
			{
				accessorKey: "role",
				header: "Role",
			},
		],
		[],
	);

	return columns;
};
