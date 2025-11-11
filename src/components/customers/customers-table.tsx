import type { FC } from 'react';
import type { Customer } from '@/types/customer';
import { useColumns } from '@/components/customers/use-columns.tsx';
import { DataTable } from '@/components/ui/data-table/data-table.tsx';

interface CustomersTableProps {
    data: Customer[];
}

export const CustomersTable: FC<CustomersTableProps> = ({ data }) => {
    const columns = useColumns();

    return <DataTable columns={columns} data={data} withSearchBar={true} />;
};
