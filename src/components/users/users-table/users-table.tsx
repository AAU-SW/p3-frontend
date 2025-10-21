import { useColumns } from "@/components/users/hooks/use-columns.tsx";
import { DataTable } from "@/components/ui/data-table/data-table.tsx";
import type { FC } from "react";
import type { User } from "@/types/user.ts";

interface UsersTableProps {
    data: User[];
}

export const UsersTable: FC<UsersTableProps> = ({ data }) => {
    const columns = useColumns();


    return <DataTable columns={columns} data={data} withSearchBar={true} />;
};

